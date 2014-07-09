//Paperscript
//Constants
var X_CENTER = view.viewSize.width/2;
var Y_CENTER = view.viewSize.height/2;
var PUSH_DIST = 20;
var DOT_RADIUS = 10;
var SPACING = DOT_RADIUS*2; //Also diameter
var NUM_ROWS = Math.floor(view.viewSize.width/SPACING);
var STROKE_WIDTH = 1;
var isBeingDragged = false;

//Create Grid of dots
var grid = [];
(function(numRows) {
	for(var i=0; i<numRows; i++) {
		grid[i] = new Array(numRows);
		for(var j=0; j<numRows; j++) {
			grid[i][j] = new Shape.Circle({
				center: [i*SPACING, j*SPACING],
			    radius: DOT_RADIUS,
			    strokeColor: 'black',
			    strokeWidth: STROKE_WIDTH,
			    fillColor: '9dd5ea'
			});
			
			//Offset grid so all dots are visible on screen
			grid[i][j].position += DOT_RADIUS+STROKE_WIDTH;
		}
	}
})(NUM_ROWS);

window.test = function(strColor) {
	for(var i=0; i < NUM_ROWS; i++) {
		for(var j=0; j < NUM_ROWS; j++) {
			//For every dot in the grid...
			var dot = grid[i][j];
			dot.strokeWidth = strColor;
		}
	}
}

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
				if(dot.fillColor.toCSS(true) == "#9dd5ea") {
					dot.fillColor = "a4ea9d";
				} else {
					dot.fillColor = "e2ea9d";
				}
				dot.blendMode = "overlay";
				//and then check for distance and direction to move dot
				//Use Translate??
				if(Math.abs(xDist) < PUSH_DIST) dot.position.x -= xDist/2;
				if(Math.abs(yDist) < PUSH_DIST) dot.position.y -= yDist/2;
				//finally, check if the pushed dot is now in the goal
				if(magnet.contains(dot.position)) {
					dot.fillColor = "red";
				}
			}
		}
	}
}

function onMouseDown(event) {
	if(magnet.contains(event.point)) isBeingDragged = true;
}

function onMouseDrag(event) {
	if(isBeingDragged) magnet.position = event.point;
	if(magnet.contains(event.point)) {
		for(var i=0; i<NUM_ROWS; i++) {
			for(var j=0; j<NUM_ROWS; j++) {
				//For every dot in the grid...
				var dot = grid[i][j];
				if(magnet.contains(dot.position)) {
					dot.fillColor = "red";
					dot.blendMode = "overlay";
				}
			}
		}
	}
}
function onMouseUp(event) {
	isBeingDragged = false;
}