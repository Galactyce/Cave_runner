function Cutscene(parts, rect, startRoom, triggerID, reusable) {
  // parts example: ['moveobject', levelID, object, index, {x, y, destX, destY, vX, vY}]
  powerupjs.GameObjectList.call(this, ID.layer_overlays_2);
  for (var i = 0; i < parts.length; i++) {
    this.add([parts[i]]);
  }
  this.triggerID = triggerID;
  this.reusable = reusable;
  this.rect = new powerupjs.Rectangle(rect.x, rect.y, rect.width, rect.height);
  this.startRoom = startRoom;
  this.time = Date.now();
  this.step = 0;
  this.timeSpan = 0;
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
        case "showimage":
          this.showImage(this.gameObjects[this.step][0][2], this.gameObjects[this.step][0][1]);
          this.timeSpan = this.gameObjects[this.step][0][3];
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

Cutscene.prototype.showImage = function (sprite, position) {
  powerupjs.GameStateManager.get(ID.game_state_playing).player.visible = false;
  var sprite = new powerupjs.SpriteGameObject(sprites.demo_end, 0.75, 0, ID.layer_overlays_2);
  sprite.position = new powerupjs.Vector2(position.x, position.y)
  console.log(position)

  powerupjs.GameStateManager.get(ID.game_state_playing).overlays.push(sprite)
};


Cutscene.prototype.endCutscene = function () {
  powerupjs.GameStateManager.get(ID.game_state_playing).player.visible = true;
  powerupjs.GameStateManager.get(ID.game_state_playing).goToLevel(
    this.startRoom
  );
  powerupjs.GameStateManager.get(ID.game_state_playing).endCutscene();
  powerupjs.GameStateManager.get(ID.game_state_playing).inCutscene = false;
};
