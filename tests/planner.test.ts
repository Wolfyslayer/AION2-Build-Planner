import {describe,it,expect} from "vitest";
import {canUpgrade,spentPoints,validateBuild,type Build,type Skill} from "../lib/planner";
const skills:Skill[]=[{id:"test",classId:"Chanter",name:"Fixture",description:"Test only",ranks:[{rank:1,cost:2,requiredLevel:5},{rank:2,cost:3,requiredLevel:10}]}];
const build:Build={classId:"Chanter",level:8,skillPointBudget:5,selectedSkills:{}};
describe("planner",()=>{
it("calculates cumulative costs",()=>expect(spentPoints({...build,selectedSkills:{test:2}},skills)).toBe(5));
it("enforces level requirements",()=>expect(canUpgrade({...build,selectedSkills:{test:1}},skills[0],skills)).toBe(false));
it("enforces point budget",()=>expect(canUpgrade({...build,skillPointBudget:1},skills[0],skills)).toBe(false));
it("rejects overspending",()=>expect(validateBuild({...build,skillPointBudget:1,selectedSkills:{test:1}},skills)).toContain("Insufficient points"));
});