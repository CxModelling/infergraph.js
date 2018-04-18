/**
 * Created by TimeWz667 on 17/04/2018.
 */

import {Graph} from "./src/graph";
import {DiGraph} from "./src/digraph";


export function newGraph(attr) {
    return new Graph(attr);
}

export function newDiGraph(attr) {
    return new DiGraph(attr);
}
