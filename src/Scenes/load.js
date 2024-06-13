class Load extends Phaser.Scene {
    constructor(){
        super('loadScene');
    }

    preload(){
        this.load.setPath('./assets/');

        this.load.atlasXML("uiPack", "uipackSpace_sheet.png", "uipackSpace_sheet.xml");

        // Load sprites
        this.load.image('playerShip', 'playerShip.png');
        this.load.image('enemyShip', 'enemyShip.png');

        // Load particles
        this.load.multiatlas("particles", "particles.json");

        // Load tiles
        this.load.image("tilemap_tiles", "scifi_tilesheet.png");  // Packed tilemap
        this.load.tilemapTiledJSON("background", "background.tmj");   // Tilemap in JSON
        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "scifi_tilesheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        // Load audio files
        this.load.audio('theme', '8-bit-air-fight.mp3');
        this.load.audio('selectSound', 'selectSound.wav');
        this.load.audio('hitSound', 'hitSound.wav');
        this.load.audio('shieldSound', 'shieldSound.wav');
        this.load.audio('repairSound', 'repairSound.wav');
    }
    create(){
        // Prepare needed scenes
        this.scene.run('backgroundScene');
        this.scene.start('sfxScene');
        this.scene.start('mainMenuScene');
    }
}