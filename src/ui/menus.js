// Main Menu Screen
class MainMenu extends Phaser.Scene {
    constructor ()
    {
        super('mainMenuScene');
    }

    create ()
    {
        // Scaler for x
        this.scaleMod = 2.5;

        // Title Box
        this.titleBox = this.add.image(0, 0, 'uiPack', 'glassPanel.png');

        // Create Buttons
        this.playButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        this.controlsButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        this.creditsButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        this.quitButton = this.add.image(0, 0, 'uiPack', 'glassPanel.png');
        
        // Scale Buttons
        this.playButton.scaleX = this.scaleMod;
        this.controlsButton.scaleX = this.scaleMod;
        this.creditsButton.scaleX = this.scaleMod;
        this.quitButton.scaleX = this.scaleMod;
        this.titleBox.scaleX = this.scaleMod * 2;

        // Create Button Text
        this.playText = this.add.text(-30, -15, `Play`, { font: '30px Lexend', fill: '#FFFFFF'});
        this.controlsText = this.add.text(-55, -15, 'Controls', {font: '30px Lexend', fill: '#FFFFFF'});
        this.creditsText = this.add.text(-50, -15, 'Credits', {font: '30px Lexend', fill: '#FFFFFF'});
        this.quitText = this.add.text(-35, -15, 'Quit', {font: '30px Lexend', fill: '#FFFFFF'});
        this.titleText = this.add.text(-100, -15, 'Stellar Tactics', {font: '30px Lexend', fill: '#FFFFFF'});

        // Group objects and place them at x, y
        this.add.container(800, 100, [this.titleBox, this.titleText]);
        this.add.container(800, 300, [this.playButton, this.playButton, this.playButton, this.playText]);
        this.add.container(800, 400, [this.controlsButton, this.controlsText]);
        this.add.container(800, 500, [this.creditsButton, this.creditsText]);
        this.add.container(800, 600, [this.quitButton, this.quitText]);

        // Set the buttons to be interactive
        this.playButton.setInteractive();
        this.controlsButton.setInteractive();
        this.creditsButton.setInteractive();
        this.quitButton.setInteractive();

        // If play button is clicked, start the game
        this.playButton.once('pointerup', ()=> {
            my.sfx.selectSound.play();
            this.scene.run('spriteScene');
            this.scene.start('vfxScene');
            this.scene.start('displayScene');
            this.scene.start('combatScene');
        });

        // If controls button is clicked, show controls screen
        this.controlsButton.once('pointerup', ()=> {
            my.sfx.selectSound.play();
            this.scene.start('controlsScreen');
        });

        // If credits button is clicked, show credits screen
        this.creditsButton.once('pointerup', ()=> {
            my.sfx.selectSound.play();
            this.scene.start('creditsScreen');
        });

        // If quit button is clicked, quit the game
        this.quitButton.once('pointerup', ()=> {
            my.sfx.selectSound.play();
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
            Click actions and click to advance next turn
            You can only repair twice for 40 health so make them count pilot!`,
            { font: '20px Lexend', fill: '#FFFFFF'});

        // On click go to menu scene
        this.input.once('pointerup', ()=> {
            my.sfx.selectSound.play();
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
        this.add.text(200, 100, `Credits\n- - - - - - -
            Music by moodmode
            (https://pixabay.com/music/video-games-8-bit-air-fight-158813/)
            
            Visuals provided by Kenney Assets
            Packs - Sci-Fi RTS (https://kenney.nl/assets/sci-fi-rts)
                    Space Shooter Extension (https://kenney.nl/assets/space-shooter-extension)
                    UI Pack (Space Expansion) (https://kenney.nl/assets/ui-pack-space-expansion)
                    Space Shooter Redux (https://kenney.nl/assets/space-shooter-redux)
                    Particle Pack (https://kenney.nl/assets/particle-pack)
                    
            Sound Effects by Jade Hernandez`
                    , { font: '30px Lexend', fill: '#FFFFFF'});

        // On click go to menu scene
        this.input.once('pointerup', ()=> {
            my.sfx.selectSound.play();
            this.scene.start('mainMenuScene');
        });
    }
}