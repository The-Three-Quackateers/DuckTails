import Lose from './lose.js';
import Wins from './win.js';
import Level3 from './Level3.js';
import Level4 from './Level4.js';


let coinsSpawn = 10;
let coinArray = [];
let level = 1;
let score = 0;
let scoreText;
let breadSpawn = 5;
let breadArray = [];
let total = coinsSpawn * 10;
let music;
// const windowHeight = window.innerHeight;
// const windowWidth = window.innerWidth;

let duck;
let coinSound;
let lastDirection;
let decorations;
//StartScene
class StartScene extends Phaser.Scene{
  constructor ()
  {
      super('StartScene');
  }
  preload(){
      //name used to refer and the path to image
      //load is a method within the Scene class and image is what loading
        this.load.image("StartBackGround", "images/Summer-Farm-Top-Down-2D-Game-Tileset3.webp");
        this.load.image("Coins", "images/Coins.png");
  }
  create(){
      noScore();
      let bg = this.add.sprite(0, 0, "StartBackGround");
      bg.setOrigin(0, 0);
      //400 is x and 150 is y so position on screen where logo will be displayed
      let logo = this.add.image(577,500,'Coins')

      //tweens is an animation, this.tweens.add creates a new tween
      this.tweens.add({
          //target is the logo var
          targets: logo,
          //this is the y where we want to get
          y: 444,
          //we want to get there in 2 seconds
          duration: 500,
          //easing function so how the motion looks
          ease: `Power2`,
          //yoyo means it repeats backwards and forwards like a yoyo
          yoyo: true,
          //-1 means loop forever
          loop: -1
      })
      const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
      // const loadingText = this.add.text(screenCenterX, screenCenterY, 'Loading: 0%').setOrigin(0.5);
      let welcome = this.add.text(screenCenterX, 340, "DUCKTAILS", {
        fontSize: "100px",
        fill: "white",
        }).setOrigin(0.5);
        let start = this.add.text(screenCenterX, screenCenterY, "CLICK ANYWHERE TO START GAME", {
          fontSize: "50px",
          fill: "pink",
          }).setOrigin(0.5);
          let instruction = this.add.text(screenCenterX,200, "HOW TO PLAY", {
            fontSize: "50px",
            fill: "pink",
            }).setOrigin(0.5);
            let howTo = this.add.text(screenCenterX,240, "Move using the arrow keys, avoid bread, and collect coins", {
              fontSize: "20px",
              fill: "pink",
              backgroundColor: "white",
              }).setOrigin(0.5);
          //   instruction.setInteractive()
          //   instruction.on('pointerup', function (pointer) {
          //     this.scene.start('SceneIn');
          // }, this);
        //   start.setInteractive();
        //   start.on('pointerup', function (pointer) {
        //     console.log("hi")
        //     this.scene.start('Level1');
        // }, this);
        this.input.on('pointerup', function (pointer) {
          this.scene.start('Level1');
      }, this);
  }
}
//Level1
class Level1 extends Phaser.Scene{
  constructor ()
  {
      super('Level1');
  }
  preload(){
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
  create(){
    yesScore();
    music = this.sound.add("bgmusic");
    music.play();
    music.loop = true;
    music.setVolume(0.33);
    // const width = this.game.config.width;
    // const height = this.game.config.height;
      let bg = this.add.sprite(0, 0, "background");
      bg.setOrigin(0, 0);
      
      //Duck Scale and height
    duck = this.physics.add
    .sprite(480, 93, "Player")
    .setSize(27, 28)
    .setCircle(8)
    .setOffset(4, 5);

  duck.setScale(0.1, 0.1);
  duck.displayWidth = 30;
  duck.displayHeight = 30;
    
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
  coinSound = this.sound.add("coincollect", { loop: false });

  let coins = this.physics.add.group({
    key: "Coins",
    repeat: coinsSpawn - 1,
  });
  //Bread physics (Collide)
  let breads = this.physics.add.group({
    key: "Bread",
    repeat: breadSpawn - 1,
  });
  duck.setCollideWorldBounds(true);
  breads.children.each(function (bread) {
    bread.setCircle(55, 55).setOffset(7, 7);
    bread.setScale(0.28);
    let x = Phaser.Math.Between(50, 1100);
    let y = Phaser.Math.Between(50, 700);
    bread.setPosition(x, y);
  }, this);
  // Set scale of the coins group
  coins.children.each(function (coin) {
    coin.setCircle(50).setOffset(3, 3);
    let x = Phaser.Math.Between(50, 1110);
    let y = Phaser.Math.Between(50, 700);
    coin.setPosition(x, y);
    coin.setScale(0.28);
    setInterval(function () {
      let x = Phaser.Math.Between(50, 1110);
      let y = Phaser.Math.Between(50, 700);
      coin.setPosition(x, y);
    }, 10000);
  }, this);

  // Set up collision detection between the duck and coins
  this.physics.add.overlap(duck, coins, collectCoin, null, this);

  //Changing this changes how long until the coins spawn
  this.physics.add.overlap(duck, breads, gameOver, null, this);
  this.cursors = this.input.keyboard.createCursorKeys();
  }
  
  update(){
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
}
//Level 2
class Level2 extends Phaser.Scene{
  constructor ()
  {
      super('Level2');
  }
  preload(){
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
  // this.load.image("pauseButton","images/Pause.png")
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
  // let body = document.querySelector("body")
  // body.style.alignItems = "center"
  // body.style.alignContent = "center"
  // body.style.flexDirection = "column"
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

  // document.addEventListener("visibilitychange", function () {
  //   if (document.hidden) {
  //     // Pause the game if the tab is hidden
  //     this,s.scene.pause("Level2");
  //   } else {
  //     // Resume the game if the tab is visible
  //     this.scene.resume("Level2");
  //   }
  // });

  //Duck Scale and height
  duck.setScale(0.1, 0.1);
  duck.displayWidth = 30;
  duck.displayHeight = 30;
  //const pauseButton = document.createElement("button");
  // const image = document.createElement("img");
  // image.src = "images/Pause.png";
  // pauseButton.append(image);
  // pauseButton.style.top = "80px";
  // pauseButton.style.left = "10px";
  // pauseButton.style.backgroundColor = "black";
  // document.body.appendChild(pauseButton);

  // pauseButton.addEventListener("click", function () {
  //   if (!this.scene.isPaused("Level2")) {
  //     this.scene.pause("Level2");
  //     image.src = "images/Resume.png";
  //   } else {
  //     this.scene.resume("Level2");
  //     image.src = "images/Pause.png";
  //   }
  // });
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
  // document.querySelector('body').style.zoom = 1
}

//Movement keys update
update() {
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
}
//INSTRUCTION PAGE/ SceneIn
class InScene extends Phaser.Scene{
  constructor ()
  {
      super('InScene');
  }
  preload(){
      this.load.image(
          "background",
          "images/Summer-Farm-Top-Down-2D-Game-Tileset3.webp"
        );
  }
  create(){
      noScore();
      let bg = this.add.sprite(0, 0, "background");
      bg.setOrigin(0, 0);
      const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      let intitle = this.add.text(400,240,"HOW TO PLAY");
      let instructions = this.add.text(400,400,"Using the 'up', 'down', 'left' and 'right' arrow keys to move, collect all the coins to reach the next level, but be careful and don't touch the bread.");
      let start = this.add.text(screenCenterX, 600, "START GAME", {
        fontSize: "50px",
        fill: "pink",
        }).setOrigin(0.5);
          start.setInteractive();
          start.on('pointerup', function (pointer) {
            this.scene.start('StartScene');
        }, this);
    }
}
//End of Scenes
//remove and add score element functions
function noScore(){
  document.getElementById("score").style.visibility = "hidden";
  }
function yesScore(){
  document.getElementById("score").style.visibility = "visible";
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
    if(level !== 5){
      level ++;
  }
    console.log(level)
    score = 0;
    document.querySelector("p").textContent = score;
    //maybe add delay
    alert("You win");
    this.scene.stop();
    this.scene.start(`Level${level}`)
    //this.scene.start('Wins')
  }
}
//Game over function
function gameOver(duck, bread) {
  const dyingMusic = this.sound.add("dying");
  dyingMusic.play();
  dyingMusic.setVolume(0.16);
  alert("Game Over");
  level--;
  score = 0;
  document.querySelector("p").textContent = score;
  music.stop();
  this.scene.stop();
  this.scene.start('Lose');
}
// function pauseGame() {
//   gameScene.pause();
// }

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 1200,
  scene: [StartScene, Level1, Level2, Level3, Level4, Lose, Wins, InScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};
let game = new Phaser.Game(config);