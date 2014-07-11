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

//starts at 0
var currentLevel = 1;

//Global Groups
var allElements = new Group(); //Implement this!
var interactableElements = new Group();

function randomPlacement() {
	return Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
}
//boulder definition
var boulder = new function() {
	var group = new Group();
	allElements.addChild(group);
	interactableElements.addChild(group);
	var shape = new Shape.Rectangle({
		size: [settings.elementSize-1, settings.elementSize-1],
		fillColor: '635f54',
		strokeColor: 'white'
	});
	var boulderSym = new Symbol(shape);
	return {
		shape: shape,
		children: group.children,
		make: function(position) {
			var boulder = boulderSym.place();
			boulder.position = position;
			boulder.bringToFront();
			return boulder;
		},
		add: function(position) {
			var boulder = this.make(position);
			group.addChild(boulder);
		}
	}
};

//shortGrass definition
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
			grass.position = position;
			grass.initialPosition = position;
			return grass;
		},
		add: function(position) {
			var grass = this.make(position);
			group.addChild(grass);
		}
	}
}

//Dirt Definition
var dirt = new function() {
	var group = new Group();
	allElements.addChild(group);
	var shape = new Shape.Circle({
		radius: settings.elementRad,
		fillColor: 'e0dc8b'
	});
	var dirtSym = new Symbol(shape);
	return {
		shape: shape,
		children: group.children,
		make: function(position) {
			//Place an instance of the dirt shape object
			//Place an instance of the grass shape object
			var dirt = dirtSym.place();
			//If a position is given, put grass there -- otherwise place randomly on screen
			dirt.position = position;
			dirt.initialPosition = position;
			return dirt;
		},
		add: function(position) {
			var dirt = this.make(position);
			group.addChild(dirt);
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
			grass.position = position;
			grass.initialPosition = position;
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
		//place player in 2x2 spot (so not on top of boulder)
		center: [settings.elementRad*3, settings.elementRad*3],
		radius: settings.elementRad,
		fillColor: '494835',
		strokeColor: 'white'
	});
	return {
		shape: player,
		checkCollisions: function() {
			//Change to allow other interactable elements
			//Long Grass
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
		//Fix this up
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
	for(var i=0, len=map[currentLevel].length; i<len; i++) {
		for(var j=0; j<map[currentLevel][i].length; j++) {
			/* 
				'l' := longGrass
				's' := shortGrass
				'g' := ground
				'b' := boulder
			*/
			switch(map[currentLevel][i].charAt(j)) {
				case 'l':
					longGrass.add(new Point(posX, posY));
					break;
				case 's':
					shortGrass.add(new Point(posX, posY));
					break;
				case 'd':
					dirt.add(new Point(posX, posY));
					break;
				case 'b':
					boulder.add(new Point(posX, posY));
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

function canMove(axis, dist) {
	var px = new Point(player.shape.position.x + dist, player.shape.position.y);
	var py = new Point(player.shape.position.x, player.shape.position.y + dist);
	for(var i=0; i<boulder.children.length; i++) {
		if(axis === 'x' && boulder.children[i].contains(px)) {
			return false;
		} else if(axis === 'y' && boulder.children[i].contains(py)) {
			return false;
		}
	}
	return true;
}

function onKeyUp(event) {
	//Keyboard
	//Turn this shit into a switch statement
	var distance = settings.elementSize;
	events.whichKey = event.key;
	//if(canMove(event.key)) {
		switch(event.key) {
			case 'left':
				if(canMove('x', -1*distance)) player.shape.position.x -= distance;
				break;
			case 'right':
				if(canMove('x', distance)) player.shape.position.x += distance;
				break;
			case 'up':
				if(canMove('y', -1*distance)) player.shape.position.y -= distance;
				break;
			case 'down':
				if(canMove('y', distance)) player.shape.position.y += distance;
				break;
			default:
				events.whichKey = null;
		}
	//}
}

function onKeyDown(event) {
	return false;
}

run();