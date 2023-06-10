/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

let isLeft;
let isRight;
let isFalling;
let isPlummeting;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon


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

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isLeft == true) {
		gameChar_x -= 5;
	}

	if (isRight == true) {
		gameChar_x += 5;
	}

	if (gameChar_y < floorPos_y) {
		gameChar_y += 4;
		isFalling = true;
	} else {
		isFalling = false;
	}

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

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
		gameChar_y -= 100;
		isFalling = true;
		console.log("Jumped");
		console.log("isFalling: " + isFalling);
	} else {
		console.log("Prevented Doubled Jumping");
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
