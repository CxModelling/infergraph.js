/**
 * Created by TimeWz667 on 17/04/2018.
 */
const tape = require("tape"),
    graph = require("../build/infergraph");

tape("new graphs", function(test) {
    const g1 = new graph.Graph({A: 1, B: 2});

    test.deepEquals(g1.Attributes, {A: 1, B: 2});

    const n1 = g1.addNode("X");
    test.deepEquals(n1.get(), {id: "X"});
    test.equal(n1.attr("id"), "X");

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

    test.deepEquals(g1.getNode("X"), {"id": "X"});

    test.end();
});
