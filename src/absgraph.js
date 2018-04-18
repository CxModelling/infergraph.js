/**
 * Created by TimeWz667 on 18/04/2018.
 */


import {NodeOp, NodeOpGroup} from "./node";


export class AbstractGraph {
    constructor(attr) {
        if (new.target === AbstractGraph) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
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

    }

    getEdgeWeight(source, target) {
        return this.Successor[source][target];
    }

    isNeighbour(source, target) {

    }

    getNeighbourKeys(node) {

    }

    getNeighbours(node) {
        return this.getNodes(this.getNeighbourKeys(node));
    }

    getDegree(node) {

    }

    getAvgDegree() {

    }

    getLocalClustering(node) {

    }

    getClusteringCoefficient() {
        const cls = Object.keys(this.Nodes).map(node => this.getLocalClustering(node));
        return cls.reduce((a, b) => a+b, 0)/cls.length;
    }

    getSubgraph(nodes) {

    }

    getD3form() {
        const js = {};
        js.Nodes = Object.values(this.Nodes).map(n => Object.assign({}, n));

        js.Edges = Object.entries(this.Successor)
                         .map(([src, tars]) => Object.keys(tars).map(tar => [src, tar]))
                         .reduce((a, b) => a.concat(b), [])
                         .map(([src, tar]) => Object({source: src, target: tar}));

        return js;
    }
}