//Paperscript
//variables
var settings = {
	//General
	elementRad: 10,
	//Player
	//Grass
	longGrassAmt: 10
};

var interactableElements = Group(); //Implement this!

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
	if(Key.isDown('left')) {
		player.move('left');
	}
	if(Key.isDown('right')) {
		player.move('right');
	}
	if(Key.isDown('down')) {
		player.move('down');
	}
	if(Key.isDown('up')) {
		player.move('up');
	}
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