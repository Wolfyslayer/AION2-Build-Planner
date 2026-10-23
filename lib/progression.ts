import {Build,Skill,canUpgrade,spentPoints,validateBuild} from "./planner";
export type UpgradeStep={skillId:string;skillName:string;rank:number;cost:number;requiredLevel:number};
export type ProgressionResult={steps:UpgradeStep[];spent:number;remaining:number;errors:string[];blocked:string[]};
/**
 * Produce a deterministic, prerequisite-aware upgrade order toward a target build.
 * This is NOT an optimization or game recommendation; priorities are supplied by the caller.
 * Never invents rank costs, prerequisites or player levels.
 */
export function planProgression(start:Build,target:Build,skills:Skill[],priority:string[]=[]):ProgressionResult{
 const errors=[...validateBuild(start,skills)];
 if(start.classId!==target.classId)errors.push("Class mismatch");
 if(target.level<start.level)errors.push("Target level cannot be below starting level");
 if(target.skillPointBudget<start.skillPointBudget)errors.push("Target budget cannot be below starting budget");
 const known=new Map(skills.map(s=>[s.id,s]));
 for(const [id,rank] of Object.entries(target.selectedSkills)){
  const skill=known.get(id);
  if(!skill||skill.classId!==target.classId){errors.push("Unknown target skill: "+id);continue}
  if(!Number.isInteger(rank)||rank<0||rank>skill.ranks.length)errors.push("Invalid target rank: "+id);
  if(rank<(start.selectedSkills[id]??0))errors.push("Target removes ranks: "+id);
 }
 if(errors.length)return {steps:[],spent:spentPoints(start,skills),remaining:start.skillPointBudget-spentPoints(start,skills),errors,blocked:[]};
 const current:Build={...target,selectedSkills:{...start.selectedSkills}};
 const order=[...new Set([...priority,...skills.map(s=>s.id)])];
 const steps:UpgradeStep[]=[];
 const blocked=new Set<string>();
 let changed=true;
 while(changed){
  changed=false;
  for(const id of order){
   const s=known.get(id);
   if(!s||s.classId!==target.classId)continue;
   const rank=current.selectedSkills[id]??0,wanted=target.selectedSkills[id]??0;
   if(rank>=wanted)continue;
   if(!canUpgrade(current,s,skills)){blocked.add(id);continue}
   const next=s.ranks.find(r=>r.rank===rank+1);
   if(!next)continue;
   current.selectedSkills[id]=rank+1;
   steps.push({skillId:id,skillName:s.name,rank:next.rank,cost:next.cost,requiredLevel:next.requiredLevel});
   blocked.delete(id);
   changed=true;
  }
 }
 const spent=spentPoints(current,skills);
 const unresolved=order.filter(id=>(current.selectedSkills[id]??0)<(target.selectedSkills[id]??0));
 return {steps,spent,remaining:target.skillPointBudget-spent,errors,blocked:[...new Set([...blocked,...unresolved])].filter(id=>unresolved.includes(id))};
}
