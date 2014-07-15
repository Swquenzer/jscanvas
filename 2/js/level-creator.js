//level-creator.js
var MAP_SIZE = 25;
var TILE_SIZE = 20;
var map = [];
var tiles = [];

var currentElement = "s";
var colors = {
	d: "e0dc8b",
	s: "74c468",
	l: "378921",
	b: "635f54",
	m: "bc2d2d"
};
//Determine if mouse is pressed, if so mouseDown == true
var mouseDown = false;
document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}

var posX = TILE_SIZE/2;
var posY = TILE_SIZE/2;

for(var i=0; i<MAP_SIZE; i++) {
	tiles[i] = new Array();
	map[i] = "";
	for(var j=0; j<MAP_SIZE; j++) {
		map[i] += 'd';
		tiles[i][j] = new Shape.Rectangle({
			point: [posX, posY],
			size: [TILE_SIZE, TILE_SIZE],
			//Initialize all tiles as dirt
			fillColor: colors['d'],
			strokeColor: 'gray'
		});

		//Add boulders around entire outer edge
		if(i==0 || i==MAP_SIZE-1 || j==0 || j==MAP_SIZE-1) {
			tiles[i][j].fillColor = colors['b'];
		}
		//Draw tiles
		tiles[i][j].onMouseMove = function(event) {
			if(mouseDown) this.fillColor = colors[currentElement];
		}
		posX += TILE_SIZE;
	}
	posY += TILE_SIZE;
	posX = TILE_SIZE/2;
	//Initialize each row of empty strings
}

window.changeElement = function(element) {
	currentElement = element;
};

function print() {
	var paragraph = document.getElementById("result");
	paragraph.innerHTML = "";
	for(var i=0; i<MAP_SIZE-1; i++) {
		paragraph.innerHTML += '"' + map[i] + '",<br>';
	}
	paragraph.innerHTML += '"' + map[MAP_SIZE-1] + '"]';
}

//Extend String class to have String.replaceAt(indice, replacementString)
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
window.build = function() {
	for(var i=0; i<MAP_SIZE; i++) {
		for(var j=0; j<MAP_SIZE; j++) {
			var col = tiles[i][j].fillColor.toCSS(true);
			col = col.slice(1);
			if(col === colors["d"]) {
				map[i] = map[i].replaceAt(j, "d");
			} else if(col === colors["s"]) {
				map[i] = map[i].replaceAt(j, "s");
			} else if(col === colors["l"]) {
				map[i] = map[i].replaceAt(j, "l");
			} else if(col === colors["b"]) {
				map[i] = map[i].replaceAt(j, "b");
			} else if(col === colors["m"]) {
				map[i] = map[i].replaceAt(j, "m");
			}
		}
	}
	print();
};


