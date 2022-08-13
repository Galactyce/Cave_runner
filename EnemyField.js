function EnemyField(currlevel, id, data, parent) {
  powerupjs.GameObjectGrid.call(this, window.ENEMIES[currlevel].tiles.length, window.ENEMIES[currlevel].tiles[0].length, ID.layer_overlays, id);
  this.parent = parent
  this.position = new powerupjs.Vector2(0, 0)
  this.data = data
  this.cellWidth = 60;
  this.cellHeight = 59.5
  this.loadTiles()
}

EnemyField.prototype = Object.create(powerupjs.GameObjectGrid.prototype)

EnemyField.prototype.loadTiles = function() {
  for (var y = 0; y < this.rows; y++) {
    for (var x = 0; x <  this.columns; x++) {
      var t = this.loadEnemy(this.data.tiles[y][x], Math.floor(x * this.cellWidth + this.position.x), y * this.cellHeight + this.position.y)
      if (t === undefined) return
      this.addAt(t, x, y)
    }
  }

}


EnemyField.prototype.loadEnemy = function(type, x, y) {

  switch(type) {

    case "F":
      return new FlyingBomb(new powerupjs.Vector2(x, y))
    case 'S': 
      return new SlimePatrolling(new powerupjs.Vector2(x, y))   
    case 'R': 
      return new Rocket(new powerupjs.Vector2(x + 20, y + 10), false)
    case 'L':
      return new Rocket(new powerupjs.Vector2(x - 20, y + 10), true);   
    default: return new Tile('background', new powerupjs.Vector2(x, y))
  }

}

