/*

The Game Project

Week 14

Game Mechanics

*/

let value = 0;
var gameChar_x;
var gameChar_y;
var floorPos_y;
var game_paused;

let initialPos_y;

var canyon;
var collectable;
let game_score;

var cloud;
let flagpole;

let isLeft;
let isRight;
let isFalling;
let isPlummeting;
let onPlatform;

let trees_x;
let treePos_y;

let clouds;
let mountain;
let collectables;
let canyons = [];

let enemies = [];

let platforms = [];
let platform_y;

let lives;
let game_over;

// Sounds
let backgroundMusic;

function preload() {
  soundFormats('mp3', 'ogg');

  // Load sounds
  backgroundMusic = loadSound('sounds/background.mp3');
  backgroundMusic.setVolume(0.1);
}

function setup()
{
	createCanvas(1024, 576);
  backgroundMusic.loop();
	floorPos_y = height * 3/4;

	startGame();

	lives = 3;
}

function draw()
{
	
	///////////DRAWING CODE//////////
  if (game_paused) {
    return;
  }

	if (flagpole.isReached) {
		fill(0, 255, 0);
		textSize(50);
		text("Level Complete", width/2 - 100, height/2);
		textSize(30);
		text("Press space to continue", width/2 - 150, height/2 + 50);
		return;
	}

	if (game_over) {
		fill(255, 0, 0);
		textSize(50);
		text("Game Over", width/2 - 100, height/2);
		textSize(30);
		text("Press space to continue", width/2 - 150, height/2 + 50);
		return;
	}

	background(100,155,255); //fill the sky blue

	// Check if mountain is on screen
	drawMountains();

	// Check if clouds are on screen and alter the array accordingly
	drawClouds();

	// Check if trees are on screen and alter the array accordingly
	drawTrees();


  for (let index = 0; index < platforms.length; index++) {
    platforms[index].draw();  
  }

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
	
  drawCanyons();

	// Draw the collectable items
	for (let index = 0; index < collectables.length; index++) {
		if (dist(gameChar_x, gameChar_y, collectables[index].x_pos, collectables[index].y_pos) < 50) {
			collectables[index].collected = true;
		}
		drawCollectable(collectables[index]);

		if (collectables[index].collected == true) {
			game_score += 1;
			collectables.splice(index, 1);
		}
	}

  for (let index = 0; index < platforms.length; index++) {
		if (gameChar_x + 12 > platforms[index].x && gameChar_x - 12 < platforms[index].x + platforms[index].width && gameChar_y <= platforms[index].y) {
			onPlatform = true;
      platform_y = platforms[index].y;
			break;
		} else {
			onPlatform = false;
		}
	}

  for (let index = 0; index < canyons.length; index++) {
    
    if (gameChar_x - 13 > canyons[index].x_pos && gameChar_x + 13 < canyons[index].x_pos + canyons[index].width && !onPlatform) {
      isPlummeting = true;
      break;
    } else {
      isPlummeting = false;
    }
  }

  for (let index = 0; index < enemies.length; index++) {
    enemies[index].draw();
    enemies[index].move();

    for (let index2 = 0; index2 < canyons.length; index2++) {
      if ((dist(enemies[index].x, enemies[index].y, canyons[index2].x_pos, floorPos_y) < 20)) {
        enemies[index].direction = 2;
      } else if (dist(enemies[index].x, enemies[index].y, canyons[index2].x_pos + canyons[index2].width, floorPos_y) < 20) {
        enemies[index].direction = 1;
      }
    }
  }

	checkPlayerDie();

	checkFlagpole();
	// Draw the flagpole
	renderFlagpole();

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		fill(255,204,153);
		ellipse(gameChar_x, gameChar_y - 60, 20, 20);
		// blue shirt
		fill(0,0,255);
		rect(gameChar_x - 8, gameChar_y - 50, 15, 25);
		fill(255,204,153);
		ellipse(gameChar_x - 12, gameChar_y - 48, 12, 12);
		// 2 black shoes
		fill(0);
		rect(gameChar_x - 12, gameChar_y - 25, 18, 8);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		fill(255,204,153);
		ellipse(gameChar_x, gameChar_y - 60, 20, 20);
		// blue shirt
		fill(0,0,255);
		rect(gameChar_x - 8, gameChar_y - 50, 15, 25);
		fill(255,204,153);
		ellipse(gameChar_x + 12, gameChar_y - 48, 12, 12);
		// 2 black shoes
		fill(0);
		rect(gameChar_x - 6, gameChar_y - 25, 18, 8);

	}
	else if(isLeft)
	{
		// add your walking left code
		fill(255,204,153);
		ellipse(gameChar_x, gameChar_y - 50, 20, 20);
		// blue shirt
		fill(0,0,255);
		rect(gameChar_x - 8, gameChar_y - 40, 15, 30);
		fill(255,204,153);
		ellipse(gameChar_x - 4, gameChar_y - 30, 12, 12);
		// 2 black shoes
		fill(0);
		rect(gameChar_x - 12, gameChar_y - 10, 18, 8);

	}
	else if(isRight)
	{
		// add your walking right code
		fill(255,204,153);
		ellipse(gameChar_x, gameChar_y - 50, 20, 20);
		// blue shirt
		fill(0,0,255);
		rect(gameChar_x - 8, gameChar_y - 40, 15, 30);
		fill(255,204,153);
		ellipse(gameChar_x + 4, gameChar_y - 30, 12, 12);
		// 2 black shoes
		fill(0);
		rect(gameChar_x - 6, gameChar_y - 10, 18, 8);
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		fill(255,204,153);
		ellipse(gameChar_x, gameChar_y - 60, 20, 20);
		// blue shirt
		fill(0,0,255);
		rect(gameChar_x - 10, gameChar_y - 50, 20, 25);
		// two hands ellipse
		fill(255,204,153);
		ellipse(gameChar_x - 14, gameChar_y - 50, 12, 12);
		ellipse(gameChar_x + 14, gameChar_y - 50, 12, 12);
		// 2 black shoes
		fill(0);
		rect(gameChar_x - 12, gameChar_y - 25, 10, 8);
		rect(gameChar_x + 2, gameChar_y - 25, 10, 8);
	}
	else
	{
		// add your standing front facing code
		fill(255,204,153);
		ellipse(gameChar_x, gameChar_y - 50, 20, 20);
		// blue shirt
		fill(0,0,255);
		rect(gameChar_x - 10, gameChar_y - 40, 20, 30);
		// two hands ellipse
		fill(255,204,153);
		ellipse(gameChar_x - 10, gameChar_y - 30, 12, 12);
		ellipse(gameChar_x + 10, gameChar_y - 30, 12, 12);
		// 2 black shoes
		fill(0);
		rect(gameChar_x - 12, gameChar_y - 10, 10, 8);
		rect(gameChar_x + 2, gameChar_y - 10, 10, 8);
	}

	// If character is moving left, move the scenery to the right
	if (isLeft == true) {
		for (let index = 0; index < trees_x.length; index++) {
			trees_x[index] += 5;
		}
		for (let index = 0; index < clouds.length; index++) {
			clouds[index].x_pos += 3;
		}
		for (let index = 0; index < collectables.length; index++) {
			collectables[index].x_pos += 5;
		}
		for (let index = 0; index < canyons.length; index++) {
			canyons[index].x_pos += 5;
		}
    for (let index = 0; index < platforms.length; index++) {
			platforms[index].x += 5;
		}
    for (let index = 0; index < enemies.length; index++) {
			enemies[index].x += 5;
		}

		flagpole.x_pos += 5;
		mountain.x_pos += 1;
	}

	// If character is moving right, move the scenery to the left
	if (isRight == true) {
		for (let index = 0; index < trees_x.length; index++) {
			trees_x[index] -= 5;
		}
		for (let index = 0; index < clouds.length; index++) {
			clouds[index].x_pos -= 3;
		}
		for (let index = 0; index < collectables.length; index++) {
			collectables[index].x_pos -= 5;
		}
		for (let index = 0; index < canyons.length; index++) {
			canyons[index].x_pos -= 5;
		}
    for (let index = 0; index < platforms.length; index++) {
			platforms[index].x -= 5;
		}
    for (let index = 0; index < enemies.length; index++) {
			enemies[index].x -= 5;
		}

		flagpole.x_pos -= 5;
		mountain.x_pos -= 1;
	}

	if (gameChar_y < floorPos_y && (isFalling) && (!onPlatform || gameChar_y < platform_y - 5)) {
		gameChar_y += 0.35 * deltaTime;
	} else if (gameChar_y < floorPos_y && !onPlatform) {
    isFalling = true;
	} else if (isPlummeting) {
		gameChar_y += 0.4 * deltaTime;
	} else {
		isFalling = false;
		isPlummeting = false;
	}

	textSize(30);
	// Green text
	fill(0, 255, 0);
	text('Game Score: ' + game_score, 10, 30);
	fill(255, 0, 0);
	text('Lives: ', 10, 70);
  for (let index = 0; index < lives; index++) {
    fill(255, 0, 0);
    // Draw heart
    ellipse(110 + (index * 40), 56.6 + 1.5 * sin(value), 20, 20);
    ellipse(126.6 + (index * 40), 56.6 + 1.5 * sin(value), 20, 20);
    triangle(135 + (index * 40), 62.6 + 1.5 * sin(value), 118 + (index * 40), 80 + 1.5 * sin(value), 102 + (index * 40), 62.6 + 1.5 * sin(value));
  }
}


function keyPressed()
{
	if ((game_over || flagpole.isReached) && keyCode == 32) {
		startGame();
		lives = 3;
	}

  // Pause game
  if (keyCode == 27) {
    console.log("Game Paused");
    game_paused = !game_paused;
  }

	// if statements to control the animation of the character when
	// keys are pressed.
	if (!isPlummeting) {
		if (keyCode == 65) {
			isLeft = true;
			console.log("Left Key Pressed");
			console.log("isLeft: " + isLeft);
		}
	
		if (keyCode == 68) {
			isRight = true;
			console.log("Right Key Pressed");
			console.log("isRight: " + isRight);
		}
	
		if (keyCode == 87 && isFalling == false) {
			gameChar_y -= 140;
			isFalling = true;
			console.log("Jumped");
			console.log("isFalling: " + isFalling);
		} else {
			console.log("Prevented Doubled Jumping");
		}
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	if (keyCode == 65) {
		isLeft = false;
		console.log("Left Key Released");
		console.log("isLeft: " + isLeft);
	}

	if (keyCode == 68) {
		isRight = false;
		console.log("Right Key Released");
		console.log("isRight: " + isRight);
	}
}

function drawMountains() {
	if (mountain.x_pos < -500) {
		mountain.x_pos = width + 10;
	} else if (mountain.x_pos > width + 550) {
		mountain.x_pos = -480;
	}

	// Draw the mountains.
	fill(200);
	triangle(mountain.x_pos, mountain.y_pos, mountain.x_pos + 320, mountain.y_pos, mountain.x_pos + 170, mountain.y_pos - 332);
	fill(180);
	triangle(mountain.x_pos + 150, mountain.y_pos, mountain.x_pos + 350, mountain.y_pos, mountain.x_pos + 250, mountain.y_pos - 232);
	fill(170);
	triangle(mountain.x_pos + 50, mountain.y_pos, mountain.x_pos + 250, mountain.y_pos, mountain.x_pos + 150, mountain.y_pos - 172);

	// add snow to mountain tops
	fill(255);
	triangle(mountain.x_pos + 120, mountain.y_pos - 122, mountain.x_pos + 150, mountain.y_pos - 172, mountain.x_pos + 192, mountain.y_pos - 102);
	triangle(mountain.x_pos + 215, mountain.y_pos - 152, mountain.x_pos + 250, mountain.y_pos - 232, mountain.x_pos + 275, mountain.y_pos - 172);
	triangle(mountain.x_pos + 144, mountain.y_pos - 280, mountain.x_pos + 206, mountain.y_pos - 250, mountain.x_pos + 170, mountain.y_pos - 332);
}

function drawTrees() {
	for (let index = 0; index < trees_x.length; index++) {
		if (trees_x[index] < -100) {
			trees_x.splice(0, 1);
			trees_x.push(width + 50);
		} 
		else if (trees_x[index] > width + 100) {
			trees_x.pop();
			trees_x.unshift(-50);
		}
	}

	for (let index = 0; index < trees_x.length; index++) {
		fill(139, 69, 19);
		rect(trees_x[index], treePos_y + 45, 50, 100);
		fill(0, 145, 0);
		triangle(trees_x[index] - 30, treePos_y + 50, trees_x[index] + 80, treePos_y + 50, trees_x[index] + 25, treePos_y - 50);
		fill(0, 150, 0);
		triangle(trees_x[index] - 30, treePos_y + 10, trees_x[index] + 80, treePos_y + 10, trees_x[index] + 25, treePos_y - 80);
		fill(0, 155, 0);
		triangle(trees_x[index] - 30, treePos_y - 30, trees_x[index] + 80, treePos_y - 30, trees_x[index] + 25, treePos_y - 110);
	}
}

function drawClouds() {
	for (let index = 0; index < clouds.length; index++) {
		if (clouds[index].x_pos < -100) {
			clouds.splice(0, 1);
			clouds.push({
				x_pos: width + 50, 
				y_pos: random(0, 100),
				size: random(50, 100)
			});
		} 
		else if (clouds[index].x_pos > width + 100) {
			clouds.pop();
			clouds.unshift({
				x_pos: -50, 
				y_pos: random(0, 100),
				size: random(50, 100)
			});
		}
	}

	// Draw the clouds.
	for (let index = 0; index < clouds.length; index++) {
		fill(255, 255, 255);
		ellipse(clouds[index].x_pos, clouds[index].y_pos, 80, 80);
		ellipse(clouds[index].x_pos - 30, clouds[index].y_pos + 10, 60, 60);
		ellipse(clouds[index].x_pos + 20, clouds[index].y_pos + 5, 70, 70);
		ellipse(clouds[index].x_pos - 50, clouds[index].y_pos + 20, 40, 40);
		ellipse(clouds[index].x_pos + 55, clouds[index].y_pos + 5, 70, 70);
		ellipse(clouds[index].x_pos + 85, clouds[index].y_pos + 10, 50, 50);
		ellipse(clouds[index].x_pos + 65, clouds[index].y_pos + 10, 60, 60);	
	}
}

function drawCollectable(t_collectable){
	if (!t_collectable.collected) {
		fill(255, 215, 0);
		ellipse(t_collectable.x_pos, t_collectable.y_pos + 2.5 * sin(value), t_collectable.size, t_collectable.size);
		fill(255, 255, 0);
		ellipse(t_collectable.x_pos, t_collectable.y_pos + 2.5 * sin(value), t_collectable.size - 10, t_collectable.size - 10);
		fill(255, 215, 0);
		ellipse(t_collectable.x_pos, t_collectable.y_pos + 2.5 * sin(value), t_collectable.size - 20, t_collectable.size - 20);
		fill(255, 255, 0);
		ellipse(t_collectable.x_pos, t_collectable.y_pos + 2.5 * sin(value), t_collectable.size - 30, t_collectable.size - 30);
	}
  value += deltaTime * 0.001;
}

function drawCanyons() {
  for (let index = 0; index < canyons.length; index++) {
	  //Brown rectangle going to the botton of the screen
    fill(139,69,19);
	  rect(canyons[index].x_pos, 432, canyons[index].width, 144);
  }
}

function renderFlagpole() {
	push();
	strokeWeight(15);
	stroke(220);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	line(flagpole.x_pos, floorPos_y - 250, flagpole.x_pos + 50, floorPos_y - 250);
	line(flagpole.x_pos + 20, floorPos_y, flagpole.x_pos - 20, floorPos_y);
	pop();
	
	// Draw the flag for the flagpole
	fill(255, 0, 0);
	noStroke();
	rect(flagpole.x_pos, floorPos_y - 250, 50, 40);

	if (flagpole.isReached) {
		fill(0, 255, 0);
		rect(flagpole.x_pos, floorPos_y - 250, 50, 40);
	}
}

function checkFlagpole() {
	if (flagpole.isReached == true) {
		return;
	}

	// If character is at flagpole, set flagpole.isReached to true
	if (gameChar_x > flagpole.x_pos && gameChar_x < flagpole.x_pos + 50) {
		flagpole.isReached = true;
	}
}

function checkPlayerDie() {
	if (gameChar_y - 150 > height) {
		lives -= 1;
		if (lives > 0) {
			startGame();
		} else {
			game_over = true;
		}
	}

  for (let index = 0; index < enemies.length; index++) {
    if (dist(gameChar_x, gameChar_y, enemies[index].x, enemies[index].y) < 20) {
      lives -= 1;
      if (lives > 0) {
        startGame();
      } else {
        game_over = true;
      }
    }
  }
}

function startGame() {
  platforms=[];
  enemies=[];

	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	canyon = {
		x_pos: width - 800, 
		width: 100
	}

	collectable = {
		x_pos: 150,
		y_pos: 390,
		size: 50,
		collected: false
	}

	collectables = [
	{
		x_pos: 450,
		y_pos: 390,
		size: 50,
		collected: false
	},
	{
		x_pos: 750,
		y_pos: 390,
		size: 50,
		collected: false
	},
	{
		x_pos: 1000,
		y_pos: 390,
		size: 50,
		collected: false
	},
	{
		x_pos: 1600,
		y_pos: 390,
		size: 50,
		collected: false
	},
	{
		x_pos: 2000,
		y_pos: 390,
		size: 50,
		collected: false
	},
  {
		x_pos: 2400,
		y_pos: 390,
		size: 50,
		collected: false
	},
  {
		x_pos: 2800,
		y_pos: 390,
		size: 50,
		collected: false
	},
  {
		x_pos: 3200,
		y_pos: 390,
		size: 50,
		collected: false
	},
  {
		x_pos: 3640,
		y_pos: 390,
		size: 50,
		collected: false
	}
]

	mountain = {
		x_pos: 280,
		y_pos: 432,
	}

	clouds = [
	{
		x_pos: 150,
		y_pos: 80,
		size: 80
	},
	{
		x_pos: 450,
		y_pos: 80,
		size: 80
	},
	{
		x_pos: 750,
		y_pos: 80,
		size: 80
	},
	{
		x_pos: 1000,
		y_pos: 80,
		size: 80
	}
]

	canyons = [
	{
		x_pos: width - 800,
		width: 100
	},
	{
		x_pos: width - 200,
		width: 100
	},
  {
		x_pos: width + 400,
		width: 100
	},
	{
		x_pos: width + 1000,
		width: 100
	},
  {
		x_pos: width + 1400,
		width: 100
	},
	{
		x_pos: width + 2000,
		width: 100
	},{
		x_pos: width + 2600,
		width: 100
	},
	{
		x_pos: width + 3200,
		width: 100
	}
]

	trees_x = [100, 350, 500, 700, 900];
	treePos_y = height/2;

	game_score = 0;

	game_over = false;

	flagpole = {
		x_pos: 4300,
		isReached: false
	}

  let previousPlatform;

  for (let index = 0; index < 100; index++) {
    let probability = random(0, 1);

    if (probability > 0.80 && previousPlatform != undefined) {
      let p = createPlatform(random(previousPlatform.x + previousPlatform.width + 20, previousPlatform.x + previousPlatform.width  + 40), random(previousPlatform.y - 40, previousPlatform.y - 80));
      platforms.push(p);
      previousPlatform = p;
    } else if(previousPlatform == undefined) {
      let p = createPlatform(random(width/2 - 20, width/2 +30), random(floorPos_y - 70, floorPos_y - 80));
      platforms.push(p);
      previousPlatform = p;
    } else {
      let p = createPlatform(random(previousPlatform.x + previousPlatform.width + 20, previousPlatform.x + previousPlatform.width  + 30), random(floorPos_y - 40, floorPos_y - 45));
      previousPlatform = p;
    }
  }

  for (let index = 0; index < canyons.length; index++) {
    let e = new Enemy(canyons[index].x_pos + canyons[index].width, floorPos_y - 10);
    enemies.push(e);
  }
}

function Enemy(x_pos, y_pos){
    this.x = x_pos;
    this.y = y_pos;
    this.width = 40;
    this.height = 40;
    this.x_speed = random(1, 3);
    this.direction = 1;
    this.draw = function(){
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.width, this.height);
      // Eye whites
      fill(255);
      ellipse(this.x - 10, this.y - 5, 20, 20);
      ellipse(this.x + 10, this.y - 5, 20, 20);
      // Eyes
      fill(0);
      ellipse(this.x - 10, this.y - 5, 5, 5);
      ellipse(this.x + 10, this.y - 5, 5, 5);
    };
    this.move = function(){
      if (this.direction == 1) {
        this.x += this.x_speed;  
      } else if (this.direction == 2) {
        this.x -= this.x_speed;
      }
    }
}

function createPlatform(x_pos, y_pos){
  let p = {
    x: x_pos,
    y: y_pos,
    width: 100,
    draw: function(){
      fill(255, 0, 0);
      rect(this.x, this.y, this.width, 20);
    }
  }

  return p;
}

