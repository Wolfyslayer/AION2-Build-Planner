import {describe,it,expect} from "vitest";
import {initialBuild,sanitize,changeRank,toggleStigma,changeClass,allocated,skills,buildExport} from "../lib/unifiedWorkspace";
describe("MetaRoad-only workspace",()=>{
 it("preserves versioned build through JSON export",()=>{const b=initialBuild();expect(sanitize(JSON.parse(buildExport(b)))).toEqual(b)});
 it("rejects unknown class and invalid ranks",()=>{const b=sanitize({...initialBuild(),classId:"invalid",ranks:{"unknown":100}});expect(b.classId).toBe("chanter");expect(b.ranks).toEqual({})});
 it("lists database entries but prevents editing unverified ranks",()=>{const b=sanitize({...initialBuild(),classId:"chanter",level:45});const skill=skills.find(s=>s.classId==="chanter"&&s.name==="Onslaught");expect(skill).toBeDefined();expect(changeRank(b,skill!.id,1)).toEqual(b)});
 it("clears old-class selections on class switch",()=>{const b=changeClass({...initialBuild(),ranks:{"fake":5},stigma:["fake"]},"ranger");expect(b.ranks).toEqual({});expect(b.stigma).toEqual([])});
 it("rejects old-source stigma IDs",()=>{const b=sanitize({...initialBuild(),classId:"sorcerer",level:21});expect(toggleStigma(b,"sorc_stigma_ice_sheet").stigma).toEqual([])});
 it("does not count points for invalid selections",()=>{expect(allocated(sanitize({...initialBuild(),ranks:{"fake":999}}))).toEqual({skillPoints:0,stigmaShards:0})});
});
