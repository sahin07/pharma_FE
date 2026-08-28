import json
from pathlib import Path

data = json.loads(Path("lib/approval-products.json").read_text(encoding="utf-8"))
for cat in data["categories"]:
    prods = cat["products"]
    print("===", cat["name"], len(prods), "===")
    for x in prods[:3]:
        print(f"  {x['serialNo']:>3} | {x['formulation'][:75]}")
    print("  ...")
    for x in prods[-2:]:
        print(f"  {x['serialNo']:>3} | {x['formulation'][:75]}")
    nums = sorted(p["serialNo"] for p in prods)
    missing = [n for n in range(nums[0], nums[-1] + 1) if n not in set(nums)]
    print("  serial range", nums[0], "-", nums[-1], "missing", len(missing))
    if missing[:15]:
        print("  first missing:", missing[:15])
    bad = [p for p in prods if len(p["formulation"]) < 12 or p["formulation"].lower().startswith("mg")]
    print("  suspicious", len(bad))
    if bad[:3]:
        for b in bad[:3]:
            print("   ", b["serialNo"], b["formulation"][:60])
    print()
