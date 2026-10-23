# Data source precedence — AION 2 Global

Decision (user, 2026-10-23): **Aion2Builds is the preferred reference** for current AION 2 Global data.
Primary reference: https://aion2builds.com/database/skills/
Site-reported patch: 2026-10-20 Global.

## Application rules
1. When a directly documented Aion2Builds value conflicts with the older user-supplied datasets, prefer the Aion2Builds value **after it has been recorded and validated for that specific field**.
2. Preserve older values and their provenance for comparison; do not present them as equally authoritative for the current Global patch.
3. Other sources (Shugo.GG, Fextralife) are supplemental. Where Aion2Builds has no value, display missing/unverified rather than inventing a value.
4. Source precedence is a user-selected product policy, not independent proof that every site record is accurate.
5. Do not bulk copy or redistribute a third-party database without appropriate permission. Until a permission-cleared dataset exists, link to the source and keep legacy planner data explicitly labeled.
6. Do not automatically change ranks, saved builds, skill IDs or costs based solely on five discrepancy notes. A versioned migration and compatibility tests are required.

## Next implementation
Introduce a versioned, field-level catalog with source and patch metadata, followed by deliberate migration of the Skill Workspace and build saves.
