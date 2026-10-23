import {describe,it,expect} from "vitest";
import {suppliedGame,skillCost,stigmaShardCost,suppliedGameSchema,unlockedStigmaSlots} from "../data/suppliedGame";
describe("supplied AION 2 Global data",()=>{
 it("contains eight classes and three supplied skills",()=>{expect(suppliedGame.classes).toHaveLength(8);expect(suppliedGame.skills).toHaveLength(3)});
 it("preserves supplied costs without extrapolation",()=>{expect(skillCost(10)).toBe(4);expect(skillCost(11)).toBeUndefined();expect(stigmaShardCost(20)).toBe(8);expect(stigmaShardCost(21)).toBeUndefined()});
 it("keeps specializations and nullable slot index",()=>expect(suppliedGame.skills[0].specialty_slots?.level_16_unlock.slot_index).toBeNull());
 it("uses four staggered Stigma unlocks",()=>{expect([21,22,27,32,37,45].map(unlockedStigmaSlots)).toEqual([0,1,2,3,4,4])});
 it("records max character level and total base cost",()=>{expect(suppliedGame.max_character_level).toBe(45);expect(suppliedGame.skill_point_progression.total_points_to_max_base).toBe(21)});
 it("rejects unknown skill class",()=>expect(()=>suppliedGameSchema.parse({...suppliedGame,skills:[{...suppliedGame.skills[0],class_id:"fake"}]})).toThrow());
});
