export type Rank={rank:number;cost:number;requiredLevel:number};
export type Skill={id:string;classId:string;name:string;description:string;ranks:Rank[];requires?:{skillId:string;rank:number}[]};
export type Build={classId:string;level:number;skillPointBudget:number;selectedSkills:Record<string,number>};
export function spentPoints(b:Build,skills:Skill[]):number{return skills.reduce((sum,s)=>sum+s.ranks.filter(r=>r.rank<=(b.selectedSkills[s.id]??0)).reduce((n,r)=>n+r.cost,0),0)}
export function canUpgrade(b:Build,s:Skill,skills:Skill[]):boolean{
 if(s.classId!==b.classId)return false;
 const current=b.selectedSkills[s.id]??0,next=s.ranks.find(r=>r.rank===current+1);
 return !!next&&b.level>=next.requiredLevel&&spentPoints(b,skills)+next.cost<=b.skillPointBudget&&(s.requires??[]).every(r=>(b.selectedSkills[r.skillId]??0)>=r.rank);
}
export function validateBuild(b:Build,skills:Skill[]):string[]{
 const errors:string[]=[];
 if(!Number.isInteger(b.level)||b.level<1)errors.push("Invalid level");
 if(!Number.isInteger(b.skillPointBudget)||b.skillPointBudget<0)errors.push("Invalid budget");
 for(const [id,rank] of Object.entries(b.selectedSkills)){
 const s=skills.find(x=>x.id===id);
 if(!s||s.classId!==b.classId){errors.push("Unknown skill: "+id);continue}
 if(!Number.isInteger(rank)||rank<0||rank>s.ranks.length){errors.push("Invalid rank: "+id);continue}
 if(s.ranks.some(r=>r.rank<=rank&&r.requiredLevel>b.level))errors.push("Level too low: "+id);
 if(rank>0&&(s.requires??[]).some(r=>(b.selectedSkills[r.skillId]??0)<r.rank))errors.push("Missing prerequisite: "+id);
 }
 if(spentPoints(b,skills)>b.skillPointBudget)errors.push("Insufficient points");
 return errors;
}
