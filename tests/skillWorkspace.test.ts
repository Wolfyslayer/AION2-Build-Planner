import {describe,it,expect} from "vitest";
import {skillPointsForRank,stigmaShardsForRank,sanitizeSkillState} from "../lib/skillWorkspace";
import {suppliedGame} from "../data/suppliedGame";
describe("skill workspace",()=>{
 it("counts base skill points through rank 10",()=>{expect(skillPointsForRank(1)).toBe(0);expect(skillPointsForRank(10)).toBe(21);expect(skillPointsForRank(11)).toBeNull()});
 it("calculates Stigma shards separately",()=>{expect(stigmaShardsForRank(1)).toBe(0);expect(stigmaShardsForRank(6)).toBe(6)});
 it("does not equip Stigma before character level 22",()=>{expect(sanitizeSkillState({ranks:{},equipped:["sorc_stigma_ice_sheet"]},suppliedGame.skills,"sorcerer",21).equipped).toEqual([])});
 it("filters skills and equipped Stigma to current class",()=>{const state=sanitizeSkillState({ranks:{"sorc_hellfire_01":5},equipped:["sorc_stigma_ice_sheet"]},suppliedGame.skills,"chanter",45);expect(state.ranks).toEqual({});expect(state.equipped).toEqual([])});
});
