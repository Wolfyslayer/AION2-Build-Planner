import {describe,it,expect} from "vitest";
import {metaroadLinks,metaroadSlug} from "../data/metaroad";
describe("Metaroad external references",()=>{
 it("supports all eight class slugs",()=>expect(["Chanter","Cleric","Templar","Gladiator","Assassin","Ranger","Sorcerer","Spiritmaster"].every(c=>metaroadLinks(c)?.skills.endsWith("/"+c.toLowerCase()))).toBe(true));
 it("rejects unknown classes",()=>expect(metaroadSlug("Unknown")).toBeUndefined());
});
