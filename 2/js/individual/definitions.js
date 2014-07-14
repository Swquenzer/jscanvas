
//Global Groups
var allElements = new Group(); //Implement this!
var interactableElements = new Group();

//Boulder definition
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

//Short Grass definition
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

//Long Grass definition
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

//Player definition
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