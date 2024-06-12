class Display extends Phaser.Scene{
    constructor(){
        super({key: 'displayScene'});
    }

    create(){
        // Create reference variable for listening to turn scene
        this.playerListener = this.scene.get('playerScene');
        this.aiListener = this.scene.get('aiScene');
        this.combatListener = this.scene.get('combatScene');


        // Scale factor for x
        this.scaleMod = 9;

        // Create Boxes
        this.messageBox = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        this.playerBox = this.add.image(0, 0, 'uiPack', 'glassPanel_projection.png');
        this.aiBox = this.add.image(0, 0, 'uiPack', 'glassPanel_projection.png');


        // Stretch Boxes
        this.messageBox.scaleX = this.scaleMod;
        this.messageBox.scaleY = this.scaleMod/6;
        this.playerBox.scaleX = this.scaleMod/2;
        this.playerBox.scaleY = this.scaleMod/6;
        this.aiBox.scaleX = this.scaleMod/2;
        this.aiBox.scaleY = this.scaleMod/6;

        // Create Box Text
        this.messageText = this.add.text(-300, -15, `Hostile ship detected...`, { font: '25px Lexend', fill: '#FFFFFF'});
        this.playerHealthText = this.add.text(-60, -40, `Health: 100%`, { font: '25px Lexend', fill: '#FFFFFF'});
        this.playerDefenseText = this.add.text(-60, 10, `Shields: 0`, { font: '25px Lexend', fill: '#FFFFFF'});
        this.aiHealthText = this.add.text(-60, -40, `Health: 100%`, { font: '25px Lexend', fill: '#FFFFFF'});
        this.aiDefenseText = this.add.text(-60, 10, `Shields: 0`, { font: '25px Lexend', fill: '#FFFFFF'});
        
        // Group objects and place them at x, y
        this.add.container(800, 725, [this.messageBox, this.messageText]);
        this.add.container(300, 100, [this.playerBox, this.playerHealthText, this.playerDefenseText]);
        this.add.container(1300, 100, [this.aiBox, this.aiHealthText, this.aiDefenseText]);

        // Clear text at bottom center
        this.combatListener.events.on('clear', ()=>{
            this.messageText.setText('');
        });

        // Display text at bottom center
        this.playerListener.events.on('message', (text)=> {
            this.messageText.setText(`${text}...`);
        });

        // Update the displayed player health
        this.playerListener.events.on('updatePlayerHealth', (newValue)=>{
            this.playerHealthText.setText(`Health: ${newValue}%`);
            if (newValue <= 0){
                this.events.emit('ending', 'lost');
            }
        });

        // Update the displayed player defense
        this.playerListener.events.on('updatePlayerDefense', (newValue)=>{
            this.playerDefenseText.setText(`Shields: ${newValue}`);
        });

        // Display text at bottom center
        this.aiListener.events.on('message', (text)=>{
            this.messageText.setText(`${text}...`);
        });
        
        // Update the displayed AI health
        this.aiListener.events.on('updateAIHealth', (newValue)=>{
            this.aiHealthText.setText(`Health: ${newValue}%`);
            if (newValue <= 0){
                this.events.emit('ending', 'won');
            }
        });

        // Update the displayed AI defense
        this.aiListener.events.on('updateAIDefense', (newValue)=>{
            this.aiDefenseText.setText(`Shields: ${newValue}`);
        });
    }
}