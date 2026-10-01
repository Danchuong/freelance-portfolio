"""Sanity-check lead-workflow.json: valid JSON, connected nodes, no real secrets."""

import json
import re
import sys
from pathlib import Path

WORKFLOW = Path(__file__).parent / "lead-workflow.json"
SECRET_PATTERNS = (r"sk-[A-Za-z0-9]{20,}", r"\d{8,10}:[A-Za-z0-9_-]{35}")


def validate(path: Path) -> list[str]:
    raw = path.read_text(encoding="utf-8")
    wf = json.loads(raw)
    names = {n["name"] for n in wf["nodes"]}
    errors = ["duplicate node names"] if len(names) != len(wf["nodes"]) else []
    for src, conn in wf["connections"].items():
        targets = [c["node"] for branch in conn["main"] for c in branch]
        errors += [f"unknown node in connections: {n}" for n in [src, *targets] if n not in names]
    linked = set(wf["connections"]) | {c["node"] for v in wf["connections"].values() for b in v["main"] for c in b}
    errors += [f"orphan node: {n}" for n in names - linked]
    errors += [f"possible secret matching {p}" for p in SECRET_PATTERNS if re.search(p, raw)]
    return errors


if __name__ == "__main__":
    problems = validate(WORKFLOW)
    for p in problems:
        print("ERROR:", p)
    print("OK" if not problems else f"{len(problems)} problem(s)")
    sys.exit(1 if problems else 0)
