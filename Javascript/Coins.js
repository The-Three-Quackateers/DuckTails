let gameScene = new Phaser.Scene('Game')

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
    let ycordcoins = Phaser.Math.Between(50,500)
    let xcordcoins = Phaser.Math.Between(50,800)
    this.add.sprite(xcordcoins,ycordcoins,'Coins')

    let ycordbread = Phaser.Math.Between(50,500)
    let xcordbread = Phaser.Math.Between(50,800)
    this.add.sprite(xcordbread,ycordbread,'Bread')


    duck.setScale(0.2,0.2)
    duck.setOrigin(0,0)
    duck.displayWidth = 100
    duck.displayHeight = 100
}

function update() {
    console.log('up')
}