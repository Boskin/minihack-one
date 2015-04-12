function Target(x, y, size, outlineColor, fillColor) {
  this.x = x;
  this.y = y;
  
  this.moveX = 0;
  this.moveY = 0;
  
  this.lengthX = size;
  this.lengthY = size;
  
  this.outlineColor = outlineColor == undefined ? TARGET_OUTLINE_COLOR : outlineColor;
  this.fillColor = fillColor == undefined ? TARGET_FILL_COLOR : fillColor;
  
  this.hit = false;
  
  this.draw = standardObjectDraw;
  this.outOfBounds = objectOutOfBounds;
  
  this.move = function() {
    this.x += this.moveX;
    this.y += this.moveY;
    
    if(this.x + this.lengthX > CANVAS_WIDTH || this.x < 0) {
      this.moveX *= -1;
    }
    
    if(this.y + this.lengthY > CANVAS_HEIGHT || this.y < 0) {
      this.moveY *= -1;
    }
  }
  
  this.randomizeMovement = function() {
    var dir = Math.random() * 2 * Math.PI;
    var speed = Math.random() * (TARGET_SPEED_UPPER_BOUND - TARGET_SPEED_LOWER_BOUND) +
      TARGET_SPEED_LOWER_BOUND;
    this.moveX = speed * Math.cos(dir);
    this.moveY = speed * Math.sin(dir);
  }
}

function generateRandomTargets() {
  targets = [];
  for(var i = 0; i < TARGET_COUNT; ++i) {
    var x;
    var y;
    var size = Math.floor(Math.random() * (TARGET_SIZE_UPPER_BOUND - TARGET_SIZE_LOWER_BOUND)) +
      TARGET_SIZE_LOWER_BOUND;
    x = Math.floor(Math.random() * (CANVAS_WIDTH - size));
    y = Math.floor(Math.random() * (CANVAS_HEIGHT - size));
    
    targets.push(new Target(x, y, size));
  }
}

function randomizeTargetMovement() {
  for(var i = 0; i < targets.length; ++i) {
    targets[i].randomizeMovement();
  }
}