function Flame(position) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_objects_1);
  this.position = new powerupjs.Vector2(position.x, position.y);
  this.loadAnimation(sprites.flame_rising, "rising", true, 0.25);
  this.loadAnimation(sprites.flame_falling, "falling", true, 0.25);
  this.playAnimation("rising");
  this.startPosition = this.position;
  // this.time = 0;
  this.reset();
}

Flame.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Flame.prototype.reset = function () {
  this.position = this.startPosition.copy();
  this.visible = true;
  this.waitTime = 1000;
  this.jumpTime = Date.now();
  this.jumpHeight = 140;
};

Flame.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);

  if ((Math.sin(Date.now() / 160)) > 0) {
    this.playAnimation("falling");
  } else if ((Math.sin(Date.now() / 160)) <= 0) {
    this.playAnimation("rising");
  }
    this.position.y = this.startPosition.y - 90 + (Math.sin(Date.now() / 160) * this.jumpHeight);

    var player = powerupjs.GameStateManager.get(ID.game_state_playing).player
    if (this.boundingBox.intersects(player.boundingBox)) {
        player.reset()
    }
};
