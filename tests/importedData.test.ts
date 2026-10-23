import {describe,it,expect} from "vitest";
import skills from "../data/imported/classes_skills.json";
import boards from "../data/imported/daevanion_boards.json";
import config from "../data/imported/game_config.json";
describe("uploaded reference datasets",()=>{
 it("includes eight distinct classes",()=>{expect(skills.classes).toHaveLength(8);expect(new Set(skills.classes.map(c=>c.id)).size).toBe(8)});
 it("has unique skill IDs and sensible unlock levels",()=>{const all=skills.classes.flatMap(c=>c.active_skills);expect(new Set(all.map(s=>s.id)).size).toBe(all.length);expect(all.every(s=>s.unlock_level>=1&&s.unlock_level<=config.system_mechanics.max_level)).toBe(true)});
 it("preserves five boards and validates references",()=>{expect(boards.boards).toHaveLength(5);for(const b of boards.boards){const ids=new Set(b.nodes.map(n=>n.id));expect(ids.size).toBe(b.nodes.length);for(const n of b.nodes)for(const id of n.connects_to)expect(ids.has(id)).toBe(true)}});
 it("has four Stigma unlock levels",()=>expect(config.system_mechanics.stigma_unlock_levels).toEqual([22,27,32,37]));
 it("keeps exact source version without conflating client builds",()=>expect(config.client_version).toBe("2.0.32-Global"));
 it("checks base skill upgrade costs",()=>expect(config.skill_progression_costs.reduce((sum,x)=>sum+x.skill_points,0)).toBe(21));
});
