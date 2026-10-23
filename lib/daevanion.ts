export type Node={id:string;x:number;y:number;type:string;cost:number;connects_to:string[];bonus?:Record<string,number|string>};
export type Board={id:string;name:string;points_pool:string;nodes:Node[]};
export function allocatedCost(board:Board,selected:string[]):number{return board.nodes.filter(n=>selected.includes(n.id)).reduce((sum,n)=>sum+n.cost,0)}
export function reachable(board:Board,selected:string[],id:string):boolean{
 const target=board.nodes.find(n=>n.id===id);if(!target||selected.includes(id))return false;
 if(target.type==="Start")return true;
 return board.nodes.some(n=>selected.includes(n.id)&&n.connects_to.includes(id));
}
export function validSelection(board:Board,selected:string[],budget:number):boolean{
 const ids=new Set<string>();for(const id of selected){if(ids.has(id)||!board.nodes.some(n=>n.id===id))return false;ids.add(id)}
 if(allocatedCost(board,selected)>budget)return false;
 const visited=new Set(board.nodes.filter(n=>n.type==="Start"&&ids.has(n.id)).map(n=>n.id));
 let changed=true;while(changed){changed=false;for(const n of board.nodes){if(!ids.has(n.id)||visited.has(n.id))continue;if(board.nodes.some(parent=>visited.has(parent.id)&&parent.connects_to.includes(n.id))){visited.add(n.id);changed=true}}}
 return visited.size===ids.size;
}
export function availableNodes(board:Board,selected:string[],budget:number):Node[]{return board.nodes.filter(n=>reachable(board,selected,n.id)&&validSelection(board,[...selected,n.id],budget))}
export function removeNodeAndDependents(board:Board,selected:string[],id:string):string[]{
 const remainder=selected.filter(x=>x!==id);let result=remainder;while(!validSelection(board,result,Infinity)&&result.length){const reachableFromStart=new Set(board.nodes.filter(n=>n.type==="Start"&&result.includes(n.id)).map(n=>n.id));let changed=true;while(changed){changed=false;for(const n of board.nodes){if(!result.includes(n.id)||reachableFromStart.has(n.id))continue;if(board.nodes.some(p=>reachableFromStart.has(p.id)&&p.connects_to.includes(n.id))){reachableFromStart.add(n.id);changed=true}}}result=result.filter(x=>reachableFromStart.has(x))}
 return result;
}
