//Paperscript
//variables
var settings = {
	//General
	//elementRad is often used as an element offset
	elementRad: 10,
	elementSize: 20,
	//Player
	//Grass
	longGrassAmt: 10
};
var events = {
	whichKey: null
}

var interactableElements = new Group(); //Implement this!

function randomPlacement() {
	return Math.round(Math.random()*(view.size.width/settings.elementSize))*settings.elementSize+settings.elementRad;
}

var longGrass = new function() {
	var group = new Group();
	var shape = new Shape.Circle({
		radius: settings.elementRad,
		fillColor: 'green'
	});
	var grassSym = new Symbol(shape);
	return {
		shape: shape,
		children: group.children,
		make: function(position) {
			//Place an instance of the grass shape object
			var grass = grassSym.place();
			//If a position is given, put grass there -- otherwise place randomly on screen
			var gx = randomPlacement();
			var gy = randomPlacement();
			grass.position.x = gx;
			grass.position.y = gy;
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
		fillColor: 'blue'
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
	for(var i=0; i<longGrass.children.length; i++) {
		var child = longGrass.children[i];
		if(child.position != child.initialPosition){
			if(!player.shape.contains(child.initialPosition)) {
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

function populate() {
	for(var i=0; i<settings.longGrassAmt; i++) {
		longGrass.add();
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