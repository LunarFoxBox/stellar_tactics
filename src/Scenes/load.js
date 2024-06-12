class Load extends Phaser.Scene {
    constructor(){
        super('loadScene');
    }

    preload(){
        this.load.setPath('./assets/');

        this.load.atlasXML("uiPack", "uipackSpace_sheet.png", "uipackSpace_sheet.xml");

        this.load.image('playerShip', 'playerShip.png');
        this.load.image('enemyShip', 'enemyShip.png');

        this.load.audio('theme', '8-bit-air-fight.mp3');
    }
    create(){
        this.scene.run('soundScene');
        this.scene.start('mainMenuScene');
    }
}