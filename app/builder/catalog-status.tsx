"use client";
import {useMemo,useState} from "react";
import rawIndex from "../../data/catalog-index.json";
import {selectCatalog,type CatalogIndex} from "../../data/catalogLoader";
const index=rawIndex as CatalogIndex;
export default function CatalogStatus(){
 const regions=useMemo(()=>[...new Set(index.catalogs.map(c=>c.region))],[]);
 const [region,setRegion]=useState(regions[0]??"");
 const patches=useMemo(()=>index.catalogs.filter(c=>c.region===region).map(c=>c.patch),[region]);
 const [requestedPatch,setRequestedPatch]=useState("");
 const patch=patches.includes(requestedPatch)?requestedPatch:(patches[0]??"");
 const selected=selectCatalog(index,region,patch);
 return <section className="panel catalog-status" aria-label="Game data version">
 <p className="gold">GAME DATA</p><h2>Region &amp; patch</h2>
 {index.catalogs.length===0?<div role="status" className="catalog-warning"><strong>No verified game catalog available yet.</strong><p>Skill names, rank costs and progression recommendations are unavailable until a verified catalog has been imported. Your character settings can still be saved locally.</p></div>:<>
 <div className="catalog-controls"><label>Region<select value={region} onChange={e=>{setRegion(e.target.value);setRequestedPatch("")}}>{regions.map(r=><option key={r} value={r}>{r}</option>)}</select></label>
 <label>Game patch<select value={patch} onChange={e=>setRequestedPatch(e.target.value)}>{patches.map(p=><option key={p} value={p}>{p}</option>)}</select></label></div>
 {selected?<p role="status" className="muted">Catalog registered: {selected.region} · {selected.patch}. Skill availability requires successful validation and loading.</p>:<p role="alert" className="error">No matching catalog.</p>}
 </>}
 </section>;
}
