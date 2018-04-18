# infergraph.js
A library for (di)graph creating, analysing, and inference.

## Get Started

### Load

```
var ig = require("infergraph.js");
```


### Undirected graph

#### Generate a graph

```
var g = ig.newGraph();
```


#### Add nodes

infergraph.js provides three ways to add a node

```
// 1. By name
g.addNode("Node1");

// 2. By name and attributes
g.addNode(["Node2", {A1: "a1", A2: "a2"}]);

// 3. By dictionary ("id" is necessary)
g.addNode({id: "Node3", A1: "a1", A2: "a2"});

```

Adding many nodes at once is possible

```
g.addNodes(["Node1", ["Node2", {A1: "a1"}], {id: "Node3", A1: "a2"}]);
```

#### Get nodes and edit attributes of nodes

When you request nodes from a graph, infergraph.js will firstly render a selector.
With the selector, you can modify and query attributes of the targeted nodes.
You can edit the attributes of a node by chaining. Attributes can be values of output of functions


```
var node = g.getNode("Node1")
             .attr("A1", 1) // edit an attribute with a value
             .attr("A2", 2)
             .attr("A3", d => d.A1 + d.A2) // edit an attribute with a function
             .get(); // finally get the node
```

Or getting and editing many nodes at one time by names or a filter function.

```
var nodes = g.getNodes(["Node1", "Node2"])
             .attr("A1", 1)
             .get(); // get all the selected nodes as an array


g.getNodes(node => {...})
 .attr("A1", 1);

```


#### Add edges

Giving the names of source node, target node, and weight (optional, default=0), an edge will be build between nodes

```

g.addEdge("Src1", "Tar1", weight);

g.addEdge("Src2", "Tar2");

```

As in undirected graphs, you can add edges as cycles or complete graphs

```
g.addCycle(["Node1", ..., "NodeN"], weight)

g.linkCompletely(["Node1", ..., "NodeN"], weight)

```


#### Query relations

```
// check if two nodes are neighbours to each other
g.isNeighbour("Neighbour", "ofWhom");

// get a selector with all neighbour nodes
g.getNeighbours("ofWhom");

// get a key list of all neighbour nodes
g.getNeighbourKeys("ofWhom");

```



### Directed graph (DiGraph)

The rules of adding nodes and edges in directed graph are exactly the same the undirected graph version.
However, the shortcut functions of addCycle and linkCompleted does not support DiGraph.
The major difference is the relation querying.


#### Query relations

You and find parents, children, ancestors, and descendants of nodes

```
// check relations
g.isParent("parent", "ofWhom");
g.isChild("child", "ofWhom");
g.isAncestor("ancestor", "ofWhom");
g.isDescendant("descendant", "ofWhom");

// get a selector with all neighbour nodes
g.getParents("ofWhom");
g.getChildren("ofWhom");
g.getAncestors("ofWhom");
g.getDescendants("ofWhom");

// get a key list of all neighbour nodes
g.getParentKeys("ofWhom");
g.getChildKeys("ofWhom");
g.getAncestorKeys("ofWhom");
g.getDescendantKeys("ofWhom");

```

#### Query the order of a directed graph (acyclic graph only)

You can get the topological order of a DiGraph
```
g.getOrder()
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details