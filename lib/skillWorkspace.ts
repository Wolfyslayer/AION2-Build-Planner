import {skillCost,stigmaShardCost,unlockedStigmaSlots} from "../data/suppliedGame";
export type StoredSkills={ranks:Record<string,number>;equipped:string[]};
export function skillPointsForRank(rank:number):number|null{
 if(!Number.isInteger(rank)||rank<1||rank>10)return null;
 let sum=0;for(let i=2;i<=rank;i++){const cost=skillCost(i);if(cost===undefined)return null;sum+=cost}return sum;
}
export function stigmaShardsForRank(rank:number):number|null{
 if(!Number.isInteger(rank)||rank<1||rank>20)return null;
 let sum=0;for(let i=2;i<=rank;i++){const cost=stigmaShardCost(i);if(cost===undefined)return null;sum+=cost}return sum;
}
export function sanitizeSkillState(state:StoredSkills,skills:{skill_id:string;class_id:string;type:string;unlock_level:number}[],classId:string,level:number):StoredSkills{
 const allowed=new Set(skills.filter(s=>s.class_id===classId).map(s=>s.skill_id));
 const ranks=Object.fromEntries(Object.entries(state.ranks).filter(([id,rank])=>allowed.has(id)&&Number.isInteger(rank)&&rank>=1));
 const stigma=skills.filter(s=>s.class_id===classId&&s.type==="Stigma"&&s.unlock_level<=level);
 const permitted=new Set(stigma.map(s=>s.skill_id));
 const equipped=[...new Set(state.equipped.filter(id=>permitted.has(id)))].slice(0,unlockedStigmaSlots(level));
 return {ranks,equipped};
}
