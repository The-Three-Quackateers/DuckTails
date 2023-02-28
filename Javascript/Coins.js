let gameScene = new Phaser.Scene("Game");

let coinsSpawn = 10;
let coinArray = [];
let score = 0;
let scoreText;
let breadSpawn = 5;
let breadArray = [];
let total = coinsSpawn * 10;
let music;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
let config = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  scene: (gameScene = {
    update: update,
    create: create,
    preload: preload,
  }),
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

let game = new Phaser.Game(config);
let duck;
let coinSound;
let lastDirection;
let decoration;
function preload() {
  this.load.image("Bread", "images/Bread.png");
  this.load.image("Coins", "images/Coins.png");
  this.load.spritesheet("Player", "images/idleAnimation.png", {
    frameWidth: 24,
    frameHeight: 24,
  });
  this.load.spritesheet("Player_Run", "images/runAnimation.png", {
    frameWidth: 24,
    frameHeight: 24,
  });
  this.load.image(
    "background",
    "images/Summer-Farm-Top-Down-2D-Game-Tileset3.webp"
  );
  this.load.audio("coincollect", "sounds/mixkit-arcade-game-jump-coin-216.wav");
  this.load.image("tiles", "images/tilemaps/manorTiles.png");
  this.load.image("tileDeco", "images/tilemaps/manorTilesDeco.png");
  this.load.tilemapTiledJSON("mansion", "Mansion.tmj");
  this.load.audio("bgmusic", "images/Hotel.mp3");
  this.load.audio("winning", "images/mixkit-ethereal-fairy-win-sound-2019.wav");
  this.load.audio("dying", "images/videogame-death-sound-43894.mp3");
}

function create() {
  music = this.sound.add("bgmusic");
  music.play();
  music.loop = true;
  music.setVolume(0.33);

  // Get the size of the canvas
  const width = this.game.config.width;
  const height = this.game.config.height;

  // Create the Tiled map with the same size as the canvas
  const map = this.make.tilemap({
    key: "mansion",
    tileWidth: 32,
    tileHeight: 32,
    width: width,
    height: height,
  });
  const tileset = map.addTilesetImage("manorTiles", "tiles");
  const tilesetDeco = map.addTilesetImage("manorTilesDeco", "tileDeco");

  const basetiles = map.createLayer("Tile Layer 1", tileset);

  decorations = map.createLayer("Tile Layer 2", tilesetDeco);
  const centerX = map.widthInPixels / 2;
  const centerY = map.heightInPixels / 2;
  this.cameras.main.centerOn(centerX, centerY);
  basetiles.setCollisionByProperty({ collides: true });
  console.log(decorations);
  decorations.setCollisionByExclusion([-1]);

  this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  console.log(
    decorations.layer.data.map((row) => row.map((tile) => tile.collides))
  );

  // Create a new pickups group
  this.coins = this.physics.add.group();
  this.bread = this.physics.add.group();

  // Find the object layer in the tilemap
  const objectLayer = map.getObjectLayer("Spawn");

  // Spawn pickups on the specified tiles
  objectLayer.objects.forEach((object) => {
    // Check if the object has a spawn property of 'Coins'
    if (object) {
      // Create a new pickup sprite at the object's position
      const x = object.x;
      const y = object.y;
      const width = object.width;
      const height = object.height;
      const randomX = Phaser.Math.RND.integerInRange(x, x + width);

      // Generate a random y coordinate within the bounds
      const randomY = Phaser.Math.RND.integerInRange(y, y + height);

      // Create a new pickup sprite at the random coordinates
      const pickupCoins = this.physics.add.sprite(Phaser.Math.RND.integerInRange(x, x + width), Phaser.Math.RND.integerInRange(y, y + height), "Coins");
      const pickupCoins2 = this.physics.add.sprite(randomX, randomY, "Coins");
      pickupCoins.setScale(0.2);
      pickupCoins.setCircle(50);
      pickupCoins2.setScale(0.2);
      pickupCoins2.setCircle(50);
      // Add the pickup sprite to the pickups group
      this.coins.add(pickupCoins);
      this.coins.add(pickupCoins2)
    }
  });
  objectLayer.objects.forEach((object) => {
    // Check if the object has a spawn property of 'Coins'
    if (object) {
      // Create a new pickup sprite at the object's position
      const x = object.x;
      const y = object.y;
      const width = object.width;
      const height = object.height;
      const randomX = Phaser.Math.RND.integerInRange(x, x + width);

      // Generate a random y coordinate within the bounds
      const randomY = Phaser.Math.RND.integerInRange(y, y + height);

      // Create a new pickup sprite at the random coordinates

      const pickupBread = this.physics.add.sprite(randomX, randomY, "Bread");
      pickupBread.setScale(0.2);
      pickupBread.setCircle(60)
      // Add the pickup sprite to the pickups group

      this.bread.add(pickupBread);
    }
  });

  decorations.setCollisionByProperty({ collides: true });
  this.physics.add.existing(decorations);

  duck = this.physics.add
    .sprite(480, 93, "Player")
    .setSize(27, 28)
    .setCircle(8)
    .setOffset(4, 5);

  this.physics.add.collider(duck, basetiles);

  // Set the decorations layer to be interactive

  //Duck Animations
  duck.anims.create({
    key: "duck_idle_right",
    frames: this.anims.generateFrameNumbers("Player", { start: 12, end: 15 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_idle_left",
    frames: this.anims.generateFrameNumbers("Player", { start: 8, end: 11 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_idle_down",
    frames: this.anims.generateFrameNumbers("Player", { start: 0, end: 3 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_idle_up",
    frames: this.anims.generateFrameNumbers("Player", { start: 4, end: 7 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_run_right",
    frames: this.anims.generateFrameNumbers("Player_Run", {
      start: 18,
      end: 23,
    }),
    frameRate: 5,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_run_left",
    frames: this.anims.generateFrameNumbers("Player_Run", {
      start: 12,
      end: 17,
    }),
    frameRate: 5,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_run_down",
    frames: this.anims.generateFrameNumbers("Player_Run", { start: 0, end: 5 }),
    frameRate: 5,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_run_up",
    frames: this.anims.generateFrameNumbers("Player_Run", {
      start: 6,
      end: 11,
    }),
    frameRate: 5,
    repeat: -1,
  });
  //End of duck animations

  duck.anims.play("duck_idle_down");

  //Duck Scale and height
  duck.setScale(0.1, 0.1);
  duck.displayWidth = 30;
  duck.displayHeight = 30;

  //Coin sound effect
  coinSound = this.sound.add("coincollect", { loop: false });

  const spawn = map.findObject("Spawn", (obj) => obj);
  console.log(spawn);

  duck.setCollideWorldBounds(true);

  // Spawn coins within the playable area, but not on a collidable surface

  // Set up collision detection between the duck and coins
  this.physics.add.overlap(duck, this.coins, collectCoin, null, this);

  //Changing this changes how long until the coins spawn
  this.physics.add.overlap(duck, this.bread, gameOver, null, this);

  this.cursors = this.input.keyboard.createCursorKeys();
  console.log(this.pickups);
}

//Oncollision coin collect function
function collectCoin(duck, coin) {
  // Destroy the coin sprite
  coin.destroy();
  coinSound.play();
  // Update the score
  score += 10;
  document.querySelector("p").textContent = score;
  const winningMusic = this.sound.add("winning");

  if (total === score) {
    winningMusic.play();
    winningMusic.setVolume(0.2);
    alert("You win");
  }
}
//Game over function
function gameOver(duck, bread) {
  const dyingMusic = this.sound.add("dying");
  dyingMusic.play();
  dyingMusic.setVolume(0.16);
  alert("Game Over");
  music.stop();
  this.scene.stop();
}

//Movement keys update
function update() {
  duck.setVelocity(0);

  if (this.cursors.left.isDown) {
    duck.anims.play("duck_run_left", true);
    lastDirection = "LEFT";
    if (this.cursors.up.isDown) {
      duck.setVelocityX(-100);
      duck.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      duck.setVelocityX(-100);
      duck.setVelocityY(100);
    }
    duck.setVelocityX(-100);
  } else if (this.cursors.right.isDown) {
    duck.anims.play("duck_run_right", true);
    lastDirection = "RIGHT";
    if (this.cursors.up.isDown) {
      duck.setVelocityX(100);
      duck.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      duck.setVelocityX(100);
      duck.setVelocityY(100);
    }
    duck.setVelocityX(100);
  } else if (this.cursors.up.isDown) {
    duck.anims.play("duck_run_up", true);
    lastDirection = "UP";
    duck.setVelocityY(-100);
  } else if (this.cursors.down.isDown) {
    duck.anims.play("duck_run_down", true);
    lastDirection = "DOWN";
    duck.setVelocityY(100);
  } else {
    if (lastDirection === "LEFT") {
      duck.anims.play("duck_idle_left", true);
    } else if (lastDirection === "RIGHT") {
      duck.anims.play("duck_idle_right", true);
    } else if (lastDirection === "DOWN") {
      duck.anims.play("duck_idle_down", true);
    } else if (lastDirection === "UP") {
      duck.anims.play("duck_idle_up", true);
    }
  }
}
