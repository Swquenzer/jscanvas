//Paperscript
var FPS = 60;
var gravity = 9.81; //m/s/s

function ball(x, y, vx, vy, radius, color) {
	this.shape = new Shape.Circle({
		center: [x,y],
		radius: radius,
		fillColor: color
	});
	this.vx = vx*FPS;
	this.vy = vy*FPS;
}

b = new ball(50,20,5,0,15,'blue');

var counter = document.getElementById("counter");
function onFrame(event) {
	//Do something every second
	if(event.count%60 === 0) {
		counter.innerHTML = event;
	}
	//MAIN CODE
	//Floor
	if(b.shape.position.y-b.shape.radius/2 === view.size.y) {
		b.shape.position
	}

	//Ball Physics
	b.vy += gravity;
	b.shape.position.x += b.vx/FPS;
	b.shape.position.y += b.vy/FPS;

}


window.button = function() {
	console.log("Clicked");
}