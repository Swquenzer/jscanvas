//Paperscript
//variables
var settings = {
	//General
	elementRad: 10,
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
			grass.position = position ? position : Point.random()*view.size;
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
		checkCollisions: function() {
			for(var i=0, elements=longGrass.children; i<elements.length; i++) {
				var element = elements[i];
				if(element.bounds.intersects(player.bounds)) {
					console.log("whatup");
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
	//Keyboard
	//Turn this shit into a switch statement
	if(Key.isDown('left') && !keyIsPressed) {
		player.move('left');
		events.keyIsPressed = true;
	} else if(Key.isDown('right') && !keyIsPressed) {
		player.move('right');
		events.keyIsPressed = true;
	} else if(Key.isDown('down') && !keyIsPressed) {
		player.move('down');
		events.keyIsPressed = true;
	} else if(Key.isDown('up') && !keyIsPressed) {
		player.move('up');
		events.keyIsPressed = true;
	} else keyIsPressed = false;
}

function populate() {
	for(var i=0; i<settings.longGrassAmt; i++) {
		longGrass.add();
	}
}

function run() {
	populate();
}

run();