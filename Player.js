function Player(position) {
  powerupjs.AnimatedGameObject.call(this, 1, 0, ID.layer_objects);
  this.position = position;
  this.loadAnimation(sprites.idle, "idle", false);
  this.loadAnimation(sprites.run, "run", true, 0.08);
  this.loadAnimation(sprites.wrench_idle, 'wrench_idle', false);
  this.loadAnimation(sprites.wrench_run, 'wrench_run', true, 0.08);
  this.holding = window.GAMEDATA.currentItem
  this.playAnimation("idle");
  this.playerVelo = new powerupjs.Vector2(0, 0);
  this.velocity = new powerupjs.Vector2(0, 0);
  this.startPosition = this.position.copy();
  this.oldPos = new powerupjs.Vector2(this.position);
  this.startRoom = 0;
  this.origin = new powerupjs.Vector2(
    this.sprite.width / 2,
    this.sprite.height / 2
  );
  this.jumping = false;
  this.interactMarker = new InteractMarker(this.position);
  this.isByInteractable = false;
}

Player.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Player.prototype.reset = function () {
  this.position = this.startPosition.copy();
  var playing = powerupjs.GameStateManager.currentGameState;
  playing.currentLevelIndex = this.startRoom;
  this.holding = window.GAMEDATA.savedItem
  window.GAMEDATA.currentItem = this.holding
  this.visible = true;
  for (var i=0; i<window.GAMEDATA.pickedUpItems.length; i++) {
  if (window.GAMEDATA.savedItem !== window.GAMEDATA.pickedUpItems[i]) {
    window.GAMEDATA.pickedUpItems[i] = null;
    window.GAMEDATA.pickedUpItems = window.GAMEDATA.pickedUpItems.filter((a) => a)
  }
  }
  playing.inventorySlot.contains = window.GAMEDATA.savedItem
};

Player.prototype.handleInput = function () {
  var playing = powerupjs.GameStateManager.get(ID.game_state_playing);
  for (var i = 0; i < playing.levels.length; i++) {
    if (playing.inCutscene) {
      return;
    }
  }
  if (playing.currentGameStyle === "platformer") {
    if (powerupjs.Keyboard.keys[37].down || powerupjs.Keyboard.keys[65].down) {
      this.mirror = true;
      this.velocity.x += -105;
      if (this.velocity.x < -700) this.velocity.x = -500;
      if (this.onPlatform) this.velocity.x = -500;
      if (this.holding === 'nothing')
      this.playAnimation("run");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_run') 
    } else if (
      powerupjs.Keyboard.keys[39].down ||
      powerupjs.Keyboard.keys[68].down
    ) {
      this.mirror = false;
      this.velocity.x += 105;
      if (this.velocity.x > 700) this.velocity.x = 500;
      if (this.onPlatform) this.velocity.x = 500;
      if (this.holding === 'nothing')
      this.playAnimation("run");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_run') 
    } else {
      if (!this.onPlatform) this.velocity.x = 0;
      if (this.holding === 'nothing')
      this.playAnimation("idle");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_idle')
    }
    if (
      (powerupjs.Keyboard.keys[38].down || powerupjs.Keyboard.keys[87].down) &&
      this.onLadder
    ) {
      this.velocity.y = -200;
    }
    if (powerupjs.Keyboard.keys[32].pressed) {
      this.startJumping = true;
    }
    if (
      powerupjs.Keyboard.keys[32].down &&
      (this.onTheGround || this.onPlatform) &&
      this.startJumping
    ) {
      this.jumping = true;
    }
    if (!powerupjs.Keyboard.keys[32].down) {
      this.jumping = false;
    }

    if (this.jumping) this.jump();

    this.origin = new powerupjs.Vector2(
      this.sprite.width / 2,
      this.sprite.height / 2
    );
  } else if (playing.currentGameStyle === "explore") {
    if (powerupjs.Keyboard.keys[37].down || powerupjs.Keyboard.keys[65].down) {
      this.mirror = true;
      this.velocity.x = -250;
      if (this.holding === 'nothing')
      this.playAnimation("run");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_run') 
    } else if (
      powerupjs.Keyboard.keys[39].down ||
      powerupjs.Keyboard.keys[68].down
    ) {
      this.mirror = false;
      this.velocity.x = 250;
      if (this.holding === 'nothing')
      this.playAnimation("run");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_run') 
    } else {
      this.velocity.x = 0;
    }
    if (powerupjs.Keyboard.keys[38].down || powerupjs.Keyboard.keys[87].down) {
      this.velocity.y = -250;
      if (this.holding === 'nothing')
      this.playAnimation("run");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_run') 
    } else if (
      powerupjs.Keyboard.keys[40].down ||
      powerupjs.Keyboard.keys[87].down
    ) {
      this.velocity.y = 250;
      if (this.holding === 'nothing')
      this.playAnimation("run");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_run') 
    } else {
      this.velocity.y = 0;
    }
    if (
      !powerupjs.Keyboard.keys[37].down &&
      !powerupjs.Keyboard.keys[65].down &&
      !powerupjs.Keyboard.keys[39].down &&
      !powerupjs.Keyboard.keys[68].down &&
      !powerupjs.Keyboard.keys[38].down &&
      !powerupjs.Keyboard.keys[87].down &&
      !powerupjs.Keyboard.keys[40].down &&
      !powerupjs.Keyboard.keys[87].down
    ) {
      if (this.holding === 'nothing')
      this.playAnimation("idle");
      else if (this.holding === 'wrench')
      this.playAnimation('wrench_idle') // Play if no move buttons are pressed
    }
  }
};

Player.prototype.update = function (delta) {
  var playing = powerupjs.GameStateManager.get(ID.game_state_playing);

  if (playing.inCutscene) {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);

  for (var i = 0; i < playing.cutscenes.length; i++) {
    var cutscene = playing.cutscenes[i];
    if (playing.currentLevelIndex === cutscene.startRoom) {
    if (this.boundingBox.intersects(cutscene.rect)) {
      powerupjs.GameStateManager.get(
        ID.game_state_playing
      ).currentCutsceneIndex = cutscene.index;
      playing.inCutscene = true;
    }
  }
}
  this.doPhysics();
};

Player.prototype.doPhysics = function () {
  // if (this.onPlatform) return;
  // this.handleCollisions();
  if (
    powerupjs.GameStateManager.get(ID.game_state_playing).currentGameStyle ===
    "platformer"
  ) {
    if (!this.jumping) {
      if (this.onLadder && !this.onTheGround && !powerupjs.Keyboard.keys[40].down) {
        this.velocity.y = 150;
      } else this.velocity.y += 100;
      if (this.velocity.y > 1000) this.velocity.y = 1000;
    }
  }
  this.handleCollisions();
};

Player.prototype.jump = function () {
  this.velocity.y -= 200;
  if (this.velocity.y < -800) {
    this.jumping = false;
    return;
  }
  this.jumping = true;
  this.onLadder = false;
};

Player.prototype.handleCollisions = function () {
  if (
    powerupjs.GameStateManager.get(ID.game_state_playing).currentGameStyle ===
    "platformer"
  ) {
    this.onTheGround = false;
    this.onLadder = false;
    this.onPlatform = false;
    var tiles = powerupjs.GameStateManager.get(
      ID.game_state_playing
    ).currentLevel.find(ID.tiles);
    var x_floor = Math.floor(
      (this.position.x + this.origin.x) / tiles.cellWidth
    );
    var y_floor = Math.floor(
      (this.position.y + this.origin.y) / tiles.cellHeight
    );
    for (var y = y_floor - 2; y < y_floor + 1; y++)
      for (var x = x_floor - 1; x < x_floor + 1; x++) {
        var tileType = tiles.getTileType(x, y);
        if (tileType === TileType.background) continue;
        var tileBounds = new powerupjs.Rectangle(
          x * tiles.cellWidth,
          y * tiles.cellHeight,
          tiles.cellWidth, //- Math.sign(this.velocity.x) * 4 ,  //  <=== Fixes ladder bug
          tiles.cellHeight
        );
        if (tileType === TileType.danger) {
          var tileBounds = new powerupjs.Rectangle(
            x * tiles.cellWidth + tiles.cellWidth / 8,
            y * tiles.cellHeight + tiles.cellHeight / 8,
            tiles.cellWidth - tiles.cellWidth / 4,
            tiles.cellHeight - tiles.cellHeight / 4
          );
        }
        var boundingBox = this.boundingBox;
        boundingBox.height = this.boundingBox.height + 1;
        var depth = boundingBox.calculateIntersectionDepth(tileBounds);
        if (!tileBounds.intersects(boundingBox)) {
          continue;
        }

        if (Math.abs(depth.x) < Math.abs(depth.y)) {
          if (tileType === TileType.normal || tileType === TileType.danger) {
            if (tileType === TileType.danger) {
              this.reset();
            } else {
              this.position.x += depth.x;
            }
            continue;
          }
        }

        if (
          this.previousYPosition <= tileBounds.top &&
          tileType !== TileType.background &&
          tileType !== TileType.ladder
        ) {
          if (tileType === TileType.danger) {
            this.reset();
            this.jumping = false;
          } else {
            this.startJumping = false;

            this.onTheGround = true;
            this.velocity.y = 0;
          }
        }

        if (tileType === TileType.normal || this.onTheGround) {
          // var rightBlock = tiles.getTileType(x + 1, y);
          // console.log(rightBlock)
          // if (rightBlock === TileType.ladder) return
          if (depth.y > 40 || depth.y < -80) return;
          this.position.y += depth.y + 1;
        }
      }

    // ------LADDER PHYSICS------- //

    for (var y = y_floor - 2; y < y_floor + 2; y++)
      for (var x = x_floor - 2; x <= x_floor + 2; x++) {
        var tileType = tiles.getTileType(x, y);
        if (tileType === TileType.background) continue;
        var tileBounds = new powerupjs.Rectangle(
          x * tiles.cellWidth,
          y * tiles.cellHeight,
          tiles.cellWidth,
          tiles.cellHeight
        );
        var boundingBox = this.boundingBox;
        boundingBox.height += 1;
        var depth = boundingBox.calculateIntersectionDepth(tileBounds);
        if (
          boundingBox.intersects(tileBounds) &&
          tileType === TileType.ladder
        ) {
          this.onLadder = true;
          return;
        }
      }

    // ---------MOVING PLATFORM PHYSICS--------------

    for (
      var i = 0;
      i <
      powerupjs.GameStateManager.currentGameState.currentLevel.movingPlatforms
        .listLength;
      i++
    ) {
      var platform =
        powerupjs.GameStateManager.currentGameState.currentLevel.movingPlatforms.at(
          i
        );
      var platRect = new powerupjs.Rectangle(
        platform.position.x,
        platform.position.y,
        platform.width,
        platform.height 
      );
      platRect.draw();
      this.boundingBox.draw();
      if (
        this.position.y + this.height / 2 > platform.position.y &&
        this.oldPos.y < platform.position.y
      ) {
        if (
          this.position.x > platform.position.x &&
          this.position.x < platform.position.x + platform.width
        ) {
          var boundingBox = this.boundingBox.height + 1
          var depth = platRect.calculateIntersectionDepth(this.boundingBox);
          this.onPlatform = true;
          // this.position.y -= Math.abs(depth.y);
          this.velocity.y = 0;
          this.velocity.x = 0
          this.velocity.x = platform.velocity.x * 2;
           this.position.y -= depth.y;
           console.log(depth.y)
          this.velocity.y = platform.velocity.y;
        }
      }
    }

    // ------------PLATFORM PHYSICS----------- //

    for (
      var i = 0;
      i <
      powerupjs.GameStateManager.get(ID.game_state_playing).currentLevel
        .platforms.listLength;
      i++
    ) {
      var platform =
        powerupjs.GameStateManager.currentGameState.currentLevel.platforms.at(
          i
        );
      var platRect = new powerupjs.Rectangle(
        platform.position.x,
        platform.position.y,
        platform.width,
        platform.height
      );
      platRect.draw();
      this.boundingBox.draw();
      if (
        this.position.y + this.height / 2 > platform.position.y &&
        this.oldPos.y <= platform.position.y
      ) {
        if (
          this.position.x > platform.position.x &&
          this.position.x < platform.position.x + platform.width
        ) {
          this.onTheGround = true;
          var depth = platRect.calculateIntersectionDepth(this.boundingBox);
          this.velocity.y = 0;
          this.position.y -= depth.y - 1;
        }
      }
    }

    this.previousYPosition = this.position.y;
    this.oldPos = new powerupjs.Vector2(this.position.x, this.position.y);
    this.onLadder = false;

  } else if (
    powerupjs.GameStateManager.get(ID.game_state_playing).currentGameStyle ===
    "explore"
  ) {
    var playing = powerupjs.GameStateManager.get(ID.game_state_playing);
    var tiles = playing.subLevels[playing.currentSublevelIndex].find(ID.subTiles);
    var x_floor = Math.floor(
      ((this.position.x + this.origin.x) / tiles.cellWidth) - 
      ( ((tiles.position.x - tiles.origin.x)) / tiles.cellWidth) 
    );
    var y_floor = Math.floor(
      ((this.position.y + this.origin.y) / tiles.cellHeight) -
      ((tiles.position.y - tiles.origin.y) / tiles.cellHeight)
    );
    for (var y = y_floor - 1; y < y_floor + 1; y++) {
      for (var x = x_floor - 1; x < x_floor + 1; x++) {
        var tileType = tiles.getTileType(x, y);
        if (tileType === TileType.background) continue;
        var tileBounds = new powerupjs.Rectangle(
          x * tiles.cellWidth + tiles.position.x - tiles.origin.x,
          y * tiles.cellHeight + tiles.position.y - tiles.origin.y,
          tiles.cellWidth, //- Math.sign(this.velocity.x) * 4 ,  //  <=== Fixes ladder bug
          tiles.cellHeight
        );
        var boundingBox = this.boundingBox;
        boundingBox.x = this.boundingBox.x + this.width / 4
        boundingBox.width = this.boundingBox.width - this.width / 2
        boundingBox.y = this.boundingBox.y + this.height / 4
        boundingBox.height = this.boundingBox.height - this.height / 2
        var depth = boundingBox.calculateIntersectionDepth(tileBounds);
        if (!tileBounds.intersects(boundingBox)) {
          continue;
        }
        if (tileType === TileType.normal) {
          if (Math.abs(depth.x) < Math.abs(depth.y)) {  
                this.position.x += depth.x;
            
          }
          else {
            this.position.y += depth.y - 4
      
          }
          // if (this.position.y <= tileBounds.bottom && this.previousYPosition > tileBounds.bottom) {
          //   // this.velocity.y = 0
          //   this.position.y += depth.y
          // }
        }
      }
    }
    this.previousYPosition = this.position.y
  }
};

Player.prototype.draw = function () {
  powerupjs.AnimatedGameObject.prototype.draw.call(this);
  if (this.isByInteractable) {
    this.interactMarker.position = new powerupjs.Vector2(
      this.position.x,
      this.position.y - 100
    );
    this.interactMarker.draw();
  }
};
