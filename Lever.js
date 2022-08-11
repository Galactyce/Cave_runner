function Lever(x, y, id) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_objects_1);
  this.linkID = id;
  this.pulled = false;
  this.position = new powerupjs.Vector2(x, y);
  this.loadAnimation(sprites.lever_inactive, 'idle', true, 1);
  this.loadAnimation(sprites.lever_pull, 'pull', false, 0.1);
  this.playAnimation('idle')
}

Lever.prototype = Object.create(powerupjs.AnimatedGameObject.prototype)

Lever.prototype.update = function(delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  var player = powerupjs.GameStateManager.get(ID.game_state_playing).player;
  var levels = powerupjs.GameStateManager.get(ID.game_state_playing).levels
  if (player.boundingBox.intersects(this.boundingBox) && !this.pulled) {
    player.isByInteractable = true
    if (powerupjs.Keyboard.keys[69].pressed) {
    // Loop through all levels and find a platform with the same ID
    this.pulled = true
    for (var i=0; i<levels.length; i++) {
      for (var k=0; k<levels[i].platforms.listLength; k++) {

        if (levels[i].platforms.at(k).linkID === this.linkID) {
          levels[i].platforms.at(k).activated = true
          this.position.y += 35     // Corrects the position of the sprite due to the offset of the animation
          this.position.x -= 10
          this.playAnimation('pull')
        }
      }
      }
    }
  }
  else {
    player.isByInteractable = false
  }
}
