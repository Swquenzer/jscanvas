//PaperScript!
var cProperties {
	center: view.center,
	radius: 30,
	strokeColor: "red",
	fillColor: "blue"
}

var c1 = new Path.Circle(cProperties);

function onResize(event) {
	path.position = view.center;
	console.log("IN");
}