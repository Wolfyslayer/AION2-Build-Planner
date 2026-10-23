export type StoredSkills={ranks:Record<string,number>;equipped:string[]};
// Costs and Stigma slot unlocks are not verified by the approved database.
export function skillPointsForRank(_rank:number):number|null{return null}
export function stigmaShardsForRank(_rank:number):number|null{return null}
export function sanitizeSkillState(_state:StoredSkills,_skills:{skill_id:string;class_id:string;type:string;unlock_level:number}[],_classId:string,_level:number):StoredSkills{return {ranks:{},equipped:[]}}
