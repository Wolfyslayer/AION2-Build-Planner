# Local skill catalog import

The Character Builder accepts a JSON file matching `data/schema.ts`. Files are limited to 2 MB, parsed and validated in the browser, and stored only in browser localStorage. Importing or removing a catalog resets selected skill ranks to avoid carrying incompatible allocations across patches.

**Important:** Schema validation checks structure and references, **not** whether game values are true. User-provided files are labeled as local and not independently verified. Never present them as an official AION 2 source.

The existing region/patch status panel tracks the curated index separately. It does not automatically approve or activate user-imported data.

To create a catalog, use the schema and the source-verification workflow in `docs/CATALOG_IMPORT.md`. No sample values should be presented as real game skills.
