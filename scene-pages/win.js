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
        this.load.spritesheet("duck", "background/output-onlinegiftools.png", {
            frameWidth:220,
            frameHeight:213,
        })
        
    }
     
    create() {


        let background = this.add.sprite(0, 0, "background");
        background.setOrigin(0, 0); 
        const screenCenterX = 850;
    const screenCenterY = 1080/ 2;
        let duck = this.add.sprite(screenCenterX, 397,"duck").setOrigin(0.5);
        duck.setOrigin(0, 0);
        duck.anims.create({
            key: "duckDance",
            frames: this.anims.generateFrameNumbers("duck", { start: 0, end: 56 }),
            frameRate: 11,
            repeat: -1,
          });
          duck.anims.play("duckDance", true);
        let title_text = this.add.text(745, 100, 'YOU WIN!', { fontSize: '100px', fill: '#000' });        
        let replay_text = this.add.text(600, 850, 'Press ENTER to replay', { fontSize: '60px', fill: '#000' });

            // ...
          
            // Add an event listener to detect "Enter" key press
            this.input.keyboard.on('keydown-ENTER', function() {
              // Reload the page
              window.location.startScene();
            });
          
            
          

    }
}

var config = {
    type: Phaser.WEBGL,
    width: 1500,
    height: 1080,
    parent: 'body',
    scene: [ Wins ]
  };

var game = new Phaser.Game(config)


