class Sprites extends Phaser.Scene{
    constructor(){
        super('spriteScene');
    }
    create(){
        // Create sprites for player and AI
        
        my.sprite.player = this.physics.add.sprite(300, 400, "playerShip");
        my.sprite.player.rotation = 1.5;

        my.sprite.ai = this.physics.add.sprite(1300, 400, 'enemyShip');
        my.sprite.ai.rotation = -1.5;
        my.sprite.ai.scale = 0.5;
    }
}