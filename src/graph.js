/**
 * Created by TimeWz667 on 17/04/2018.
 */

import {NodeOp, NodeOpGroup} from "./node";


export class Graph {
    constructor(attr) {
        this.Nodes = {};
        this.Predecessor = [];
        this.Successor = [];
        this.Attributes = Object.assign({}, attr);
    }

    addNodes(nodes) {
        let ng;
        if (nodes instanceof Array) {
            ng = nodes.map(nod => this.addNode(nod));
        } else if (nodes instanceof Object) {
            ng = Object.entries(nodes).map(nod=> this.addNode(nod));
        } else {
            return;
        }

        return new NodeOpGroup(ng);
    }

    addNode(node) {
        let name;

        if (node instanceof Array) {
            name = node[0];

            if (name in this.Nodes) {
                node = Object.assign(this.Nodes[name], node[1]);
            } else {
                node = Object.assign({id: name}, node[1]);
            }
        } else if (typeof(node) === "object") {
            name = ("id" in node)? node.id: JSON.stringify(node);
        } else if (typeof(node) === "string") {
            name = node;
            node = (name in this.Nodes)? this.Nodes[name]: {id: node};
        } else {
            return;
        }

        if (!(name in this.Nodes)) {
            this.Predecessor[name] = {};
            this.Successor[name] = {};
        }

        this.Nodes[name] = node;
        return new NodeOp(node);
    }

    getNode(node) {
        return new NodeOp(this.Nodes[node]);
    }

    getNodes(nodes) {
        if (typeof(nodes) === "function") {
            return new NodeOpGroup(Object.values(this.Nodes).filter(nodes));
        } else {
            return new NodeOpGroup(nodes.map(nod => this.Nodes[nod]));
        }
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

    isNeighbour(source, target) {
        if (source in this.Nodes && target in this.Nodes) {
            return target in this.Predecessor[source];
        }
        return false;
    }

    getEdgeWeight(source, target) {
        return this.Predecessor[source][target];
    }

    getNeighbourKeys(node) {
        return Object.keys(this.Predecessor[node]);
    }

    getNeighbours(node) {
        return this.getNodes(this.getNeighbourKeys(node));
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

    getClusteringCoefficient() {
        const cls = Object.keys(this.Nodes).map(node => this.getLocalClustering(node));
        return cls.reduce((a, b) => a+b, 0)/cls.length;
    }
}
