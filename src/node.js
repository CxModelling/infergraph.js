/**
 * Created by TimeWz667 on 18/04/2018.
 */


export class NodeOp {
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


export class NodeOpGroup {
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


