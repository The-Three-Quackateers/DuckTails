// -----------------------------------------------
// The Win scene

class Wins extends Phaser.Scene {
    constructor() {
        super('Wins');
    }

    preload() { 
        this.load.image("backgroundWin", "Javascript/background/sky.gif");
        this.load.spritesheet("duck", "Javascript/background/output-onlinegiftools.png", {
            frameWidth:220,
            frameHeight:213,
        })
        
    }
     
    create() {
        document.querySelector("body").style.zoom = 0.8

        noScore();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        let background = this.add.sprite(0, 0, "backgroundWin");
        background.setOrigin(0, 0); 
        let duck = this.add.sprite(470, 350,"duck").setOrigin(0.5);
        duck.setOrigin(0, 0);
        background.setScale(0.6,0.89);
        duck.anims.create({
            key: "duckDance",
            frames: this.anims.generateFrameNumbers("duck", { start: 0, end: 56 }),
            frameRate: 11,
            repeat: -1,
          });
          duck.anims.play("duckDance", true);
        let title_text = this.add.text(370, 100, 'YOU WIN!', { fontSize: '100px', fill: '#000' });        
        let replay_text = this.add.text(200, 750, 'Press ENTER to replay', { fontSize: '60px', fill: '#000' });
        let textLevel4 = this.add.text(70, 800, 'Press SPACE for Arcade',{ fontSize: '75px', fill: '#000' });
        this.input.keyboard.on('keydown-SPACE', function() {
            this.scene.start('Level4');
        },this);

            // ...
          
            // Add an event listener to detect "Enter" key press - fixed this function so it works -xhes
            this.input.keyboard.on('keydown-ENTER', function() {
                // Reload the page
                this.scene.start('Level1');
              },this);

    }
}
function noScore(){
    document.getElementById("score").style.visibility = "hidden";
    }
// var config = {
//     type: Phaser.WEBGL,
//     width: 1500,
//     height: 1080,
//     parent: 'body',
//     scene: [ Wins ]
//   };

// var game = new Phaser.Game(config)


export default Wins;