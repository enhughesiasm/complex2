import { IResearchItem } from "./../research/IResearchItem";
import { r_researchers } from "./research_items/r_researchers";
// import { curry } from 'ramda';

// const researchTree : any = {
//     reduce: curry(function reduce(reducerFn : Function, init : any, node : IResearchItem) {
//         const acc = reducerFn(init, node);
//         if (node.children.length === 0) {
//             return acc;
//         }
//         return node.children.reduce(researchTree.reduce(reducerFn), acc);
//     }),
//     map: curry(function map(mapFn, node) {
//         const newNode = mapFn(node);
//         if (node.children.length > 0) {
//             return newNode;
//         }
//         newNode.children = node.children.map(researchTree.map(mapFn));
//         return newNode;
//     }),
// };

const researchTree: IResearchItem = r_researchers;

export default researchTree;
