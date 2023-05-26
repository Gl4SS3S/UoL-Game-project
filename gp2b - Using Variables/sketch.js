/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {
		x_pos: width - 300, 
		width: 300
	}

	collectable = {
		x_pos: 150,
		y_pos: 390,
		size: 50
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
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, width - floorPos_y); //draw some green ground

	// cloud
	fill(255);
	ellipse(cloud.x_pos, cloud.y_pos, cloud.size, cloud.size);
	ellipse(cloud.x_pos - 20, cloud.y_pos + 10, cloud.size - 20, cloud.size - 20);
	ellipse(cloud.x_pos + 25, cloud.y_pos + 5, cloud.size - 10, cloud.size - 10);
	ellipse(cloud.x_pos - 50, cloud.y_pos + 20, cloud.size - 40, cloud.size - 40);
	ellipse(cloud.x_pos + 55, cloud.y_pos + 5, cloud.size - 10, cloud.size - 10);
	ellipse(cloud.x_pos + 85, cloud.y_pos + 10, cloud.size - 30, cloud.size - 30);
	ellipse(cloud.x_pos + 65, cloud.y_pos + 10, cloud.size - 20, cloud.size - 20);

	// mountain
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

	// tree
	fill(139, 69, 19);
	rect(treePos_x, treePos_y + 45, 50, 100);
	fill(0, 145, 0);
	triangle(treePos_x - 30, treePos_y + 50, treePos_x + 80, treePos_y + 50, treePos_x + 25, treePos_y - 50);
	fill(0, 150, 0);
	triangle(treePos_x - 30, treePos_y + 10, treePos_x + 80, treePos_y + 10, treePos_x + 25, treePos_y - 80);
	fill(0, 155, 0);
	triangle(treePos_x - 30, treePos_y - 30, treePos_x + 80, treePos_y - 30, treePos_x + 25, treePos_y - 110);

	fill(100, 155, 255);
	//blue triangle going to the botton of the screen
	// draw a canyon
	rect(canyon.x_pos, 432, canyon.width, 144);

	fill(255, 215, 0);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size, collectable.size);
	fill(255, 255, 0);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size - 10, collectable.size - 10);
	fill(255, 215, 0);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size - 20, collectable.size - 20);
	fill(255, 255, 0);
	ellipse(collectable.x_pos, collectable.y_pos, collectable.size - 30, collectable.size - 30);

	// character
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

function mousePressed()
{
	gameChar_x = mouseX;
	gameChar_y = mouseY;
}
