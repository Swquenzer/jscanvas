
var events = {
	whichKey: null
}

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

console.log(interactableElements.children[0].children[0]);
console.log(interactableElements.children[1].children[0]);

run();