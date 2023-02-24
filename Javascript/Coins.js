let gameScene = new Phaser.Scene('Game')



let coinsSpawn = 15
let coinArray = []
let score = 0
let scoreText

let config = {
    type:Phaser.AUTO,
    width: 1214,
    height: 800,
    scene: gameScene = {
        update:update,
        create:create,
        preload:preload,
    },
    physics: {
        default: "arcade",
        arcade:{
            debug:true
        }
    },

}  

let game = new Phaser.Game(config)

function preload() {
    this.load.image('Bread',"images/Bread.png")
    this.load.image('Coins',"images/Coins.png")
    this.load.image('Player',"images/Duck.png")
    this.load.image('background',"images/Summer-Farm-Top-Down-2D-Game-Tileset3.webp")
} 

function create(){
    let bg = this.add.sprite(0,0,'background')
    bg.setOrigin(0,0)

    // Add the duck sprite and enable physics
    let duck = this.physics.add.sprite(1214/2,800/2,'Player')
    duck.setScale(0.2,0.2)
    duck.displayWidth = 80
    duck.displayHeight = 80

    // Add score text
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'white' })

    let ycordbread = Phaser.Math.Between(50,500)
    let xcordbread = Phaser.Math.Between(50,800)
    let bread = this.add.sprite(xcordbread,ycordbread,'Bread')
    bread.setScale(0.5)

    // Add the coins group and enable physics for each coin
    
    let coins = this.physics.add.group({
        key: 'Coins',
        repeat: coinsSpawn - 1,
    });

    duck.setCollideWorldBounds(true)

    // Set scale of the coins group
    coins.children.each(function(coin) {
        coin.setScale(0.28)
        setInterval(function(){
            let x = Phaser.Math.Between(50,1214)
            let y = Phaser.Math.Between(50,800)
            coin.setPosition(x,y)
        },1000)
    },this);

    // Set up collision detection between the duck and coins
    this.physics.add.overlap(duck, coins, collectCoin, null, this);

    //Changing this changes how long until the coins spawn
    
}
function collectCoin(duck, coin) {
    // Destroy the coin sprite
    coin.destroy();

    // Update the score
    score += 10;
    scoreText.setText('score: ' + score);
}
//Function to control the coins spawning at random
function coinRandom() {
    for(let i = 0;i<coinArray.length;i++) {
        let ycordcoins = Phaser.Math.Between(50,500)
        let xcordcoins = Phaser.Math.Between(50,800)
        coin.x = xcordcoins
        coin.y = ycordcoins
        console.log(coinArray[i])
    }
}

function randomSpawnX() {   
    return Phaser.Math.Between(50,500)
}

function randomSpawnY() {
    return Phaser.Math.Between(50,400)
}

function update() {}