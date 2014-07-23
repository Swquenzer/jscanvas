//.034 meters/pixel
//17 meters total (view size)
var FPS = 60;
var gravity = 9.81; //(Earth) m/s^2
var rho = 1.22 //(air) kg/m^3

function velocity(meters, second) {
	return meters/second;
}
function acceleration(force, mass) {
	if(force === 0) return 0;
	return mass/force;
}
function aeroDrag(dC, fA, velocity) {
	//= -0.5 * drag coefficient * frontal area * rho * velocity^2
	return (-.5*dC*fA*rho*velocity*velocity);
}

function simulate() {
	b1 = new ball(20,   7, 2, 0, 5, 15, .8, 'blue');
	b2 = new ball(20,   7, 3, 0, 5, 15, .5, 'red');
	b3 = new ball(20, 200, 4, -4, 5, 15, .5, 'green');
	
	//dc := dragCoefficient
	function ball(x, y, vx, vy, mass, radius, elasticity, color) {
		//Drag Coefficient
		var dC = .47;
		//Frontal Area
		var fA = Math.PI*radius*radius;
		//initial velocity
		vx *= FPS;
		vy *= FPS;
		//initial acceleration (possibly add to parameters later)
		var ax = 0;
		var ay = 0;
		//drag
		var dx = aeroDrag(dC, fA, vx);
		var dy = aeroDrag(dC, fA, vy);

		this.shape = new Shape.Circle({
			center: [x,y],
			radius: radius,
			fillColor: color
		});

		this.shape.onFrame = function(event) {
			//Ball Physics

			//gravity
			//velocity
			//aerodynamic drag
			dx = aeroDrag(dC, fA, vx);
			dy = aeroDrag(dC, fA, vy);
			//acceleration (F=MA)
			ax = acceleration(dx, mass);
			ay = acceleration(dy, mass) + gravity;
			//velocity (v=A+Vi)
			vx += ax;
			vy += ay;
			this.position.x += vx/FPS;
			this.position.y += vy/FPS;

			//Floor
			if(this.position.y+this.radius >= view.size.height && vy > 0) {
				this.position.y = view.size.height-this.radius;
				vy *= -elasticity;
			}
			//Walls
			if(this.position.x+this.radius >= view.size.width && vx < view.size.width
				|| this.position.x-this.radius < 0 && vx < 0) {
				vx *= -elasticity;
			}
		}
	}

	var counter = document.getElementById("counter");
	function onFrame(event) {
		//Do something every second
		if(event.count%60 === 0) {
			counter.innerHTML = event;
		}
	}
}

var startInt = null;
window.startSingle = function() {
	simulate();
}
window.startInt = function() {
	startInt = setInterval(function() {simulate()}, 200);
}
window.stopInt = function() {
	clearInterval(startInt);
}