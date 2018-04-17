/**
 * Created by TimeWz667 on 17/04/2018.
 */

class NodeOp {
    constructor(node) {
        this.Node = node;
    }

    attr(name, value) {
        if (arguments.length === 1) {
            return this.Node[name];
        }
        if (value === null) {
            delete this.Node[name];
            return;
        }

        this.Node[name] = (typeof(value) === "function")? value(this.Node): value;

        return this;
    }

    call(fn) {
        return fn(this.Node);
    }

    get() {
        return this.Node;
    }
}


class NodeOpGroup {
    constructor(nodes) {
        this.Nodes = nodes.map((node) => node instanceof NodeOp? node: new NodeOp(node));
    }

    attr(name, value) {
        if (arguments.length === 1) {
            return this.Nodes.map(node => node.attr(name));
        }
        this.Nodes.forEach(node => node.attr(name, value));

        return this
    }

    call(fn) {
        return this.Nodes.map(node => node.call(fn));
    }

    get() {
        return this.Nodes.map(node => node.get());
    }
}


export class Graph {
    constructor(attr) {
        this.Nodes = {};
        this.Adjacency = [];
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
            node = Object.assign({id: name}, node[1]);
        } else if (typeof(node) === "object") {
            name = ("id" in node)? node.id: JSON.stringify(node);
        } else if (typeof(node) === "string") {
            name = node;
            node = {id: node}
        } else {
            return;
        }

        this.Nodes[name] = node;
        return new NodeOp(node);
    }

    getNode(node) {
        return this.Nodes[node];
    }
}
