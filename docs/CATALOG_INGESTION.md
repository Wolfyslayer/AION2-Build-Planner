# Independent game-data catalog: import and review contract

## Goal
Use publicly documented AION 2 game facts, with MetaRoad as a reference for the Global client. Do not copy MetaRoad's proprietary site code, design, full database dump, or unlicensed images. Reuse of a substantial extraction or protected game art requires appropriate rights or permission.

## Storage
The Supabase SQL migration creates source snapshots and normalized game entities with JSONB attributes. Entity IDs are **game IDs**, not MetaRoad page IDs. Every row is tied to a source snapshot, region, version, review status, and icon path. The public can read only reviewed snapshots and verified entities; writes are server-side only.

## Static GitHub Pages
The planner must keep working without a backend: build a reviewed, versioned JSON snapshot into the Next.js static bundle. Supabase is an optional sync and saved-builds backend, not a runtime prerequisite for browsing the public catalog. Never put a service-role key in Next.js client code, GitHub Pages, or the repository.

## Intake workflow
1. Confirm public access, source attribution, version, and reuse permission for any bulk data/images.
2. Capture **only supported factual fields** into the snapshot schema, preserving original game IDs, patch and region. Keep source URLs.
3. Validate duplicate IDs, class references, specialization rank requirements, node coordinates and node edges.
4. Independently check a representative sample against the current Global client and record mismatches.
5. Review before setting snapshot status to reviewed and entity verified=true.
6. Export a static snapshot for Pages and optionally upsert into Supabase through a private import job.

## Current limitations
The repository's supplied skills and boards are partial and unverified. This migration does **not** claim to import MetaRoad's full dataset. In particular, most Daevanion boards and many icons are still missing. Do not fabricate them or replace them with arbitrary images. An icon may only be published if its origin and permission are documented.

## Next import targets
1. Classes and factual skill definitions including type, unlock, ranks, specialization slots, and effect values.
2. Board grids, node coordinates, costs, adjacency and node effects.
3. Items, equipment slots, stats and set bonuses.
4. Collectibles and build sharing.

MetaRoad references:
- https://metaroad.gg/aion2/database
- https://metaroad.gg/aion2/planner
- https://metaroad.gg/aion2/news/aion-2-global-client-datamine-what-the-launch-build-contains
