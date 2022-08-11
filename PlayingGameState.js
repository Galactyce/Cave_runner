function PlayingState() {
  powerupjs.GameObject.call(this);

  this.currentLevelIndex = 0;
  this.levelIDs = [];
  this.levels = [];
  this.spawnPos = new powerupjs.Vector2(200, 200);
  this.currentCheckpoint = undefined;
  this.levelEntered = undefined;
  this.loadLevelsStatus();
  this.writeLevelsStatus();
  this.loadLevels();

  for (var level = 0; level < window.LEVELS.length; level++) {
    if (window.LEVELS[level].checked) {
      this.levelEntered = level;
      this.currentLevelIndex = this.levelEntered;
      this.spawnPos = this.levels[level].checkpoints.at(0).position.copy();
      this.levels[level].checkpoints.at(0).grabbed = true;
    }
    for (var i = 0; i < window.LEVELS[level].platforms.length; i++) {
      if (window.LEVELS[level].platforms[i].active) {
        alert()
        this.levels[level].platforms.at(i).activated = true;
        console.log(this.levels[level].platforms.at(i))
      }
    }
  }
  this.loadPlayer();

  this.goToLevel(this.currentLevelIndex, null);
}

PlayingState.prototype = Object.create(powerupjs.GameObject.prototype);

PlayingState.prototype.loadPlayer = function () {
  this.player = new Player(this.spawnPos);
  this.player.startRoom = this.currentLevelIndex;
  powerupjs.Game.started = true;
};

PlayingState.prototype.hardReset = function () {
  for (var i = 0; i < window.LEVELS.length; i++) {
    window.LEVELS[i].checked = false;
    alert("resetting");
  }
  this.writeLevelsStatus();
  window.location.reload();
};

Object.defineProperty(PlayingState.prototype, "currentLevel", {
  get: function () {
    return this.levelIDs[this.currentLevelIndex];
  },
});

PlayingState.prototype.handleInput = function (delta) {
  this.currentLevel.handleInput(delta);
  this.player.handleInput(delta);
};

PlayingState.prototype.update = function (delta) {
  this.currentLevel.update(delta);
  this.player.update(delta);
  for (var i = 0; i < this.levels.length; i++) {
    for (var k = 0; k < this.levels[i].platforms.listLength; k++) {
      this.levels[i].platforms.at(k).update(delta);
    }
  }
};

PlayingState.prototype.draw = function () {
  this.currentLevel.draw();
  this.player.draw();
  this.currentLevel.moss_deco.draw();
  this.currentLevel.enemies.draw();
};

PlayingState.prototype.reset = function () {
  this.currentLevel.reset();
  this.player.reset();
};

PlayingState.prototype.nextLevel = function () {
  if (this.currentLevelIndex >= window.LEVELS.length - 1) return;
  this.goToLevel(this.currentLevelIndex + 1);
  window.LEVELS[this.currentLevelIndex].locked = false;
  this.writeLevelsStatus();
};

PlayingState.prototype.goToLevel = function (levelIndex) {
  if (levelIndex < 0 || levelIndex >= window.LEVELS.length) return;
  // if (doorEntered !== null)
  // this.currentLevelIndex = doorEntered.ID
  this.levelIDs[levelIndex] = this.levels[levelIndex];
  this.currentLevelIndex = levelIndex;
  for (var i = 0; i < window.LEVELS.length; i++) {
    this.levels[i].levelData.entered = false;
  }
  this.currentLevel.levelData.entered = true;
  //  alert(this.currentLevelIndex)
  this.writeLevelsStatus();
};

PlayingState.prototype.loadLevels = function () {
  for (var currLevel = 0; currLevel < window.LEVELS.length; currLevel++) {
    this.levels.push(new Level(currLevel));
    // alert(currLevel)
  }
};

PlayingState.prototype.loadLevelsStatus = function () {
  if (localStorage && localStorage.platformLevels) {
    window.LEVELS = JSON.parse(localStorage.platformLevels);
    window.DECORATION = JSON.parse(localStorage.platformLevelsDeco);
    window.ENEMIES = JSON.parse(localStorage.platformLevelsEnemies);
  }
};

PlayingState.prototype.writeLevelsStatus = function () {
  if (!localStorage) return;
  localStorage.platformLevels = JSON.stringify(window.LEVELS);
  localStorage.platformLevelsDeco = JSON.stringify(window.DECORATION);
  localStorage.platformLevelsEnemies = JSON.stringify(window.ENEMIES);
};
