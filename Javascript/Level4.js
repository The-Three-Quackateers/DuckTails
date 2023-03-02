// let gameScene3 = new Phaser.Scene("Game");

let coinsSpawn = 4;
let coinArray = [];
let score = 0;
let scoreText;
let breadSpawn = 2;
const breadArr = [];
let total = coinsSpawn * 10;
let music;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
// let config = {
//   type: Phaser.AUTO,
//   parent: "game-container",
//   width: 1200,
//   height: 1100,
//   scene: (gameScene2 = {
//     update: update,
//     create: create,
//     preload: preload,
//   }),
//   physics: {
//     default: "arcade",
//     arcade: {
//       debug: false,
//     },
//   },
// };

// let game = new Phaser.Game(config);
let duck;
let coinSound;
let lastDirection;
let decorations;
let spawn;
class Level4 extends Phaser.Scene{
  constructor ()
  {
      super('Level4');
  }
preload() {
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
  this.load.image("tiles", "images/tilemaps/TX Tileset Grass.png");
  this.load.image("stone", "images/tilemaps/TX Tileset Stone Ground.png");
  this.load.image("plant", "images/tilemaps/TX Plant.png");
  this.load.image("wall", "images/tilemaps/TX Tileset Wall.png");
  this.load.image("props", "images/tilemaps/TX Props.png");
  this.load.image("struct", "images/tilemaps/TX Struct.png");
  this.load.tilemapTiledJSON("OpenField", "images/tilemaps/OpenField.tmj");
  this.load.audio(
    "bgmusic",
    "images/Undertale Mashup - Hopes and Dreams - His Theme - SAVE the World - Last Goodbye.mp3"
  );
  this.load.audio("winning", "images/mixkit-ethereal-fairy-win-sound-2019.wav");
  this.load.audio("dying", "images/videogame-death-sound-43894.mp3");
}

create() {
  yesScore();
  music = this.sound.add("bgmusic");
  music.play();
  music.loop = true;
  music.setVolume(0.33);

  // Get the size of the canvas
  const width = this.game.config.width;
  const height = this.game.config.height;

  // Create the Tiled map with the same size as the canvas
  const map = this.make.tilemap({
    key: "OpenField",
    tileWidth: 32,
    tileHeight: 32,
    width: width,
    height: height,
  });
  const grass = map.addTilesetImage("TX Tileset Grass", "tiles");
  const stone = map.addTilesetImage("TX Tileset Stone Ground", "stone");
  const plant = map.addTilesetImage("TX Plant", "plant");
  const walls = map.addTilesetImage("TX Tileset Wall", "wall");
  const prop = map.addTilesetImage("TX Props", "props");
  const stucture = map.addTilesetImage("TX Struct", "struct");

  const basetiles = map.createLayer("Tile Layer 1", [grass, walls]);
  decorations = map.createLayer("Tile Layer 2", [prop, plant, stucture, stone]);

  this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  console.log(basetiles);
  basetiles.setCollisionByProperty({ collides: true });

  const spawn = map.getObjectLayer("Object Layer 1");
  console.log(spawn);

  // Create a new bread sprite at the random coordinates

  
  // Spawn pickups on the specified tiles

  duck = this.physics.add
    .sprite(90, 80, "Player")
    .setSize(27, 28)
    .setCircle(8)
    .setOffset(4, 5);
  this.physics.add.collider(duck, basetiles);
  // Set the pauseButton

  const pauseButton = document.createElement("button");
  const image = document.createElement("img");
  image.src = "images/Pause.png";
  pauseButton.append(image);
  pauseButton.style.position = "absolute";
  pauseButton.style.top = "80px";
  pauseButton.style.left = "10px";
  pauseButton.style.backgroundColor = "black";
  document.body.appendChild(pauseButton);
  let body = document.querySelector("body")
  body.style.alignItems = "center"
  body.style.alignContent = "center"
  body.style.flexDirection = "column"

  pauseButton.addEventListener("click", function () {
    if (!game.scene.isPaused("default")) {
      game.scene.pause("default");
      image.src = "images/Resume.png";
      console.log(this.scene.isPaused("default"));
    } else {
      game.scene.resume("default");
      image.src = "images/Pause.png";

      console.log(game.scene.isPaused("default"));
    }
  });
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
  duck.setScale(0.4);
  duck.displayWidth = 50;
  duck.displayHeight = 50;

  //Coin sound effect
  coinSound = this.sound.add("coincollect", { loop: false });

  document.querySelector("body").style.alignItems = "flex-end"
  document.querySelector("body").style.justifyContent = "normal"

  duck.setCollideWorldBounds(true);

  // Set up collision detection between the duck and coins
  spawn.objects.forEach((object) => {
    // Check if the object has a spawn property of 'Bread'
    if (object) {
      // Create a new bread sprite at the object's position
      const x = object.x;
      const y = object.y;
      const width = object.width;
      const height = object.height;

      // Create a new bread sprite at the random coordinates

      for (let i = 0; i < coinsSpawn; i++) {
        const randomX = Phaser.Math.RND.integerInRange(x, x + width);

        // Generate a random y coordinate within the bounds
        const randomY = Phaser.Math.RND.integerInRange(y, y + height);

        const coin = this.physics.add.sprite(randomX, randomY, "Coins");
        coin.setScale(0.6);
        coin.setCircle(50);
        this.physics.add.overlap(duck, coin, collectCoin, null, this);
      }
    }
  });
  spawn.objects.forEach((object) => {
    // Check if the object has a spawn property of 'Bread'
    if (object) {
      // Create a new bread sprite at the object's position
      const x = object.x;
      const y = object.y;
      const width = object.width;
      const height = object.height;

      // Create a new bread sprite at the random coordinates

      for (let i = 0; i < breadSpawn; i++) {
        let randomX, randomY;
        do {
          randomX = Phaser.Math.RND.integerInRange(x, x + width);
          randomY = Phaser.Math.RND.integerInRange(y, y + height);
        } while (Phaser.Math.Distance.Between(randomX, randomY, duck.x, duck.y) < 100);

        const bread = this.physics.add.sprite(randomX, randomY, "Bread");
        bread.setBounce(1, 1);
        bread.setScale(0.6);
        bread.setCircle(57);
        bread.setCollideWorldBounds(true);
        bread.setVelocity(
          Phaser.Math.RND.integerInRange(-200, 200),
          Phaser.Math.RND.integerInRange(-200, 200)
        );
        this.physics.add.collider(bread, basetiles);
        breadArr.push(bread);
      }
      this.physics.add.collider(breadArr, breadArr);
    }
  });

  //Changing this changes how long until the coins spawn
  this.physics.add.overlap(duck, breadArr, gameOver, null, this);

  this.cursors = this.input.keyboard.createCursorKeys();
  console.log(this.pickups);
  //   this.scale.setScale(2)
}
//Movement keys update
update() {
  duck.setVelocity(0);

  if (this.cursors.left.isDown) {
    duck.anims.play("duck_run_left", true);
    lastDirection = "LEFT";
    if (this.cursors.up.isDown) {
      duck.setVelocityX(-170);
      duck.setVelocityY(-170);
    } else if (this.cursors.down.isDown) {
      duck.setVelocityX(-170);
      duck.setVelocityY(170);
    }
    duck.setVelocityX(-170);
  } else if (this.cursors.right.isDown) {
    duck.anims.play("duck_run_right", true);
    lastDirection = "RIGHT";
    if (this.cursors.up.isDown) {
      duck.setVelocityX(170);
      duck.setVelocityY(-170);
    } else if (this.cursors.down.isDown) {
      duck.setVelocityX(170);
      duck.setVelocityY(170);
    }
    duck.setVelocityX(170);
  } else if (this.cursors.up.isDown) {
    duck.anims.play("duck_run_up", true);
    lastDirection = "UP";
    duck.setVelocityY(-170);
  } else if (this.cursors.down.isDown) {
    duck.anims.play("duck_run_down", true);
    lastDirection = "DOWN";
    duck.setVelocityY(170);
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
};

//Oncollision coin collect function
function collectCoin(duck, coin) {
  // Destroy the coin sprite
  coin.destroy();
  coinSound.play();
  score += 10;
  this.physics.add.overlap(duck, coin, collectCoin, null, this);
  // Create a new bread sprite at the random coordinates
  const x = 48;
  const y = 73.333333;
  const width = 1056;
  const height = 1065.33333;

  // Create a new bread sprite at the random coordinates
  let randomX, randomY;
  do {
    randomX = Phaser.Math.RND.integerInRange(x, x + width);
    randomY = Phaser.Math.RND.integerInRange(y, y + height);
  } while (Phaser.Math.Distance.Between(randomX, randomY, duck.x, duck.y) < 120);

  coin = this.physics.add.sprite(
    Phaser.Math.RND.integerInRange(x, x + width),
    Phaser.Math.RND.integerInRange(y, y + height),
    "Coins"
  );
  coin.setScale(0.6);
  coin.setCircle(53);
  this.physics.add.overlap(duck, coin, collectCoin, null, this);
  if(score % 20 === 0){

  const bread = this.physics.add.sprite(randomX, randomY, "Bread");
  bread.setBounce(1, 1);
  bread.setScale(0.6);
  bread.setCircle(57);
  bread.setCollideWorldBounds(true);
  bread.setVelocity(
    Phaser.Math.RND.integerInRange(-200, 200),
    Phaser.Math.RND.integerInRange(-200, 200)
  );
  breadArr.push(bread);
  this.physics.add.collider(breadArr, breadArr);
  }

  // Find the object layer in the tilemap
  // Update the score
  
  document.querySelector("p").textContent = score;
  const winningMusic = this.sound.add("winning");
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
function yesScore(){
  document.getElementById("score").style.visibility = "visible";
  }

export default Level4;
