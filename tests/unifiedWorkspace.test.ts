import {describe,it,expect} from "vitest";
import {initialBuild,sanitize,changeRank,toggleStigma,changeClass,allocated,skills,buildExport} from "../lib/unifiedWorkspace";
describe("unified build workspace",()=>{
 it("preserves versioned build through JSON export",()=>{const b=initialBuild();expect(sanitize(JSON.parse(buildExport(b)))).toEqual(b)});
 it("rejects unknown class and invalid ranks",()=>{const b=sanitize({...initialBuild(),classId:"invalid",ranks:{"unknown":100}});expect(b.classId).toBe("chanter");expect(b.ranks).toEqual({})});
 it("does not allow ranking unverified preferred corrections",()=>{const b=sanitize({...initialBuild(),classId:"sorcerer",level:45});const hellfire=skills.find(s=>s.classId==="sorcerer"&&s.name==="Hellfire");expect(hellfire).toBeDefined();expect(changeRank(b,hellfire!.id,1)).toEqual(b)});
 it("clears old-class selections on class switch",()=>{const b=changeClass({...initialBuild(),ranks:{"fake":5},stigma:["fake"]},"ranger");expect(b.ranks).toEqual({});expect(b.stigma).toEqual([])});
 it("prevents locked Stigma equip and clamps slots",()=>{const b=sanitize({...initialBuild(),classId:"sorcerer",level:21});expect(toggleStigma(b,"sorc_stigma_ice_sheet").stigma).toEqual([])});
 it("does not count points for invalid selections",()=>{expect(allocated(sanitize({...initialBuild(),ranks:{"fake":999}}))).toEqual({skillPoints:0,stigmaShards:0})});
});
