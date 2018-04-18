/**
 * Created by TimeWz667 on 18/04/2018.
 */

const tape = require("tape"),
    graph = require("../build/infergraph");

tape("nodes", function(test) {
    const g1 = new graph.DiGraph({A: 1, B: 2});

    test.deepEquals(g1.Attributes, {A: 1, B: 2});

    const n1 = g1.addNode("X");
    test.deepEquals(n1.get(), {id: "X"});
    test.equal(n1.attr("id"), "X");
    test.equal(n1.id, "X");

    const n2s = g1.addNodes(["Y", "Z"]);
    test.deepEquals(n2s.get(), [{id: "Y"}, {id: "Z"}]);
    n2s.attr("a", 5);
    test.deepEquals(n2s.attr("a"), [5, 5]);

    n2s.attr("a", null);
    test.deepEquals(n2s.attr("a"), [undefined, undefined]);

    const n3s = g1.addNodes([{id: "S", a: 2}, {id: "T", a: 3}]);
    test.deepEquals(n3s.get(), [{id: "S", a: 2}, {id: "T", a: 3}]);
    test.deepEquals(n3s.call(n => n.id), ["S", "T"]);

    n3s.attr("b", nod => nod.a * 2);
    test.deepEquals(n3s.attr("b"), [4, 6]);

    const n4s = g1.addNodes({U: {a: 2}, V: {a: 3}});
    test.deepEquals(n4s.get(), [{id: "U", a: 2}, {id: "V", a: 3}]);

    test.deepEquals(g1.getNode("X").get(), {"id": "X"});

    test.end();
});


tape("edges", function(test) {
    const g2 = new graph.DiGraph();

    g2.addEdge("A", "B");
    test.deepEquals(g2.Predecessor.A, {});
    test.deepEquals(g2.Predecessor.B, {A: 0});
    test.deepEquals(g2.Successor.A, {B: 0});
    test.deepEquals(g2.Successor.B, {});

    g2.addEdge("A", "B", 5);
    test.deepEquals(g2.Predecessor.A, {});
    test.deepEquals(g2.Predecessor.B, {A: 5});
    test.deepEquals(g2.Successor.A, {B: 5});
    test.deepEquals(g2.Successor.B, {});

    test.end();
});


tape("relations", function(test) {
    const g3 = new graph.DiGraph();

    g3.addEdge("A", "D");
    g3.addEdge("A", "C");
    g3.addEdge("B", "D");
    g3.addEdge("D", "E");
    g3.addEdge("E", "C");

    test.ok(g3.isParent("A", "C"));
    test.notOk(g3.isParent("A", "E"));
    test.notOk(g3.isParent("D", "B"));

    test.ok(g3.isAncestor("B", "C"));
    test.notOk(g3.isAncestor("E", "A"));

    test.ok(g3.isChild("E", "D"));
    test.notOk(g3.isChild("D", "E"));
    test.notOk(g3.isChild("C", "D"));

    test.ok(g3.isDescendant("C", "D"));
    test.notOk(g3.isDescendant("B", "C"));

    test.deepEquals(g3.getOrder(), ["A", "B", "D", "E", "C"]);
    test.end();
});


tape("clustering", function(test) {
    const g4 = new graph.DiGraph();

    g4.addEdge("A", "B");
    g4.addEdge("B", "C");
    g4.addEdge("B", "D");

    test.equal(g4.getInDegree("A"), 0);
    test.equal(g4.getInDegree("B"), 1);
    test.equal(g4.getInDegree("C"), 1);

    test.equal(g4.getOutDegree("A"), 1);
    test.equal(g4.getOutDegree("B"), 2);
    test.equal(g4.getOutDegree("C"), 0);

    test.equal(g4.getDegree("A"), 1);
    test.equal(g4.getDegree("B"), 3);
    test.equal(g4.getDegree("C"), 1);

    test.equal(g4.getAvgInDegree(), 3/4);
    test.equal(g4.getAvgOutDegree(), 3/4);
    test.equal(g4.getAvgDegree(), 1.5);

    test.end();
});
