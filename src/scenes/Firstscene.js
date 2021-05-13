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
        this.lifesCounter = 3;
        this.lifesText;
        this.newLife = 100; // Nueva Vida cada X
        this.enemiesGlobalCounter = 0;
        this.arrayVirus = [
            {
                "type": "virus",
                "hitsToKill": 1,
                "active": true,
                "visible": true,
                "depth": 2,
                "gravityY": 300,
                "colliderWorldBounds": true,
                "circle": 45,
                "bounceX": 1,
                "bounceY": 1,
                "velocityX": 100,
            }
            ,
            {
                "type": "virusStrong",
                "hitsToKill": 4,
                "active": true,
                "visible": true,
                "depth": 2,
                "gravityY": 400,
                "colliderWorldBounds": true,
                "circle": 32,
                "bounceX": 1,
                "bounceY": 1,
                "velocityX": 180,
            }
        ]



    }

    preload() {

        // LOAD IMAGES AND SPRITES

        this.load.image('background', 'assets/background.png')
            .image("bullet", "assets/bullet.png")
            .image("virus", "assets/virus.png")
            .image("virusStrong", "assets/virusStrong.png")
            .image('life', "assets/life.png")
            .spritesheet('doggysprite', 'assets/doggysprite.png',
                { frameWidth: 50, frameHeight: 66 }
            );

        // LOAD AUDIOS

        this.load.audio('pop', ['assets/pop.wav'])
            .audio('shot', ['assets/shot.wav'])
            .audio('killed', ['assets/killed.wav'])
            .audio('rebound', ['assets/rebound.wav'])
            .audio('bgmusic', ['assets/bgmusic.mp3']);



    }

    create() {


        // SCORE

        this.scoreText = this.add.text(this.sys.game.canvas.width / 2 - 65, 0, 'SCORE: ' + this.score, { fontStyle: 'strong', font: '19px Arial', fill: '#6368BC' });
        this.scoreText.setDepth(1);
        this.lifesText = this.add.text(50, 10, 'X ' + this.lifesCounter, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.lifesText.setDepth(1);

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
        this.lifeSprite = this.add.image(30, 18, 'life');
        this.lifeSprite.setDepth(2);

        this.virus = this.physics.add.group({
            defaultKey: 'virus'
        });


        this.virusStrong = this.physics.add.group({
            defaultKey: 'virusStrong'
        });
  


        this.player = this.physics.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'doggysprite')
            .setBounce(0.2)
            .setCollideWorldBounds(true)
            .setGravityY(300)
            .setDepth(1);

        this.player.body.setSize(35,66,35,30) // custom mask => setSize(width, height, XinSprite, YinSprite)

        this.animatePlayer();


        this.bullets = this.physics.add.group({
            defaultKey: 'bullet'
        });


        // ADD COLIDERS BETWEEN SPRITES

        this.physics.add.collider(this.player, this.virus, this.hitPlayer, null, this);
        this.physics.add.overlap(this.player, this.virusStrong, this.hitPlayer, null, this);
        this.physics.add.collider(this.bullets, this.virus, this.hitvirus
            , null, this);
        this.physics.add.collider(this.bullets, this.virusStrong, this.hitvirus, null, this);


    }

    update(time, delta) {


        this.virus.children.each(function (enemy) {
            if (enemy.body.y == 0) {
                this.reboundSound.play();
               
            } 
        }, this);



        //  ENEMIES RESPAWN CONTROL

       

        if (time > this.respawnInterval && this.respawn == 0) {
            this.respawn = Math.trunc(time);

        }

        if (time > this.respawn) {
         
            if (this.enemiesGlobalCounter % 5 == 0 && this.enemiesGlobalCounter != 0) {

                this.respawnInterval -= 100;
                console.log(this.respawnInterval)
                this.newVirus(this.arrayVirus[1]);
            }
            else {
                this.newVirus(this.arrayVirus[0]);
            }

            this.respawn += this.respawnInterval;
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



        this.lifesCounter--;
        this.lifesText.setText('X ' + this.lifesCounter);

        // this.scene.pause();


        alert('Game over!');

        if (this.lifesCounter < 0) {
            this.scene.restart();
        }


        this.virus.clear(true, true); // clear( [removeFromScene] [, destroyChild])
        this.virusStrong.clear(true,true);
        this.bullets.clear(true, true);
    }

    hitvirus(bullet, virus) {

        bullet.destroy();
        virus.hitsToKill--;

        if (virus.hitsToKill == 0){
            virus.destroy();
            this.popSound.play();
            this.score += 10;
            this.scoreText.setText('SCORE: ' + this.score);
    
            if (this.score % this.newLife == 0){
                this.lifesCounter++;
                this.lifesText.setText('X ' + this.lifesCounter);
            }
        }

    }


    newVirus(enemy) {
        this.enemiesGlobalCounter++;
        var oneVirus;
        switch (enemy.type) {
            case 'virusStrong':
                oneVirus = this.virusStrong.get(Phaser.Math.Between(0, this.game.config.width), 20);
                break;
            default:
                oneVirus = this.virus.get(Phaser.Math.Between(0, this.game.config.width), 20);
        }
   
      
        if (oneVirus) {
            oneVirus.setActive(enemy.active)
                .setVisible(enemy.visible)
                .setDepth(enemy.depth)
                .setGravityY(enemy.gravityY)
                .setCollideWorldBounds(enemy.colliderWorldBounds)
                .setCircle(enemy.circle)
                .setBounce(enemy.bounceX, enemy.bounceY)
                .setVelocityX(enemy.velocityX)
                .hitsToKill = enemy.hitsToKill;

        }

    }

    fire(object) {
        var bullet = this.bullets.get(object.x + 17, object.y - 30);
        if (bullet) {
            bullet.setActive(true)
                .setVisible(true)
                .setDepth(2)
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


