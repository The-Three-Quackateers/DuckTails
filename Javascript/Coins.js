let gameScene = new Phaser.Scene("Game");

let coinsSpawn = 5;
let coinArray = [];
let score = 0;
let scoreText;
let breadSpawn = 7;
let breadArray = [];
let total = coinsSpawn * 10

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
      debug: false,
    },
  },
};

let game = new Phaser.Game(config);
let duck;
let coinSound 
let lastDirection
function preload() {
  this.load.image("Bread", "images/Bread.png");
  this.load.image("Coins", "images/Coins.png");
  this.load.spritesheet("Player", "images/idleAnimation.png",{
    frameWidth:24,
    frameHeight:24
  })
  this.load.image(
    "background",
    "images/Summer-Farm-Top-Down-2D-Game-Tileset3.webp"
  );
  this.load.audio('coincollect', 'sounds/mixkit-arcade-game-jump-coin-216.wav')
}

function create() {
  let bg = this.add.sprite(0, 0, "background");
  bg.setOrigin(0, 0);

  // Add the duck sprite and enable physics
  duck = this.physics.add.sprite(1134, 731, "Player");
  duck.anims.create({
    key: "duck_anim_right",
    frames: this.anims.generateFrameNumbers("Player", { start: 12, end: 15 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_anim_left",
    frames: this.anims.generateFrameNumbers("Player", { start: 8, end: 11 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_anim_down",
    frames: this.anims.generateFrameNumbers("Player", { start: 0, end: 3 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.anims.create({
    key: "duck_anim_up",
    frames: this.anims.generateFrameNumbers("Player", { start: 4, end: 7 }),
    frameRate: 3,
    repeat: -1,
  });
  duck.setScale(0.2, 0.2);
  duck.displayWidth = 80;
  duck.displayHeight = 80;

  // Add score text
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "white",
  });

 coinSound = this.sound.add('coincollect', {loop: false})
  //Bread random coords and creates multtiple breads
  // for(let i = 0; i < breadSpawn; i++){
  // let ycordbread = Phaser.Math.Between(50,500)
  // let xcordbread = Phaser.Math.Between(50,800)
  // let bread = this.add.sprite(xcordbread,ycordbread,'Bread')
  // bread.setScale(0.5)
  // }
  // Add the coins group and enable physics for each coin

  let coins = this.physics.add.group({
    key: "Coins",
    repeat: coinsSpawn - 1,
  });
  let breads = this.physics.add.group({
    key: "Bread",
    repeat: breadSpawn - 1,
  });
  duck.setCollideWorldBounds(true);
  breads.children.each(function (bread) {
    bread.setScale(0.28);
    let x = Phaser.Math.Between(50, 1100);
    let y = Phaser.Math.Between(50, 700);
    bread.setPosition(x, y);
  }, this);
  // Set scale of the coins group
  coins.children.each(function (coin) {
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

function collectCoin(duck, coin) {
  // Destroy the coin sprite
  coin.destroy();
coinSound.play()
  // Update the score
  score += 10;
  scoreText.setText("score: " + score);
  if(total === score) {
    alert('you Wins')
  }
}

function gameOver(duck, bread) {
  alert('Game Over')
}
//Function to control the coins spawning at random
// function coinRandom() {
//     for(let i = 0;i<coinArray.length;i++) {
//         let ycordcoins = Phaser.Math.Between(50,500)
//         let xcordcoins = Phaser.Math.Between(50,800)
//         coin.x = xcordcoins
//         coin.y = ycordcoins
//         console.log(coinArray[i])
//     }
// }

function update() {

  duck.setVelocity(0);

  if (this.cursors.left.isDown) {
    duck.anims.play('duck_anim_left',true);
    lastDirection = 'LEFT'
    if (this.cursors.up.isDown) {
      duck.setVelocityX(-100);
      duck.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      duck.setVelocityX(-100);
      duck.setVelocityY(100);
    }
    duck.setVelocityX(-100);
  } else if (this.cursors.right.isDown) {
    duck.anims.play('duck_anim_right',true)
    lastDirection = 'RIGHT'
    if (this.cursors.up.isDown) {
      duck.setVelocityX(100);
      duck.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      duck.setVelocityX(100);
      duck.setVelocityY(100);
    }
    duck.setVelocityX(100);
  } else if (this.cursors.up.isDown) {
    duck.anims.play('duck_anim_up',true)
    lastDirection = 'UP'
    duck.setVelocityY(-100);
  } else if (this.cursors.down.isDown) {
    duck.anims.play('duck_anim_down',true)
    lastDirection = 'DOWN'
    duck.setVelocityY(100);
  } else {
    if (lastDirection === 'LEFT') {
      duck.anims.play('duck_anim_left', true);
    } else if (lastDirection === 'RIGHT') {
      duck.anims.play('duck_anim_right', true);
    }
    else if (lastDirection === 'DOWN') {
      duck.anims.play('duck_anim_down', true);
    }
    else if (lastDirection === 'RIGHT') {
      duck.anims.play('duck_anim_up', true);
    }
  }

}
