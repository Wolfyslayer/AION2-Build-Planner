import {describe,it,expect} from "vitest";
import {skillPointsForRank,stigmaShardsForRank,sanitizeSkillState} from "../lib/skillWorkspace";
describe("unverified skill progression",()=>{it("does not invent costs",()=>{expect(skillPointsForRank(10)).toBeNull();expect(stigmaShardsForRank(6)).toBeNull()});it("discards legacy allocations",()=>{expect(sanitizeSkillState({ranks:{old:5},equipped:["old"]},[],"chanter",35)).toEqual({ranks:{},equipped:[]})})});
