maggotAmount = 20;
xArray = [];
yArray = [];

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < maggotAmount; i++) {
    xArray[i] = random(0, 400);
    yArray[i] = random(0, 400);
  }

}

function draw() {
  background('#531803');

  for (let i = 0; i < maggotAmount; i++) {
    // move maggots
    yArray[i] = yArray[i] + 0.3;

    if (yArray[i] > height + 40) {
      yArray[i] = -40;
    }
    drawMaggots(xArray[i], yArray[i]);
  }
}

//https://beta.p5js.org/reference/p5/sin/
function drawMaggots(x, y) {
  let sizes = [15, 18, 20, 18, 12];

  strokeWeight(0)
  for (let i = 0; i < 5; i++) {
    let wiggle = sin(frameCount * 0.1 + i) * 5;

    if (i == 4) {
      fill("#fff04ee9"); // head
    } else {
      fill("#ffff"); // body
    }

    circle(x + wiggle, y - i * 7, sizes[i]);
  }
}