let scoreLeft = 0;
let scoreRight = 0;
let ball;
// {
//   x: 0,
//   y: 0,
//   speedX: 10,
//   speedY: 0,
//   radius: 20
// }
let moveParameter = {
  topLimit: 75,
  bottomLimit: window.innerHeight - 75,
  upSpeed: -25,
  downSpeed: 25
}
let i = 0;
let w, s, up, down;


let paddleArray = ['paddleLeft', 'paddleRight'];
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

  slide(keyAxe) {
    this.y = keyAxe;
  }
}

class Ball {
  constructor(_x, _y, _speedX, _speedY, _radius) {
    this.x = _x;
    this.y = _y;
    this.speedX = _speedX;
    this.speedY = _speedY;
    this.radius = _radius;
  }
  show() {
    square(this.x, this.y, this.radius);
  }
  bounceBall(value) {
    console.log(value);
    // Detection de collision Paddle Right
    if (this.x >= value.x - value.width * 2 &&
      this.y >= value.y - value.height / 2 &&
      this.y <= value.y + value.height / 2) {
      this.speedX = -this.speedX;
      this.speedY = random(-5, 5);
    } // Detection collision "murs" haut et bas
    if (this.y <= this.radius || this.y >= height - this.radius) {
      this.speedY = -this.speedY;
    }

    if (this.x > width) {
      resetBall('left');
      scoreLeft += 1;
    } else if (this.x < 0) {
      resetBall('right');
      scoreRight += 1;
    }
  }
}


function setup() {

  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
  noStroke();

  paddleLeft = new Paddle(30, height / 2, 20, 150);
  paddleRight = new Paddle(width - 30, height / 2, 20, 150);
  ball = new Ball(0, 0, 10, 0, 20);
  ball.x = width / 2;
  ball.y = height / 2;

}

function draw() {

  background(45, 49, 66);
  fill(255);
  ball.show();
  moveBall();
  for (var i = 0; i < paddleArray.length; i += 1) {
    ball.bounceBall(paddleArray[i]);
  }

  paddleLeft.show();
  paddleRight.show();

  movePaddle(w, paddleLeft, moveParameter.topLimit, moveParameter.upSpeed);
  movePaddle(s, paddleLeft, moveParameter.bottomLimit, moveParameter.downSpeed);
  movePaddle(up, paddleRight, moveParameter.topLimit, moveParameter.upSpeed);
  movePaddle(down, paddleRight, moveParameter.bottomLimit, moveParameter.downSpeed);

  drawElements();

}

function movePaddle(_key, _paddle, _limit, _num) {
  if (_key == true) {
    if (_paddle.y == _limit) {
      let i = _paddle.y;
      _paddle.slide(i);
    } else {
      let i = _paddle.y + _num;
      _paddle.slide(i);
    }
  }
}

function keyPressed() {
  truefalse(true);
}

function keyReleased() {
  truefalse(false);
}

function truefalse(value) {
  if (keyCode === 87) {
    w = value;
  }
  if (keyCode === 83) {
    s = value;
  }
  if (keyCode === UP_ARROW) {
    up = value;
  }
  if (keyCode === DOWN_ARROW) {
    down = value;
  }

}

function drawElements() {

  textSize(100);
  textAlign(RIGHT)
  text(scoreLeft, width / 2 - 40, 100);
  textAlign(LEFT)

  text(scoreRight, width / 2 + 40, 100);

  for (let y = 0; y < height; y = y + 30) {
    rect(width / 2, y, 20, 20);
  }
}

// function bounceBall() {
//   // Detection de collision Paddle Right
//   if (ball.x >= paddleRight.x - paddleRight.width * 2 &&
//     ball.y >= paddleRight.y - paddleRight.height / 2 &&
//     ball.y <= paddleRight.y + paddleRight.height / 2) {
//     ball.speedX = -ball.speedX;
//     ball.speedY = random(-5, 5);
//   }
//
//   // Detection de collision Paddle Left
//   if (ball.x <= paddleLeft.x + paddleLeft.width * 2 &&
//     ball.y >= paddleLeft.y - paddleLeft.height / 2 &&
//     ball.y <= paddleLeft.y + paddleLeft.height / 2) {
//     ball.speedX = -ball.speedX;
//     ball.speedY = random(-5, 5);
//   }
//
//   // Detection collision "murs" haut et bas
//   if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
//     ball.speedY = -ball.speedY;
//   }
//
//   if (ball.x > width) {
//     resetBall('left');
//     scoreLeft += 1;
//   } else if (ball.x < 0) {
//     resetBall('right');
//     scoreRight += 1;
//   }
// }

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