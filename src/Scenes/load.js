class Load extends Phaser.Scene {
    constructor(){
        super('loadScene');
    }

    preload(){
        this.load.setPath('./assets/');

        this.load.atlasXML("uiPack", "uipackSpace_sheet.png", "uipackSpace_sheet.xml");
    }
    create(){
        this.scene.start('mainMenuScene')
    }
}