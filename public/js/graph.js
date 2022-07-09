function foo() {
    document.getElementById("batp").src = "/images/battery_graph.png?dummy=" + Math.random();
}
foo();
setInterval(foo, 30000);
