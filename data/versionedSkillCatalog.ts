import {publicSkillFacts} from "./publicSkillFacts";
export type SourceKind="metaroad-database";
export type CatalogSkill={id:string;classId:string;name:string;type:"Active"|"Passive"|"Stigma";unlockLevel:number;description:string;source:SourceKind;patch:string;status:"preferred-reference"|"legacy-unverified";legacyId?:string};
export const catalogSkills:CatalogSkill[]=publicSkillFacts.map(f=>({id:"metaroad:"+f.classId+":"+f.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),classId:f.classId,name:f.name,type:"Active",unlockLevel:1,description:"Imported database fact; type and unlock level not verified for editing.",source:"metaroad-database",patch:"database",status:"preferred-reference"}));
export function preferredSkillView(){return catalogSkills}
export function findPreferredSkill(classId:string,name:string){return catalogSkills.find(s=>s.classId===classId&&s.name.toLowerCase()===name.toLowerCase())}
