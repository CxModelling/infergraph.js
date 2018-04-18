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
        try {
            return Object.keys(this.Predecessor[node]);
        } catch (e){
            return [];
        }
    }

    getParents(node) {
        return this.getNodes(this.getParentKeys(node));
    }

    isAncestor(anc, node) {
        return this.getAncestorKeys(node).includes(anc);
    }

    getAncestorKeys(node) {
        let ans = [], querying = this.getParentKeys(node);

        while(querying.length > 0) {
            ans = ans.concat(querying);
            querying = querying.map(d => this.getParentKeys(d))
                               .reduce((a, b) => a.concat(b), [])
                .filter((d, i, self) => self.indexOf(d) === i)
                .filter(d => !ans.includes(d));
        }

        return ans
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
        try {
            return Object.keys(this.Successor[node]);
        } catch (e) {
            return [];
        }
    }

    getChildren(node) {
        return this.getNodes(this.getChildKeys(node));
    }

    isDescendant(des, node) {
        return this.getDescendantKeys(node).includes(des);
    }

    getDescendantKeys(node) {
        let dns = [], querying = this.getParentKeys(node);

        while(querying.length > 0) {
            dns = dns.concat(querying);
            querying = querying.map(d => this.getChildKeys(d))
                .reduce((a, b) => a.concat(b), [])
                .filter((d, i, self) => self.indexOf(d) === i)
                .filter(d => !dns.includes(d));
        }

        return dns
    }

    getDescendants(node) {
        return this.getNodes(this.getDescendantKeys(node));
    }

    getInDegree(node) {
        return this.getParentKeys(node).length;
    }

    getAvgInDegree() {
        const n = Object.keys(this.Nodes).length;
        return Object.values(this.Predecessor)
                .map(nod => Object.keys(nod).length)
                .reduce((a, b) => a+b, 0)/n;
    }

    getOutDegree(node) {
        return this.getChildKeys(node).length;
    }

    getAvgOutDegree() {
        const n = Object.keys(this.Nodes).length;
        return Object.values(this.Successor)
                .map(nod => Object.keys(nod).length)
                .reduce((a, b) => a+b, 0)/n;
    }

    getDegree(node) {
        return this.getInDegree(node) + this.getOutDegree(node);
    }

    getAvgDegree() {
        return this.getAvgInDegree() + this.getAvgOutDegree();
    }

    getLocalClustering(node) {
        const nei = this.getParentKeys(node);

        return nei.map(src => nei.filter(tar => this.isNeighbour(src, tar)).length)
                .reduce((a, b) => a + b, 0) / nei.length / (nei.length - 1);
    }
}
