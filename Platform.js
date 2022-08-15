function Platform(x, y, destX, destY, id, currLevel) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_objects_2);
  this.position = new powerupjs.Vector2(x, y);
  this.currLevel = currLevel
  this.dest = new powerupjs.Vector2(destX, destY);
  this.activated = false
  this.linkID = id;
  this.loadAnimation(sprites.moving_platform, 'idle', 1);
  this.playAnimation('idle')
}

Platform.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Platform.prototype.update = function(delta) {

  powerupjs.AnimatedGameObject.prototype.update.call(this, delta)
  
  if (this.activated) {
    window.LEVELS[this.currLevel].platforms[this.linkID - 1].active = true;
    powerupjs.GameStateManager.get(ID.game_state_playing).writeLevelsStatus();

    if (this.dest.x !== this.position.x)
    this.velocity.x += 25;
    if (this.position.x > this.dest.x)
      this.position.x = this.dest.x;

      if (this.dest.y !== this.position.y)
      this.velocity.y += 25;
      if (this.position.y > this.dest.y)
      this.position.y = this.dest.y;
    }
  else {
    this.velocity.x = 0;
    this.velocity.y = 0
  }

}