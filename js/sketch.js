let scoreLeft = 0;
let scoreRight = 0;
let ball = {
  x: 0,
  y: 0,
  speedX: 10,
  speedY: 0,
  radius: 40
}
let i = 0;

let paddleLeft;
let paddleRight;

class Paddle {
  constructor(_x, _y, _width, _height) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;

  }

  show() {
    rect(this.x, this.y, this.width, this.height);
  }

  slide(mouseAxis) {
    this.y = mouseAxis;
  }
}


function setup() {

  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
  noStroke();

  paddleLeft = new Paddle(30, height / 2, 20, 150);
  paddleRight = new Paddle(width - 30, height / 2, 20, 150);
  i = height / 2;
  ball.x = width / 2;
  ball.y = height / 2;

}

function draw() {

  background(0);
  fill(255);
  moveBall();
  bounceBall();
  paddleLeft.show();
  if (keyIsPressed == true && keyCode === 83) {
    i += 10;
    paddleLeft.slide(i);
  } else if (keyIsPressed == true && keyCode === 87) {
    i -= 10;
    paddleLeft.slide(i);
  }
  paddleRight.show();
  if (keyIsPressed == true && keyCode === DOWN_ARROW) {
    i += 10;
    paddleRight.slide(i);
  } else if (keyIsPressed == true && keyCode === UP_ARROW) {
    i -= 10;
    paddleRight.slide(i);
  }
  drawElements();

}

function drawElements() {

  ellipse(ball.x, ball.y, ball.radius);
  textSize(100);
  textAlign(RIGHT)
  text(scoreLeft, width / 2 - 40, 100);
  textAlign(LEFT)

  text(scoreRight, width / 2 + 40, 100);

  for (let y = 0; y < height; y = y + 30) {
    rect(width / 2, y, 20, 20);
  }
}

function bounceBall() {
  // Detection de collision Paddle Right
  if (ball.x >= paddleRight.x - paddleRight.width * 2 &&
    ball.y >= paddleRight.y - paddleRight.height / 2 &&
    ball.y <= paddleRight.y + paddleRight.height / 2) {
    ball.speedX = -ball.speedX;
    ball.speedY = random(-5, 5);
  }

  // Detection de collision Paddle Left
  if (ball.x <= paddleLeft.x + paddleLeft.width * 2 &&
    ball.y >= paddleLeft.y - paddleLeft.height / 2 &&
    ball.y <= paddleLeft.y + paddleLeft.height / 2) {
    ball.speedX = -ball.speedX;
    ball.speedY = random(-5, 5);
  }

  // Detection collision "murs" haut et bas
  if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
    ball.speedY = -ball.speedY;
  }

  if (ball.x > width) {
    resetBall('left');
    scoreLeft += 1;
  } else if (ball.x < 0) {
    resetBall('right');
    scoreRight += 1;
  }
}

function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
}

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.speedX = -ball.speedX;
  ball.speedY = random(-2, 2);

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}