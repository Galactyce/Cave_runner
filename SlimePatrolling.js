function SlimePatrolling(position) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_objects_1);
  this.loadAnimation(sprites.slime_bouncing ,'bouncing', true, 0.3);
  this.position = position;
  this.startPosition = position
  this.reset();
  this.playAnimation('bouncing')
  this.origin = new powerupjs.Vector2(this.width / 2, this.height / 4)

}

SlimePatrolling.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

SlimePatrolling.prototype.reset = function() {
  this.velocity.x = 400
}


SlimePatrolling.prototype.update = function(delta) {
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);

  var tiles = powerupjs.GameStateManager.currentGameState.currentLevel.find(
    ID.tiles
  );
  var x_floor = Math.floor((this.position.x) / tiles.cellWidth);
  var y_floor = Math.floor((this.position.y) / tiles.cellHeight);

      // var boundingBox = this.boundingBox;
      if (tiles.getTileType(x_floor, y_floor) === TileType.normal) {
        this.velocity.x = this.velocity.x * -1
      }
      if (tiles.getTileType(x_floor, y_floor + 2) === TileType.background) {
        this.velocity.x = this.velocity.x * -1
      }
      // else if (tiles.getTileType(x - 1, y + 1) === TileType.normal) {
      //   this.velocity.x = this.velocity.x * -1;
      //   alert()
      // }
  
    var player = powerupjs.GameStateManager.get(ID.game_state_playing).player;
    if (this.boundingBox.intersects(player.boundingBox)) {
      player.reset()
    }

}