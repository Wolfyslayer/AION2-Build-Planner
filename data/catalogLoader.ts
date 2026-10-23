import {verifyCatalog,type Catalog} from "./schema";
import type {Skill} from "../lib/planner";
export type CatalogIndexEntry={id:string;region:string;patch:string;path:string;source:string};
export type CatalogIndex={schemaVersion:1;catalogs:CatalogIndexEntry[]};
export function selectCatalog(index:CatalogIndex,region:string,patch:string):CatalogIndexEntry|undefined{
 return index.catalogs.find(c=>c.region===region&&c.patch===patch);
}
export function parseVerifiedCatalog(input:unknown,entry:CatalogIndexEntry):Catalog{
 const catalog=verifyCatalog(input);
 if(catalog.version!==entry.patch||catalog.region!==entry.region||catalog.source!==entry.source)throw new Error("Catalog metadata mismatch");
 return catalog;
}
export function compatibleSkills(skills:Skill[],classId:string):Skill[]{return skills.filter(s=>s.classId===classId)}
