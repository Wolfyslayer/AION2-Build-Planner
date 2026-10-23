import {describe,it,expect} from "vitest";
import {suppliedGame,skillCost,stigmaShardCost,suppliedGameSchema} from "../data/suppliedGame";
describe("supplied AION 2 Global data",()=>{
 it("contains eight classes and three supplied skills",()=>{expect(suppliedGame.classes).toHaveLength(8);expect(suppliedGame.skills).toHaveLength(3)});
 it("preserves supplied costs without extrapolation",()=>{expect(skillCost(10)).toBe(4);expect(skillCost(11)).toBeUndefined();expect(stigmaShardCost(20)).toBe(8);expect(stigmaShardCost(21)).toBeUndefined()});
 it("keeps specializations and nullable slot index",()=>expect(suppliedGame.skills[0].specialty_slots?.level_16_unlock.slot_index).toBeNull());
 it("rejects unknown skill class",()=>expect(()=>suppliedGameSchema.parse({...suppliedGame,skills:[{...suppliedGame.skills[0],class_id:"fake"}]})).toThrow());
});
