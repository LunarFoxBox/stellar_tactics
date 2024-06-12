class Ending extends Phaser.Scene{
    constructor(){
        super({key: "endingScene", active: true});
    }
    create(){
        let listener = this.scene.get('displayScene');

        listener.events.on('ending', (end)=>{
            // End scenes
            this.scene.stop('combatScene');
            this.scene.stop('spriteScene');
            this.scene.stop('displayScene');
            this.scene.stop('actionsScene');

            
            // Show message depending on if it was a win or lose
            if (end == 'won'){
                this.add.text(600, 200, `You have defeated the invaders!!\n\nClick to return to main menu`, { font: '40px Lexend', fill: '#FFFFFF'})
            }
            else{
                this.add.text(600, 200, `You have fallen...\n\nClick to return to main menu`, { font: '40px Lexend', fill: '#FFFFFF'})
            }
            
            this.events.emit('reset');
            // Return to main menu when screen is clicked
            this.input.once('pointerup', ()=> {
                this.events.emit('reset');
                this.scene.start('mainMenuScene');
            });
        })
    }
}