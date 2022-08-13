function Cutscene(parts, rect, startRoom, triggerID, reusable) {
  // parts example: ['moveobject', levelID, object, index, {x, y, destX, destY, vX, vY}]
  powerupjs.GameObjectList.call(this, ID.layer_overlays_2);
  for (var i = 0; i < parts.length; i++) {
    this.add([parts[i]]);
  }
  this.triggerID = triggerID;
  this.reusable = reusable;
  this.rect = rect;

  this.startRoom = startRoom;
  this.time = Date.now();
  this.step = 0;
  this.timeSpan = 0;
  console.log(this.rect);
}

Cutscene.prototype = Object.create(powerupjs.GameObjectList.prototype);

Cutscene.prototype.update = function (delta) {
  if (Date.now() > this.time + this.timeSpan) {
    if (this.step >= this.listLength) {
      powerupjs.GameStateManager.get(ID.game_state_playing).inCutscene = false;
      return;
    }
    switch (this.gameObjects[this.step][0][0]) {
      case "switchroom":
        this.switchRoom(this.gameObjects[this.step][0][2]);
        this.time = Date.now();
        this.timeSpan = this.gameObjects[this.step][0][1];
        this.step++;
        break;
      case "hideplayer":
        this.hidePlayer();
        this.timeSpan = this.gameObjects[this.step][0][1];
        this.time = Date.now();
        this.step++;
        break;
      case "end":
        this.endCutscene();
        break;
    }
  }
};

Cutscene.prototype.switchRoom = function (roomIndex) {
  powerupjs.GameStateManager.get(ID.game_state_playing).goToLevel(roomIndex);
};

Cutscene.prototype.hidePlayer = function () {
  powerupjs.GameStateManager.get(ID.game_state_playing).player.visible = false;
};

Cutscene.prototype.endCutscene = function () {
  powerupjs.GameStateManager.get(ID.game_state_playing).player.visible = true;
  powerupjs.GameStateManager.get(ID.game_state_playing).goToLevel(
    this.startRoom
  );
  powerupjs.GameStateManager.get(ID.game_state_playing).endCutscene();
  powerupjs.GameStateManager.get(ID.game_state_playing).inCutscene = false;
};
