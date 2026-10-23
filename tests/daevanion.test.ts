import {describe,it,expect} from "vitest";
import raw from "../data/metaroad-public/boards.json";
import {allocatedCost,availableNodes,removeNodeAndDependents,validSelection,type Board} from "../lib/daevanion";
const b:Board={id:raw.boards[0].id,name:raw.boards[0].id,points_pool:raw.boards[0].currency,nodes:[]};
describe("unverified Daevanion nodes",()=>{it("does not fabricate available nodes",()=>{expect(availableNodes(b,[],0)).toEqual([]);expect(allocatedCost(b,[])).toBe(0);expect(validSelection(b,[],0)).toBe(true);expect(removeNodeAndDependents(b,[],"missing")).toEqual([])})});
