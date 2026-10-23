export type StagedSkill={name:string;variantCount:number};
export type StagedClassIndex={status:string;databaseReportedSkillCount:number;databaseReportedVariantCount:number;skills:StagedSkill[]};
export type CompletenessAudit={complete:boolean;listedSkills:number;listedVariants:number;missingSkills:number;missingVariants:number;reasons:string[]};
export function auditStagedClass(index:StagedClassIndex):CompletenessAudit{
 const names=index.skills.map(s=>s.name.trim());
 const listedVariants=index.skills.reduce((sum,s)=>sum+s.variantCount,0);
 const missingSkills=index.databaseReportedSkillCount-index.skills.length;
 const missingVariants=index.databaseReportedVariantCount-listedVariants;
 const reasons:string[]=[];
 if(index.status!=="verified-complete")reasons.push("Class index is not marked verified-complete");
 if(new Set(names).size!==names.length||names.some(n=>!n))reasons.push("Duplicate or empty skill names");
 if(index.skills.some(s=>!Number.isInteger(s.variantCount)||s.variantCount<=0))reasons.push("Invalid variant counts");
 if(missingSkills!==0)reasons.push("Skill count differs from database header");
 if(missingVariants!==0)reasons.push("Variant count differs from database header");
 return {complete:reasons.length===0,listedSkills:index.skills.length,listedVariants,missingSkills,missingVariants,reasons};
}
