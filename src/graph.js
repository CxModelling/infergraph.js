/**
 * Created by TimeWz667 on 17/04/2018.
 */

import {AbstractGraph} from "./absgraph";


export class Graph extends AbstractGraph{
    constructor(attr) {
        super(attr);
    }

    addEdge(source, target, weight) {
        let src = this.addNode(source).id;
        let tar = this.addNode(target).id;
        weight = weight || 0;
        this.Successor[src][tar] = weight;
        this.Successor[tar][src] = weight;
        this.Predecessor[src][tar] = weight;
        this.Predecessor[tar][src] = weight;
    }

    addCycle(nodes, weight) {
        const len = nodes.length;

        for (let i = 1; i < len; i++) {
            this.addEdge(nodes[i-1], nodes[i], weight);
        }
        this.addEdge(nodes[0], nodes[len-1], weight);
    }

    linkCompletely(nodes, weight) {
        nodes.forEach(s => nodes.filter(t => t !== s)
                                .forEach(t => this.addEdge(s, t, weight)));
    }

    getEdgeWeight(source, target) {
        return this.Predecessor[source][target];
    }

    isNeighbour(source, target) {
        if (source in this.Nodes && target in this.Nodes) {
            return target in this.Predecessor[source];
        }
        return false;
    }

    getNeighbourKeys(node) {
        return Object.keys(this.Predecessor[node]);
    }

    getDegree(node) {
        return this.getNeighbourKeys(node).length;
    }

    getAvgDegree() {
        const n = Object.keys(this.Nodes).length;
        return Object.values(this.Predecessor)
                     .map(nod => Object.keys(nod).length)
                     .reduce((a, b) => a+b, 0)/n;
    }

    getLocalClustering(node) {
        const nei = this.getNeighbourKeys(node);

        return nei.map(src => nei.filter(tar => this.isNeighbour(src, tar)).length)
            .reduce((a, b) => a + b, 0) / nei.length / (nei.length - 1);
    }

}
