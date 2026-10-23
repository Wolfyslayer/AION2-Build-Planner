# Shugo.GG source evaluation (2026-10-23)

Source: https://shugo.gg/database and https://shugo.gg/skills

## What the site publicly describes
- Nine classes, including Brawler (our planner currently supports eight).
- Skills database: learn level, MP cost, cooldown, cast time, range, effects, specialties and a planner.
- Other sections: items, equipment, Arcana, dungeons, quests, monsters, crafting, maps and titles.
- Character profile and Daevanion board viewer features are described in its changelog.

## Conflicts to investigate
The Shugo.GG Gladiator page lists Rending Blow as a level-1 active skill and Rage Burst as a level-22 specialty skill. Our uploaded classes_skills.json lists Rending Blow at level 8 and Rage Burst as an active skill at level 3. Do not silently overwrite either source: confirm client build/region and original data before reconciliation.

## Rights and integration limits
Shugo.GG FAQ (https://shugo.gg/faq) states there is **no public API**, and that game data belongs to NCSOFT. Do not scrape, bulk copy, mirror, or bundle Shugo's catalog into this repository without permission and rights review. Linking to pages and recording independently verified discrepancies is permitted for this research workflow.

## Follow-up
1. Link users to Shugo skills pages as external references.
2. Validate region/patch compatibility and classify Specialty vs Stigma carefully.
3. Request a licensed/exportable data source before implementing complete nine-class skill data.
4. Keep user-provided data labeled unverified until reconciled.
