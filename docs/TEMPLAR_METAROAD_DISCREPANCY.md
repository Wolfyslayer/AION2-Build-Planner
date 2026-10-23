# Templar MetaRoad source discrepancy (2026-10-23)

Source: https://metaroad.gg/aion2/database/skills/templar (MetaRoad database only).

## Independently checked
- The public page header says **47 skills across 498 variants**.
- Its visible, named skill headings enumerated in `templar-full-index-staging.json` total **46 entries across 492 variants**.
- The unresolved difference is **one skill and six variants**. This is an arithmetic difference, **not evidence that the missing entry is necessarily a six-variant skill**; the header and visible rows could disagree for other reasons.
- All 46 indexed names now have a staging base record across `templar-skill-facts.json` and `templar-detail-batch-01.json` through `templar-detail-batch-05.json`.
- The MetaRoad public page describes these as client-derived skills, but its public summaries do not supply full internals for all 498 variants. A header count alone cannot verify individual variants.

## Publication decision
**Blocked.** Do not invent a 47th skill, add a placeholder as a real skill, infer missing variant values, or mark any unverified variants complete.

## Required follow-up
1. Recheck the MetaRoad page's full client-rendered skill list, including hidden/filtered or dynamically loaded entries, against the indexed names.
2. Check whether the header total includes an entry that is not rendered, or reflects a different dataset/version. Record the exact MetaRoad evidence and date before changing counts.
3. For each skill, capture verifiable per-variant effects, ranks, specialization unlocks and source provenance; leave unavailable values null.
4. Verify Stigmas, Daevanion, gear and Arcana separately before any class-wide completeness claim.

No third-party database values are imported in this report.
