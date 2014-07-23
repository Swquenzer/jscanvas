

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
	//check to see if any bullets exist. If so, animate to nearest collidable object
	if(bullets.length !== 0) {
		bullets.forEach(function(bullet, index) {
			boulder.children.forEach(function(boulder) {
				if(bullet.bounds.intersects(boulder.bounds)) {
					bullet.remove();
					bullets.splice(index, 1);
					boulder._symbol._definition._data.strength--;
					if(boulder._symbol._definition._data.strength <= 0) {
						boulder.remove();
					}
					
				}
			});
			switch(bullet._data) {
				case 'left':
					bullet.position.x -= 3;
					break;
				case 'right':
					bullet.position.x += 3;
					break;
				case 'up':
					bullet.position.y -= 3;
					break;
				case 'down':
					bullet.position.y += 3;
					break;
			}
		});
	}
}

function onKeyUp(event) {
	//Keyboard
	//Turn this shit into a switch statement
	var distance = settings.elementSize;
	switch(event.key) {
		case 'left':
			if(canMove('x', -1*distance)) player.shape.position.x -= distance;
			events.whichKey = event.key;
			break;
		case 'right':
			if(canMove('x', distance)) player.shape.position.x += distance;
			events.whichKey = event.key;
			break;
		case 'up':
			if(canMove('y', -1*distance)) player.shape.position.y -= distance;
			events.whichKey = event.key;
			break;
		case 'down':
			if(canMove('y', distance)) player.shape.position.y += distance;
			events.whichKey = event.key;
			break;
		case 'space':
			player.shoot();
			break;
		default:
			//events.whichKey = null;
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
	point: [40, view.center.y],
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