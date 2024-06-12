class Display extends Phaser.Scene{
    constructor(){
        super({key: 'displayScene', active: true});
    }

    create(){
        // Create reference variable for listening to turn scene
        const playerListener = this.scene.get('playerScene');
        const aiListener = this.scene.get('aiScene');

        playerListener.events.on('message', (text)=> {
            console.log(`${text}...`);
        });

        aiListener.events.on('message', (text)=>{
            console.log(`${text}...`);
        });
    }
}


class Actions extends Phaser.Scene {
    constructor(){
        super({key: 'actionsScene'});
    }

    create(){
        // Create Buttons
        let attackButton = this.add.image(0, 0, 'button');
        let defenseButton = this.add.image(0, 0, 'button');
        let healButton = this.add.image(0, 0, 'button');

        // Create Button Text
        let attackText = this.add.text(-50, -15, `Attack`, { font: '30px Lexend', fill: '#FFFFFF'});
        let defenseText = this.add.text(-80, -15, 'Raise Shield', {font: '30px Lexend', fill: '#FFFFFF'});
        let healText = this.add.text(-50, -15, 'Repair', {font: '30px Lexend', fill: '#FFFFFF'});

        // Group objects and place them at x, y
        this.add.container(600, 700, [ attackButton, attackText ]);
        this.add.container(800, 700, [ defenseButton, defenseText ]);
        this.add.container(1000, 700, [ healButton, healText ]);

        // Set the buttons to be interactive
        attackButton.setInteractive();
        defenseButton.setInteractive();
        healButton.setInteractive();

        console.log('in actions');

        // If attack button is clicked, return string to indicate action
        attackButton.once('pointerup', ()=> {
            // Store action to be read from other scenes
            console.log('clicked attack');
            this.events.emit('aiHit', Phaser.Math.Between(10, 20));
        });

        // If defense button is clicked, return string to indicate action
        defenseButton.once('pointerup', ()=> {
            // Store action to be read from other scenes
            this.events.emit('playerDefense');
        });

        // If heal button is clicked, return string to indicate action
        healButton.once('pointerup', ()=> {
            // Store action to be read from other scenes
            this.events.emit('playerHeal');
        });
    }
}