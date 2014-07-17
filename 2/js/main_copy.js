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
	startingPoint: new Point(30, 30),
	//Grass
	longGrassAmt: 100,
	shortGrassAmt: 300,
	//Animation
	// The higher the value, the slower the speed
	animSpeed: 10,
	animTiming: 60*2,
	animInterval: 0,
	//Text
	livesText: new Point(300,20)
};

var map =[[
"bbbbbbbbbbbbbbbbbbbbbbbbb",	//Level 1
"bsssllllssllllslslssslllb",
"bllllsslslllllssssllllllb",
"bblslslsllldddddlbbbbbbbb",
"bblllllllddddddddddddlllb",
"bbbblslddsddddddddddllllb",
"bbbbbblssssldddddslslsllb",
"bsssllllssllllslslssslllb",
"bllllsslslllddddssllllllb",
"bllllsslsllllddsssllllllb",
"bsssllllssllllbbbbbbbbbbb",
"blllllssssllsslslslslsllb",
"bllllsslslllllssssllllllb",
"blslslsllllsssslslssslllb",
"blllllssssllsslslslslsllb",
"bllllsslslllllssssllllllb",
"bllllsslslllllssssllllllb",
"blllllssssllsslslslslsllb",
"bllllsslslllllssssllllllb",
"blslslslllllllslslssslllb",
"blllllsbssllsslslslslsllb",
"bllllssbblllllssssllllllb",
"bllllssbblllllssssllllllb",
"bsssllbbbsllllslslssslllb",
"bbbbbbbbbbbbbbbbbbbbbbbbb"],

["bbbbbbbbbbbbbbbbbbbbbbbbb",
"bdddddddddddddddddddddddb",
"bddmddddddddddddddddddddb",
"bdddddddddddddddddddddddb",
"bdddddddddddddddddddddddb",
"bdddddddddddddddddddddddb",
"bdddddddddddddddddddddddb",
"bdddddddddddddddddddddddb",
"bdddddddddddddddddddddddb",
"bdddddddddddddddddddddddb",
"bmddddddddddddddddddddddb",
"bmddddddddddddddddddddddb",
"bmmddddddddddddddddddmddb",
"bdmmmddddddddddddddddmmdb",
"bdddmdllldddddddddddddmdb",
"bddddmmmllddddlddddddmmdb",
"bddbddddmllllllllddddmmdb",
"bddbbbdddmdddbbmldddddmdb",
"bdddddbbbdmmbbbmldddddmdb",
"bdddddddbbbbbbbmdmmmmdmmb",
"bdddddddddddddbbmmbbmdmmb",
"bddddddddddddddbbbbbmdmmb",
"bddddddddddddddddddbmmmmb",
"bdddddddddddmdmmmmmmmmmmb",
"bbbbbbbbbbbbbbbbbbbbbbbbb"]];

//Global Groups
var allElements = new Group(); //Implement this!
var interactableElements = new Group();

var lives = 3;
var livesHeader = new PointText({
	point: settings.livesText,
	fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 25,
    visible: false,
    content: lives
});

//Boulder definition
var boulder = new function() {
	var group = new Group();
	allElements.addChild(group);
	interactableElements.addChild(group);
	var shape = new Shape.Rectangle({
		size: [settings.elementSize-1, settings.elementSize-1],
		fillColor: '#635f54',
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

var magma = new function() {
	var group = new Group();
	allElements.addChild(group);
	interactableElements.addChild(group);
	var shape = new Shape.Circle({
		radius: settings.elementRad,
		data: "magma"
	});
	//Create radient
	shape.fillColor= {
		gradient: {
			radial: true,
			stops: [['#ffe5a0', 0.05], ['#bc2d2d', 0.7], ['#8e1f1f', 1]]
		},
		origin: shape.position,
		destination: shape.bounds.bottomCenter
	}
	var magmaSym = new Symbol(shape);
	return {
		shape: shape,
		children: group.children,
		make: function(position) {
			var magma = magmaSym.place();
			magma.position = position;
			magma.bringToFront();
			return magma;
		},
		add: function(position) {
			var magma = this.make(position);
			group.addChild(magma);
		},
		bubble: function(time) {
			if(Math.floor(time)%2 === 0) {
				shape.fillColor= {
					gradient: {
						radial: true,
						stops: [['#ffe5a0', 0.05], ['#bc2d2d', 0.7], ['#8e1f1f', 1]]
					},
					origin: shape.position,
					destination: shape.bounds.bottomCenter
				}
			} else {
				shape.fillColor= {
					gradient: {
						radial: true,
						stops: [['yellow', 0.05], ['red', 0.2], ['black', 1]]
					},
					origin: shape.position,
					destination: shape.bounds.bottomCenter
				}
			}
		}
	};
}

//Short Grass definition
var shortGrass = new function() {
	var group = new Group();
	allElements.addChild(group);
	var shape = new Shape.Circle({
		radius: settings.elementRad,
		fillColor: '#74c468'
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
		fillColor: '#e0dc8b'
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

//Long Grass definition
var longGrass = new function() {
	var group = new Group();
	allElements.addChild(group);
	interactableElements.addChild(group);
	var shape = new Shape.Circle({
		radius: settings.elementRad,
		fillColor: '#408e26',
		blendMode: 'multiply',
		data: "longGrass"
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

//Player definition
var player = new function() {
	var group = new Group();
	var player = new Shape.Circle({
		//place player in 2x2 spot (so not on top of boulder)
		center: settings.startingPoint,
		radius: settings.elementRad,
		fillColor: '#494835',
		strokeColor: 'white'
	});
	return {
		shape: player,
		group: group,
		checkCollisions: function() {
			//Change to allow other interactable elements
			//Long Grass
			for(var i=0; i<interactableElements.children.length; i++) {
				for(var j=0; j<interactableElements.children[i].children.length; j++) {
					//e == longGrass || magma, etc
					var element = interactableElements.children[i].children[j];
					if(element.bounds.intersects(player.bounds)) {
						if(element._symbol._definition._data == "longGrass") {
							if(events.whichKey === 'left' || events.whichKey === 'right') {
								element.position.y += settings.elementSize/settings.animSpeed;
							} else {
								element.position.x += settings.elementSize/settings.animSpeed;
							}
						} else if(element._symbol._definition._data == "magma") {
							this.die();
						}
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
		},
		die: function() {
			if(lives > 1) {
				lives--;
				player.position = settings.startingPoint;
				livesHeader.content = lives;
			} else  {
				//console.log(player.remove());
				gameOver();
			};
		}
	}
}

/*
var textHeaders = {
	text: new PointText({
		point: [30,30],
		fillColor: 'black',
	    fontFamily: 'Courier New',
	    fontWeight: 'bold',
	    fontSize: 25,
	    content: lives
	}),
	//Initialize Lives Header
	create: function() {
		return this.text;
	},
	updateLives: function(update) {
		this.text.content = lives;
	}
}
*/

var events = {
	whichKey: null
};

//starts at 0
var currentLevel = 1;

//Animates an element (long grass) back to its initial position if possible
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
				'd' := dirt
				'b' := boulder
				'm' := magma
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
				case 'm':
					magma.add(new Point(posX, posY));
					break;
			}
			posX += settings.elementSize;
		}
		posX = settings.elementRad;
		posY += settings.elementSize;
	}
}

function randomPlacement() {
	return Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
}

function canMove(axis, dist) {
	if(lives > 0) {
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
	else return false;
}

function updateInterval(event) {
	//console.log(event.time);
}

function onFrame(event) {
	//updateInterval(event);
	//Check to see if player has collided with any interactable elements
	player.checkCollisions();
	//if grass is not in correct spot, use original position to pull it back
	beOriginal();
	magma.bubble(event.time);
	if(Key.isDown('z')) {
		livesHeader.visible = true;
	} else livesHeader.visible = false;
}

function onKeyUp(event) {
	//Keyboard
	//Turn this shit into a switch statement
	var distance = settings.elementSize;
	events.whichKey = event.key;
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
}
var overlay = new Shape.Rectangle({
	from: [20, 20],
    to: view.size-20,
	fillColor: 'black',
	opacity: 0,
	visible: false
});
var gameOverText = new PointText({
	point: [20, view.center.y],
	strokeColor: 'white',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 72,
    content: 'Game Over!',
    visible: false
});
function gameOver() {
	lives = 0;
	var textReady = false;
	overlay.visible = true;

	overlay.onFrame = function(event) {
		if(overlay.opacity < 1) {
			overlay.opacity += .02;
		} else {
			gameOverText.visible = true;
		}
	}
	//if(overlay.opacity === .7)
}

function run() {
	populate();
}

run();