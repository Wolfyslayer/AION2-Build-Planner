import {describe,it,expect} from "vitest";
import templar from "../data/metaroad-public/templar-full-index-staging.json";
import {auditStagedClass} from "../lib/metaroadCompleteness";
describe("MetaRoad publication gate",()=>{
 it("blocks incomplete Templar data",()=>{const audit=auditStagedClass(templar);expect(audit.complete).toBe(false);expect(audit.missingSkills).toBe(1);expect(audit.missingVariants).toBe(6)});
 it("blocks even matching counts without verification",()=>{const audit=auditStagedClass({status:"staging-not-runtime",databaseReportedSkillCount:1,databaseReportedVariantCount:2,skills:[{name:"Skill",variantCount:2}]});expect(audit.complete).toBe(false)});
 it("rejects count-matched data with no variant evidence",()=>{const audit=auditStagedClass({status:"verified-complete",databaseReportedSkillCount:1,databaseReportedVariantCount:2,skills:[{name:"Skill",variantCount:2}]});expect(audit.complete).toBe(false);expect(audit.reasons).toContain("Not all individual variants have been verified")});
 it("rejects duplicate entries",()=>{const audit=auditStagedClass({status:"verified-complete",databaseReportedSkillCount:2,databaseReportedVariantCount:2,skills:[{name:"Skill",variantCount:1},{name:"Skill",variantCount:1}]});expect(audit.complete).toBe(false)});
});
