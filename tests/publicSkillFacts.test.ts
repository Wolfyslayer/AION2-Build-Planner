import {describe,it,expect} from "vitest";
import {findPublicSkillFact,publicSkillFacts,skillFactSummary} from "../data/publicSkillFacts";
describe("imported public game facts",()=>{
 it("provides Chanter and Gladiator sourced records",()=>{expect(publicSkillFacts.length).toBeGreaterThanOrEqual(27);expect(findPublicSkillFact("chanter","Onslaught")?.sourceUrl).toContain("metaroad.gg");expect(findPublicSkillFact("gladiator","Overhead Slam")?.cooldownSeconds).toBe(5)});
 it("keeps missing values unknown instead of inventing zero",()=>{expect(findPublicSkillFact("chanter","Onslaught")?.cooldownSeconds).toBeNull()});
 it("does not cross-match other classes",()=>{expect(findPublicSkillFact("templar","Onslaught")).toBeUndefined()});
 it("formats sourced coefficients",()=>{expect(skillFactSummary(findPublicSkillFact("chanter","Onslaught")!)).toContain("84.21% ATK")});
});
