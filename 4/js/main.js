//Paperscript
var build = function() {
	var GSIZE = 25;
	var RADIUS = 10;
	var SPACING = RADIUS*2;

	var grid = [];

	function place(n) {
		return n*SPACING;
	}

	function DefaultObj(x,y) {
		this.x = place(x);
		this.y = place(y);
		this.shape = new Shape.Circle({
			radius: RADIUS,
			center: [RADIUS+this.x, RADIUS+this.y],
			fillColor: 'red'
		});
	}
	function Player(x,y,color) {
		color = color ? color : 'blue';
		this.x = place(x);
		this.y = place(y);
		this.shape = new Shape.Circle({
			radius: RADIUS,
			center: [RADIUS+this.x, RADIUS+this.y],
			fillColor: color
		});
	}

	function fill() {
		for(var i=0; i<GSIZE; i++) {
			grid[i] = new Array();
			for(var j=0; j<GSIZE; j++) {
				grid[i][j] = new defaultObj(i,j);
			}
		}
	}


	window.place = function() {
		//put player at 4,4
		grid[4][4] = new Player();
	}
	fill();
}

window.build = function() {
	start();
}