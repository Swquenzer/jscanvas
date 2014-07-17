
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
				console.log(player.remove());
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
