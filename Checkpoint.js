function Checkpoint(position, currLevel) {
  powerupjs.SpriteGameObject.call(this, sprites.checkpoint, 1, 0, ID.layer_objects_1, ID.checkpoints);
  this.position = position
  this.currLevel = currLevel
  this.spawnPosition = position;
  this.grabbed = false
}

Checkpoint.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Checkpoint.prototype.draw = function() {
  powerupjs.SpriteGameObject.prototype.draw.call(this)
}

Checkpoint.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta)
  var player = powerupjs.GameStateManager.currentGameState.player
  if (this.boundingBox.intersects(player.boundingBox) && !this.grabbed) {
    player.startPosition = this.position
    player.startRoom = this.currLevel
    this.grabbed = true
  }
}
