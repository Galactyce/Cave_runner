

function TileFeild(currlevel, id, data, parent) {
  powerupjs.GameObjectGrid.call(this, data.tiles.length, data.tiles[0].length, ID.layer_overlays, id);
  this.parent = parent
  this.currlevel = currlevel
  this.position = new powerupjs.Vector2(0, 0)
  this.data = data
  this.cellWidth = 60;
  this.cellHeight = 60
  this.loadTiles()
}

TileFeild.prototype = Object.create(powerupjs.GameObjectGrid.prototype)

TileFeild.prototype.loadTiles = function() {
  for (var y = 0; y < this.rows; y++) {
    for (var x = 0; x <  this.columns; x++) {
      var t = this.loadTile(this.data.tiles[y][x], x + this.position.x, y + this.position.y)
      this.addAt(t, x, y)
    }
  }
}


TileFeild.prototype.update = function(delta) {
  powerupjs.GameObjectGrid.prototype.update.call(this, delta)


}

TileFeild.prototype.loadTile = function(type, x, y) {
  switch(type) {
    case '#': return new Tile('ground', new powerupjs.Vector2(x, y));
    case '-': return new Tile('platform', new powerupjs.Vector2(x, y));
    case 'D': return new Tile('danger', new powerupjs.Vector2(x, y), 'cave_spike');
    case 'K': return new Tile('danger', new powerupjs.Vector2(x, y), 'spike_block');
    case 'H': return new Tile('ladder', new powerupjs.Vector2(x, y));
    case 'C': this.root.add(new Checkpoint(new powerupjs.Vector2(x * this.cellWidth, y * this.cellHeight), this.currlevel))
    return new Tile('background', new powerupjs.Vector2(x, y))

     case '.': return new Tile('background', new powerupjs.Vector2(x, y));

    default: return  new Tile('background', new powerupjs.Vector2(x, y));
  }
}