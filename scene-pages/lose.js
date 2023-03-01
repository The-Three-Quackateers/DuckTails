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
    this.load.image("duck2", "background/sleepyduck.png")
    this.load.image("letters", "background/thatsall.png")
    
  }
     
  create() {

    let background = this.add.sprite(0, 0, "background");
    background.setOrigin(0, 0);

    let letters = this.add.sprite(350, 75, "letters");
    letters.setOrigin(0, 0);

    let duck2 = this.add.sprite(519, 390, "duck2");
    duck2.setOrigin(0, 0);
    duck2.setScale(0.7);

    let title_text = this.add.text(575, 100, 'YOU LOSE!', { fontSize: '100px', fill: '#000' });        
    let replay_text = this.add.text(350, 900, 'Press ENTER to try again',{ fontSize: '75px', fill: '#000' });

    this.input.keyboard.on('keydown-ENTER', function() {
        // Reload the page
        window.location.startScene();
      });
    
    }
}

var config = {
  type: Phaser.WEBGL,
  width: 1600,
  height: 1080,
  scene: [Lose]
};

var game = new Phaser.Game(config);