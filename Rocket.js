function Rocket(position, leftShot) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_objects_2);
  this.position = position;
  this.exploding = false;
  this.spawnPosition = position;
  this.movingLeft = leftShot;
  this.spawnTime = 0;
  this.loadAnimation(sprites.explode, "explode", false, 0.03);
  this.loadAnimation(sprites.rocket, "flying", true, 1);
  this.playAnimation("flying");
  this.origin = new powerupjs.Vector2(this.width / 2, 0)

  this.reset();
}

Rocket.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Rocket.prototype.reset = function () {
  this.animationTime = 0;
  this.position = this.spawnPosition.copy();
  this.visible = true;
  this.exploding = false;
  if (this.movingLeft) {
    this.velocity.x = -500;
    this.mirror = false;
  } else if (!this.movingLeft) {
    this.velocity.x = 500;
    this.mirror = true;
  }
  this.spawnTime = 0
  this.waitTime = Math.random() * 2000 + 1000
};

Rocket.prototype.update = function (delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  if (this.visible) this.playAnimation("flying");
  if (!this.visible) this.velocity.x = 0
  this.handleCollisions();
  if (!this.visible) {
    if (Date.now() > this.spawnTime + this.waitTime) this.reset();
};
}

Rocket.prototype.handleCollisions = function () {
  var tiles = this.root.find(ID.tiles);
  var floorX = Math.floor(this.position.x / tiles.cellWidth);
  var floorY = Math.floor(this.position.y / tiles.cellHeight);
  // console.log(floorY)

    for (var x = floorX - 2; x < floorX + 2; x++) {
      var tileBounds = new powerupjs.Rectangle(
        x * tiles.cellWidth,
        floorY * tiles.cellHeight,
        tiles.cellWidth,
        tiles.cellHeight
      );
      var boundingBox = new powerupjs.Rectangle(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
      var tileType = tiles.getTileType(x, floorY);
      if (
       boundingBox.intersects(tileBounds) &&
        tileType !== TileType.background && tileType !== TileType.platform &&
        this.visible
      ) {
        this.spawnTime = Date.now()
        this.visible = false
  
    
      }
    }
  var player = powerupjs.GameStateManager.get(ID.game_state_playing).player;
  if (player.boundingBox.intersects(this.boundingBox) && this.visible) {
    player.reset();
    this.visible = false;
    this.spawnTime = Date.now();
  }
};
