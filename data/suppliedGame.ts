import {z} from "zod";
import supplied from "./aion2-global-04387.json";
const option=z.object({id:z.string().min(1),name:z.string().min(1),description:z.string()});
const slot=z.object({slot_index:z.number().int().positive().nullable(),options:z.array(option)});
export const suppliedSkillSchema=z.object({
 skill_id:z.string().min(1),class_id:z.string().min(1),name:z.string().min(1),
 type:z.enum(["Active","Passive","Stigma"]),unlock_level:z.number().int().positive(),
 base_max_level:z.number().int().positive(),absolute_max_level:z.number().int().positive(),
 cooldown_seconds:z.number().nonnegative().optional(),
 resource_cost:z.object({type:z.string(),value:z.number().nonnegative()}).optional(),
 description:z.string(),specialty_slots:z.record(z.string(),slot).nullable()
}).refine(s=>s.absolute_max_level>=s.base_max_level,{message:"absolute max below base max"});
export const suppliedGameSchema=z.object({
 game:z.literal("AION 2"),client_build:z.string().min(1),provenance:z.literal("user-provided-unverified"),
 max_character_level:z.number().int().positive(),
 skill_point_progression:z.object({base_max_level:z.number().int().positive(),absolute_max_level:z.number().int().positive(),total_points_to_max_base:z.number().int().nonnegative(),cost_matrix:z.array(z.object({level_target:z.number().int().positive(),skill_points_required:z.number().int().nonnegative()}))}),
 stigma_progression:z.object({unlock_levels:z.array(z.number().int().positive()),max_stigma_level:z.number().int().positive(),currency:z.literal("Stigma Shards"),tier_costs:z.array(z.object({levels:z.string(),shards_per_level:z.number().int().positive()}))}),
 classes:z.array(z.object({id:z.string(),name:z.string(),role:z.string(),weapon:z.string(),armor:z.string(),archetype:z.string(),main_weapon:z.string(),role_detail:z.string(),base_active_count:z.number().int(),base_passive_count:z.number().int(),stigma_slots:z.number().int(),active_skills_count:z.number().int(),passive_skills_count:z.number().int(),stigma_skills_count:z.number().int()})),
 skill_level_costs:z.array(z.object({level:z.number().int().positive(),points_required:z.number().int().nonnegative(),cumulative_points:z.number().int().nonnegative()})),
 stigma_level_costs:z.record(z.string(),z.object({shards_per_level:z.number().int().positive()})),
 skills:z.array(suppliedSkillSchema)
}).superRefine((v,ctx)=>{
 const ids=new Set<string>();
 for(const s of v.skills){if(ids.has(s.skill_id))ctx.addIssue({code:"custom",message:"Duplicate skill ID: "+s.skill_id});ids.add(s.skill_id);if(!v.classes.some(c=>c.id===s.class_id))ctx.addIssue({code:"custom",message:"Unknown class: "+s.class_id})}
 if(v.skill_point_progression.total_points_to_max_base!==v.skill_level_costs.at(-1)?.cumulative_points)ctx.addIssue({code:"custom",message:"Skill point totals disagree"});
 if(v.skill_point_progression.cost_matrix.some((row,i)=>row.level_target!==i+2||row.skill_points_required!==v.skill_level_costs[i+1]?.points_required))ctx.addIssue({code:"custom",message:"Skill progression cost matrix disagrees"});
 if(v.classes.some(c=>c.stigma_slots!==v.stigma_progression.unlock_levels.length))ctx.addIssue({code:"custom",message:"Stigma slots and unlock levels disagree"});
 let sum=0;
 for(const [i,row] of v.skill_level_costs.entries()){sum+=row.points_required;if(row.level!==i+1||row.cumulative_points!==sum)ctx.addIssue({code:"custom",message:"Invalid cumulative skill points at level "+row.level})}
});
export const suppliedGame=suppliedGameSchema.parse(supplied);
export function skillCost(level:number):number|undefined{return suppliedGame.skill_level_costs.find(x=>x.level===level)?.points_required}
export function stigmaShardCost(level:number):number|undefined{
 if(!Number.isInteger(level)||level<1||level>20)return undefined;
 const band=level<=5?"levels_1_to_5":level<=10?"levels_6_to_10":level<=15?"levels_11_to_15":"levels_16_to_20";
 return suppliedGame.stigma_level_costs[band]?.shards_per_level;
}

export function unlockedStigmaSlots(characterLevel:number):number{return suppliedGame.stigma_progression.unlock_levels.filter(level=>characterLevel>=level).length}
