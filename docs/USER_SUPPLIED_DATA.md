# AION 2 Global 0.0.4387.0 — user-provided data

Data source: supplied directly by the project owner on 2026-10-23; **not independently verified**. No Metaroad content has been scraped.

`data/aion2-global-04387.json` stores eight class profiles, level 1–10 skill-point costs, Stigma shard bands for levels 1–20, and three Sorcerer skills with supplied specialization options.

`data/suppliedGame.ts` validates and exposes the data for future UI integration. It deliberately does **not** convert it to the existing planner's skill ranks: level 11–40 upgrade costs, prerequisites, and full skill catalogs are unknown. The 16-level specialty has a null slot index as supplied. The data must not be labeled verified or official.

Future UI should show skill information as a clearly marked preview and should only allow spending points for ranks with explicitly known costs and unlock rules. Keep Stigma Shards separate from regular skill points.
