function Machine(position, triggerID) {
  this.sprite = sprites.broken_machine
  powerupjs.SpriteGameObject.call(this, this.sprite, 1, 0, ID.layer_objects_1);
  this.position = position;
  this.triggerID = triggerID
  this.working = false
}

Machine.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Machine.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  var playing = powerupjs.GameStateManager.get(ID.game_state_playing);
  var player = playing.player;
  if (player.boundingBox.intersects(this.boundingBox) && !this.working && player.holding === 'wrench') {
    player.isByInteractable = true;
    if (powerupjs.Keyboard.keys[69].pressed) {
      player.isByInteractable = false;
      this.working = true;
      for (var i=0; i<playing.currentLevel.movingPlatforms.listLength; i++) {
        if (playing.currentLevel.movingPlatforms.at(i).triggerID === this.triggerID) {
          playing.currentLevel.movingPlatforms.at(i).active = true
        }
      }
      this.sprite = sprites.working_machine 
      player.holding = 'nothing'
    }
  }
  else {
    player.isByInteractable = false;
  }
}