function PlayingState() {
  powerupjs.GameObject.call(this);
  this.currentGameStyle = 'platformer';
  this.currentLevelIndex = 0;
  this.currentSublevelIndex = -1;
  this.levelIDs = [];
  this.levels = [];
  this.subLevels = [];
  this.cutscenes = [];
  this.overlays = [];
  this.tutorialControls = [];
  this.spawnPos = new powerupjs.Vector2(200, 700);
  this.currentCheckpoint = undefined;
  this.currentCutsceneIndex = undefined;
  this.inCutscene = false;
  this.inventorySlot = null;
  this.levelEntered = undefined;

 
  for (var k = 0; k < window.LEVELS.length; k++) {
    for (var i = 0; i < window.LEVELS[k].cutscenes.length; i++) {
      this.cutscenes.push(
        new Cutscene(
          window.LEVELS[k].cutscenes[i].parts,
          window.LEVELS[k].cutscenes[i].rect,
          window.LEVELS[k].cutscenes[i].triggerArea,
          window.LEVELS[k].cutscenes[i].triggerID,
          window.LEVELS[k].cutscenes[i].reusable,
          window.LEVELS[k].cutscenes[i].index
        )
      );
    }
  }

  this.loadLevels();
  this.loadSubLevels();

  for (var level = 0; level < window.LEVELS.length; level++) {
    if (window.LEVELS[level].checked) {
      this.levelEntered = level;
      this.currentLevelIndex = this.levelEntered;
      this.spawnPos = this.levels[level].checkpoints.at(0).position.copy();
      this.levels[level].checkpoints.at(0).grabbed = true;
    }
    for (var i = 0; i < window.LEVELS[level].platforms.length; i++) {
      if (window.LEVELS[level].platforms[i].active) {
        this.levels[level].platforms.at(i).activated = true;
      }
    }
  }
  this.loadPlayer();
  this.loadInventory(new powerupjs.Vector2(20, 20));
  // this.writeLevelsStatus();

  this.loadLevelsStatus();
  this.writeLevelsStatus();



  if (this.currentLevelIndex !== -1)
  this.goToLevel(this.currentLevelIndex, null);
}

PlayingState.prototype = Object.create(powerupjs.GameObject.prototype);

PlayingState.prototype.loadPlayer = function () {
  this.player = new Player(this.spawnPos);
  this.player.startRoom = this.currentLevelIndex;
  powerupjs.Game.started = true;
};

Object.defineProperty(PlayingState.prototype, "currentLevel", {
  get: function () {
    return this.levels[this.currentLevelIndex];
  },
});

Object.defineProperty(PlayingState.prototype, "currentSubLevel", {
  get: function () {
    console.log(this.subLevels[this.currentSubLevelIndex])
    return this.subLevels[this.currentSubLevelIndex];
  },
});

PlayingState.prototype.loadInventory = function(position) {
  this.inventorySlot = new Inventory(position);
  this.inventorySlot.contains = window.GAMEDATA.currentItem
}

PlayingState.prototype.handleInput = function (delta) {
  if (this.currentLevelIndex !== -1)
  this.currentLevel.handleInput(delta);
  this.player.handleInput(delta);
};

PlayingState.prototype.update = function (delta) {
  this.player.update(delta);

  if (this.currentLevelIndex >= 0) {

    for (var i = 0; i < this.levels.length; i++) {
      for (var k = 0; k < this.levels[i].platforms.listLength; k++) {
        this.levels[i].platforms.at(k).update(delta);
      }
    }
    console.log(this.currentLevelIndex)
 

    for (var i = 0; i < this.levels[this.currentLevelIndex].signs.listLength; i++) {
      this.levels[this.currentLevelIndex].signs.at(i).controls.update(delta);
    }
    this.currentLevel.update(delta);

  }
  if (this.currentSublevelIndex >= 0) {
    for (var i=0; i<this.subLevels[this.currentSublevelIndex].items.listLength; i++) {
      this.subLevels[this.currentSublevelIndex].items.at(i).update(delta)
    }
    this.subLevels[this.currentSublevelIndex].update(delta)
  }
};

PlayingState.prototype.draw = function () {
  if (this.currentLevelIndex !== -1)
  this.currentLevel.draw();
  if (this.currentSublevelIndex !== -1) {
    this.subLevels[this.currentSublevelIndex].backgroundBack.draw()
    this.subLevels[this.currentSublevelIndex].items.draw()
  }
  this.player.draw();
  if (this.currentSublevelIndex !== -1)
    this.subLevels[this.currentSublevelIndex].backgroundFront.draw()
  if (this.currentLevelIndex !== -1) {

  this.currentLevel.moss_deco.draw();
  this.currentLevel.enemies.draw();
  for (var i = 0; i < this.currentLevel.signs.listLength; i++) {
    this.currentLevel.signs.at(i).controls.draw();
  }
  this.currentLevel.lava_deco.draw();

}
if (this.currentSublevelIndex !== -1) {
  this.subLevels[this.currentSublevelIndex].draw()
}
this.inventorySlot.draw()

for (var i = 0; i < this.overlays.length; i++) {
  this.overlays[i].draw();
}
};

PlayingState.prototype.reset = function () {
  this.currentLevel.reset();
  this.player.reset();
};

PlayingState.prototype.goToLevel = function (levelIndex) {
  if (levelIndex < 0 || levelIndex >= window.LEVELS.length) return;
  // if (doorEntered !== null)
  // this.currentLevelIndex = doorEntered.ID
  this.currentLevelIndex = levelIndex;
  this.levelIDs[levelIndex] = this.levels[levelIndex];
  for (var i = 0; i < window.LEVELS.length; i++) {
    this.levels[i].levelData.entered = false;
  }
  //  this.currentLevel.levelData.entered = true;
  //  alert(this.currentLevelIndex)
  this.writeLevelsStatus();
};

PlayingState.prototype.loadLevels = function () {
  for (var currLevel = 0; currLevel < window.LEVELS.length; currLevel++) {
    this.levels.push(new Level(currLevel));
  }
};

PlayingState.prototype.loadSubLevels = function () {
  for (var currLevel = 0; currLevel < window.SUBLEVELS.length; currLevel++) {
    this.subLevels.push(new Sublevel(currLevel));
  }
};

PlayingState.prototype.loadLevelsStatus = function () {
  if (localStorage) {
    window.LEVELS = JSON.parse(localStorage.platformLevels);
    window.DECORATION = JSON.parse(localStorage.platformLevelsDeco);
    window.ENEMIES = JSON.parse(localStorage.platformLevelsEnemies);
    window.SUBLEVELS = JSON.parse(localStorage.platformSubLevels);
    window.GAMEDATA = JSON.parse(localStorage.platformData);

  }
};

PlayingState.prototype.writeLevelsStatus = function () {
  if (!localStorage) return;
  localStorage.platformLevels = JSON.stringify(window.LEVELS);
  localStorage.platformLevelsDeco = JSON.stringify(window.DECORATION);
  localStorage.platformLevelsEnemies = JSON.stringify(window.ENEMIES);
  localStorage.platformSubLevels = JSON.stringify(window.SUBLEVELS);
  localStorage.platformData = JSON.stringify(window.GAMEDATA);

};
