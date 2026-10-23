import {describe,it,expect} from "vitest";
import {templarStagingAudit as a} from "../lib/templarStagingAudit";
describe("Templar staging sources",()=>{
 it("covers each indexed skill exactly once",()=>{expect(a.indexed).toBe(46);expect(a.covered).toBe(46);expect(a.missingIndexDetails).toEqual([]);expect(a.duplicates).toEqual([]);expect(a.unexpected).toEqual([]);expect(a.mismatchedVariants).toEqual([])});
 it("does not confuse base coverage with completeness",()=>{expect(a.publishable).toBe(false);expect(a.headerMissingSkills).toBe(1);expect(a.headerMissingVariants).toBe(6)});
});
