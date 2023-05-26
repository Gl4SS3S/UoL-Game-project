/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.

WARNING: Do not get too carried away. If you're shape takes more than 15 lines of code to draw then you've probably over done it.


*/

function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	//... add your code here
	fill(255);
	ellipse(250, 80, 80, 80);
	ellipse(220, 90, 60, 60);
	ellipse(270, 85, 70, 70);
	ellipse(200, 100, 40, 40);
	ellipse(305, 85, 70, 70);
	ellipse(335, 90, 50, 50);
	ellipse(315, 90, 60, 60);

	noStroke();
	fill(255);
	text("cloud", 200, 100);

	//2. a mountain in the distance
	//... add your code here
	fill(200);
	triangle(350, 432, 670, 432, 520, 100);
	fill(180);
	triangle(500, 432, 700, 432, 600, 200);
	fill(170);
	triangle(400, 432, 600, 432, 500, 260);

	// add snow to mountain tops
	fill(255);
	triangle(470, 310, 500, 260, 542, 330);
	triangle(565, 280, 600, 200, 625, 260);
	triangle(494, 152, 556, 182, 520, 100);

	noStroke();
	fill(255);
	//text("mountain", 500, 256);

	//3. a tree
	//... add your code here
	fill(139, 69, 19);
	rect(800, 332, 50, 100);
	fill(0, 145, 0);
	triangle(775, 332, 875, 332, 825, 200);
	fill(0, 150, 0);
	triangle(775, 282, 875, 282, 825, 150);
	fill(0, 155, 0);
	triangle(775, 232, 875, 232, 825, 100);

	// shadow
	fill(0, 0, 0, 50);
	rect(840, 332, 10, 100);
	rect(800, 332, 50, 10);


	noStroke();
	fill(255);

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen

	//... add your code here
	fill(100, 155, 255);
	//blue triangle going to the botton of the screen
	// draw a canyon
	triangle(0, 432, 100, 576, 200, 432);
	rect(0, 432, 100, 144);
	

	noStroke();
	fill(255);
	//text("canyon", 100, 480);

	//5. a collectable token - eg. a jewel, fruit, coins
	//... add your code here
	fill(255, 215, 0);
	ellipse(400, 400, 50, 50);
	fill(255, 255, 0);
	ellipse(400, 400, 40, 40);
	fill(255, 215, 0);
	ellipse(400, 400, 30, 30);
	fill(255, 255, 0);
	ellipse(400, 400, 20, 20);

	// shadow
	fill(0, 0, 0, 50);
	ellipse(400, 445, 50, 20);

	noStroke();
	fill(255);
	//text("collectable item", 400, 400);
}
