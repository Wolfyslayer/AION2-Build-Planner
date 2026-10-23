# AION 2 game data import contract

The public planner must never fabricate skill data. Each imported catalog needs a patch/version identifier, region, authoritative source URL, verification timestamp, stable skill IDs, ordered ranks and prerequisites.

## Import pipeline
1. Obtain source data under an appropriate license or permission.
2. Normalize skill IDs and class IDs.
3. Validate against data/schema.ts.
4. Compare changes against prior patch data and review before publishing.
5. Keep region and patch versions separate.

The default catalog is intentionally empty until verified data is available. Test fixtures are not real AION 2 data.
