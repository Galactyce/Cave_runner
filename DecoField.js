function CaveDecoFeild(currlevel, id, data, parent) {
  powerupjs.GameObjectGrid.call(this, window.DECORATION[currlevel].cave_tiles.length, window.DECORATION[currlevel].cave_tiles[0].length, ID.layer_tiles, id);
  this.parent = parent
  this.position = new powerupjs.Vector2(0, 0)
  this.data = data
  this.cellWidth = 60;
  this.cellHeight = 59.5
  this.loadTiles()
}

CaveDecoFeild.prototype = Object.create(powerupjs.GameObjectGrid.prototype)

CaveDecoFeild.prototype.loadTiles = function() {
  for (var y = 0; y < this.rows; y++) {
    for (var x = 0; x <  this.columns; x++) {
      var t = this.loadCaveTile(this.data.cave_tiles[y][x], Math.floor(x + this.position.x), y + this.position.y)
      this.addAt(t, x, y)
    }
  }

}


CaveDecoFeild.prototype.loadCaveTile = function(type, x, y) {
  
  switch(type) {
    case '#': return new CaveDecoTile(0, new powerupjs.Vector2(x, y));
    case '@': return new CaveDecoTile(1, new powerupjs.Vector2(x, y));
    case 'L': return new CaveDecoTile(3, new powerupjs.Vector2(x, y));
    case 'R': return new CaveDecoTile(2, new powerupjs.Vector2(x, y));
    case 'B': return new CaveDecoTile(31, new powerupjs.Vector2(x, y));
    case 'H': return new CaveDecoTile(15, new powerupjs.Vector2(x, y));
    case 'J': return new CaveDecoTile(14, new powerupjs.Vector2(x, y));
    case 'K': return new CaveDecoTile(13, new powerupjs.Vector2(x, y));
    case 'O': return new CaveDecoTile(12, new powerupjs.Vector2(x, y));
    case 'P': return new CaveDecoTile(11, new powerupjs.Vector2(x, y));
    case 'Z': return new CaveDecoTile(10, new powerupjs.Vector2(x, y));
    case 'C': return new CaveDecoTile(16, new powerupjs.Vector2(x, y));
    case '+': return new CaveDecoTile(18, new powerupjs.Vector2(x, y));
    case '^': return new CaveDecoTile(19, new powerupjs.Vector2(x, y));
    case 'V': return new CaveDecoTile(20, new powerupjs.Vector2(x, y));
    case '$': return new CaveDecoTile(17, new powerupjs.Vector2(x, y));
    case 'G': return new CaveDecoTile(26, new powerupjs.Vector2(x, y));
    case 'S': return new CaveDecoTile(23, new powerupjs.Vector2(x, y));
    case 'W': return new CaveDecoTile(14, new powerupjs.Vector2(x, y));
    case '%': return new CaveDecoTile(21, new powerupjs.Vector2(x, y));
    case '-': return new CaveDecoTile(0, new powerupjs.Vector2(x, y), 'platform')
    case 'N': return new CaveDecoTile(0, new powerupjs.Vector2(x, y), 'single')

    case '.': return new Tile('background', new powerupjs.Vector2(x, y));

  }
}

function MossDecoFeild(currlevel, id, data, parent) {
  powerupjs.GameObjectGrid.call(this, window.DECORATION[currlevel].moss_tiles.length, window.DECORATION[currlevel].moss_tiles[0].length, ID.layer_overlays, id);
  this.parent = parent
  this.position = new powerupjs.Vector2(0, 0)
  this.data = data
  this.cellWidth = 60;
  this.cellHeight = 59.5
  this.loadTiles()
}

MossDecoFeild.prototype = Object.create(powerupjs.GameObjectGrid.prototype)


MossDecoFeild.prototype.loadTiles = function() {
  
  for (var y = 0; y < this.rows; y++) {
    for (var x = 0; x <  this.columns; x++) {
      var t = this.loadMossTile(this.data.moss_tiles[y][x], Math.floor(x + this.position.x), y + this.position.y)
      this.addAt(t, x, y)
    }
  }
}



MossDecoFeild.prototype.loadMossTile = function(type, x, y) {
  
  switch(type) {
    case '1': return new MossDecoTile(0, new powerupjs.Vector2(x, y))
    case '2': return new MossDecoTile(1, new powerupjs.Vector2(x, y))
    case '3': return new MossDecoTile(2, new powerupjs.Vector2(x, y));
    case '#': return new Tile('background', new powerupjs.Vector2(x, y))
    case '-': return new Tile('background', new powerupjs.Vector2(x, y))
    case '.': return new Tile('background', new powerupjs.Vector2(x, y))

  }
}
