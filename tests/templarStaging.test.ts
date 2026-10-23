import {describe,it,expect} from "vitest";
import templar from "../data/metaroad-public/templar-full-index-staging.json";

describe("MetaRoad Templar staging integrity",()=>{
 it("remains staging-only until complete",()=>{expect(templar.status).toBe("staging-not-runtime")});
 it("keeps distinct names and nonzero variant counts",()=>{
  expect(new Set(templar.skills.map(s=>s.name)).size).toBe(templar.skills.length);
  expect(templar.skills.every(s=>Number.isInteger(s.variantCount)&&s.variantCount>0)).toBe(true);
 });
 it("tracks the unresolved MetaRoad page count discrepancy",()=>{
  expect(templar.extractedSkillCount).toBe(templar.skills.length);
  expect(templar.databaseReportedSkillCount-templar.skills.length).toBe(templar.unresolvedDiscrepancy.missingSkillCount);
  expect(templar.databaseReportedVariantCount-templar.skills.reduce((n,s)=>n+s.variantCount,0)).toBe(templar.unresolvedDiscrepancy.missingVariantCount);
 });
});
