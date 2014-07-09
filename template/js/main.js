//Paperscript

function onMouseMove(event) {

}

function onMouseDown(event) {
	
}

function onMouseDrag(event) {
	
}

function onMouseUp(event) {
}

var square = new Shape.Rectangle({
	point: [Math.floor(Math.random()*300), Math.floor(Math.random()*300)],
	size: [200,200],
	strokeColor: 'black',
	fillColor: 'green'
});

window.button = function() {
	square.fillColor += new Color(.8,.2,.1);
	console.log("DOne");
}