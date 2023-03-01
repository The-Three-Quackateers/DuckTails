// -----------------------------------------------
// The lose scene

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

class Lose extends Phaser.Scene {
    constructor() {
        super('Lose');
    }

    preload() { 
        this.load.image("background", "background/circle.png");

    }
     
    create() {
// center letters here
// add things to reload game here

        let background = this.add.sprite(0, 0, "background");
        background.setOrigin(0, 0);

        let title_text = this.add.text(100, 100, 'YOU LOSE!', { fontSize: '40px', fill: '#000' });        
        let replay_text = this.add.text(100, 150, 'Press ENTER to try again', { fontSize: '32px', fill: '#000' });
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


