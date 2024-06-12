class Sprites extends Phaser.Scene{
    constructor(){
        super('spriteScene');
    }
    create(){
        my.sprite.player = this.physics.add.sprite(300, 400, "playerShip");
        my.sprite.player.rotation = 1.5;

        my.sprite.enemy = this.physics.add.sprite(1300, 400, 'enemyShip');
        my.sprite.enemy.rotation = -1.5;
        my.sprite.enemy.scale = 0.5;
    }
}