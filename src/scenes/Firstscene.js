class Firstscene extends Phaser.Scene {

    constructor() {
        super('Firstscene');
    }

    init() {
        console.log('Scene Firstscene');
        this.gameover = false;
        this.respawn = 0;
        this.respawnInterval = 3000;
        this.scoreText;
        this.score = 0;
    }

    preload() {

        // LOAD IMAGES AND SPRITES

        this.load.image('background', 'assets/background.png')
                 .image("bullet", "assets/bullet.png")
                 .image("virus", "assets/virus.png")
                 .spritesheet('doggysprite', 'assets/doggysprite.png',
                      { frameWidth: 50, frameHeight: 66 }
        );

        // LOAD AUDIOS

        this.load.audio('pop',['assets/pop.wav'])
                 .audio('shot',['assets/shot.wav'])
                 .audio('killed',['assets/killed.wav'])
                 .audio('rebound',['assets/rebound.wav'])
                 .audio('bgmusic',['assets/bgmusic.mp3']);


            
    }

    create() {


        // SCORE

        this.scoreText = this.add.text(this.sys.game.canvas.width / 2 - 65, 0, 'SCORE: 0', { font: '18px Arial', fill: '#6368BC' });
        this.scoreText.setDepth(1);

        // CREATE AUDIOS

        this.popSound = this.sound.add('pop');
        this.shotSound = this.sound.add('shot');
        this.killedSound = this.sound.add('killed');
        this.reboundSound = this.sound.add('rebound');

        // BACKGROUND MUSIC

        this.backgroundMusic = this.sound.add('bgmusic');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();



        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();

        // CREATE SPRITES

        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');


        this.virus = this.physics.add.group({
            defaultKey: 'virus'
        });      
     

        this.player = this.physics.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'doggysprite')
                   .setBounce(0.2)
                   .setCollideWorldBounds(true)
                   .setGravityY(300)
                   .setDepth(1);

        this.animatePlayer();


        this.bullets = this.physics.add.group({
            defaultKey: 'bullet'
        });


        // ADD COLIDERS BETWEEN SPRITES

        this.physics.add.collider(this.player, this.virus, this.hitPlayer, null, this);
        this.physics.add.collider(this.bullets, this.virus, this.hitvirus, null, this);

    



    }

    update(time, delta) {

       
      
        this.virus.children.each(function(enemy) {
            if(enemy.body.y == 0){
                this.reboundSound.play();
            }
          }, this);



        //  ENEMIES RESPAWN CONTROL

        if (time >  this.respawnInterval && this.respawn == 0){
            this.respawn = Math.trunc(time);
           
        }
 
        if (time > this.respawn) {
            this.newVirus();
            this.respawn +=  this.respawnInterval ; 
        }

        // INPUT CONTROL

        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.player.setVelocity(0, 0)
                .anims.play('turn');
            this.fire(this.player);

        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
                .anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
                .anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0)
                .anims.play('turn');
        }
    }


    // CUSTOM FUNCTIONS

    hitPlayer(player, avirus) {
        this.killedSound.play();
        this.backgroundMusic.stop();


        // this.scene.pause();


        alert('Game over!');
     
        this.scene.restart();
        this.virus.clear(true, true); // clear( [removeFromScene] [, destroyChild])
        this.bullets.clear(true,true);
    }

    hitvirus(bullet, virus) {
        virus.destroy();
        bullet.destroy();
        this.popSound.play();
        this.score += 100;
        this.scoreText.setText('SCORE: '+ this.score)
    }


    newVirus() {

        var oneVirus = this.virus.get(Phaser.Math.Between(0, this.game.config.width), 20);
        if (oneVirus) {
            oneVirus.setActive(true)
                  .setVisible(true)
                  .setGravityY(300)
                  .setCollideWorldBounds(true)
                  .setCircle(45)
                  .setBounce(1, 1)
                  .setVelocityX(
                                  (Phaser.Math.Between(0, 1) ? 100 : -100)
                             );
           
        }
    }

    fire(object) {
        var bullet = this.bullets.get(object.x + 17, object.y - 30);
        if (bullet) {
            bullet.setActive(true)
                  .setVisible(true)
                  .body.velocity.y = -200;
        }
        bullet.outOfBoundsKill = true;
        this.shotSound.play();

    }

    animatePlayer() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('doggysprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'doggysprite', frame: 4 }],
            frameRate: 20,
            // delay: 1.1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('doggysprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    }
}

export default Firstscene;


