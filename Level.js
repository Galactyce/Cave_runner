function Level(currlevel, doorEntered) {
  powerupjs.GameObjectList.call(this);
  this.starting = true;
  this.levelData = window.LEVELS[currlevel];
  this.decoData = window.DECORATION[currlevel];
  this.enemyData = window.ENEMIES[currlevel];
  this.checkpoints = new powerupjs.GameObjectList(ID.layer_objects_2);
  this.add(this.checkpoints);
  var tiles = new TileFeild(currlevel, ID.tiles, this.levelData, this);
  this.cave_deco = new CaveDecoFeild(currlevel, ID.deco, this.decoData, this);
  this.add(this.cave_deco);
  this.moss_deco = new MossDecoFeild(currlevel, 10, this.decoData, this);
  this.add(this.moss_deco);
  this.lava_deco = new LavaDecoFeild(currlevel, 10, this.decoData, this);
  this.add(this.lava_deco);
  this.enemies = new EnemyField(currlevel, 10, this.enemyData, this);
  this.add(this.enemies);
  this.movingPlatforms = new powerupjs.GameObjectList(ID.layer_overlays);
  for (var i = 0; i < this.levelData.movingPlatforms.length; i++) {
    var p = this.levelData.movingPlatforms[i];
    this.movingPlatforms.add(
      new MovingPlatform(
        p.x,
        p.y,
        p.destX,
        p.destY,
        p.vX,
        p.vY,
        p.size,
        ID.platforms,
        p.triggerID
      )
    );
  }
  this.add(this.movingPlatforms);
  this.levers = new powerupjs.GameObjectList(ID.layer_objects_1);
  for (var i = 0; i < this.levelData.levers.length; i++) {
    var l = this.levelData.levers[i];
    this.levers.add(new Lever(l.x, l.y, l.id));
  }
  this.add(this.levers);
  this.platforms = new powerupjs.GameObjectList(ID.layer_objects_2);
  for (var i = 0; i < this.levelData.platforms.length; i++) {
    var l = this.levelData.platforms[i];
    this.platforms.add(
      new Platform(l.x, l.y, l.destX, l.destY, l.id, currlevel)
    );
  }
  this.add(this.platforms);
  this.subRoomDoors = new powerupjs.GameObjectList(ID.layer_objects_2);
  console.log(this.levelData)
  for (var i = 0; i < this.levelData.subRoomDoors.length; i++) {
    var l = this.levelData.subRoomDoors[i];
    this.subRoomDoors.add(
      new Door(new powerupjs.Vector2(l.x, l.y), new powerupjs.Vector2(l.destX, l.destY), l.subRoomID, currlevel)
    );
  }
  this.add(this.subRoomDoors);
  this.signs = new powerupjs.GameObjectList(ID.layer_overlays);
  for (var i = 0; i < this.levelData.signs.length; i++) {
    var l = this.levelData.signs[i];
    this.signs.add(
      new Sign(l.text, l.pos, l.type)
    );
  }
  this.add(this.signs)
  this.machines = new powerupjs.GameObjectList(ID.layer_overlays);
  for (var i = 0; i < this.levelData.brokenMachines.length; i++) {
    var l = this.levelData.brokenMachines[i];
    this.machines.add(
      new Machine(new powerupjs.Vector2(l.x, l.y - 25), l.triggerID)
    );
  }
  this.add(this.machines)
  this.items = new powerupjs.GameObjectList(ID.layer_objects_1);
  for (var i=0; i<this.levelData.items.length; i++) {
    var l = this.levelData.items[i];
    this.items.add(new Item(l.type, l.sprite, l.position))
  }
  this.add(this.items)
  this.add(tiles);
  var backgroundBack = new powerupjs.AnimatedGameObject(
    0.9,
    ID.layer_background
  );
  backgroundBack.loadAnimation(
    sprites.cave_background_backs[this.levelData.backgrounds[1]],
    "play",
    true,
    0.25
  );
  backgroundBack.playAnimation("play");
  this.add(backgroundBack);
  var backgroundFront = new powerupjs.SpriteGameObject(
    sprites.cave_background_fronts[this.levelData.backgrounds[0]],
    0.9,
    0,
    ID.layer_background_2
  );
  this.add(backgroundFront);
  this.doorEntered = doorEntered;
}

Level.prototype = Object.create(powerupjs.GameObjectList.prototype);

Level.prototype.update = function (delta) {
  if (powerupjs.GameStateManager.get(ID.game_state_playing).inCutscene) {
    if (powerupjs.GameStateManager.get(ID.game_state_playing).currentCutsceneIndex === undefined) return
    powerupjs.GameStateManager.get(ID.game_state_playing).cutscenes[
      powerupjs.GameStateManager.get(ID.game_state_playing).currentCutsceneIndex
    ].update();
  }

  if (powerupjs.GameStateManager.get(ID.game_state_playing).inCutscene) return;
  powerupjs.GameObjectList.prototype.update.call(this, delta);

  var playingState = powerupjs.GameStateManager.get(ID.game_state_playing);
  var player = playingState.player;
  for (var i = 0; i < this.levelData.doors.length; i++) {
    var doorData = this.levelData.doors[i];
    var rect = new powerupjs.Rectangle(
      doorData.x,
      doorData.y,
      doorData.width,
      doorData.height
    );
    if (rect.intersects(player.boundingBox)) {
      playingState.goToLevel(doorData.ID, doorData);
      playingState.player.position = new powerupjs.Vector2(
        doorData.destX,
        doorData.destY
      );
      break;
    }
  }
  for (var i = 0; i < this.subRoomDoors.listLength; i++) {
    var subDoorData = this.subRoomDoors.at(i);
    var rect = new powerupjs.Rectangle(
      subDoorData.position.x,
      subDoorData.position.y,
      subDoorData.width,
      subDoorData.height
    );
    if (rect.intersects(player.boundingBox)) {
      player.isByInteractable = true;
      if (powerupjs.Keyboard.keys[69].pressed) {
      playingState.player.position = subDoorData.spawnArea.copy()
      playingState.currentSublevelIndex = subDoorData.subRoomID
      playingState.currentLevelIndex = -1
      playingState.currentGameStyle = 'explore'
      player.isByInteractable = false;

      break;
      }
    }
    else {
      player.isByInteractable = false;
    }
  }
};

Level.prototype.draw = function () {
  powerupjs.GameObjectList.prototype.draw.call(this);
};
