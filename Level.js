function Level(currlevel, doorEntered) {
  powerupjs.GameObjectList.call(this);
  this.starting = true;
  this.levelData = window.LEVELS[currlevel];
  this.decoData = window.DECORATION[currlevel]
  this.enemyData = window.ENEMIES[currlevel]
var tiles = new TileFeild(currlevel, ID.tiles, this.levelData, this);
  this.cave_deco = new CaveDecoFeild(currlevel, ID.deco, this.decoData, this)
  this.add(this.cave_deco)
  this.moss_deco = new MossDecoFeild(currlevel, 10, this.decoData, this)
  this.add(this.moss_deco);
  this.enemies = new EnemyField(currlevel, 10, this.enemyData, this)
  this.add(this.enemies)
  this.platforms = new powerupjs.GameObjectList(ID.layer_overlays);
  for (var i=0; i<this.levelData.platforms.length; i++) {
    var p = this.levelData.platforms[i]
    this.platforms.add(new Platform(p.x, p.y, p.destX, p.destY, p.vX, p.vY, p.size, ID.platforms))
    console.log(this.platforms[i])
  }
  this.add(this.platforms)

  this.add(tiles);
  var backgroundBack = new powerupjs.SpriteGameObject(
    sprites.cave_background_back,
    0.9,
    0,
    ID.layer_background
  );
  this.add(backgroundBack);
  var backgroundFront = new powerupjs.SpriteGameObject(
    sprites.cave_background_front,
    0.9,
    0,
    ID.layer_background_1
  );
  this.add(backgroundFront);

  this.doorEntered = doorEntered
}

Level.prototype = Object.create(powerupjs.GameObjectList.prototype);



Level.prototype.update = function (delta) {
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
      playingState.player.position = new powerupjs.Vector2(doorData.destX, doorData.destY)
      break
    }
  }
};

// Level.prototype.loadBackgroundTile = function(x, y) {
//   var t = new GrassTile(true, new powerupjs.Vector2(x, y));
//   tiles.addAt(t, x, y);

// }

// Level.prototype.loadGrassTile = function(x, y) {
//   var t = new GrassTile(false, new powerupjs.Vector2(x, y))

//   tiles.addAt(t, x, y);

// }
