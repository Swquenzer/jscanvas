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
	keyIsPressed: false
}

var interactableElements = new Group(); //Implement this!

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
			//console.log(Math.random()*100)
			grass.position.x = Math.round(Math.random()*25)*settings.elementSize+settings.elementRad;
			grass.position.y = Math.round(Math.random()*25)*settings.elementSize+settings.elementRad;
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

function onFrame(event) {
	player.checkCollisions();
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
	console.log(distance);
	if(event.key == 'left') {
		player.shape.position.x -= distance;
	} else if(event.key == 'right') {
		player.shape.position.x += distance;
	} else if(event.key == 'up') {
		player.shape.position.y -= distance;
	} else if(event.key == 'down') {
		player.shape.position.y += distance;
	}
}

function onKeyDown(event) {
	return false;
}

run();