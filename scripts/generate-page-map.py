"""Map PDF page numbers to product serial numbers per section."""

from __future__ import annotations

import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "APPROVAL LIST  SAMAY PHARMA ...... (1) (1) (1).pdf"
OUT_PATH = ROOT / "lib" / "approval-page-map.json"

SECTIONS = [
    ("Tablets", "tablets", 1, 32, 304),
    ("Capsules", "capsules", 32, 37, 40),
    ("Oral Liquids", "oral-liquids", 37, 46, 67),
    ("Ointments", "ointments", 46, 51, 46),
]


def get_page_serials(doc: fitz.Document, page_no: int, max_serial: int) -> list[int]:
    serials: list[tuple[float, int]] = []
    for word in doc[page_no].get_text("words"):
        if word[0] >= 80:
            continue
        if not re.fullmatch(r"\d{1,3}", word[4]):
            continue
        serial = int(word[4])
        if 1 <= serial <= max_serial + 5:
            serials.append((word[1], serial))

    serials.sort()
    seen: set[int] = set()
    result: list[int] = []
    for _, serial in serials:
        if serial in seen:
            continue
        seen.add(serial)
        result.append(serial)
    return result


def main() -> None:
    doc = fitz.open(PDF_PATH)
    output: dict = {}

    for name, slug, page_start, page_end, max_serial in SECTIONS:
        pages: dict[str, dict] = {}
        for page_no in range(page_start, page_end):
            nums = get_page_serials(doc, page_no, max_serial)
            if not nums:
                continue
            pdf_page = page_no + 1
            pages[str(pdf_page)] = {
                "pdfPage": pdf_page,
                "pngFile": f"page-{pdf_page:03d}.png",
                "pngPath": f"/approval-pdf-pages/{slug}/page-{pdf_page:03d}.png",
                "serialFrom": nums[0],
                "serialTo": nums[-1],
                "count": len(nums),
                "serials": nums,
            }

        output[slug] = {
            "name": name,
            "slug": slug,
            "folder": f"public/approval-pdf-pages/{slug}/",
            "pdfPageRange": f"{page_start + 1}-{page_end}",
            "expectedSerials": max_serial,
            "pages": pages,
        }

    OUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT_PATH}\n")

    for slug, data in output.items():
        print(f"{data['name']} — PDF pages {data['pdfPageRange']}")
        print(f"  Folder: {data['folder']}")
        for page_key in sorted(data["pages"], key=int):
            p = data["pages"][page_key]
            print(
                f"  PDF p.{p['pdfPage']:2d} | {p['pngFile']} | "
                f"S.N. {p['serialFrom']}-{p['serialTo']} ({p['count']} items)"
            )
        print()


if __name__ == "__main__":
    main()
