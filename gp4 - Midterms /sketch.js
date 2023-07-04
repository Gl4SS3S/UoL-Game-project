/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var canyon;
var collectable;
var mountain;
var cloud;

let isLeft;
let isRight;
let isFalling;
let isPlummeting;

let trees_x;
let treePos_y;

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

	mountain = {
		x_pos: 280,
		y_pos: 432,
	}

	cloud = {
		x_pos: 250,
		y_pos: 80,
		size: 80
	}

	trees_x = [100, 350, 500, 700, 900];
	treePos_y = height/2;
}

function draw()
{

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

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

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

	//draw the canyon
	if (!collectable.collected) {
		fill(255, 215, 0);
		ellipse(collectable.x_pos, collectable.y_pos, collectable.size, collectable.size);
		fill(255, 255, 0);
		ellipse(collectable.x_pos, collectable.y_pos, collectable.size - 10, collectable.size - 10);
		fill(255, 215, 0);
		ellipse(collectable.x_pos, collectable.y_pos, collectable.size - 20, collectable.size - 20);
		fill(255, 255, 0);
		ellipse(collectable.x_pos, collectable.y_pos, collectable.size - 30, collectable.size - 30);
	}


	fill(100, 155, 255);
	//blue triangle going to the botton of the screen
	// draw a canyon
	rect(canyon.x_pos, 432, canyon.width, 144);

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
		for (let index = 0; index < trees_x.length; index++) {
			trees_x[index] += 5;
		}
		canyon.x_pos += 5;
		collectable.x_pos += 5;
		//gameChar_x -= 5;
	}

	if (isRight == true) {
		for (let index = 0; index < trees_x.length; index++) {
			trees_x[index] -= 5;
		}
		canyon.x_pos -= 5;
		collectable.x_pos -= 5;
		//gameChar_x += 5;
	}

	if (gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width) {
		gameChar_y += 4;
		isFalling = true;
		isPlummeting = true;
	} else if (gameChar_y < floorPos_y) {
		gameChar_y += 4;
		isFalling = true;
	} else {
		isFalling = false;
		isPlummeting = false;
	}

	if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 50) {
		collectable.collected = true;
	}
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	if (isPlummeting) {
		console.log("Prevented Movement");
		return;
	}

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