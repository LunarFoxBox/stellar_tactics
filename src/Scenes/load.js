class Load extends Phaser.Scene {
    constructor(){
        super('loadScene');
    }

    create(){
        
        this.scene.start('mainMenuScene')
    }
}