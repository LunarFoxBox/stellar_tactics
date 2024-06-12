class Actions extends Phaser.Scene {
    constructor(){
        super('actionsScene');
    }

    create(){
        // Scale factor for x
        let scaleMod = 3;

        // Create Buttons
        let attackButton = this.add.image(0, 0, 'uiPack', 'glassPanel_cornerTL.png');
        let defenseButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        let healButton = this.add.image(0, 0, 'uiPack', 'glassPanel_cornerTR.png');

        // Stretch Buttons
        attackButton.scaleX = scaleMod;
        defenseButton.scaleX = scaleMod;
        healButton.scaleX = scaleMod;

        // Create Button Text
        let attackText = this.add.text(-40, -15, `Attack`, { font: '25px Lexend', fill: '#FFFFFF'});
        let defenseTextTop = this.add.text(-38, -30, 'Raise', {font: '25px Lexend', fill: '#FFFFFF'});
        let defenseTextBottom = this.add.text(-38, -5, 'Shield', {font: '25px Lexend', fill: '#FFFFFF'});
        let healText = this.add.text(-40, -15, 'Repair', {font: '25px Lexend', fill: '#FFFFFF'});

        // Group objects and place them at x, y
        this.add.container(500, 600, [ attackButton, attackText ]);
        this.add.container(800, 600, [ defenseButton, defenseTextTop, defenseTextBottom ]);
        this.add.container(1100, 600, [ healButton, healText ]);

        // Set the buttons to be interactive
        attackButton.setInteractive();
        defenseButton.setInteractive();
        healButton.setInteractive();

        // If attack button is clicked, return string to indicate action
        attackButton.once('pointerup', ()=> {
            // Store action to be read from other scenes
            this.events.emit('playerAttack');
            this.scene.resume('combatScene');
        });

        // If defense button is clicked, return string to indicate action
        defenseButton.once('pointerup', ()=> {
            // Store action to be read from other scenes
            this.events.emit('playerDefense');
            this.scene.resume('combatScene');
        });

        // If heal button is clicked, return string to indicate action
        healButton.once('pointerup', ()=> {
            // Store action to be read from other scenes
            this.events.emit('playerHeal');
            this.scene.resume('combatScene');
        });
    }
}