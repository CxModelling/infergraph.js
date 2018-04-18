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

    id() {
        return this.Node.id;
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

    id() {
        return this.Nodes.map(node => node.id());
    }
}


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
        return this.Nodes[node];
    }

    addEdge(source, target, weight) {
        let src = this.addNode(source).attr("id");
        let tar = this.addNode(target).attr("id");
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

}
