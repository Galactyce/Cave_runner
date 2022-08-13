function MovingPlatform(x, y, destX, destY, vX, vY, size, id) {
  if (size === 'big')
    this.sprite = sprites.moving_platform
  else if (size === 'small') 
    this.sprite = sprites.moving_platform_small
  powerupjs.SpriteGameObject.call(this, this.sprite, 1, 0, ID.layer_overlays, id);
  this.position = new powerupjs.Vector2(x, y - 30)
  this.startPos = new powerupjs.Vector2(x, y)
  this.vX = vX;
  this.destX = destX;
  this.destY = destY
  this.vY = vY;
  this.size = size;
  this.d = 0;
  
  this.velocity.x = this.vX
  this.velocity.y = this.vY
}

MovingPlatform.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

MovingPlatform.prototype.update = function(delta) {
  this.d += 0.1

  if (this.position.x > this.destX) {
    this.velocity.x = Math.abs(this.velocity.x) * -1
    // this.position.x = this.destX - 10;
  }
  if (this.position.x < this.startPos.x) {
    this.velocity.x = Math.abs(this.velocity.x)

  }
  if (this.position.y < this.destY) {
    this.velocity.y = Math.abs(this.velocity.y) 
    // this.position.x = this.destX - 10;
  }
  if (this.position.y > this.startPos.y) {
    this.velocity.y = Math.abs(this.velocity.y) * - 1

  }
  var player = powerupjs.GameStateManager.get(ID.game_state_playing).player;
  powerupjs.SpriteGameObject.prototype.update.call(this, delta)

  // player.oldPos.y = player.position.y
  if (player.position.x > this.position.x && player.position.x < this.position.x + this.width && 
    player.position.y + player.height / 2 > this.position.y  &&  player.oldPos.y + player.height / 2 <= this.position.y) {
  // player.onTheGround = true
  // player.onPlatform = true

  }
  
}



