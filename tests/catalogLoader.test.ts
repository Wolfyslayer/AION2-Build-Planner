import {describe,it,expect} from "vitest";
import {selectCatalog,parseVerifiedCatalog} from "../data/catalogLoader";
const entry={id:"fixture",region:"test",patch:"fixture",path:"fixture.json",source:"https://example.com"};
const index={schemaVersion:1 as const,catalogs:[entry]};
describe("catalog loader",()=>{
it("selects exact region and patch",()=>expect(selectCatalog(index,"test","fixture")).toEqual(entry));
it("does not silently fall back to another patch",()=>expect(selectCatalog(index,"test","different")).toBeUndefined());
it("rejects mismatched metadata",()=>expect(()=>parseVerifiedCatalog({version:"wrong",region:"test",source:"https://example.com",verifiedAt:"2026-10-23T00:00:00Z",skills:[]},entry)).toThrow("Catalog metadata mismatch"));
});
