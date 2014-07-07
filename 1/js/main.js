//Paperscript
//Constants
var SPACING = 30;
var X_CENTER = view.viewSize.width/2;
var Y_CENTER = view.viewSize.height/2;
var NUM_ROWS = 30;

//Create Grid of dots
var grid = [];
(function(numRows) {
	for(var i=0; i<numRows; i++) {
		grid[i] = new Array(numRows);
		for(var j=0; j<numRows; j++) {
			grid[i][j] = new Shape.Circle({
				center: [i*SPACING, j*SPACING],
			    radius: 5,
			    strokeColor: 'black'
			});
		}
	}
})(30);

function onMouseMove(event) {
	for(var i=0; i<NUM_ROWS; i++) {
		for(var j=0; j<NUM_ROWS; j++) {
			var xDist = event.point.x - grid[i][j].position.x;
			var yDist = event.point.y - grid[i][j].position.y;
			if((Math.abs(xDist) < 5) && (Math.abs(yDist) < 5)) {
				if(Math.abs(xDist) <5) grid[i][j].position -= xDist;
				if(Math.abs(yDist) <5) grid[i][j].position -= yDist;
 			}
		}
	}
}