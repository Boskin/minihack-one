function CannonBall(radius, angle, centerX, centerY, outlineColor, fillColor) {
  this.x = radius * Math.cos(angle) + centerX - CANNON_BALL_SIZE / 2;
  this.y = radius * Math.sin(angle) + centerY - CANNON_BALL_SIZE / 2;
  
  this.rotateMultiplier = 1;
  
  this.moveX = 0;
  this.moveY = 0;
  
  this.radius = radius;
  this.angle = angle;
  
  this.centerX = centerX;
  this.centerY = centerY;
  
  this.fired = false;
  this.bounces = 0;
  
  this.lengthX = CANNON_BALL_SIZE;
  this.lengthY = CANNON_BALL_SIZE;
  
  this.outlineColor = outlineColor == undefined ? CANNON_BALL_OUTLINE_COLOR : outlineColor;
  this.fillColor = fillColor == undefined ? CANNON_BALL_FILL_COLOR : fillColor;
  
  this.draw = standardObjectDraw;
  this.outOfBounds = objectOutOfBounds;
  
  this.freeze = function() {
    this.moveX = 0;
    this.moveY = 0;
  }
  
  this.move = function() {
    if(this.fired) {
      this.x += this.moveX;
      this.y += this.moveY;
      if(this.x < 0 || this.x + this.lengthX > CANVAS_WIDTH) {
        this.moveX *= -1;
        ++this.bounces;
        if(this.bounces > CANNON_BALL_BOUNCE_COUNT) {
          this.freeze();
        }
      }
      if(this.y < 0 || this.y + this.lengthY > CANVAS_HEIGHT) {
        this.moveY *= -1;
        ++this.bounces;
        if(this.bounces > CANNON_BALL_BOUNCE_COUNT) {
          this.freeze();
        }
      }
    } else {
      this.x = this.radius * Math.cos(this.angle) + this.centerX;
      this.y = this.radius * Math.sin(this.angle) + this.centerY;
      
      this.angle += this.rotateMultiplier * CANNON_BALL_ANGLE_SPEED;
      if(this.angle > 2 * Math.PI) {
        this.angle -= 2 * Math.PI;
      }
      if(this.angle < 0) {
        this.angle += 2 * Math.PI;
      }
    }
  }
  
  this.fire = function() {
    this.fired = true;
    
    this.moveX = this.rotateMultiplier * -CANNON_BALL_SPEED * Math.sin(this.angle);
    this.moveY = this.rotateMultiplier * CANNON_BALL_SPEED * Math.cos(this.angle);
  }
}