import {describe,it,expect} from "vitest";
import boards from "../data/imported/daevanion_boards.json";
import {allocatedCost,availableNodes,removeNodeAndDependents,validSelection} from "../lib/daevanion";
const b=boards.boards[0];
describe("Daevanion allocation",()=>{
 it("starts with the free Start node",()=>expect(availableNodes(b,[],840).map(n=>n.id)).toEqual(["nz_0_0"]));
 it("follows directed edges and costs",()=>{expect(availableNodes(b,["nz_0_0"],840).map(n=>n.id)).toEqual(["nz_0_1"]);expect(allocatedCost(b,["nz_0_0","nz_0_1","nz_0_2"])).toBe(4)});
 it("enforces budget and connectivity",()=>{expect(validSelection(b,["nz_0_0","nz_0_1","nz_0_2"],3)).toBe(false);expect(validSelection(b,["nz_0_2"],840)).toBe(false)});
 it("removes dependent nodes when a parent is removed",()=>expect(removeNodeAndDependents(b,["nz_0_0","nz_0_1","nz_0_2"],"nz_0_1")).toEqual(["nz_0_0"]));
 it("does not create missing nodes",()=>expect(b.nodes.some(n=>n.id==="nz_1_0")).toBe(false));
});
