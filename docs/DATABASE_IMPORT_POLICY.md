# AION 2 database import policy

Canonical source: https://metaroad.gg/aion2/database and its database detail pages **only**.

Do not import from build guides, news posts, recommended builds or third-party planners. The repository's prior guide-derived Sorcerer and Cleric reference files have been removed.

## Import units
- Finish **one class at a time**, including all database-listed skills and their variants, passive skills, Stigmas, specializations, and Daevanion nodes.
- Independently import shared game datasets: equipment, sets, Arcana, cards, crafting, items, and other database categories.
- Stage incomplete imports separately; do not label a class complete until source count and IDs match and every skill is accounted for.
- Keep per-record source URLs, client/region, retrieval date, raw source ID when shown, and verification status.
- Preserve skill base ranks separately from bonuses from Daevanion, equipment and Arcana; never assume effective level cap 14.
- Preserve rank requirements displayed by the source (including 16 and 20); do not invent missing data.
- Do not scrape protected bulk datasets or redistribute third-party artwork/icons without appropriate permission. Prefer licensed exports or game-client data the project is authorized to use.

## Completeness gates
A class is complete only if: (1) source list count matches, (2) all skill IDs/names accounted for, (3) all published variants and specialization options represented, (4) all five boards checked node by node, (5) no guide-derived fields, (6) JSON/schema checks and review pass.

Existing partial class JSON is historical staging material, not a finished class import.
