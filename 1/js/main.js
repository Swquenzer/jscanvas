//Paperscript

function onResize(event) {
	//c1.position = view.center;
	console.log("IN");
}

//Constants
var SPACING = 30;
var X_CENTER = view.viewSize.width/2;
var Y_CENTER = view.viewSize.height/2;

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