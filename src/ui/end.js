class Ending extends Phaser.Scene{
    constructor(){
        super({key: "endingScene", active: true});
    }
    create(){
        this.listener = this.scene.get('displayScene');

        this.listener.events.on('ending', (end)=>{
            // End scenes
            this.scene.stop('combatScene');
            this.scene.stop('displayScene');
            this.scene.stop('spriteScene');
            this.scene.stop('actionsScene');
            
            // Show message depending on if it was a win or lose
            if (end == 'won'){
                this.endText = this.add.text(600, 200, `You have defeated the invaders!!
                    Click to return to main menu`, { font: '40px Lexend', fill: '#FFFFFF'});
                this.scene.setVisible(true);
            }
            else{
                this.endText = this.add.text(600, 200, `You have fallen...
                    Click to return to main menu`, { font: '40px Lexend', fill: '#FFFFFF'});
                this.scene.setVisible(true);
            }
            // Return to main menu when screen is clicked
            this.input.once('pointerup', ()=> {
                this.scene.setVisible(false);
                this.events.emit('reset');
                this.scene.run('mainMenuScene');
            });
        });
        
    }
}