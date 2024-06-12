class Display extends Phaser.Scene{
    constructor(){
        super({key: 'displayScene'});
    }

    create(){
        // Create reference variable for listening to turn scene
        const playerListener = this.scene.get('playerScene');
        const aiListener = this.scene.get('aiScene');
        const combatListener = this.scene.get('combatScene');


        // Scale factor for x
        let scaleMod = 9;

        // Create Boxes
        let messageBox = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        let playerBox = this.add.image(0, 0, 'uiPack', 'glassPanel_projection.png');
        let aiBox = this.add.image(0, 0, 'uiPack', 'glassPanel_projection.png');


        // Stretch Boxes
        messageBox.scaleX = scaleMod;
        messageBox.scaleY = scaleMod/6;
        playerBox.scaleX = scaleMod/2;
        playerBox.scaleY = scaleMod/6;
        aiBox.scaleX = scaleMod/2;
        aiBox.scaleY = scaleMod/6;

        // Create Box Text
        let messageText = this.add.text(-300, -15, `Hostile ship detected...`, { font: '25px Lexend', fill: '#FFFFFF'});
        let playerHealthText = this.add.text(-60, -40, `Health: 100%`, { font: '25px Lexend', fill: '#FFFFFF'});
        let playerDefenseText = this.add.text(-60, 10, `Shields: 0`, { font: '25px Lexend', fill: '#FFFFFF'});
        let aiHealthText = this.add.text(-60, -40, `Health: 100%`, { font: '25px Lexend', fill: '#FFFFFF'});
        let aiDefenseText = this.add.text(-60, 10, `Shields: 0`, { font: '25px Lexend', fill: '#FFFFFF'});
        
        // Group objects and place them at x, y
        this.add.container(800, 725, [messageBox, messageText]);
        this.add.container(300, 100, [playerBox, playerHealthText, playerDefenseText]);
        this.add.container(1300, 100, [aiBox, aiHealthText, aiDefenseText]);


        combatListener.events.on('clear', ()=>{
            messageText.setText('');
        });

        playerListener.events.on('message', (text)=> {
            messageText.setText(`${text}...`);
        });
        playerListener.events.on('updatePlayerHealth', (newValue)=>{
            playerHealthText.setText(`Health: ${newValue}%`);
            if (newValue <= 0){
                this.events.emit('ending', 'lost');
            }
        });
        playerListener.events.on('updatePlayerDefense', (newValue)=>{
            playerDefenseText.setText(`Shields: ${newValue}`);
        });


        aiListener.events.on('message', (text)=>{
            messageText.setText(`${text}...`);
        });
        aiListener.events.on('updateAIHealth', (newValue)=>{
            aiHealthText.setText(`Health: ${newValue}%`);
            if (newValue <= 0){
                this.events.emit('ending', 'won');
            }
        });
        aiListener.events.on('updateAIDefense', (newValue)=>{
            aiDefenseText.setText(`Shields: ${newValue}`);
        });
    }
}