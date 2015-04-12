function init() {
  canvas = document.getElementById('game');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  
  context = canvas.getContext('2d');
  
  window.setInterval(main, 1000 / 60);
  window.setInterval(randomizeTargetMovement, TARGET_RANDOMIZE_INTERVAL);
  
  setup();
  
  document.addEventListener('mousedown', onClick);
  document.addEventListener('mousemove', radiusAdjustment);
  document.addEventListener('keydown', reverse);
}

function setScore(val) {
  score = val;
  document.getElementById('score').innerHTML = 'Score: ' + score;
}

function setup() {
  setScore(0);
  generateRandomTargets();
  cannonBall = new CannonBall(CANNON_BALL_RADIUS, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

function reverse(evt) {
  if(evt.keyCode == 32) {
    evt.preventDefault();
    cannonBall.rotateMultiplier *= -1;
  }
}

function onClick(evt) {
  var canvasRect = canvas.getBoundingClientRect();
  var mouseX = evt.clientX - canvasRect.left;
  var mouseY = evt.clientY - canvasRect.top;
  if(mouseX > 0 && mouseX < CANVAS_WIDTH &&
    mouseY > 0 && mouseY < CANVAS_HEIGHT) {
    cannonBall.fire();
  }
}

function radiusAdjustment(evt) {
  var canvasRect = canvas.getBoundingClientRect();
  var mouseX = evt.clientX - canvasRect.left;
  var mouseY = evt.clientY - canvasRect.top;
  if(mouseX > 0 && mouseX < CANVAS_WIDTH &&
    mouseY > 0 && mouseY < CANVAS_HEIGHT) {
    cannonBall.radius = Math.sqrt(Math.pow(mouseX - CANVAS_WIDTH / 2, 2) +
      Math.pow(mouseY - CANVAS_HEIGHT / 2, 2));
    if(cannonBall.radius > CANVAS_WIDTH / 3) {
      cannonBall.radius = CANVAS_WIDTH / 3;
    }
  }
}

function standardObjectDraw() {
  context.beginPath();
  
  context.fillStyle = this.fillColor;
  context.fillRect(this.x, this.y, this.lengthX, this.lengthY);
  
  context.strokeStyle = this.outlineColor;
  context.strokeRect(this.x, this.y, this.lengthX, this.lengthY);
  
  context.closePath();
}

function objectOutOfBounds() {
  return this.x < 0 || this.x + this.lengthX > CANVAS_WIDTH ||
    this.y < 0 || this.y + this.lengthY > CANVAS_HEIGHT;
}

function objectCollision(a, b) {
  return a.x + a.lengthX > b.x && a.x < b.x + b.lengthX &&
    a.y + a.lengthY > b.y && a.y < b.y + b.lengthY;
}

function main() {
  canvas.width = canvas.width;
  
  context.beginPath();
  
  context.strokeStyle = CANVAS_BORDER_COLOR;
  context.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  context.closePath();
  
  for(var i = 0; i < targets.length; ++i) {
    if(!targets[i].hit) {
      targets[i].draw();
      targets[i].move();
    }
  }
  
  cannonBall.draw();
  cannonBall.move();
  
  if(cannonBall.fired) {
    var j = 0;
    while(j < targets.length) {
      if(objectCollision(cannonBall, targets[j]) && !targets[j].hit) {
        targets[j].hit = true;
        setScore(score + Math.floor(TARGET_SIZE_UPPER_BOUND / targets[j].lengthX));
      } else {
        ++j;
      }
    }
  }
}

init();