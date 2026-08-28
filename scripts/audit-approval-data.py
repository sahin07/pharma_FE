"""Audit extracted products vs PDF — report missing/wrong data by PDF page."""

from __future__ import annotations

import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "APPROVAL LIST  SAMAY PHARMA ...... (1) (1) (1).pdf"
JSON_PATH = ROOT / "lib" / "approval-products.json"
PAGE_MAP_PATH = ROOT / "lib" / "approval-page-map.json"
OUT_PATH = ROOT / "lib" / "approval-audit-report.json"

SECTIONS = [
    ("tablets", 1, 32, 304),
    ("capsules", 32, 37, 40),
    ("oral-liquids", 37, 46, 67),
    ("ointments", 46, 51, 46),
]

SERIAL_X_MAX = 80


def serial_to_pdf_page(page_map: dict, slug: str, serial: int) -> int | None:
    section = page_map.get(slug, {})
    for page_key, info in section.get("pages", {}).items():
        if serial in info.get("serials", []):
            return int(page_key)
    return None


def get_pdf_serials(doc: fitz.Document, page_start: int, page_end: int, max_serial: int) -> dict[int, int]:
    """serial -> pdf_page (1-based)"""
    result: dict[int, int] = {}
    for page_no in range(page_start, page_end):
        for word in doc[page_no].get_text("words"):
            if word[0] >= SERIAL_X_MAX:
                continue
            if not re.fullmatch(r"\d{1,3}", word[4]):
                continue
            serial = int(word[4])
            if 1 <= serial <= max_serial + 5 and serial not in result:
                result[serial] = page_no + 1
    return result


def check_product(slug: str, product: dict) -> list[str]:
    issues: list[str] = []
    formulation = product.get("formulation", "").strip()
    composition = product.get("composition", "").strip()
    serial = product.get("serialNo", 0)

    if len(formulation) < 5:
        issues.append("formulation too short or empty")

    if not composition:
        issues.append("composition missing/empty")
    elif not re.search(r"\bEach\b|Composition\s*:-", composition, re.I):
        issues.append("composition missing 'Each ... contains' or 'Composition :-' header")

    if re.search(r":\s*-|:-", composition):
        issues.append("composition still has ':-' artifact")

    if re.search(r"(?m)^IP\s*$", composition):
        issues.append("composition has stray lone 'IP' line")

    if re.search(r"orzoxazone|Paracetamol&Chl|eTablets|e Capsules|1P\b", formulation + composition, re.I):
        issues.append("broken PDF text not fully cleaned")

    if re.search(r"\beTablets\b|\be Capsules\b", formulation, re.I):
        issues.append("formulation has merged word break (e.g. 'eTablets')")

    if slug == "oral-liquids" and re.search(r"\btablets?\b", formulation, re.I):
        issues.append("tablet entry inside oral liquids section (PDF layout issue)")

    if slug == "oral-liquids" and re.search(r"\bEach uncoated tablet\b", composition, re.I):
        issues.append("tablet composition mixed into liquid entry")

    if slug == "tablets" and serial == 2 and "Methylprednisolen" in formulation:
        issues.append("formulation name truncated ('Methylprednisolen' vs Methylprednisolone)")

    if len(formulation.split()) <= 2 and slug != "ointments":
        issues.append("formulation may be incomplete (very few words)")

    comp_lines = [ln.strip() for ln in composition.split("\n") if ln.strip()]
    if composition and len(comp_lines) <= 1:
        issues.append("composition has only one line (likely incomplete)")

    if re.search(r"Eq\. to\s+\w+\s*$", composition, re.M):
        issues.append("composition has 'Eq. to ...' without qty/unit")

    return issues


def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    page_map = json.loads(PAGE_MAP_PATH.read_text(encoding="utf-8")) if PAGE_MAP_PATH.exists() else {}
    doc = fitz.open(PDF_PATH)

    pdf_serial_pages: dict[str, dict[int, int]] = {}
    for slug, pstart, pend, maxs in SECTIONS:
        pdf_serial_pages[slug] = get_pdf_serials(doc, pstart, pend, maxs)

    report: dict = {
        "summary": {
            "missingFromJson": [],
            "extraInJson": [],
            "wrongFormatByPage": {},
            "pagesWithIssues": [],
            "totalIssues": 0,
        },
        "byCategory": {},
    }

    for category in data["categories"]:
        slug = category["slug"]
        max_serial = next(m for s, _, _, m in SECTIONS if s == slug)
        pdf_serials = set(pdf_serial_pages[slug].keys())
        json_serials = {p["serialNo"] for p in category["products"]}
        json_by_serial = {p["serialNo"]: p for p in category["products"]}

        missing = sorted(pdf_serials - json_serials)
        extra = sorted(json_serials - pdf_serials)

        page_issues: dict[str, list] = {}

        for serial in sorted(pdf_serials | json_serials):
            pdf_page = pdf_serial_pages[slug].get(serial) or serial_to_pdf_page(page_map, slug, serial)
            if serial in missing:
                entry = {
                    "serialNo": serial,
                    "pdfPage": pdf_page,
                    "pngFile": f"page-{pdf_page:03d}.png" if pdf_page else None,
                    "status": "MISSING from website JSON",
                    "issues": ["product not extracted into approval-products.json"],
                }
                page_key = str(pdf_page or "unknown")
                page_issues.setdefault(page_key, []).append(entry)
                report["summary"]["missingFromJson"].append(
                    {"category": slug, "serialNo": serial, "pdfPage": pdf_page}
                )
                continue

            product = json_by_serial.get(serial)
            if not product:
                continue

            issues = check_product(slug, product)
            if serial in extra:
                issues.append("in JSON but not found as PDF left-column serial")

            if issues:
                pdf_page = pdf_page or serial_to_pdf_page(page_map, slug, serial)
                entry = {
                    "serialNo": serial,
                    "pdfPage": pdf_page,
                    "pngFile": f"page-{pdf_page:03d}.png" if pdf_page else None,
                    "formulation": product["formulation"],
                    "compositionPreview": product["composition"][:120].replace("\n", " | "),
                    "status": "WRONG FORMAT / INCOMPLETE",
                    "issues": issues,
                }
                page_key = str(pdf_page or "unknown")
                page_issues.setdefault(page_key, []).append(entry)

        report["byCategory"][slug] = {
            "name": category["name"],
            "pdfPageRange": page_map.get(slug, {}).get("pdfPageRange"),
            "expectedCount": max_serial,
            "jsonCount": len(category["products"]),
            "pdfSerialCount": len(pdf_serials),
            "missingSerials": missing,
            "wrongFormatByPage": {
                page: items for page, items in sorted(page_issues.items(), key=lambda x: int(x[0]) if x[0].isdigit() else 999)
            },
        }

        for page, items in page_issues.items():
            if page not in report["summary"]["wrongFormatByPage"]:
                report["summary"]["wrongFormatByPage"][page] = []
            report["summary"]["wrongFormatByPage"][page].extend(
                [{"category": slug, **item} for item in items]
            )
            if page not in report["summary"]["pagesWithIssues"] and page != "unknown":
                report["summary"]["pagesWithIssues"].append(int(page))

        report["summary"]["extraInJson"].extend(
            {"category": slug, "serialNo": s} for s in extra
        )

    report["summary"]["pagesWithIssues"] = sorted(set(report["summary"]["pagesWithIssues"]))
    report["summary"]["totalIssues"] = (
        len(report["summary"]["missingFromJson"])
        + sum(
            len(v) for cat in report["byCategory"].values() for v in cat["wrongFormatByPage"].values()
        )
    )

    OUT_PATH.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    print("=" * 70)
    print("APPROVAL LIST AUDIT — missing / wrong format by PDF PAGE")
    print("=" * 70)
    print(f"Source PDF: {PDF_PATH.name}")
    print(f"JSON: {JSON_PATH.name}")
    print()

    if report["summary"]["missingFromJson"]:
        print("MISSING FROM JSON (not on website):")
        for item in report["summary"]["missingFromJson"]:
            print(f"  {item['category']} S.N.{item['serialNo']} — PDF page {item['pdfPage']}")
        print()
    else:
        print("MISSING FROM JSON: none (all PDF serials extracted)")
        print()

    print("WRONG / INCOMPLETE FORMAT — grouped by PDF page:")
    print()

    for slug, cat in report["byCategory"].items():
        if not cat["wrongFormatByPage"]:
            continue
        print(f"## {cat['name']} (PDF pages {cat['pdfPageRange']})")
        for page, items in cat["wrongFormatByPage"].items():
            print(f"\n  PDF page {page} ({items[0].get('pngFile', '')}):")
            for item in items:
                print(f"    S.N. {item['serialNo']}: {', '.join(item['issues'])}")
                if item.get("formulation"):
                    print(f"      Formulation: {item['formulation'][:80]}")
        print()

    all_issue_pages = set(report["summary"]["pagesWithIssues"])
    clean_pages = []
    for _, pstart, pend, _ in SECTIONS:
        for p in range(pstart + 1, pend + 1):
            if p not in all_issue_pages:
                clean_pages.append(p)

    print("-" * 70)
    print(f"PAGES WITH ISSUES ({len(all_issue_pages)}): {sorted(all_issue_pages)}")
    print(f"PAGES LOOKING OK ({len(clean_pages)}): no flagged issues on these PDF pages")
    print(f"\nFull report saved: {OUT_PATH}")


if __name__ == "__main__":
    main()
