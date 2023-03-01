let gameScene2 = new Phaser.Scene("Game");

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
  parent: "game-container",
  width: 1200,
  height: 1200,
  scene: (gameScene2 = {
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
let decorations;
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
  this.load.image("tiles", "images/tilemaps/kitchenTiles.png");
  this.load.image("tunnels", "images/tilemaps/tunnelTiles.png");
  this.load.image("tileDeco", "images/tilemaps/kitchenTilesDeco.png");
  this.load.tilemapTiledJSON("kitchen", "images/tilemaps/Kitchen.tmj");
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
    key: "kitchen",
    tileWidth: 16,
    tileHeight: 16,
    width: width,
    height: height,
  });
  const tileset = map.addTilesetImage("kitchenTiles", "tiles");
  const tilesetDeco = map.addTilesetImage("kitchenTilesDeco", "tileDeco");
  const tunnels = map.addTilesetImage("tunnelTiles", "tunnels");

  const basetiles = map.createLayer("Tile Layer 1", tileset);
  const tunnelTiles = map.createLayer("Tile Layer 4", tunnels);
  decorations = map.createLayer("Tile Layer 2", tilesetDeco);
  map.createLayer("Tile Layer 3", tilesetDeco);

  basetiles.setCollisionByProperty({ collides: true });

  decorations.setCollisionByProperty({ collides: true });

  console.log(decorations);

  this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Create a new pickups group
  this.coins = this.physics.add.group();
  this.bread = this.physics.add.group();

  // Find the object layer in the tilemap
  const objectLayer = map.getObjectLayer("Spawn");
  const PhysicsLayer = map.getObjectLayer("Physics");

  console.log(map.getObjectLayer("Spawn"));
  // Spawn pickups on the specified tiles
  objectLayer.objects.forEach((object) => {
    // Check if the object has a spawn property of 'Coins'
    if (object && object.properties && object.properties[0].name === "coins") {
      console.log(object.properties);
      // Create a new pickup sprite at the object's position
      const x = object.x;
      const y = object.y;
      const width = object.width;
      const height = object.height;
      const randomX = Phaser.Math.RND.integerInRange(x, x + width);

      // Generate a random y coordinate within the bounds
      const randomY = Phaser.Math.RND.integerInRange(y, y + height);

      // Create a new pickup sprite at the random coordinates
      const pickupCoins = this.physics.add.sprite(
        Phaser.Math.RND.integerInRange(x, x + width),
        Phaser.Math.RND.integerInRange(y, y + height),
        "Coins"
      );
      pickupCoins.setScale(0.27);
      pickupCoins.setCircle(50);
      const pickupCoins2 = this.physics.add.sprite(
        Phaser.Math.RND.integerInRange(x, x + width),
        Phaser.Math.RND.integerInRange(y, y + height),
        "Coins"
      );
      pickupCoins2.setScale(0.27);
      pickupCoins2.setCircle(50);
      // Add the pickup sprite to the pickups group
      this.coins.add(pickupCoins)
      this.coins.add(pickupCoins2)
    }
  });
  objectLayer.objects.forEach((object) => {
    // Check if the object has a spawn property of 'Coins'
    if (object && !object.properties) {
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
      pickupBread.setCircle(60);
      // Add the pickup sprite to the pickups group

      this.bread.add(pickupBread);
    }
  });
  const pauseButton = document.createElement("button");
  const image = document.createElement("img");
  image.src = "images/Pause.png";
  pauseButton.append(image);
  pauseButton.style.position = "absolute";
  pauseButton.style.top = "80px";
  pauseButton.style.left = "10px";
  pauseButton.style.backgroundColor = "black";
  document.body.appendChild(pauseButton);

  pauseButton.addEventListener("click", function () {
    if (!game.scene.isPaused("default")) {
      game.scene.pause("default");
      image.src = "images/Resume.png";
      console.log(game.scene.isPaused("default"));
    } else {
      game.scene.resume("default");
      image.src = "images/Pause.png";

      console.log(game.scene.isPaused("default"));
    }
  });


  decorations.setCollisionByProperty({ collides: true });
  this.physics.add.existing(decorations);

  duck = this.physics.add
    .sprite(200, 140, "Player")
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
  duck.displayWidth = 40;
  duck.displayHeight = 40;

  //Coin sound effect
  coinSound = this.sound.add("coincollect", { loop: false });

  const spawn = map.findObject("Spawn", (obj) => obj);
  console.log(spawn);

  duck.setCollideWorldBounds(true);
  console.log(map.getObjectLayer("Physics"));
  const breadArr = [];
  PhysicsLayer.objects.forEach((object) => {
    // Check if the object has a spawn property of 'Bread'
    if (object) {
      // Create a new bread sprite at the object's position
      const x = object.x;
      const y = object.y;
      const width = object.width;
      const height = object.height;

      // Create a new bread sprite at the random coordinates

      for (let i = 0; i < breadSpawn; i++) {
        const randomX = Phaser.Math.RND.integerInRange(x, x + width);

        // Generate a random y coordinate within the bounds
        const randomY = Phaser.Math.RND.integerInRange(y, y + height);

        const bread = this.physics.add.sprite(randomX, randomY, "Bread");
        bread.setBounce(1, 1);
        bread.setScale(0.6);
        bread.setCircle(55);
        bread.setCollideWorldBounds(true);
        bread.setVelocity(
          Phaser.Math.RND.integerInRange(-200, 200),
          Phaser.Math.RND.integerInRange(-200, 200)
        );
        this.physics.add.collider(bread, basetiles);
        breadArr.push(bread);
        this.physics.add.overlap(duck, bread, gameOver, null, this);
      }
      
      this.physics.add.collider(breadArr, breadArr);
    }
  });
  // Spawn coins within the playable area, but not on a collidable surface
  objectLayer.objects.forEach((object) => {
    if (object.properties && object.properties[0].name !== "breadmageddon" && object.properties[0].name !== "coins") {
      const collider = this.physics.add.sprite(object.x, object.y, "collider");
      collider.setCollideWorldBounds(true);

      this.physics.add.collider(duck, collider);
      collider.body.setCollideWorldBounds(true);
      collider.body.setAllowGravity(false);
      collider.body.immovable = true;
      collider.setVisible(false);
      if (object.ellipse) {
        collider.body.setCircle(16);
        collider.body.setOffset(15);
      } else {
        collider.body.setOffset(23)
        
      }
    }
  });
  // Set up collision detection between the duck and coins
  this.physics.add.overlap(duck, this.coins, collectCoin, null, this);

  //Changing this changes how long until the coins spawn
  this.physics.add.overlap(duck, this.bread, gameOver, null, this);

  this.cursors = this.input.keyboard.createCursorKeys();
  console.log(this.pickups);
  //   this.scale.setScale(2)
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
