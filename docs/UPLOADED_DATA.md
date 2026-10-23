# User-uploaded reference data — 2026-10-23

Original uploaded JSON is preserved as normalized JSON in `data/imported/`:
- `classes_skills.json`: 8 class profiles, partial active skill entries, some specialty milestones.
- `daevanion_boards.json`: 5 board definitions. Only Nezekan contains nodes (3); other boards have empty arrays.
- `game_config.json`: game mechanics and skill point costs.

## Version discrepancy
`game_config.json` declares **2.0.32-Global**, while the earlier owner-supplied catalog in PR #10 declares **0.0.4387.0-Global**. These are retained as distinct labels. No equivalence or chronological order is assumed.

## Data boundaries
This dataset is user-provided and unverified. Partial active skill lists must not be treated as complete catalogs. The `cost` fields on active skills describe MP resource costs, **not** skill-point upgrade costs. Board node `connects_to` is directional as provided; the application must not assume reciprocal edges. The Nezekan skill-cap node targets Gladiator's `glad_overhead_slam` and is not class-neutral.

These source files are not yet loaded into the interactive planner. Integration should preserve provenance, version and separate currencies. Do not silently overwrite earlier Sorcerer skill IDs (`sorc_hellfire` vs `sorc_hellfire_01`).

## Known incomplete edge
Nezekan node `nz_0_0` links to `nz_1_0`, which is absent from the uploaded nodes array. This unresolved reference is preserved intentionally and should be rendered as unavailable until authoritative node data is supplied.
