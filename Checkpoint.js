function Checkpoint(position, currLevel) {
  powerupjs.AnimatedGameObject.call(
    this,
    1,
    ID.layer_objects_1,
    ID.checkpoints
  );
  this.loadAnimation(sprites.checkpoint_campfire, 'lit', true, 0.25)
  this.loadAnimation(sprites.checkpoint_campfire_unlit, 'unlit', true, 1);
  this.playAnimation('unlit')
  this.sheetIndex = 0
  this.position = position;
  this.currLevel = currLevel;
  this.spawnPosition = position;
  this.grabbed = false;
}

Checkpoint.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);



Checkpoint.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  if (!this.grabbed) this.playAnimation('unlit')
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
      window.GAMEDATA.savedItem = player.holding;
      this.grabbed = true;
      
    }
    powerupjs.GameStateManager.get(ID.game_state_playing).writeLevelsStatus();
    this.playAnimation('lit')
  }
  }
  else {
    player.isByInteractable = false
  }
};
