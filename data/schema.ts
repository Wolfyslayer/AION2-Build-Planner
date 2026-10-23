import {z} from "zod";
export const rankSchema=z.object({rank:z.number().int().positive(),cost:z.number().int().nonnegative(),requiredLevel:z.number().int().positive()});
export const skillSchema=z.object({id:z.string().min(1),classId:z.string().min(1),name:z.string().min(1),description:z.string(),ranks:z.array(rankSchema),requires:z.array(z.object({skillId:z.string().min(1),rank:z.number().int().positive()})).optional()});
export const catalogSchema=z.object({version:z.string().min(1),region:z.string().min(1),source:z.string().url(),verifiedAt:z.string().datetime(),skills:z.array(skillSchema)});
export type Catalog=z.infer<typeof catalogSchema>;
export function verifyCatalog(input:unknown):Catalog{
 const catalog=catalogSchema.parse(input);
 const ids=new Set<string>();
 for(const skill of catalog.skills){
  if(ids.has(skill.id))throw new Error("Duplicate skill ID: "+skill.id);
  ids.add(skill.id);
  for(let i=0;i<skill.ranks.length;i++){
   if(skill.ranks[i].rank!==i+1)throw new Error("Ranks must be consecutive: "+skill.id);
  }
 }
 for(const skill of catalog.skills)for(const req of skill.requires??[]){
  const target=catalog.skills.find(s=>s.id===req.skillId);
  if(!target||target.classId!==skill.classId||req.rank>target.ranks.length)throw new Error("Invalid prerequisite: "+skill.id);
 }
 return catalog;
}
