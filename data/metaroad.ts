/** External reference links only. No Metaroad database content is bundled. */
export const metaroadClasses=["Templar","Gladiator","Assassin","Ranger","Sorcerer","Spiritmaster","Cleric","Chanter"] as const;
export function metaroadSlug(classId:string):string|undefined{
 return metaroadClasses.find(c=>c.toLowerCase()===classId.toLowerCase())?.toLowerCase();
}
export function metaroadLinks(classId:string){
 const slug=metaroadSlug(classId);
 if(!slug)return null;
 const base="https://metaroad.gg/aion2/database";
 return {overview:`${base}/classes/${slug}`,skills:`${base}/skills/${slug}`,daevanion:`${base}/daevanion/${slug}`};
}
