import {suppliedGame} from "./suppliedGame";
import imported from "./imported/classes_skills.json";
import {skillConflicts} from "./skillConflicts";
export type SourceKind="aion2builds"|"legacy-user-supplied";
export type CatalogSkill={id:string;classId:string;name:string;type:"Active"|"Passive"|"Stigma";unlockLevel:number;description:string;source:SourceKind;patch:string;status:"preferred-reference"|"legacy-unverified";legacyId?:string};
const overrides=new Map(skillConflicts.map(c=>[c.classId+":"+c.skill.toLowerCase(),c.claims.find(v=>v.source==="Aion2Builds")]));
const patch="Global 2026-10-20";
export const catalogSkills:CatalogSkill[]=[
 ...suppliedGame.skills.map(s=>({id:s.skill_id,classId:s.class_id,name:s.name,type:s.type,unlockLevel:s.unlock_level,description:s.description,source:"legacy-user-supplied" as const,patch:suppliedGame.client_build,status:"legacy-unverified" as const})),
 ...imported.classes.flatMap(c=>c.active_skills.filter(s=>!suppliedGame.skills.some(x=>x.class_id===c.id&&x.name.toLowerCase()===s.name.toLowerCase())).map(s=>({id:s.id,classId:c.id,name:s.name,type:"Active" as const,unlockLevel:s.unlock_level,description:s.description,source:"legacy-user-supplied" as const,patch:"2.0.32-Global",status:"legacy-unverified" as const})))
];
export function preferredSkillView():CatalogSkill[]{
 return catalogSkills.map(s=>{const claim=overrides.get(s.classId+":"+s.name.toLowerCase());if(!claim||!claim.classification||claim.unlockLevel===undefined)return s;
 return {...s,type:claim.classification as CatalogSkill["type"],unlockLevel:claim.unlockLevel,source:"aion2builds" as const,patch,status:"preferred-reference" as const,legacyId:s.id};
 });
}
export function findPreferredSkill(classId:string,name:string){return preferredSkillView().find(s=>s.classId===classId&&s.name.toLowerCase()===name.toLowerCase())}
