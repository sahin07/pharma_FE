"""Import clean tablet text (user-provided) into approval-products.json."""

from __future__ import annotations

import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TABLETS_TEXT_PATH = ROOT / "scripts" / "data" / "tablets-clean.txt"
JSON_PATH = ROOT / "lib" / "approval-products.json"
TRANSCRIPT_CANDIDATES = [
    ROOT
    / "agent-transcripts"
    / "991de7ad-af8d-4580-87a6-790bd4c9d0ca"
    / "991de7ad-af8d-4580-87a6-790bd4c9d0ca.jsonl",
    Path(r"C:\Users\SAHIN\.cursor\projects\d-pharmacy-wholesale-platform\agent-transcripts\991de7ad-af8d-4580-87a6-790bd4c9d0ca\991de7ad-af8d-4580-87a6-790bd4c9d0ca.jsonl"),
]

COMP_START = re.compile(r"\bEach\b|Composition\s*:-", re.I)
SERIAL_LINE = re.compile(r"^(\d{1,3})\s*(.*)$")
INGREDIENT_LINE = re.compile(
    r"^(.+?)\s+(IP|USP|BP|1P|EP|JP)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|gm|g|ml|IU|%|w/w|w/v)?$",
    re.I,
)
INGREDIENT_NO_SPC = re.compile(
    r"^(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|gm|g|ml|IU|%|w/w|w/v)$",
    re.I,
)
EQ_TO_LINE = re.compile(
    r"^Eq\.\s*to\s+(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|gm|g|ml|IU|%|w/w|w/v)?$",
    re.I,
)

UNIT_ONLY = re.compile(r"^(mg|mcg|gm|g|ml|iu|%|w/w|w/v|q\.s\.?)$", re.I)

FORMULATION_FIXES = [
    (re.compile(r"Methylprednisolen\s+e Tablets IP", re.I), "Methylprednisolone Tablets IP"),
    (re.compile(r"Paracetamol&Chl\s*orzoxazoneTable\s*ts", re.I), "Paracetamol & Chlorzoxazone Tablets"),
    (re.compile(r"orzoxazoneTable\s*ts", re.I), "Chlorzoxazone Tablets"),
    (re.compile(r"Paracetamol&Chl", re.I), "Paracetamol & Chlorzoxazone"),
    (re.compile(r"ChlzoxazoneTablets", re.I), "Chlorzoxazone Tablets"),
    (re.compile(r"Thiocolchicosid\s*e Tablets", re.I), "Thiocolchicoside Tablets"),
    (re.compile(r"Hydrochlorothi\s*azide", re.I), "Hydrochlorothiazide"),
    (re.compile(r"Amlodipine &\s*Amlodipine Tablets", re.I), "Amlodipine & Atenolol Tablets"),
    (re.compile(r"coatedtablet", re.I), "coated tablet"),
]


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:120] or "product"


def ensure_tablets_text() -> str:
    if TABLETS_TEXT_PATH.exists():
        return TABLETS_TEXT_PATH.read_text(encoding="utf-8")

    transcript_path = next((p for p in TRANSCRIPT_CANDIDATES if p.exists()), None)
    if not transcript_path:
        raise FileNotFoundError(
            f"Missing {TABLETS_TEXT_PATH}. Paste tablet text there or keep transcript available."
        )

    for line in transcript_path.read_text(encoding="utf-8").splitlines():
        if "TABLETS:-" not in line or "Ofloxacin Tablets IP" not in line:
            continue
        payload = json.loads(line)
        for part in payload.get("message", {}).get("content", []):
            if part.get("type") != "text":
                continue
            text = part.get("text", "")
            start = text.find("TABLETS:-")
            if start == -1:
                continue
            body = text[start:]
            end = body.find("Montelukast")
            if end != -1:
                body = body[: body.rfind("Excipients q.s", end) + len("Excipients q.s")]
            TABLETS_TEXT_PATH.parent.mkdir(parents=True, exist_ok=True)
            TABLETS_TEXT_PATH.write_text(body.strip() + "\n", encoding="utf-8")
            return body

    raise ValueError("Could not extract tablet text from transcript.")


def is_product_start(line: str, next_line: str | None) -> int | None:
    stripped = line.strip()
    if not stripped:
        return None

    only_serial = re.match(r"^(\d{1,3})\s*$", stripped)
    if only_serial:
        serial = int(only_serial.group(1))
        if 1 <= serial <= 304 and next_line and re.match(r"[A-Za-z(]", next_line.strip()):
            return serial
        return None

    match = re.match(r"^(\d{1,3})\s+(.+)$", stripped)
    if not match:
        return None

    serial = int(match.group(1))
    name = match.group(2).strip()
    if not 1 <= serial <= 304:
        return None
    if re.fullmatch(r"[\d.]+\s*(mg|mcg|gm|g|ml|iu|%|w/w|w/v|q\.s\.?)?", name, re.I):
        return None
    if UNIT_ONLY.match(name):
        return None
    if not re.match(r"[A-Za-z(]", name):
        return None
    return serial


def split_products(text: str) -> list[str]:
    text = text.split("TABLETS:-", 1)[-1]
    text = re.sub(r"(?is)S\.N\.\s*GENERIC.*?REFERENCE\s*", "", text, count=1)
    lines = [line.rstrip() for line in text.splitlines()]

    blocks: list[list[str]] = []
    current: list[str] = []

    for index, line in enumerate(lines):
        next_line = lines[index + 1] if index + 1 < len(lines) else None
        serial = is_product_start(line, next_line)
        if serial is not None and current:
            blocks.append(current)
            current = [line]
        elif serial is not None:
            current = [line]
        elif current:
            current.append(line)

    if current:
        blocks.append(current)

    return ["\n".join(block).strip() for block in blocks if block]


def parse_formulation_and_composition(lines: list[str]) -> tuple[str, str]:
    formulation_parts: list[str] = []
    composition_lines: list[str] = []
    comp_mode = False

    for raw_line in lines[1:]:
        line = raw_line.strip()
        if not line:
            continue

        if not comp_mode:
            split = COMP_START.search(line)
            if split:
                comp_mode = True
                before = line[: split.start()].strip()
                after = line[split.start() :].strip()
                if before:
                    formulation_parts.append(before)
                if after:
                    composition_lines.append(after)
            else:
                formulation_parts.append(line)
        else:
            composition_lines.append(line)

    formulation = re.sub(r"\s+", " ", " ".join(formulation_parts)).strip()
    formulation = re.sub(r"(\w)-\s+(\w)", r"\1\2", formulation)
    formulation = formulation.replace("1P", "IP")
    formulation = re.sub(r"\beTablets\b", "e Tablets", formulation, flags=re.I)
    formulation = re.sub(r"\s+", " ", formulation)
    for pattern, replacement in FORMULATION_FIXES:
        formulation = pattern.sub(replacement, formulation)

    composition = "\n".join(composition_lines).strip()
    composition = re.sub(r"contains:\s*-\s*", "contains\n", composition, flags=re.I)
    composition = re.sub(r"contains:-\s*", "contains\n", composition, flags=re.I)
    composition = composition.replace("1P", "IP")
    composition = re.sub(r"\n{3,}", "\n\n", composition)

    return formulation, composition


def parse_product(chunk: str) -> dict | None:
    lines = [line.rstrip() for line in chunk.splitlines() if line.strip()]
    if not lines:
        return None

    match = SERIAL_LINE.match(lines[0])
    if not match:
        return None

    serial = int(match.group(1))
    first_tail = match.group(2).strip()
    if first_tail:
        body_lines = [first_tail, *lines[1:]]
    else:
        body_lines = lines[1:]

    formulation, composition = parse_formulation_and_composition([str(serial), *body_lines])
    if not formulation:
        return None

    return {
        "serialNo": serial,
        "formulation": formulation,
        "composition": composition,
        "slug": slugify(f"{serial}-{formulation}"),
    }


def parse_tablets(text: str) -> list[dict]:
    products_by_serial: dict[int, dict] = {}

    for chunk in split_products(text):
        product = parse_product(chunk)
        if not product:
            continue

        serial = product["serialNo"]
        current = products_by_serial.get(serial)
        if not current:
            products_by_serial[serial] = product
            continue

        current_score = len(current["formulation"]) + len(current["composition"])
        new_score = len(product["formulation"]) + len(product["composition"])
        if new_score > current_score:
            products_by_serial[serial] = product

    return [products_by_serial[i] for i in sorted(products_by_serial)]


def main() -> None:
    text = ensure_tablets_text()
    products = parse_tablets(text)

    if len(products) != 304:
        missing = [i for i in range(1, 305) if i not in {p["serialNo"] for p in products}]
        raise ValueError(f"Expected 304 tablets, got {len(products)}. Missing serials: {missing[:20]}")

    catalog = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    for category in catalog["categories"]:
        if category["slug"] == "tablets":
            category["products"] = products
            category["productCount"] = len(products)
            break
    else:
        raise ValueError("Tablets category not found in approval-products.json")

    catalog["extractedAt"] = datetime.now().isoformat(timespec="seconds")
    catalog["tabletsSource"] = "clean-text-import"
    catalog["totalProducts"] = sum(c["productCount"] for c in catalog["categories"])

    JSON_PATH.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Imported {len(products)} tablets into {JSON_PATH}")
    for serial in [1, 2, 88, 89, 194, 195, 304]:
        p = next(x for x in products if x["serialNo"] == serial)
        print(f"  S.N.{serial}: {p['formulation'][:70]}")


if __name__ == "__main__":
    main()
