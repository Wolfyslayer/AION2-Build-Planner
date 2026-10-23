"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import raw from "../../data/imported/daevanion_boards.json";
import config from "../../data/imported/game_config.json";
import {allocatedCost,availableNodes,removeNodeAndDependents,type Board} from "../../lib/daevanion";
const boards=raw.boards as Board[];
const budget=config.system_mechanics.daevanion_crystal_budget;
export default function Daevanion(){
 const [boardId,setBoardId]=useState(boards[0].id),[allocations,setAllocations]=useState<Record<string,string[]>>({}),[ready,setReady]=useState(false);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem("aion2-daevanion-v1")||"{}");if(saved&&typeof saved==="object")setAllocations(saved)}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem("aion2-daevanion-v1",JSON.stringify(allocations))},[allocations,ready]);
 const board=boards.find(b=>b.id===boardId)??boards[0];
 const selected=(allocations[board.id]??[]).filter(id=>board.nodes.some(n=>n.id===id));
 const spent=allocatedCost(board,selected);
 const candidates=availableNodes(board,selected,board.points_pool==="Daevanion Crystals"?budget:0);
 function toggle(id:string){setAllocations(old=>{const current=(old[board.id]??[]).filter(id=>board.nodes.some(n=>n.id===id));return {...old,[board.id]:current.includes(id)?removeNodeAndDependents(board,current,id):[...current,id]}})}
 return <main className="shell"><header><Link href="/">✦ AION 2</Link><span>DAEVANION • ALPHA</span></header>
 <div className="intro"><p className="gold">CHARACTER WORKSPACE</p><h1>Daevanion Planner</h1><p>Allocate nodes from uploaded reference data. Your selections are saved on this device.</p></div>
 <section className="panel"><label>Board<select value={boardId} onChange={e=>setBoardId(e.target.value)}>{boards.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></label>
 <p className="muted">Currency: {board.points_pool}. {board.points_pool==="Daevanion Crystals"?"Reference budget: "+budget+" crystals.":"No verified budget supplied for this currency."}</p>
 <div className="stats"><div><strong>{spent}</strong><small>Allocated</small></div><div><strong>{board.points_pool==="Daevanion Crystals"?budget-spent:"—"}</strong><small>Remaining</small></div><div><strong>{selected.length}</strong><small>Nodes selected</small></div></div>
 {board.nodes.length===0?<div className="empty"><h3>No node data available</h3><p>This board is present in the uploaded file, but its node list is empty. No nodes have been invented.</p></div>:
 <div className="skillgrid">{board.nodes.map(n=>{const active=selected.includes(n.id),can=candidates.some(x=>x.id===n.id);return <article className="skill" key={n.id}><h3>{n.type.replaceAll("_"," ")}</h3><p className="muted">Node {n.id} · ({n.x}, {n.y}) · Cost {n.cost}</p><p>{n.bonus?Object.entries(n.bonus).map(([k,v])=>k.replaceAll("_"," ")+": "+v).join(" · "):"Start node"}</p><p className="muted">Connections: {n.connects_to.length?n.connects_to.map(id=>board.nodes.some(x=>x.id===id)?id:id+" (missing)").join(", "):"None"}</p><button disabled={!active&&!can} onClick={()=>toggle(n.id)}>{active?"Remove node":"Allocate node"}</button></article>})}</div>}
 <p className="muted">Reference data is user-provided and not independently verified. Missing connections are shown but cannot be selected.</p>
 </section><footer>Independent fan project • No affiliation with AION 2 publisher</footer></main>
}