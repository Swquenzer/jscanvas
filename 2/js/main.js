//Paperscript
//variables
var settings = {
	//General
	//elementRad is often used as an element offset
	elementRad: 10,
	elementSize: 20,
	//Player
	//Grass
	longGrassAmt: 100,
	shortGrassAmt: 300
};

var events = {
	whichKey: null
}
var allElements = new Group(); //Implement this!

function randomPlacement() {
	return Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
}

var shortGrass = new function() {
	var group = new Group();
	allElements.addChild(group);
	var shape = new Shape.Circle({
		radius: settings.elementRad,
		fillColor: '74c468'
	});
	var grassSym = new Symbol(shape);
	return {
		shape: shape,
		children: group.children,
		make: function(position) {
			//Place an instance of the grass shape object
			var grass = grassSym.place();
			//If a position is given, put grass there -- otherwise place randomly on screen
			if(!position) {
				var gx = randomPlacement();
				var gy = randomPlacement();
				grass.position.x = gx;
				grass.position.y = gy;
			} else {
				var gx = position.x;
				var gy = position.y;
				grass.position.x = gx;
				grass.position.y = gy;
			}
			return grass;
		},
		add: function(position) {
			var grass = this.make(position);
			group.addChild(grass);
		}
	}
}

var longGrass = new function() {
	var group = new Group();
	allElements.addChild(group);
	var shape = new Shape.Circle({
		radius: settings.elementRad,
		fillColor: 'green',
		blendMode: 'multiply'
	});
	var grassSym = new Symbol(shape);
	return {
		shape: shape,
		children: group.children,
		make: function(position) {
			//Place an instance of the grass shape object
			var grass = grassSym.place();
			//If a position is given, put grass there -- otherwise place randomly on screen
			if(!position) {
				var gx = randomPlacement();
				var gy = randomPlacement();
				grass.position.x = gx;
				grass.position.y = gy;
			} else {
				var gx = position.x;
				var gy = position.y;
				grass.position.x = gx;
				grass.position.y = gy;
			}
			grass.initialPosition = new Point(gx, gy);
			return grass;
		},
		add: function(position) {
			var grass = this.make(position);
			group.addChild(grass);
		}
	}
}

var player = new function() {
	var group = new Group();
	var player = new Shape.Circle({
		center: [settings.elementRad, settings.elementRad],
		radius: settings.elementRad,
		fillColor: '494835',
		strokeColor: 'white'
	});
	return {
		shape: player,
		checkCollisions: function() {
			for(var i=0, elements=longGrass.children; i<elements.length; i++) {
				var element = elements[i];
				if(element.bounds.intersects(player.bounds)) {
					if(whichKey === 'left' || whichKey === 'right') {
						element.position.y += settings.elementSize/5;
					} else {
						element.position.x += settings.elementSize/5;
					}
				}
			}
		},
		move: function(direction) {
			switch(direction) {
				case 'left':
					player.position.x -= 1;
					break;
				case 'right':
					player.position.x += 1;
					break;
				case 'up':
					player.position.y -= 1;
					break;
				case 'down':
					player.position.y += 1;
			}
		}
	}
}

function beOriginal() {
	var playerBounds = player.bounds;
	//Loop through all the longGrass objects
	for(var i=0; i<longGrass.children.length; i++) {
		var child = longGrass.children[i];
		//If grass is in incorrect position
		if(child.position != child.initialPosition){
			//And if the player is no long in the grass's initial position
			if(!player.shape.contains(child.initialPosition)) {
				//then decide which direction to move the grass back to its initial position
				//In increments for animation
				if(child.position.x != child.initialPosition.x)
					child.position.x -= settings.elementSize/5;
				else
					child.position.y -= settings.elementSize/5;
			}
		}
	}
}

function onFrame(event) {
	player.checkCollisions();
	//if grass is not in correct spot, use original position to pull it back
	//START HERE
	beOriginal();
}

/*
function randomPlacement() {
	var point = new Point(1,1);
	for(var i=0; i<allElements.children.length; i++) {
		for(var j=0; j<allElements.children[i].children.length; j++) {
			var element = allElements.children[i].children[j];
			var randPos1 = Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
			var randPos2 = Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
			while(element.shape.contains(new Point(randPos1, randPos2)) {
				randPos1 = Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
				randPos2 = Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
			}
			point = new Point(randPos1, randPos2);
		}
	}
	return point;
}
*/

var map = ["slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "lsssllllssllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "slslslslllllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "lsssllllssllllslslsssllll"];

function populate() {
	var posX = settings.elementRad;
	var posY = settings.elementRad;

	for(var i=0, len=map.length; i<len; i++) {
		for(var j=0; j<map[i].length; j++) {
			if(map[i].charAt(j) === 'l') {
				longGrass.add(new Point(posX, posY));
			} else if(map[i].charAt(j) === 's') {
				shortGrass.add(new Point(posX, posY));
			}
			posX += settings.elementSize;
		}
		posX = settings.elementRad;
		posY += settings.elementSize;
	}
}

function run() {
	populate();
}

function onKeyUp(event) {
	//Keyboard
	//Turn this shit into a switch statement
	var distance = settings.elementSize;
	
	if(event.key == 'left') {
		player.shape.position.x -= distance;
		whichKey = event.key;
	} else if(event.key == 'right') {
		player.shape.position.x += distance;
		whichKey = event.key;
	} else if(event.key == 'up') {
		player.shape.position.y -= distance;
		whichKey = event.key;
	} else if(event.key == 'down') {
		player.shape.position.y += distance;
		whichKey = event.key;
	}
}

function onKeyDown(event) {
	return false;
}

run();