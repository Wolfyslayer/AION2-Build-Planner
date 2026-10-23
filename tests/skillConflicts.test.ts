import {describe,it,expect} from "vitest";
import {skillConflicts,conflictsForClass,isDisputed} from "../data/skillConflicts";
describe("skill source audit",()=>{it("keeps every conflict unresolved with at least two source claims",()=>{expect(skillConflicts.length).toBe(5);expect(skillConflicts.every(c=>c.status==="unresolved"&&c.claims.length>=2)).toBe(true)});it("supports class and name lookup",()=>{expect(conflictsForClass("chanter").length).toBe(1);expect(isDisputed("sorcerer","hellfire")).toBe(true);expect(isDisputed("ranger","hellfire")).toBe(false)})});
