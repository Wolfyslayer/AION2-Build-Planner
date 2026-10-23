import {describe,it,expect} from "vitest";
import {verifyCatalog} from "../data/schema";
const base={version:"test",region:"test",source:"https://example.com",verifiedAt:"2026-10-23T00:00:00Z",skills:[{id:"a",classId:"Chanter",name:"Fixture",description:"Only for testing",ranks:[{rank:1,cost:1,requiredLevel:1}]}]};
describe("catalog validation",()=>{
 it("accepts valid catalog",()=>expect(verifyCatalog(base).skills).toHaveLength(1));
 it("rejects duplicate IDs",()=>expect(()=>verifyCatalog({...base,skills:[...base.skills,...base.skills]})).toThrow("Duplicate"));
 it("rejects missing prerequisites",()=>expect(()=>verifyCatalog({...base,skills:[{...base.skills[0],requires:[{skillId:"missing",rank:1}]}]})).toThrow("Invalid prerequisite"));
});
