//Paperscript
//Constants
var SPACING = 30;
var X_CENTER = view.viewSize.width/2;
var Y_CENTER = view.viewSize.height/2;
var NUM_ROWS = 30;
var PUSH_DIST = 20 ;

//Create Grid of dots
var grid = [];
(function(numRows) {
	for(var i=0; i<numRows; i++) {
		grid[i] = new Array(numRows);
		for(var j=0; j<numRows; j++) {
			grid[i][j] = new Shape.Circle({
				center: [i*SPACING, j*SPACING],
			    radius: 10,
			    strokeColor: 'black',
			    fillColor: '9dd5ea'
			});
		}
	}
})(30);

var magnet = new Shape.Circle({
	center: view.center,
	radius: 40,
	strokeColor: 'black'
});

function onMouseMove(event) {
	for(var i=0; i<NUM_ROWS; i++) {
		for(var j=0; j<NUM_ROWS; j++) {
			//For every dot in the grid...
			var dot = grid[i][j];

			//Get x, y distances from the cursor to each dot
			var xDist = event.point.x - dot.position.x;
			var yDist = event.point.y - dot.position.y;

			//If cursor comes in contact with a dot
			if((Math.abs(xDist) < PUSH_DIST) && (Math.abs(yDist) < PUSH_DIST)) {
				//change color of dot
				dot.strokeColor = "green";
				dot.fillColor = "#a4ea9d";
				dot.blendMode = "overlay";
				//and then check for distance and direction to move dot
				if(Math.abs(xDist) < PUSH_DIST) dot.position.x -= xDist/2;
				if(Math.abs(yDist) < PUSH_DIST) dot.position.y -= yDist/2;
			}
		}
	}
}

function onFrame(event) {
	for(var i=0; i<NUM_ROWS; i++) {
		for(var j=0; j<NUM_ROWS; j++) {
			//For every dot in the grid...
			var dot = grid[i][j];
			if(magnet.contains(dot.position)) {
			dot.fillColor = "red";
			}
		}
	}
}