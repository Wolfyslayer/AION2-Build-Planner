# Aion2Builds skills database review — 2026-10-23

Source: https://aion2builds.com/database/skills/
Class detail example: https://aion2builds.com/classes/sorcerer/skills/

## Published scope
The site states it covers Global patch 2026-10-20, 8 classes, 176 non-Stigma skills, and 104 Stigmas. It describes an observational sample of 1,600 characters (top 200 by combat power per class), with columns for unlock level, Used by and Avg skill level. These are **site-reported** statistics, not independently audited game data.

## Specific discrepancies against our user-provided JSON
| Class / skill | Uploaded data | Aion2Builds |
|---|---|---|
| Gladiator / Overhead Slam | Active level 1 | Active level 4 |
| Gladiator / Rage Burst | Active level 3 | Stigma level 22 |
| Sorcerer / Hellfire | Active level 1 | Active level 14 |
| Sorcerer / Grace of Enhancement | Passive level 1 | Passive level 21 |
| Chanter / Undefeated Mantra | Active level 1 | Stigma level 22 |

These are disagreements, not automatically corrected records. Client version, localization and data quality need verification. Never silently merge skill IDs across sources.

## Product implications
- Store source URL, region, patch, retrieval date, and verification state for each claim.
- Separate skill classifications from usage statistics; popularity is not a quality score.
- Treat the dataset as an external reference, not a licensed local catalog. Do not bulk mirror/copy without rights review.
- A useful next feature is a conflict report and source badges in Skill Workspace, then a permission-cleared import pipeline.
