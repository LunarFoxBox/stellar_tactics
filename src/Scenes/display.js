class Display extends Phaser.Scene{
    constructor(){
        super({key: 'displayScene'});
    }

    create(){
        // Create reference variable for listening to turn scene
        const playerListener = this.scene.get('playerScene');
        const aiListener = this.scene.get('aiScene');

        // Scale factor for x
        let scaleMod = 9;

        // Create Buttons
        let messageBox = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        
        // Stretch Buttons
        messageBox.scaleX = scaleMod;
        messageBox.scaleY = scaleMod/6;

        // Create Button Text
        let messageText = this.add.text(-240, -15, `Hostile ship detected...`, { font: '25px Lexend', fill: '#FFFFFF'});
        
        // Group objects and place them at x, y
        this.add.container(800, 725, [ messageBox, messageText ]);

        playerListener.events.on('message', (text)=> {
            messageText.setText(text);
        });

        aiListener.events.on('message', (text)=>{
            messageText.setText(text);
        });
    }
}