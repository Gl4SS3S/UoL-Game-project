/*

The Game Project

Week 14

Game Mechanics

*/

// Global variables
let value = 0;
var gameChar_x;
var gameChar_y;
var floorPos_y;
var game_paused;
let direction_xPos;
let initialPos_y;
let game_score;

// Character states
let isLeft;
let isRight;
let isFalling;
let isPlummeting;
let onPlatform;

// Arrays
let trees_x;
let treePos_y;

// Objects
let clouds;
let mountain;
let collectables;
let canyons = [];
let flagpole;
let enemies = [];
let platforms = [];
let platform_y;

// Lives
let lives;
let game_over;

// Sounds
let backgroundMusic;
let diedSound;
let gameOverSound;
let completedSound;
let collectableSound;
let jumpSound;

function preload() {
  soundFormats('mp3', 'ogg', 'wav');

  // Load sounds
  backgroundMusic = loadSound('sounds/background.mp3');
  diedSound = loadSound('sounds/died.wav');
  gameOverSound = loadSound('sounds/game-over.wav');
  completedSound = loadSound('sounds/completed.wav');
  collectableSound = loadSound('sounds/collectable.wav');
  jumpSound = loadSound('sounds/jump.wav');

  // Set volume
  backgroundMusic.setVolume(0.1);
  diedSound.setVolume(0.4);
  gameOverSound.setVolume(0.4);
  completedSound.setVolume(0.4);
  collectableSound.setVolume(0.4);
  jumpSound.setVolume(0.4);
}

// Setup the game
function setup()
{
	createCanvas(1024, 576);

  // Start looping the background music
  backgroundMusic.loop();

  // Set the initial position of the floor
	floorPos_y = height * 3/4;

  // Set the initial position of the direction board
  direction_xPos = -500;
	startGame();

  // Initialize the lives
	lives = 3;
}

// Draw each frame
function draw()
{	
	///////////DRAWING CODE//////////
  // If game is paused, exit the draw function
  if (game_paused) {
    return;
  }

  // Check if the flagpole has been reached
	if (flagpole.isReached) {
		fill(0, 255, 0);
		textSize(50);

     // Display "Level Complete" text at the center of the screen
		text("Level Complete", width/2 - 100, height/2);
		textSize(30);
		text("Press space to continue", width/2 - 150, height/2 + 50);
		return;
	}

  // Check if the game is over
	if (game_over) {
		fill(255, 0, 0);
		textSize(50);

    // Display "Game Over" text at the center of the screen
		text("Game Over", width/2 - 100, height/2);
		textSize(30);
		text("Press space to continue", width/2 - 150, height/2 + 50);
		return;
	}

  // Set the background color
	background(100,155,255); //fill the sky blue

	// Draw mountains.
	drawMountains();

	// Draw clouds.
	drawClouds();

	// Check if trees are on screen and alter the array accordingly
	drawTrees();

  // Draw the platforms
  for (let index = 0; index < platforms.length; index++) {
    platforms[index].draw();  
  }

  // Draw the ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
	
  // Draw the canyons
  drawCanyons();

	// Draw the collectable items
	for (let index = 0; index < collectables.length; index++) {
    // Check if collectable was collected and play sound
		if (dist(gameChar_x, gameChar_y, collectables[index].x_pos, collectables[index].y_pos) < 50) {
			collectables[index].collected = true;
      collectableSound.play();
		}
    // Draw collectable
		drawCollectable(collectables[index]);

    // Check if collectable was collected and add to score
		if (collectables[index].collected == true) {
			game_score += 1;
			collectables.splice(index, 1);
		}
	}

  // Check if the player is on a platform
  for (let index = 0; index < platforms.length; index++) {
    // Check if player is on platform
		if (gameChar_x + 12 > platforms[index].x && gameChar_x - 12 < platforms[index].x + platforms[index].width && gameChar_y <= platforms[index].y) {
			onPlatform = true;
      platform_y = platforms[index].y;
			break;
		} else {
			onPlatform = false;
		}
	}

  // Check if the player is on a canyon and set isPlummeting to true
  for (let index = 0; index < canyons.length; index++) {
    if (gameChar_x - 13 > canyons[index].x_pos && gameChar_x + 13 < canyons[index].x_pos + canyons[index].width && !onPlatform) {
      isPlummeting = true;
      break;
    } else {
      isPlummeting = false;
    }
  }

  // Check if the player is on a platform and set isFalling to false
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

  // Check the conditions for the enemies to kill the player
	checkPlayerDie();

  // Check if the player is on the flagpole
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
    direction_xPos += 5;
		mountain.x_pos += 1;
	}

	// If character is moving right, move the scenery to the left
	if (isRight == true) {
    // Move the scenery to the left
		for (let index = 0; index < trees_x.length; index++) {
			trees_x[index] -= 5;
		}
    // Move the clouds to the left
		for (let index = 0; index < clouds.length; index++) {
			clouds[index].x_pos -= 3;
		}
    // Move the collectables to the left
		for (let index = 0; index < collectables.length; index++) {
			collectables[index].x_pos -= 5;
		}
    // Move the canyons to the left
		for (let index = 0; index < canyons.length; index++) {
			canyons[index].x_pos -= 5;
		}
    // Move the platforms to the left
    for (let index = 0; index < platforms.length; index++) {
			platforms[index].x -= 5;
		}
    // Move the enemies to the left
    for (let index = 0; index < enemies.length; index++) {
			enemies[index].x -= 5;
		}

    // Move the flagpole to the left
		flagpole.x_pos -= 5;
		direction_xPos -= 5;
		mountain.x_pos -= 1;
	}

  // If character is falling, move the character down
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

  // Set the text size
	textSize(30);

	// Green text that displays the game score
	fill(0, 255, 0);
	text('Game Score: ' + game_score, 10, 30);

  // Red text that displays the number of lives
	fill(255, 0, 0);
	text('Lives: ', 10, 70);

  // Draw hearts for the number of lives
  for (let index = 0; index < lives; index++) {
    fill(255, 0, 0);
    // Draw heart
    ellipse(110 + (index * 40), 56.6 + 1.5 * sin(value), 20, 20);
    ellipse(126.6 + (index * 40), 56.6 + 1.5 * sin(value), 20, 20);
    triangle(135 + (index * 40), 62.6 + 1.5 * sin(value), 118 + (index * 40), 80 + 1.5 * sin(value), 102 + (index * 40), 62.6 + 1.5 * sin(value));
  }

  // Draw the directions when player goes in the wrong direction
  drawDirections();
}


function keyPressed()
{
  // Starts the game over when space is pressed and the game is over
	if ((game_over || flagpole.isReached) && keyCode == 32) {
		startGame();
		lives = 3;
	}

  // Pause game when escape key is pressed
  if (keyCode == 27) {
    console.log("Game Paused");
    game_paused = !game_paused;
  }

	// if statements to control the animation of the character when
	// keys are pressed.
	if (!isPlummeting) {
    // Check if Left (D) key is pressed
		if (keyCode == 65) {
			isLeft = true;
			console.log("Left Key Pressed");
			console.log("isLeft: " + isLeft);
		}
	
    // Check if Right (A) key is pressed
		if (keyCode == 68) {
			isRight = true;
			console.log("Right Key Pressed");
			console.log("isRight: " + isRight);
		}
	
    // Check if character is on platform or on the ground
		if (keyCode == 87 && isFalling == false) {
			gameChar_y -= 140;
			isFalling = true;
      jumpSound.play();
			console.log("Jumped");
			console.log("isFalling: " + isFalling);
		} else {
			console.log("Prevented Doubled Jumping");
		}
	}
}

// Check which key is released and the set the animation states for the character
function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
  // Check if Left (D) key is released
	if (keyCode == 65) {
		isLeft = false;
		console.log("Left Key Released");
		console.log("isLeft: " + isLeft);
	}

  // Check if Right (A) key is released
	if (keyCode == 68) {
		isRight = false;
		console.log("Right Key Released");
		console.log("isRight: " + isRight);
	}
}

// Function to draw the mountains objects.
function drawMountains() {
  // Manipulate the mountain object to check if it is on screen
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

// Function to draw tree objects and check if they are on screen
function drawTrees() {
  // Manipulate the array to check if trees are on screen
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

  // Draw the trees.
	for (let index = 0; index < trees_x.length; index++) {
		fill(139, 69, 19);
		rect(trees_x[index], treePos_y + 45, 50, 100);
		fill(0, 145, 0);
		triangle(trees_x[index] - 30 + 1.2 * sin(value), treePos_y + 50, trees_x[index] + 80 + .5 * sin(value), treePos_y + 50, trees_x[index] + 25 + 1.2 * sin(value), treePos_y - 50);
		fill(0, 150, 0);
		triangle(trees_x[index] - 30 + 1 * sin(value), treePos_y + 10, trees_x[index] + 80 + 1.1 * sin(value), treePos_y + 10, trees_x[index] + 25+ 1 * sin(value), treePos_y - 80);
		fill(0, 155, 0);
		triangle(trees_x[index] - 30 + .5 * sin(value), treePos_y - 30, trees_x[index] + 80 + 2 * sin(value), treePos_y - 30, trees_x[index] + 25 + .5 * sin(value), treePos_y - 110);
	}
}

// Function to draw the clouds objects and check if they are on screen
function drawClouds() {
  // Manipulate the array to check if clouds are on screen
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
		ellipse(clouds[index].x_pos, clouds[index].y_pos + .5 * sin(value), 80, 80);
		ellipse(clouds[index].x_pos - 30, clouds[index].y_pos + 10 + .45 * sin(value), 60, 60);
		ellipse(clouds[index].x_pos + 20, clouds[index].y_pos + 5 + .5 * sin(value), 70, 70);
		ellipse(clouds[index].x_pos - 50, clouds[index].y_pos + 20 + .65 * sin(value), 40, 40);
		ellipse(clouds[index].x_pos + 55, clouds[index].y_pos + 5 + .95 * sin(value), 70, 70);
		ellipse(clouds[index].x_pos + 85, clouds[index].y_pos + 10 + .85 * sin(value), 50, 50);
		ellipse(clouds[index].x_pos + 65, clouds[index].y_pos + 10 + .7 * sin(value), 60, 60);	
	}
}

// Function to draw the collectable objects
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
  // Set the value for the sin function
  value += deltaTime * 0.001;
}

// Function to draw the canyons objects
function drawCanyons() {
  for (let index = 0; index < canyons.length; index++) {
	  //Brown rectangle going to the botton of the screen
    fill(139,69,19);
	  rect(canyons[index].x_pos, 432, canyons[index].width, 144);
  }
}

// Function to draw the flagpole
function renderFlagpole() {
  // Draw flagpole
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

  // Check if the flagpole has been reached and draw the flag
	if (flagpole.isReached) {
		fill(0, 255, 0);
		rect(flagpole.x_pos, floorPos_y - 250, 50, 40);
	}
}

// Function to check if the player is on the flagpole
function checkFlagpole() {
	if (flagpole.isReached == true) {
		return;
	}

	// If character is at flagpole, set flagpole.isReached to true
	if (gameChar_x > flagpole.x_pos && gameChar_x < flagpole.x_pos + 50) {
		flagpole.isReached = true;
    completedSound.play();
	}
}

// Function to check if the player is dead
function checkPlayerDie() {
  // Check if the player off the screen and set game_over to true if lives are 0
	if (gameChar_y - 150 > height) {
		lives -= 1;
		if (lives > 0) {
			startGame();
      diedSound.play();
		} else {
			game_over = true;
      gameOverSound.play();
		}
	}

  // Check if the player is touching an enemy and set game_over to true if lives are 0
  for (let index = 0; index < enemies.length; index++) {
    if (dist(gameChar_x, gameChar_y, enemies[index].x, enemies[index].y) < 20) {
      lives -= 1;
      if (lives > 0) {
        startGame();
        diedSound.play();
      } else {
        game_over = true;
        gameOverSound.play();
      }
    }
  }
}


// Function to initialize the game
function startGame() {
  // Set the platforms and enemies arrays to empty
  platforms=[];
  enemies=[];

  // Set the game character position
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

  // Set the game character states
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

  // Set the collectables array
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

  // Set the mountain object
	mountain = {
		x_pos: 280,
		y_pos: 432,
	}

  // Set the clouds array
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

  // Set the canyons array
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

  // Set the trees array
	trees_x = [100, 350, 500, 700, 900];
	treePos_y = height/2;

  // Set the game score
	game_score = 0;

  // Set the game over state
	game_over = false;

  // Set the flagpole object
	flagpole = {
		x_pos: 4300,
		isReached: false
	}

  let previousPlatform;

  // Create the platforms array with random x and y positions
  for (let index = 0; index < 100; index++) {
    // Create a random number between 0 and 1
    let probability = random(0, 1);

    // Create a platform if the probability is greater than 0.80
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

  // Create the enemies array based on the canyons array
  for (let index = 0; index < canyons.length; index++) {
    let e = new Enemy(canyons[index].x_pos + canyons[index].width, floorPos_y - 10);
    enemies.push(e);
  }
}

// Function to create the enemy object
function Enemy(x_pos, y_pos){
    // Set the enemy properties
    this.x = x_pos;
    this.y = y_pos;
    this.width = 40;
    this.height = 40;
    this.x_speed = random(1, 3);
    this.direction = 1;

    // Draw the enemy
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

    // Move the enemy
    this.move = function(){
      // Check if the enemy is at the edge of the canyon and change direction
      if (this.direction == 1) {
        this.x += this.x_speed;  
      } else if (this.direction == 2) {
        this.x -= this.x_speed;
      }
    }
}

// Function to create the platform object
function createPlatform(x_pos, y_pos){
  let p = {
    // Set the platform properties
    x: x_pos,
    y: y_pos,
    width: 100,

    // Draw the platform
    draw: function(){
      fill(255, 0, 0);
      rect(this.x, this.y, this.width, 20);
    }
  }

  // Return the platform object
  return p;
}

// Function to draw the direction post
function drawDirections() {
  // Draw direction post with brown rectangle
  fill(139,69,19);
  rect(direction_xPos, floorPos_y - 100, 10, 100);

  // Draw the sign
  fill(139,69,19);
  rect(direction_xPos - 70, floorPos_y - 150, 150, 50);

  // Draw the text
  fill(255);
  textSize(20);
  text("Wrong way...", direction_xPos - 45, floorPos_y - 120);
}

