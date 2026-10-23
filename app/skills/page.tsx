"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {suppliedGame,skillCost,stigmaShardCost,unlockedStigmaSlots} from "../../data/suppliedGame";
import imported from "../../data/imported/classes_skills.json";
import {skillPointsForRank,stigmaShardsForRank,sanitizeSkillState} from "../../lib/skillWorkspace";
type SkillRow={id:string;name:string;type:"Active"|"Passive"|"Stigma";unlock:number;description:string;cooldown?:number;mp?:number;max:number;specialties?:{level:number;name:string;description:string}[]};
const all:SkillRow[]=suppliedGame.skills.map(s=>({id:s.skill_id,name:s.name,type:s.type,unlock:s.unlock_level,description:s.description,cooldown:s.cooldown_seconds,mp:s.resource_cost?.value,max:s.type==="Stigma"?20:s.base_max_level,specialties:Object.entries(s.specialty_slots??{}).flatMap(([key,v])=>v.options.map(o=>({level:Number(key.match(/\d+/)?.[0]??0),name:o.name,description:o.description})))}));
export default function Skills(){
 const [classId,setClassId]=useState("sorcerer"),[level,setLevel]=useState(35),[tab,setTab]=useState<"Active"|"Passive"|"Stigma">("Active");
 const [ranks,setRanks]=useState<Record<string,number>>({}),[equipped,setEquipped]=useState<string[]>([]),[ready,setReady]=useState(false);
 useEffect(()=>{try{const x=JSON.parse(localStorage.getItem("aion2-skills-v1")||"{}");if(x.ranks)setRanks(x.ranks);if(Array.isArray(x.equipped))setEquipped(x.equipped)}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem("aion2-skills-v1",JSON.stringify({ranks,equipped}))},[ranks,equipped,ready]);
 const base=useMemo(()=>all.filter(s=>suppliedGame.skills.some(v=>v.skill_id===s.id&&v.class_id===classId)),[classId]);
 const partial=imported.classes.find(c=>c.id===classId);
 const supplemental:SkillRow[]=(partial?.active_skills??[]).filter(s=>!base.some(v=>v.name.toLowerCase()===s.name.toLowerCase())).map(s=>({id:s.id,name:s.name,type:"Active",unlock:s.unlock_level,description:s.description,cooldown:s.cooldown,mp:s.cost,max:1}));
 const rows=[...base,...supplemental].filter(s=>s.type===tab);
 const slots=unlockedStigmaSlots(level);
 const safe=sanitizeSkillState({ranks,equipped},suppliedGame.skills,classId,level);
 const classEquipped=safe.equipped;
 const used=base.filter(s=>s.type!=="Stigma").reduce((sum,s)=>sum+(skillPointsForRank(safe.ranks[s.id]??1)??0),0);
 function adjust(s:SkillRow,delta:number){setRanks(old=>({...old,[s.id]:Math.min(s.max,Math.max(1,(old[s.id]??1)+delta))}))}
 return <main className="shell"><header><Link href="/">✦ AION 2</Link><span>SKILLS • ALPHA</span></header><div className="intro"><p className="gold">CHARACTER WORKSPACE</p><h1>Skill Workspace</h1><p>Explore owner-provided skills, base ranks, Stigma slots and available specializations.</p></div>
 <section className="panel"><label>Class<select value={classId} onChange={e=>{setClassId(e.target.value);setTab("Active")}}>{suppliedGame.classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Character level<input type="number" min="1" max={suppliedGame.max_character_level} value={level} onChange={e=>setLevel(Math.min(45,Math.max(1,Number(e.target.value)||1)))}/></label>
 <div className="stats"><div><strong>{used}</strong><small>Base skill points allocated (known costs)</small></div><div><strong>{slots}/4</strong><small>Stigma slots unlocked</small></div><div><strong>{classEquipped.length}</strong><small>Stigma equipped</small></div></div>
 <div className="actions">{(["Active","Passive","Stigma"] as const).map(t=><button key={t} onClick={()=>setTab(t)} aria-pressed={tab===t}>{t}</button>)}</div>
 <p className="muted">Data is partial and user-provided, not verified against the live client. Base skill costs are known through rank 10 only. Stigma costs use Shards, not skill points.</p>
 {rows.length===0?<div className="empty"><h3>No {tab.toLowerCase()} skills in this dataset</h3><p>This does not mean the class has no skills; its catalog has not been supplied yet.</p></div>:<div className="skillgrid">{rows.map(s=>{const rank=safe.ranks[s.id]??1,known=base.some(v=>v.id===s.id),locked=level<s.unlock,equippedHere=classEquipped.includes(s.id);return <article className="skill" key={s.id}><h3>{s.name}</h3><p>{s.description}</p><p className="muted">Unlock: level {s.unlock}{s.cooldown!==undefined?" · CD "+s.cooldown+"s":""}{s.mp!==undefined?" · MP "+s.mp:""}</p>
 {locked?<p className="muted">Locked until level {s.unlock}</p>:known?<><div className="actions"><button disabled={rank<=1} onClick={()=>adjust(s,-1)}>−</button><span>Rank {rank}/{s.max}</span><button disabled={rank>=s.max||(s.type!=="Stigma"&&rank>=10)} onClick={()=>adjust(s,1)}>+</button></div>{s.type==="Stigma"?<><p className="muted">Total spent: {stigmaShardsForRank(rank)??"—"} Stigma Shards · Next rank: {stigmaShardCost(rank+1)??"—"} Shards</p><button disabled={!equippedHere&&classEquipped.length>=slots} onClick={()=>setEquipped(old=>equippedHere?old.filter(id=>id!==s.id):[...classEquipped,s.id])}>{equippedHere?"Unequip":"Equip"}</button></>:null}</>:<p className="muted">Reference-only: no verified rank progression</p>}
 {s.specialties?.length?<div><h3>Specializations</h3>{s.specialties.map((sp,i)=><p key={i} className="muted">Rank {sp.level}: {sp.name} — {sp.description}</p>)}</div>:null}</article>})}</div>}
 </section><footer>Independent fan project • No affiliation with AION 2 publisher</footer></main>
}