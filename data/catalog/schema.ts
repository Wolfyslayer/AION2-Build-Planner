import {z} from "zod";
export const entityTypes=["class","skill","specialization","stigma","board","node","item","item_set","stat","collectible"] as const;
export const gameEntitySchema=z.object({
 entity_type:z.enum(entityTypes),game_id:z.string().min(1),class_id:z.string().optional(),
 parent_game_id:z.string().optional(),name:z.string().min(1),
 data:z.record(z.string(),z.unknown()).default({}),icon_path:z.string().optional(),verified:z.boolean().default(false)
});
export const catalogSnapshotSchema=z.object({
 source_key:z.string().min(1),source_url:z.string().url(),client_version:z.string().optional(),
 region:z.string().default("Global"),fetched_at:z.string().datetime({offset:true}).optional(),
 status:z.enum(["pending","reviewed","rejected"]).default("pending"),
 entities:z.array(gameEntitySchema)
}).superRefine((v,ctx)=>{
 const ids=new Set<string>();
 for(const [i,e] of v.entities.entries()){
  const key=e.entity_type+":"+e.game_id;
  if(ids.has(key))ctx.addIssue({code:"custom",path:["entities",i],message:"Duplicate entity "+key});
  ids.add(key);
 }
});
export type CatalogSnapshot=z.infer<typeof catalogSnapshotSchema>;
export function validateCatalogSnapshot(value:unknown):CatalogSnapshot{return catalogSnapshotSchema.parse(value)}
export function publicEntities(snapshot:CatalogSnapshot){return snapshot.status==="reviewed"?snapshot.entities.filter(e=>e.verified):[]}
