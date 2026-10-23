import index from "../data/metaroad-public/templar-full-index-staging.json";
import base from "../data/metaroad-public/templar-skill-facts.json";
import batch01 from "../data/metaroad-public/templar-detail-batch-01.json";
import batch02 from "../data/metaroad-public/templar-detail-batch-02.json";
import batch03 from "../data/metaroad-public/templar-detail-batch-03.json";
import batch04 from "../data/metaroad-public/templar-detail-batch-04.json";
import batch05 from "../data/metaroad-public/templar-detail-batch-05.json";
import batch06 from "../data/metaroad-public/templar-detail-batch-06.json";
import batch07 from "../data/metaroad-public/templar-detail-batch-07.json";
const supplementalSkills=[...batch06.skills,...batch07.skills];
const sources=[base,batch01,batch02,batch03,batch04,batch05] as const;
const indexed=new Map(index.skills.map(s=>[s.name,s]));
const seen=new Set<string>();
const duplicates:string[]=[];
const unexpected:string[]=[];
const withoutSummary:string[]=[];
const mismatchedVariants:string[]=[];
for(const source of sources){
 for(const skill of source.skills){
  if(seen.has(skill.name))duplicates.push(skill.name);
  seen.add(skill.name);
  const entry=indexed.get(skill.name);
  if(!entry)unexpected.push(skill.name);
  if("summary" in skill && skill.summary===null)withoutSummary.push(skill.name);
  if("variantCount" in skill && entry && skill.variantCount!==entry.variantCount)mismatchedVariants.push(skill.name);
 }
}
const supplementalMissingBase=supplementalSkills.filter(s=>!seen.has(s.name)).map(s=>s.name);
const supplementalVariantMismatches=supplementalSkills.filter(s=>indexed.get(s.name)?.variantCount!==s.variantCount).map(s=>s.name);
export const templarStagingAudit={supplementalRecords:supplementalSkills.length,supplementalMissingBase,supplementalVariantMismatches,indexed:index.skills.length,covered:seen.size,missingIndexDetails:index.skills.filter(s=>!seen.has(s.name)).map(s=>s.name),duplicates,unexpected,withoutSummary,mismatchedVariants,headerMissingSkills:index.databaseReportedSkillCount-index.skills.length,headerMissingVariants:index.databaseReportedVariantCount-index.skills.reduce((n,s)=>n+s.variantCount,0),publishable:false as const};
