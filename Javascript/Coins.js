let gameScene = new Phaser.Scene('Game')

let coinsSpawn = 7
let coinArray = []

let config = {
    type:Phaser.AUTO,
    width: 800,
    height: 500,
    scene: gameScene = {
        update:update,
        create:create,
        preload:preload,
    }
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
    bg.setScale(0.6,0.52)
    let duck = this.add.sprite(0,0,'Player')
    

    let ycordbread = Phaser.Math.Between(50,500)
    let xcordbread = Phaser.Math.Between(50,800)
    this.add.sprite(xcordbread,ycordbread,'Bread')
    for(let i = 0;i<coinsSpawn;i++) {
        let ycordcoins = Phaser.Math.Between(50,500)
        let xcordcoins = Phaser.Math.Between(50,800)
        let coin = this.add.sprite(xcordcoins,ycordcoins,'Coins')
        coinArray.push(coin)

    }
    console.log(coinArray)
    //Changing this changes how long until the coins spawn
    setInterval(coinRandom,15000)
    duck.setScale(0.2,0.2)
    duck.setOrigin(0,0)
    duck.displayWidth = 100
    duck.displayHeight = 100
    
}
//Function to control the coins spawning at random
function coinRandom() {
    for(let i = 0;i<coinArray.length;i++) {
        let ycordcoins = Phaser.Math.Between(50,500)
        let xcordcoins = Phaser.Math.Between(50,800)
        coinArray[i].x = xcordcoins
        coinArray[i].y = ycordcoins
        console.log(coinArray[i])
    }
}

function update() {}