"""Import clean ointment text (user-provided) into approval-products.json."""

from __future__ import annotations

import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_PATH = ROOT / "scripts" / "data" / "ointments-clean.txt"
JSON_PATH = ROOT / "lib" / "approval-products.json"

SECTION_MARKER = "OINTMENT:-"
MAX_SERIAL = 46
CATEGORY_SLUG = "ointments"

COMP_START = re.compile(r"\bEach\b|Composition\s*:", re.I)
SERIAL_LINE = re.compile(r"^(\d{1,3})\s*(.*)$")
UNIT_ONLY = re.compile(r"^(mg|mcg|gm|g|ml|iu|%|w/w|w/v|q\.s\.?|ip|usp|bp|jp)$", re.I)

FORMULATION_FIXES = [
    (re.compile(r"PhosphateGel\b", re.I), "Phosphate Gel"),
    (re.compile(r"Propionate\s+l\s+Cream\b", re.I), "Propionate Cream"),
    (re.compile(r"Povidone-\s*Iodine\b", re.I), "Povidone-Iodine"),
    (re.compile(r"\s+", re.I), " "),
]

VERIFY_SERIALS = [1, 2, 7, 8, 9, 16, 18, 39, 46]


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:120] or "product"


def is_product_start(line: str, next_line: str | None) -> int | None:
    stripped = line.strip()
    if not stripped:
        return None

    only_serial = re.match(r"^(\d{1,3})\s*$", stripped)
    if only_serial:
        serial = int(only_serial.group(1))
        if 1 <= serial <= MAX_SERIAL and next_line and re.match(r"[A-Za-z(]", next_line.strip()):
            return serial
        return None

    match = re.match(r"^(\d{1,3})\s+(.+)$", stripped)
    if not match:
        return None

    serial = int(match.group(1))
    name = match.group(2).strip()
    if not 1 <= serial <= MAX_SERIAL:
        return None
    if re.fullmatch(r"[\d.]+\s*(mg|mcg|gm|g|ml|iu|%|w/w|w/v|q\.s\.?)?", name, re.I):
        return None
    if UNIT_ONLY.match(name):
        return None
    if not re.match(r"[A-Za-z(]", name):
        return None
    return serial


def split_products(text: str) -> list[str]:
    text = text.split(SECTION_MARKER, 1)[-1]
    text = re.sub(r"(?is)S\.N\.?\s*GENERIC.*?REFERENCE\s*", "", text, count=1)
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
    for pattern, replacement in FORMULATION_FIXES:
        if pattern.pattern == r"\s+":
            formulation = pattern.sub(replacement, formulation)
        else:
            formulation = pattern.sub(replacement, formulation)
    formulation = re.sub(r"\s+", " ", formulation).strip(" ,")

    composition = "\n".join(composition_lines).strip()
    composition = re.sub(r"Composition\s*:\s*-?\s*", "", composition, flags=re.I)
    composition = re.sub(r"contains:\s*-\s*", "contains\n", composition, flags=re.I)
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
    body_lines = [first_tail, *lines[1:]] if first_tail else lines[1:]

    formulation, composition = parse_formulation_and_composition([str(serial), *body_lines])
    if not formulation:
        return None

    return {
        "serialNo": serial,
        "formulation": formulation,
        "composition": composition,
        "slug": slugify(f"{serial}-{formulation}"),
    }


def parse_products(text: str) -> list[dict]:
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
    if not TEXT_PATH.exists():
        raise FileNotFoundError(f"Missing {TEXT_PATH}. Paste ointment text there first.")

    text = TEXT_PATH.read_text(encoding="utf-8")
    products = parse_products(text)

    if len(products) != MAX_SERIAL:
        missing = [i for i in range(1, MAX_SERIAL + 1) if i not in {p["serialNo"] for p in products}]
        raise ValueError(f"Expected {MAX_SERIAL} ointments, got {len(products)}. Missing: {missing}")

    catalog = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    for category in catalog["categories"]:
        if category["slug"] == CATEGORY_SLUG:
            category["products"] = products
            category["productCount"] = len(products)
            break
    else:
        raise ValueError(f"{CATEGORY_SLUG} category not found")

    catalog["extractedAt"] = datetime.now().isoformat(timespec="seconds")
    catalog["ointmentsSource"] = "clean-text-import"
    catalog["totalProducts"] = sum(c["productCount"] for c in catalog["categories"])

    JSON_PATH.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Imported {len(products)} ointments into {JSON_PATH}")
    for serial in VERIFY_SERIALS:
        product = next(item for item in products if item["serialNo"] == serial)
        print(f"  S.N.{serial}: {product['formulation'][:75]}")


if __name__ == "__main__":
    main()
