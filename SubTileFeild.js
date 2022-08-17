function SubTileFeild(currSublevel, position, origin, parent) {
  powerupjs.GameObjectGrid.call(
    this,
    window.SUBLEVELS[currSublevel].tiles.length,
    window.SUBLEVELS[currSublevel].tiles[0].length,
    ID.layer_background_2,
    ID.subTiles
  );
  this.parent = parent
  this.cellWidth = 60;
  this.cellHeight = 60;
  this.position = position
  this.origin = origin
  this.currSublevel = currSublevel;
  

  this.loadTiles();

}

SubTileFeild.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

SubTileFeild.prototype.loadTiles = function() {
  var pos = new powerupjs.Vector2(this.position.x + this.origin.x, this.position.y + this.origin.y)
  for (var y = 0; y < this.rows; y++) {
    for (var x = 0; x <  this.columns; x++) {
      var t = this.loadTile(window.SUBLEVELS[this.currSublevel].tiles[y][x], x, y)
      this.addAt(t, x, y, pos)
    }
  }
}

SubTileFeild.prototype.draw = function() {
  powerupjs.GameObjectGrid.prototype.draw.call(this);
}


SubTileFeild.prototype.loadTile = function(type, x, y) {
  switch (type) {
    case '#': return new CollisionTile('normal', new powerupjs.Vector2(x, y));
    case '.': return new CollisionTile('background', new powerupjs.Vector2(x, y));
    default: return new CollisionTile('background', new powerupjs.Vector2(x, y));
  }
}