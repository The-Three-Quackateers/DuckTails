// -----------------------------------------------
// The Win scene

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

class Wins extends Phaser.Scene {
    constructor() {
        super('Wins');
    }

    preload() { 
        this.load.image("background", "background/sky.gif");
        this.load.image("duck", "background/duck.gif");
        
    }
     
    create() {
// center letters here
// add things to reload game here

       

        let background = this.add.sprite(0, 0, "background");
        background.setOrigin(0, 0);
        this.sprite = this.add.sprite(0,0,"duck");
        this.sprite.setOrigin(0, 0);
        let title_text = this.add.text(790, 100, 'YOU WIN!', { fontSize: '100px', fill: '#000' });        
        let replay_text = this.add.text(700, 850, 'Press ENTER to replay', { fontSize: '60px', fill: '#000' });
    }
}

var config = {
    type: Phaser.WEBGL,
    width: windowWidth,
    height: windowHeight,
    parent: 'phaser-example',
    scene: [ Wins ]
  };

var game = new Phaser.Game(config)


