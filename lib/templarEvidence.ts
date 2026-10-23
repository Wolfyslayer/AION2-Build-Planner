import index from "../data/metaroad-public/templar-full-index-staging.json";
import facts from "../data/metaroad-public/templar-skill-facts.json";
export type TemplarEvidenceRow={name:string;type:string;variantCount:number;detailPresent:boolean;specializationEntries:number;variantDetailsVerified:false};
const details=new Map(facts.skills.map(skill=>[skill.name,skill]));
export const templarEvidence:TemplarEvidenceRow[]=index.skills.map(skill=>({name:skill.name,type:skill.type,variantCount:skill.variantCount,detailPresent:details.has(skill.name),specializationEntries:details.get(skill.name)?.specializations.length??0,variantDetailsVerified:false}));
export const templarEvidenceSummary={indexed:templarEvidence.length,withPartialDetails:templarEvidence.filter(s=>s.detailPresent).length,withoutDetails:templarEvidence.filter(s=>!s.detailPresent).length,unmatchedDetailNames:facts.skills.filter(s=>!index.skills.some(x=>x.name===s.name)).map(s=>s.name),unresolvedSkillCount:index.databaseReportedSkillCount-index.skills.length,unresolvedVariantCount:index.databaseReportedVariantCount-index.skills.reduce((n,s)=>n+s.variantCount,0)};
