/**
 * Created by TimeWz667 on 17/04/2018.
 */

import {AbstractGraph} from "./absgraph";

export class DiGraph extends AbstractGraph {
    constructor(attr) {
        super(attr);
    }

    addEdge(source, target, weight) {
        let src = this.addNode(source).id;
        let tar = this.addNode(target).id;
        weight = weight || 0;
        this.Successor[src][tar] = weight;
        this.Predecessor[tar][src] = weight;
    }

    isParent(par, node) {
        if (node in this.Nodes) {
            return par in this.Predecessor[node];
        }
        return false;
    }

    getParentKeys(node) {
        return Object.keys(this.Predecessor[node]);
    }

    getParents(node) {
        return this.getNodes(this.getParentKeys(node));
    }

    isAncestor(anc, node) {
        // todo
    }

    getAncestorKeys(node) {
        // todo
    }

    getAncestors(node) {
        return this.getNodes(this.getAncestorKeys(node));
    }

    isChild(chd, node) {
        if (node in this.Nodes) {
            return chd in this.Successor[node];
        }
        return false;
    }

    getChildKeys(node) {
        return Object.keys(this.Successor[node]);
    }

    getChildren(node) {
        return this.getNodes(this.getChildKeys(node));
    }

    isDescendant(des, node) {
        // todo
    }

    getDescendantKeys(node) {
        // todo
    }

    getDescendants(node) {
        return this.getNodes(this.getDescendantKeys(node));
    }

    getInDegree(node) {
        // todo
    }

    getAvgInDegree() {
        // todo
    }

    getOutDegree(node) {
        // todo
    }

    getAvgOutDegree() {
        // todo
    }

    getDegree(node) {
        // todo
    }

    getAvgDegree() {
        // todo
    }

    getLocalClustering(node) {
        // todo
    }

    getClusteringCoefficient() {
        // todo
    }

    getSubgraph(nodes) {
        // todo
    }
}
