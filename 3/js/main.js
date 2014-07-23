//.034 meters/pixel
//17 meters total (view size)
var FPS = 60;
var gravity = 9.81; //m/s/s

function simulate() {
	function ball(x, y, vx, vy, radius, color) {
		vx *= FPS;
		vy *= FPS;

		this.shape = new Shape.Circle({
			center: [x,y],
			radius: radius,
			fillColor: color
		});

		this.shape.onFrame = function(event) {
			//Floor
			if(this.position.y+this.radius >= view.size.height && vy > 0) {
				vy *= -1;
			}
			//Walls
			if(this.position.x+this.radius >= view.size.width && vx < view.size.width
				|| this.position.x-this.radius < 0 && vx < 0) {
				vx *= -1;
			}

			//Ball Physics
			vy += gravity;
			this.position.x += vx/FPS;
			this.position.y += vy/FPS;
		}
	}

	//b1 = new ball(20, 7, 0, 0, 15,'blue');
	//b2 = new ball(20, 7, 3, 0, 15, 'red');
	b3 = new ball(20, 200, 4, -6, 15, 'green');

	var counter = document.getElementById("counter");
	function onFrame(event) {
		//Do something every second
		if(event.count%60 === 0) {
			counter.innerHTML = event;
		}
	}
}

var startInt = null;
window.start = function() {
	startInt = setInterval(function() {simulate()}, 200);
}
window.stop = function() {
	clearInterval(startInt);
}