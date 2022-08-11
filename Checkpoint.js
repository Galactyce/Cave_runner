function Checkpoint(position, currLevel) {
  powerupjs.SpriteGameObject.call(
    this,
    sprites.checkpoint,
    1,
    0,
    ID.layer_objects_1,
    ID.checkpoints
  );
  this.position = position;
  this.currLevel = currLevel;
  this.spawnPosition = position;
  this.grabbed = false;
}

Checkpoint.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Checkpoint.prototype.draw = function () {
  powerupjs.SpriteGameObject.prototype.draw.call(this);
};

Checkpoint.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  var player = powerupjs.GameStateManager.currentGameState.player;
  if (this.boundingBox.intersects(player.boundingBox) && !this.grabbed) {
    player.isByInteractable = true;
    if (powerupjs.Keyboard.keys[69].pressed) {
      player.startPosition = this.position;
      player.startRoom = this.currLevel;
      for (var l=0; l<powerupjs.GameStateManager.get(ID.game_state_playing).levels.length; l++) {
      for (var i=0; i<powerupjs.GameStateManager.get(ID.game_state_playing).levels[l].checkpoints.listLength; i++) {
        powerupjs.GameStateManager.get(ID.game_state_playing).levels[l].checkpoints.at(i).grabbed = false
      }
      for (var i=0; i<window.LEVELS.length; i++) {
        window.LEVELS[i].checked = false

      }
      powerupjs.GameStateManager.get(ID.game_state_playing).currentCheckpoint = this.currLevel;
      window.LEVELS[this.currLevel].checked = true
      console.log(window.LEVELS[this.currLevel])
      this.grabbed = true;
      
    }
    powerupjs.GameStateManager.get(ID.game_state_playing).writeLevelsStatus();

  }
  }
  else {
    player.isByInteractable = false
  }
};
