import {describe,it,expect} from "vitest";
import {findPublicSkillFact,publicSkillFacts,skillFactSummary,specializationSlotUnlockLevels,skillRankCaps} from "../data/publicSkillFacts";
describe("imported public game facts",()=>{
 it("provides Chanter and Gladiator sourced records",()=>{expect(publicSkillFacts.length).toBeGreaterThanOrEqual(27);expect(findPublicSkillFact("chanter","Onslaught")?.sourceUrl).toContain("metaroad.gg");expect(findPublicSkillFact("gladiator","Overhead Slam")?.cooldownSeconds).toBe(5)});
 it("keeps missing values unknown instead of inventing zero",()=>{expect(findPublicSkillFact("chanter","Onslaught")?.cooldownSeconds).toBeNull()});
 it("does not cross-match other classes",()=>{expect(findPublicSkillFact("templar","Onslaught")).toBeUndefined()});
 it("formats sourced coefficients",()=>{expect(skillFactSummary(findPublicSkillFact("chanter","Onslaught")!)).toContain("84.21% ATK")});
 it("exposes the reference specialization unlock thresholds",()=>{expect(specializationSlotUnlockLevels).toEqual([8,8,8,12,16])});
 it("caps skill ranks at 10 base and 14 with boards",()=>{expect(skillRankCaps).toEqual({base:10,withBoards:14})});
});
