import {describe,it,expect} from "vitest";
import {planProgression} from "../lib/progression";
import type {Build,Skill} from "../lib/planner";
const skills:Skill[]=[
{id:"a",classId:"Chanter",name:"A",description:"Fixture",ranks:[{rank:1,cost:2,requiredLevel:1}]},
{id:"b",classId:"Chanter",name:"B",description:"Fixture",ranks:[{rank:1,cost:3,requiredLevel:10}],requires:[{skillId:"a",rank:1}]}
];
const start:Build={classId:"Chanter",level:10,skillPointBudget:5,selectedSkills:{}};
describe("progression",()=>{
it("orders prerequisites before requested priority",()=>{
 const result=planProgression(start,{...start,selectedSkills:{a:1,b:1}},skills,["b","a"]);
 expect(result.steps.map(s=>s.skillId)).toEqual(["a","b"]);
 expect(result.remaining).toBe(0);
 expect(result.blocked).toEqual([]);
});
it("does not invent missing points",()=>{
 const result=planProgression({...start,skillPointBudget:2},{...start,skillPointBudget:2,selectedSkills:{a:1,b:1}},skills);
 expect(result.steps.map(s=>s.skillId)).toEqual(["a"]);
 expect(result.blocked).toContain("b");
});
it("rejects target that removes invested ranks",()=>{
 const result=planProgression({...start,selectedSkills:{a:1}},{...start,selectedSkills:{a:0}},skills);
 expect(result.errors).toContain("Target removes ranks: a");
});
it("rejects incompatible classes",()=>{
 const result=planProgression(start,{...start,classId:"Ranger"},skills);
 expect(result.errors).toContain("Class mismatch");
});
});
