// Main Menu Screen
class MainMenu extends Phaser.Scene {
    constructor ()
    {
        super('mainMenuScene');
    }

    create ()
    {
        // Scaler for x
        let scaleMod = 2.5;

        // Create Buttons
        let playButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        let controlsButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        let creditsButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        let quitButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        
        // Scale Buttons
        playButton.scaleX = scaleMod;
        controlsButton.scaleX = scaleMod;
        creditsButton.scaleX = scaleMod;
        quitButton.scaleX = scaleMod;

        // Create Button Text
        let playText = this.add.text(-30, -15, `Play`, { font: '30px Lexend', fill: '#FFFFFF'});
        let controlsText = this.add.text(-55, -15, 'Controls', {font: '30px Lexend', fill: '#FFFFFF'});
        let creditsText = this.add.text(-50, -15, 'Credits', {font: '30px Lexend', fill: '#FFFFFF'});
        let quitText = this.add.text(-35, -15, 'Quit', {font: '30px Lexend', fill: '#FFFFFF'});

        // Group objects and place them at x, y
        this.add.container(800, 300, [ playButton, playButton, playButton, playText ]);
        this.add.container(800, 400, [ controlsButton, controlsText ]);
        this.add.container(800, 500, [ creditsButton, creditsText ]);
        this.add.container(800, 600, [ quitButton, quitText ]);

        // Set the buttons to be interactive
        playButton.setInteractive();
        controlsButton.setInteractive();
        creditsButton.setInteractive();
        quitButton.setInteractive();

        // If play button is clicked, start the game
        playButton.once('pointerup', ()=> {
            this.scene.start('displayScene');
            this.scene.start('combatScene');
        });

        // If controls button is clicked, show controls screen
        controlsButton.once('pointerup', ()=> {
            this.scene.start('controlsScreen');
        });

        // If credits button is clicked, show credits screen
        creditsButton.once('pointerup', ()=> {
            this.scene.start('creditsScreen');
        });

        // If quit button is clicked, quit the game
        quitButton.once('pointerup', ()=> {
            // Destroy all game elements and close the window
            game.destroy(true, true);
            close();
        });
    }
}

// Controls Screen
class ControlsMenu extends Phaser.Scene {
    constructor () {
        super('controlsScreen');
    }

    create(){
        // Controls Text
        this.add.text(500, 100, `Controls\n- - - - - - -
            Click actions and click to advance next turn`, { font: '20px Lexend', fill: '#FFFFFF'});

        // On click go to menu scene
        this.input.once('pointerup', (event)=> {
            this.scene.start('mainMenuScene');
        });
    }
}

// Credits Screen
class CreditsMenu extends Phaser.Scene {
    constructor () {
        super('creditsScreen');
    }

    create(){
        // Credit Text
        this.add.text(500, 100, `Credits\n- - - - - - -
            Music by moodmode (https://pixabay.com/music/video-games-8-bit-air-fight-158813/)`, { font: '20px Lexend', fill: '#FFFFFF'});

        // On click go to menu scene
        this.input.once('pointerup', (event)=> {
            this.scene.start('mainMenuScene');
        });
    }
}