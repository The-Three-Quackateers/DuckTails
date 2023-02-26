let gameScene = new Phaser.Scene("Game");

let coinsSpawn = 5;
let coinArray = [];
let score = 0;
let scoreText;
let breadSpawn = 7;
let breadArray = [];
let total = coinsSpawn * 10;

let config = {
  type: Phaser.AUTO,
  width: 1214,
  height: 800,
  scene: (gameScene = {
    update: update,
    create: create,
    preload: preload,
  }),
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};

let game = new Phaser.Game(config);
let duck;
let coinSound;
let lastDirection;
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
}

function create() {
  let bg = this.add.sprite(0, 0, "background");
  bg.setOrigin(0, 0);

  // Add the duck sprite and enable physics
  duck = this.physics.add
    .sprite(1134, 731, "Player")
    .setSize(27, 28)
    .setCircle(8)
    .setOffset(4, 5);
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
  duck.setScale(0.2, 0.2);
  duck.displayWidth = 80;
  duck.displayHeight = 80;

  // Add score text
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "white",
  });

  //Coin sound effect
  coinSound = this.sound.add("coincollect", { loop: false });

  //Coin physics (Collide)
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
  console.log(this.cursors);
}

//Oncollision coin collect function
function collectCoin(duck, coin) {
  // Destroy the coin sprite
  coin.destroy();
  coinSound.play();
  // Update the score
  score += 10;
  scoreText.setText("score: " + score);
  if (total === score) {
    alert("You win");
  }
}
//Game over function
function gameOver(duck, bread) {
  alert("Game Over");
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
