function Sublevel(currSublevel) {
  powerupjs.GameObjectList.call(this, ID.layer_objects);
  this.sublevelData = window.SUBLEVELS[currSublevel];
  this.backgroundBack = new powerupjs.SpriteGameObject(
    sprites.workshop_background_back,
    1,
    0,
    ID.layer_background
  );
  this.backgroundBack.origin = new powerupjs.Vector2(
    this.backgroundBack.width / 2,
    this.backgroundBack.height / 2
  );
  this.backgroundFront = new powerupjs.SpriteGameObject(
    sprites.workshop_background_front,
    1,
    0,
    ID.layer_background
  );
  this.backgroundFront.origin = new powerupjs.Vector2(
    this.backgroundFront.width / 2,
    this.backgroundFront.height / 2
  );

  
  this.width = this.backgroundBack.width;
  this.height = this.backgroundBack.height;
  this.position = new powerupjs.Vector2(
    powerupjs.Game.size.x / 2,
    powerupjs.Game.size.y / 2
  );

  this.origin = new powerupjs.Vector2(
    this.width / 2,
    this.height / 2
  )

  this.backgroundFront.position = new powerupjs.Vector2(
    this.position.x,
    this.position.y
  );
  this.backgroundBack.position = new powerupjs.Vector2(
    this.position.x,
    this.position.y
  );
    console.log(this.position)
  this.collisionTiles = new SubTileFeild(currSublevel, this.position, this.origin, this);

  // this.add(this.backgroundFront)
  this.items = new powerupjs.GameObjectList(ID.layer_objects_1);
  for (var i = 0; i < this.sublevelData.items.length; i++) {
    var l = this.sublevelData.items[i];
    console.log(l);
    this.items.add(new Item(l.type, l.position));
  }

  this.add(this.collisionTiles);
}

Sublevel.prototype = Object.create(powerupjs.GameObjectList.prototype);

Sublevel.prototype.update = function (delta) {
  powerupjs.GameObjectList.prototype.update.call(this, delta);
  var playingState = powerupjs.GameStateManager.get(ID.game_state_playing);
  var player = playingState.player;
  for (var i = 0; i < this.sublevelData.doors.length; i++) {
    var doorData = this.sublevelData.doors[i];
    var rect = new powerupjs.Rectangle(
      doorData.x + this.position.x - this.origin.x,
      doorData.y + this.position.y - this.origin.y,
      doorData.width,
      doorData.height
    );
    if (rect.intersects(player.boundingBox)) {
      playingState.player.isByInteractable = true;
      playingState.goToLevel(doorData.ID, doorData);
      playingState.player.position = new powerupjs.Vector2(
        doorData.destX,
        doorData.destY
      );
      playingState.currentSublevelIndex = -1;
      playingState.currentGameStyle = "platformer";
      break;
    }
  }
};
