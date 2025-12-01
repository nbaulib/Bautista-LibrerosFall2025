// A remix of: 
// https://p5js.org/examples/math-and-physics-soft-body/

// and 
// https://p5js.org/tutorials/animating-with-media-objects/

// Declare variables for the physics calculations
let centerX = 0.0;
let centerY = 0.0;
let radius = 45;
let rotAngle = -90;
let accelX = 0.1;
let accelY = 0.1;
let deltaX = 0.1;
let deltaY = 0.0;
let springing = 0.0009;
let damping = 0.99;

// Declare variables for specifying vertex locations
let nodes = 3; // triangle wow
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// Declare the variable for the curve tightness
let organicConstant = 1.0;

function preload() {
  bread = loadImage("bread.png");
}

function setup() {
  createCanvas(710, 400);

  // Start in the center of the canvas
  centerX = width / 2;
  centerY = height / 2;

  // Initialize arrays to 0
  for (let i = 0; i < nodes; i++) {
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeX[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // Initialize frequencies for corner nodes
  for (let i = 0; i < nodes; i++) {
    frequency[i] = random(5, 12);
  }

  noStroke();
  angleMode(DEGREES);

  imageMode(CENTER);
  bread.resize(80, 80);
}
let breadW = 80;
let breadH = 80;

function draw() {
  // Use alpha blending for fade effect
  background("#CCFBFE"); /// 0,50

  // Draw and move chicken
  drawGrass(20, 380);
  drawGrass(210, 410);
  drawGrass(380, 430);

  push();
  rotate(-10);
  drawGrass(480, 500);
  pop();

  drawGrass(650, 430);
  drawShape();
  moveShape();

  smallerBread()
}

function smallerBread() {
  if (dist(mouseX, mouseY, centerX, centerY) < 20) {
    breadW -= 5;
    breadH -= 5;
  }

  image(bread, mouseX, mouseY, breadW, breadH);

  // reset once 0
  if (breadW <= 0 || breadH <= 0 ) {
    breadH = 80;
    breadW = 80;
  }
}

// base with three strands sticking out
function drawGrass(x, y) {
  fill("#60992D");
  ellipse(x, y, 250, 100);

  push();
  stroke("#5D7740");
  strokeWeight(5);
  line(x + 0.0, y - 30, x + 15, y - 60);
  line(x + 20, y - 30, x + 35, y - 70);
  line(x + 35, y - 20, x + 50, y - 55);
  pop();
}

function drawShape() {
  // Calculate node starting locations
  for (let i = 0; i < nodes; i++) {
    nodeStartX[i] = centerX + cos(rotAngle) * radius;
    nodeStartY[i] = centerY + sin(rotAngle) * radius;
    rotAngle += 360.0 / nodes;
  }

  // Draw the polygon

  curveTightness(organicConstant);
  let shapeColor = lerpColor(
    color("#ffc100"),
    color("#EA9010"),
    organicConstant
  );
  fill(shapeColor);

  // two eyes
  circle(nodeX[1], nodeY[1] - 50, 40);
  circle(nodeX[2], nodeY[2] - 50, 40);

  // triangle
  beginShape();
  for (let i = 0; i < nodes; i++) {
    curveVertex(nodeX[i], nodeY[i]);
  }
  endShape(CLOSE);
}

function moveShape() {
  // Move center point
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  // Create springing effect
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // Move center
  centerX += accelX;
  centerY += accelY;

  // Slow down springing
  accelX *= damping;
  accelY *= damping;

  // Change curve tightness based on the overall acceleration;
  // use abs() to avoid dependence on direction of acceleration
  organicConstant = 1 - (abs(accelX) + abs(accelY)) * 0.1;

  // Move nodes
  for (let i = 0; i < nodes; i++) {
    nodeX[i] = nodeStartX[i] + sin(angle[i]) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(angle[i]) * (accelY * 2);
    angle[i] += frequency[i];
  }
}