class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver');
    }

    init() {
        console.log("GameOver");  
        this.counter = 9;
    }

    preload() {

    }

    create() {
        this.gameover = this.add.text(0,0,"CONTINUE", { fontStyle: 'strong', align: 'right', font: '64px Arial', fill: 'red' }); 
        this.text = this.add.text(100,100,this.counter, { fontStyle: 'strong', align: 'right', font: '64px Arial', fill: 'red' });  
        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.interval = 0;
    }

    update(time, delta) {
        
        this.text.setText("GAME OVER");
        this.interval++;

       
        if (this.interval % 100 == 0 && this.counter != 0){
            this.counter--;
            this.text.setText(this.counter);
           
        }
        
        if (this.counter == 0){
            this.text.setText("GAME OVER");
        }
      
        // INPUT CONTROL
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            // this.scene.restart();
            this.scene.resume('Firstscene');   
        }
    }
}

export default GameOver;


