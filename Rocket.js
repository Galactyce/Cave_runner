function Rocket(position, leftShot) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_objects_2);
  this.position = position;
  this.exploding = false;
  this.spawnPosition = position
  this.movingLeft = leftShot;
  this.loadAnimation(sprites.explode, "explode", false, 0.03);
  this.loadAnimation(sprites.rocket, 'flying', false, 1)
  this.playAnimation('flying');
  this.origin = new powerupjs.Vector2(this.width / 2, this.height / 2)
  this.animationTime = 0
  this.reset()
}

Rocket.prototype = Object.create(powerupjs.AnimatedGameObject.prototype)

Rocket.prototype.reset = function() {
  this.waitTime = Math.random() * 3000 + 5000
  this.animationTime = 0
  this.position = this.spawnPosition.copy();
  this.exploding = false;
  if (this.movingLeft) {
    this.velocity.x = -500;
    this.mirror = false
  }
  else if (!this.movingLeft) {
    this.velocity.x = 500;
    this.mirror = true
  }
}

Rocket.prototype.update = function(delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta)
  if (!this.exploding)
  this.playAnimation('flying')
  this.handleCollisions()
}

Rocket.prototype.handleCollisions = function() {
  var tiles = this.root.find(ID.tiles)
  var floorX = Math.floor(this.position.x / tiles.cellWidth);
  var floorY = Math.floor(this.position.y / tiles.cellHeight);
  for (var y = floorY - 1; y < floorY + 1; y++)
  for (var x = floorX - 1; x < floorX + 1; x++) {
    var tileBounds = new powerupjs.Rectangle(x * tiles.cellWidth, y * tiles.cellHeight, tiles.cellWidth, tiles.cellHeight);
    var boundingBox = new powerupjs.Rectangle(this.position.x, this.position.y, sprites.rocket.width, sprites.rocket.height);
    var tileType = tiles.getTileType(x, y)
    // boundingBox.height /= 8;
    // boundingBox.y += boundingBox.height / 2
    if (boundingBox.intersects(tileBounds) && tileType !== TileType.background && !this.exploding) {
      this.exploding = true
      this.playAnimation('explode')

        this.reset()
      
  }
  }
  var player = powerupjs.GameStateManager.get(ID.game_state_playing).player;
  if (player.boundingBox.intersects(this.boundingBox)) {
    player.reset()
    this.reset()
  }
}
