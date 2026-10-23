import {preferredSkillView,type CatalogSkill} from "../data/versionedSkillCatalog";
import {suppliedGame,skillCost,stigmaShardCost,unlockedStigmaSlots} from "../data/suppliedGame";
export type WorkspaceBuild={schemaVersion:2;name:string;classId:string;level:number;ranks:Record<string,number>;stigma:string[];specializations:Record<string,string>;sourcePatch:string};
export const sourcePatch="Global 2026-10-20";
export const classIds=suppliedGame.classes.map(c=>c.id);
export const skills=preferredSkillView();
export function initialBuild():WorkspaceBuild{return {schemaVersion:2,name:"My AION 2 build",classId:"chanter",level:35,ranks:{},stigma:[],specializations:{},sourcePatch}}
export function skillFor(id:string){return skills.find(s=>s.id===id)}
export function editable(skill:CatalogSkill){return skill.status==="legacy-unverified"&&suppliedGame.skills.some(s=>s.skill_id===skill.id)}
export function maxRank(skill:CatalogSkill){const original=suppliedGame.skills.find(s=>s.skill_id===skill.id);return original?(skill.type==="Stigma"?20:10):1}
export function sanitize(input:unknown):WorkspaceBuild{
 const fallback=initialBuild();if(!input||typeof input!=="object")return fallback;
 const v=input as Partial<WorkspaceBuild>;const classId=classIds.includes(v.classId??"")?v.classId!:fallback.classId;
 const level=Number.isInteger(v.level)?Math.min(suppliedGame.max_character_level,Math.max(1,v.level!)):fallback.level;
 const available=skills.filter(s=>s.classId===classId&&s.unlockLevel<=level);
 const ranks:Record<string,number>={};
 if(v.ranks&&typeof v.ranks==="object"&&!Array.isArray(v.ranks))for(const [id,value] of Object.entries(v.ranks)){const skill=available.find(s=>s.id===id);if(skill&&editable(skill)&&Number.isInteger(value)&&value>=1)ranks[id]=Math.min(value,maxRank(skill))}
 const allowed=new Set(available.filter(s=>s.type==="Stigma"&&editable(s)).map(s=>s.id));
 const stigma=Array.isArray(v.stigma)?[...new Set(v.stigma.filter((id):id is string=>typeof id==="string"&&allowed.has(id)))].slice(0,unlockedStigmaSlots(level)):[];
 const specializations:Record<string,string>={};
 if(v.specializations&&typeof v.specializations==="object"&&!Array.isArray(v.specializations))for(const [key,value] of Object.entries(v.specializations)){const [id,rank]=key.split("@");const original=suppliedGame.skills.find(s=>s.skill_id===id&&s.class_id===classId);const options=original?.specialty_slots?.["level_"+rank]?.options??[];if(typeof value==="string"&&options.some(o=>o.id===value)&&((ranks[id]??1)>=Number(rank)))specializations[key]=value}
 return {schemaVersion:2,name:typeof v.name==="string"?v.name.slice(0,100):fallback.name,classId,level,ranks,stigma,specializations,sourcePatch:typeof v.sourcePatch==="string"?v.sourcePatch:sourcePatch};
}
export function allocated(build:WorkspaceBuild){let skillPoints=0,stigmaShards=0;for(const [id,rank] of Object.entries(build.ranks)){const s=skillFor(id);if(!s||!editable(s))continue;for(let n=2;n<=rank;n++){if(s.type==="Stigma")stigmaShards+=stigmaShardCost(n)??0;else skillPoints+=skillCost(n)??0}}return {skillPoints,stigmaShards}}
export function changeRank(build:WorkspaceBuild,id:string,delta:number):WorkspaceBuild{const skill=skillFor(id);if(!skill||skill.classId!==build.classId||!editable(skill)||build.level<skill.unlockLevel)return build;const old=build.ranks[id]??1;const next=Math.min(maxRank(skill),Math.max(1,old+delta));return sanitize({...build,ranks:{...build.ranks,[id]:next}})}
export function toggleStigma(build:WorkspaceBuild,id:string):WorkspaceBuild{const skill=skillFor(id);if(!skill||skill.classId!==build.classId||skill.type!=="Stigma"||!editable(skill)||skill.unlockLevel>build.level)return build;return sanitize({...build,stigma:build.stigma.includes(id)?build.stigma.filter(x=>x!==id):[...build.stigma,id]})}
export function changeClass(build:WorkspaceBuild,classId:string){return sanitize({...build,classId,ranks:{},stigma:[],specializations:{}})}
export function buildExport(build:WorkspaceBuild){return JSON.stringify(sanitize(build),null,2)}
