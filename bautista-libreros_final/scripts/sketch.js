maggotAmount = 20;
xArray = [];
yArray = [];

// https://stackoverflow.com/questions/78083190/rendering-p5-js-sketch-on-my-jekyll-website
function setup() {
  const canvasWidth = 400;
  const canvasHeight = 800;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-holder");

  for (let i = 0; i < maggotAmount; i++) {
    xArray[i] = random(0, canvasWidth);
    yArray[i] = random(0, canvasHeight);
  }

}

function draw() {
  background('#531803');

  for (let i = 0; i < maggotAmount; i++) {
    // move maggots
    yArray[i] = yArray[i] - 0.3;

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