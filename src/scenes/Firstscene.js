import Bacterium from "../clasess/bacterium.js";
import Player from "../clasess/player.js";
import Virus from "../clasess/virus.js";
import Bullet from "../clasess/bullet.js";
import Powerup from "../clasess/powerup.js";

class Firstscene extends Phaser.Scene {

    constructor() {
        super('Firstscene');
    }

    init() {
        console.log("FirstScene");
        //this.scene.launch('Intro');
        this.respawn = 0;
        this.respawnInterval = 3000;
        this.scoreText = "";
        this.score = 0;
        this.lifesCounter = 3;
        this.lifesText = "";
        this.newLife = 250; // Nueva Vida cada X puntuación
        this.enemiesGlobalCounter = 0;
        this.invincible = false;
        this.ammo = 30;
        this.ammoText = "";
        this.powerupCounter = 0;

    }

    preload() {

        this.load.path = './assets/';

        // LOAD IMAGES AND SPRITES
        this.load.image('background', 'backgrounds/background.png')
            .image("bullet", "sprites/bullet.png")
            .image("virus", "sprites/virus.png")
            .image("bacterium", "sprites/bacterium.png")
            .image('life', "sprites/life.png")
            .image('soap', 'sprites/soap.png')
            .image('reload', 'sprites/reload.png')
            .image('powerup', 'sprites/powerup.png')
            .spritesheet('doggysprite', 'sprites/doggysprite.png',
                { frameWidth: 50, frameHeight: 66 }
            );

        // LOAD AUDIOS
        this.load.audio('pop', ['sounds/pop.wav'])
            .audio('shot', ['sounds/shot.wav'])
            .audio('killed', ['sounds/killed.wav'])
            .audio('rebound', ['sounds/rebound.wav'])
            .audio('bgmusic', ['sounds/bgmusic.mp3']);
    }

    create() {

        // TEXTS
        this.scoreText = this.add.text(this.sys.game.canvas.width / 2 - 65, 0, 'SCORE: ' + this.score, { fontStyle: 'strong', font: '19px Arial', fill: '#6368BC' });
        this.scoreText.setDepth(1);
        this.lifesText = this.add.text(50, 10, 'X ' + this.lifesCounter, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.lifesText.setDepth(1);
        this.ammoText = this.add.text(this.sys.game.canvas.width - 150, 10, 'AMMO: ' + this.ammo, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.ammoText.setDepth(1);


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
        this.lifeSprite = this.add.image(30, 18, 'life').setDepth(1);
        this.soapImage = this.physics.add.image(40, this.sys.game.canvas.height - 30, 'soap').setActive(true).setDepth(1).setVisible(false);
        this.reloadImage = this.add.image(50, this.sys.game.canvas.height - 80, 'reload');
        this.reloadImage.setVisible(false);

        // PLAYER
        this.player = new Player(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'doggysprite');


        // GROUPS
        this.virusGroup = new Virus(this.physics.world, this);
        this.bacteriumGroup = new Bacterium(this.physics.world, this);
        this.bulletsGroup = new Bullet(this.physics.world, this);
        this.powerupGroup = new Powerup(this.physics.world, this);


        // ADD COLIDERS BETWEEN SPRITES        
        this.physics.add.overlap(this.player, [this.virusGroup, this.bacteriumGroup, this.powerupGroup], this.hitPlayer, null, this);
        this.physics.add.collider(this.bulletsGroup, [this.virusGroup, this.bacteriumGroup], this.hitEnemies, null, this);
        this.physics.add.collider(this.bulletsGroup,  this.powerupGroup, this.hitPowerup, null, this);
        this.physics.add.overlap(this.player, this.soapImage, this.reloadAmmo, null, this);

    }

    update(time, delta) {


     

        //  ENEMIES RESPAWN CONTROL AFTER GAME OVER
        if (time > this.respawnInterval && this.respawn == 0) {
            this.respawn = Math.trunc(time);
        }


        if (time > this.respawn) {

            // POWERUP
            if (this.enemiesGlobalCounter % 15 == 0 && this.enemiesGlobalCounter != 0) {
                this.powerupGroup.newItem();
            }

            if (this.enemiesGlobalCounter % 5 == 0 && this.enemiesGlobalCounter != 0) {

                if (this.respawnInterval > 600) {
                    this.respawnInterval -= 100;
                }

                this.addEnemy(0);
            }
            else {
                this.addEnemy(1);
            }
            this.respawn += this.respawnInterval;
        }

        // INPUT CONTROL
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.player.setVelocity(0, 0)
                .anims.play('turn');
            this.fire();

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


    reloadAmmo() {

        if (this.ammo === 0) {
            this.ammo = 30;
            var randomX = Phaser.Math.Between(40, this.sys.game.canvas.width - 50);
            this.reloadImage.setX(randomX).setActive(false).setVisible(false);
            this.soapImage.setX(randomX).setActive(false).setVisible(false);
            this.ammoText.setText('AMMO: ' + this.ammo);
        }

    }

    hitPlayer(player, enemy) {

        if (!this.invincible) {
            this.invincible = true;
            this.killedSound.play();
            this.lifesCounter--;
            this.lifesText.setText('X ' + this.lifesCounter);
            enemy.destroy();
            player.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.invincible = false;
                    player.clearTint();
                }
            });

            if (this.lifesCounter < 0) {
                
                this.virusGroup.clear(true, true); // clear( [removeFromScene] [, destroyChild])
                this.bacteriumGroup.clear(true, true);
                this.bulletsGroup.clear(true, true);
                // this.scene.restart();
                this.scene.start("Intro");

            }

        }
    }

    hitEnemies(bullet, enemy) {
        bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();

        enemy.hitsToKill--;

        if (enemy.hitsToKill == 0) {
            enemy.destroy();
            this.popSound.play();
            this.score += 10;
            this.scoreText.setText('SCORE: ' + this.score);

            if (this.score % this.newLife == 0) {
                this.lifesCounter++;
                this.lifesText.setText('X ' + this.lifesCounter);
            }
        }
    }

    hitPowerup(bullet, bubble){
        this.hitEnemies(bullet,bubble);
        this.powerupCounter = 10;




    }



    addEnemy(type) {
        this.reboundSound.play();
        this.enemiesGlobalCounter++;

        switch (type) {
            case 0:
                this.bacteriumGroup.newItem();
                break;
            default:
                this.virusGroup.newItem();
        }
    }

    fire() {
        if (this.ammo >= 1 && this.powerupCounter === 0) {
            this.bulletsGroup.newItem();
            this.shotSound.play();
            this.ammo--;
            this.ammoText.setText('AMMO: ' + this.ammo);
        }

        if (this.ammo == 0 && this.powerupCounter === 0) {
            this.reloadImage.setVisible(true).setActive(true);
            this.soapImage.setVisible(true).setActive(true);
        }

        if (this.powerupCounter > 0){
            this.bulletsGroup.newDoubleItem();
            this.shotSound.play();
            this.powerupCounter--;
        }


    }


}

export default Firstscene;


