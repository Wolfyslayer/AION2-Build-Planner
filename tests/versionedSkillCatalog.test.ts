import {describe,it,expect} from "vitest";
import {findPreferredSkill,preferredSkillView,catalogSkills} from "../data/versionedSkillCatalog";
describe("MetaRoad-only skill catalog",()=>{
 it("contains imported database skills",()=>{expect(findPreferredSkill("chanter","Onslaught")).toMatchObject({source:"metaroad-database",status:"preferred-reference"});expect(findPreferredSkill("gladiator","Overhead Slam")).toBeDefined()});
 it("keeps imported catalog stable",()=>{expect(preferredSkillView()).toEqual(catalogSkills);expect(catalogSkills.every(s=>s.source==="metaroad-database")).toBe(true)});
 it("does not retain previous source-only skills",()=>{expect(findPreferredSkill("sorcerer","Hellfire")).toBeUndefined();expect(findPreferredSkill("ranger","Deadshot")).toBeUndefined()});
});
