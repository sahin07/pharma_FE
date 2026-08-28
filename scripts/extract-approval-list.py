"""Extract Samay Pharma approval list PDF into structured JSON.

Uses spatial word positions (left-column serial numbers) for accurate row
boundaries, renders section pages to PNG for reference, and parses
formulation/composition from the two-column layout.
"""

from __future__ import annotations

import json
import re
from datetime import datetime
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "APPROVAL LIST  SAMAY PHARMA ...... (1) (1) (1).pdf"
OUT_PATH = ROOT / "lib" / "approval-products.json"
PAGE_IMAGE_DIR = ROOT / "public" / "approval-pdf-pages"

# PDF page indices (0-based). Section headers sit on the first page of each range.
SECTIONS = [
    {
        "name": "Tablets",
        "slug": "tablets",
        "pageStart": 1,
        "pageEnd": 32,
        "maxSerial": 304,
        "formLeftX": 175,
        "compositionX": 175,
    },
    {
        "name": "Capsules",
        "slug": "capsules",
        "pageStart": 32,
        "pageEnd": 37,
        "maxSerial": 40,
        "formLeftX": 175,
        "compositionX": 175,
    },
    {
        "name": "Oral Liquids",
        "slug": "oral-liquids",
        "pageStart": 37,
        "pageEnd": 46,
        "maxSerial": 67,
        "formLeftX": 220,
        "compositionX": 220,
    },
    {
        "name": "Ointments",
        "slug": "ointments",
        "pageStart": 46,
        "pageEnd": 51,
        "maxSerial": 46,
        "formLeftX": 175,
        "compositionX": 175,
    },
]

SERIAL_X_MAX = 80
RENDER_DPI = 150

COMP_START = re.compile(r"\bEach\b|Composition\s*:-", re.I)
DOSAGE_FORM = re.compile(
    r"^(Tablets?|Capsules?|Syrup|Suspension|Drops|Cream|Gel|Ointment|Lotion|Paste|Wash|Elixir|Emulsion|Solution|Susp\.?)\s*(IP|USP|BP)?\.?$",
    re.I,
)

BROKEN_FORMULATION_FIXES = [
    (re.compile(r"Paracetamol&Chl\s*orzoxazoneTable\s*ts", re.I), "Paracetamol & Chlorzoxazone Tablets"),
    (re.compile(r"orzoxazoneTable\s*ts", re.I), "Chlorzoxazone Tablets"),
    (re.compile(r"Paracetamol&Chl", re.I), "Paracetamol & Chlorzoxazone"),
    (re.compile(r"\s+", re.I), " "),
]


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:120] or "product"


def is_formulation_suffix(text: str) -> bool:
    return bool(
        re.search(
            r"\b(cream|gel|ointment|lotion|wash|paste|syrup|suspension|drops|solution)\b.*\b(IP|USP|BP)?\b",
            text,
            re.I,
        )
    )


def is_composition_text(text: str) -> bool:
    if DOSAGE_FORM.match(text.strip()) or is_formulation_suffix(text):
        return False
    return bool(
        re.search(
            r"\bIP\b|\bUSP\b|\bBP\b|\bmg\b|\bmcg\b|\bgm\b|Excipents|Excipients|Colour|Eq\. to|contains|Composition|Preservatives|Cream base|base q\.s",
            text,
            re.I,
        )
    )


def clean_formulation(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"(\w)-\s+(\w)", r"\1\2", text)
    for pattern, replacement in BROKEN_FORMULATION_FIXES:
        text = pattern.sub(replacement, text)
    return text.strip(" ,")


def clean_composition(text: str) -> str:
    text = re.sub(r"Each film coated tablet contains:-:-", "Each film coated tablet contains:-", text, flags=re.I)
    text = re.sub(r"\n{3,}", "\n\n", text.strip())
    return text


def get_section_serials(doc: fitz.Document, page_start: int, page_end: int, max_serial: int) -> list[dict]:
    serials: list[dict] = []
    for page_no in range(page_start, page_end):
        for word in doc[page_no].get_text("words"):
            if word[0] >= SERIAL_X_MAX:
                continue
            if not re.fullmatch(r"\d{1,3}", word[4]):
                continue
            serial = int(word[4])
            if not 1 <= serial <= max_serial + 5:
                continue
            serials.append({"page": page_no, "y": word[1], "serial": serial})

    serials.sort(key=lambda item: (item["page"], item["y"]))

    seen: set[int] = set()
    deduped: list[dict] = []
    for item in serials:
        if item["serial"] in seen:
            continue
        seen.add(item["serial"])
        deduped.append(item)
    return deduped


def parse_product(
    doc: fitz.Document,
    page_end: int,
    start: dict,
    end: dict | None,
    form_left_x: int,
    composition_x: int,
) -> tuple[str, str]:
    form_parts: list[str] = []
    comp_parts: list[str] = []
    comp_mode = False

    last_page = end["page"] if end else page_end - 1
    for page_no in range(start["page"], last_page + 1):
        words = doc[page_no].get_text("words")
        by_y: dict[float, list] = {}
        for word in words:
            if page_no == start["page"] and word[1] < start["y"] - 1:
                continue
            if end and page_no == end["page"] and word[1] >= end["y"] - 1:
                continue
            by_y.setdefault(round(word[1], 1), []).append(word)

        for y in sorted(by_y):
            row = sorted(by_y[y], key=lambda w: w[0])
            left = " ".join(w[4] for w in row if SERIAL_X_MAX <= w[0] < form_left_x).strip()
            right = " ".join(w[4] for w in row if w[0] >= composition_x).strip()

            if not comp_mode:
                if left and not re.fullmatch(r"\d{1,3}", left):
                    form_parts.append(left)
                if COMP_START.search(right) or COMP_START.search(left):
                    comp_mode = True
                    if right:
                        comp_parts.append(right)
                    elif left:
                        comp_parts.append(left)
                continue

            if right:
                comp_parts.append(right)
                if left and not is_composition_text(left):
                    form_parts.append(left)
            elif left:
                if is_composition_text(left):
                    comp_parts.append(left)
                else:
                    form_parts.append(left)

    formulation = clean_formulation(" ".join(form_parts))
    composition = clean_composition("\n".join(comp_parts))
    return formulation, composition


def render_section_pages(doc: fitz.Document, section: dict) -> list[str]:
    out_dir = PAGE_IMAGE_DIR / section["slug"]
    out_dir.mkdir(parents=True, exist_ok=True)
    rendered: list[str] = []

    for page_no in range(section["pageStart"], section["pageEnd"]):
        page = doc[page_no]
        pix = page.get_pixmap(dpi=RENDER_DPI)
        filename = f"page-{page_no + 1:03d}.png"
        out_path = out_dir / filename
        pix.save(str(out_path))
        rendered.append(f"/approval-pdf-pages/{section['slug']}/{filename}")

    return rendered


def extract_section(doc: fitz.Document, section: dict) -> list[dict]:
    serials = get_section_serials(doc, section["pageStart"], section["pageEnd"], section["maxSerial"])
    products: list[dict] = []

    for idx, serial_span in enumerate(serials):
        next_span = serials[idx + 1] if idx + 1 < len(serials) else None
        formulation, composition = parse_product(
            doc,
            section["pageEnd"],
            serial_span,
            next_span,
            section["formLeftX"],
            section["compositionX"],
        )

        if len(formulation) < 3:
            continue

        products.append(
            {
                "serialNo": serial_span["serial"],
                "formulation": formulation,
                "composition": composition,
                "slug": slugify(f"{serial_span['serial']}-{formulation}"),
            }
        )

    return products


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"PDF not found: {PDF_PATH}")

    doc = fitz.open(PDF_PATH)
    categories = []
    page_images: dict[str, list[str]] = {}

    for section in SECTIONS:
        products = extract_section(doc, section)
        page_images[section["slug"]] = render_section_pages(doc, section)
        categories.append(
            {
                "name": section["name"],
                "slug": section["slug"],
                "productCount": len(products),
                "products": products,
            }
        )

    payload = {
        "source": PDF_PATH.name,
        "company": "Samay Pharma India Pvt. Ltd",
        "extractedAt": datetime.now().isoformat(timespec="seconds"),
        "extractionMethod": "spatial-pymupdf",
        "pageImages": page_images,
        "categories": categories,
        "totalProducts": sum(category["productCount"] for category in categories),
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Wrote {OUT_PATH}")
    for category in categories:
        nums = [product["serialNo"] for product in category["products"]]
        expected = set(range(1, category["products"][-1]["serialNo"] + 1)) if category["products"] else set()
        found = set(nums)
        missing = sorted(expected - found)
        print(
            f"  {category['name']}: {category['productCount']} products "
            f"(serial {min(nums)}-{max(nums)}, missing {missing[:10]})"
        )
    print(f"  Total: {payload['totalProducts']}")
    print(f"  Page images: {PAGE_IMAGE_DIR}")


if __name__ == "__main__":
    main()
