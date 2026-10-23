# Progression engine

The planner's pure function `planProgression(start, target, skills, priority)` returns an ordered list of upgrades, consumed and remaining skill points, errors, and blocked target skills.

- It respects rank ordering, class, required level, budget and declared prerequisites.
- It iterates until no further upgrade is possible, so a requested dependent skill may be placed after its prerequisite.
- It does **not** know the best build, award skill points automatically, or predict game-specific priorities.
- Priority is a caller-supplied ordering, not an optimization claim.
- It requires verified skill data before use with real AION 2 builds.
- Tests use synthetic fixtures only.

Future phases should support level-by-level point acquisition, rank-specific prerequisites, Stigma and Daevanion trees and patch-versioned import.
