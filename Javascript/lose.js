// -----------------------------------------------
// The lose scene
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

class Lose extends Phaser.Scene {
  constructor() {
    super('Lose');
  }

  preload() { 
    this.load.image("backgrounds", "Javascript/background/circle.png");
    this.load.image("duck2", "Javascript/background/sleepyduck.png")
    this.load.image("letters", "Javascript/background/thatsall.png")
    
  }
     
  create() {
    document.querySelector("body").style.zoom = 0.95

    noScore();
    this.game.config.width= 1600;
    this.game.config.height= 1080;
    let background = this.add.sprite(0, 0, "backgrounds"
      );
    background.setOrigin(0, 0);
    background.setScale(0.8,0.8);
    let letters = this.add.sprite(350, 75, "letters");
    letters.setOrigin(0.67,0.89);

    let duck2 = this.add.sprite(370, 244, "duck2");
    duck2.setOrigin(0, 0);
    duck2.setScale(0.7);

    let title_text = this.add.text(350, 100, 'YOU LOSE!', { fontSize: '100px', fill: '#000' });        
    let replay_text = this.add.text(70, 700, 'Press ENTER to try again',{ fontSize: '75px', fill: '#000' });
    let home_text = this.add.text(250, 800, 'Press SPACE to go home',{ fontSize: '55px', fill: '#000' });


    this.input.keyboard.on('keydown-ENTER', function() {
        // Reload the page
        this.scene.start('Level1');
      },this);

      this.input.keyboard.on('keydown-SPACE', function() {
        // Reload the page
        this.scene.start('StartScene');
      },this);
    
    }
}
function noScore(){
  document.getElementById("score").style.visibility = "hidden";
  }
// var config = {
//   type: Phaser.WEBGL,
//   width: 1600,
//   height: 1080,
//   scene: [Lose]
// };

export default Lose;