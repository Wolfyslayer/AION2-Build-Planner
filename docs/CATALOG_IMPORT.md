# Verified catalog workflow

A catalog must have a region, patch, original source URL, verification timestamp and stable skill IDs. Do not ship guesses.

## Workflow
1. Identify the current AION 2 region and patch.
2. Confirm a legally reusable source for class skill ranks, costs and prerequisites.
3. Normalize to the schema in `data/schema.ts` and validate.
4. Add an entry to `data/catalog-index.json`.
5. Add automated tests covering a representative class and patch.
6. Review the diff and publish the catalog.

## Migration policy
Saved builds should carry `region` and `patch`. A build from another patch should be marked outdated and offered a reviewed migration, never silently recalculated.

The index is intentionally empty until a verified, permitted source is available.
