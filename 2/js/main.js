/*
** Title: Adventure Time!
** Author: Stephen Quenzer
** Date Created: July 10, 2014
** Description: A 2D top-down adventure game made using paperjs (paperscript)
*/

//Paperscript
//variables
var settings = {
	//General
	//elementRad is often used as an element offset
	elementRad: 10,
	//Must be twice elementRad size
	elementSize: 20,
	//Player
	//Grass
	longGrassAmt: 100,
	shortGrassAmt: 300,
	//Animation
	// The higher the value, the slower the speed
	animSpeed: 10
};

var events = {
	whichKey: null
}

var map = ["slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "lsssllllssllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "slslslslllllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "lllllsslslllllsssslllllll",
		   "lsssllllssllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "slslslslllllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "lllllsslslllllsssslllllll",
		   "lsssllllssllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "slslslslllllllslslsssllll",
		   "slllllssssllsslslslslslll",
		   "lllllsslslllllsssslllllll",
		   "lllllsslslllllsssslllllll",
		   "lsssllllssllllslslsssllll",
		   "slllllssssllsslslslslslll"];

//Global Groups
var allElements = new Group(); //Implement this!
var interactableElements = new Group();

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
			//Change to allow other interactable elements
			for(var i=0, elements=longGrass.children; i<elements.length; i++) {
				var element = elements[i];
				if(element.bounds.intersects(player.bounds)) {
					if(events.whichKey === 'left' || events.whichKey === 'right') {
						element.position.y += settings.elementSize/settings.animSpeed;
					} else {
						element.position.x += settings.elementSize/settings.animSpeed;
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
					child.position.x -= settings.elementSize/settings.animSpeed;
				else
					child.position.y -= settings.elementSize/settings.animSpeed;
			}
		}
	}
}

function onFrame(event) {
	//Check to see if player has collided with any interactable elements
	player.checkCollisions();
	//if grass is not in correct spot, use original position to pull it back
	beOriginal();
	
}

function populate() {
	//Start placing elements at radius offset
	var posX = settings.elementRad;
	var posY = settings.elementRad;

	//Loop through map and decide what to add
	for(var i=0, len=map.length; i<len; i++) {
		for(var j=0; j<map[i].length; j++) {
			/* 
				'l' := longGrass
				's' := shortGrass
				'g' := ground
			*/
			switch(map[i].charAt(j)) {
				case 'l':
					longGrass.add(new Point(posX, posY));
					break;
				case 's':
					shortGrass.add(new Point(posX, posY));
					break;
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
	events.whichKey = event.key;
	switch(event.key) {
		//events.whichKey = event.key;
		case 'left':
		player.shape.position.x -= distance;
		break;
		case 'right':
		player.shape.position.x += distance;
		break;
		case 'up':
		player.shape.position.y -= distance;
		break;
		case 'down':
		player.shape.position.y += distance;
		break;
		default:
		events.whichKey = null;
	}
}

function onKeyDown(event) {
	return false;
}

run();