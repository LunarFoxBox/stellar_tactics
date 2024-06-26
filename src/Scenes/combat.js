class Combat extends Phaser.Scene {
    constructor(){
        super('combatScene');
    }

    create() {
        // Turn based combat tracker
        // Keeps track of who's turn it is
        this.isPlayerTurn = true;

        this.input.on('pointerup', ()=>{
            // If it is the player's turn let them choose action
            if (this.isPlayerTurn){
                // Clear text
                this.events.emit('clear');
                // Get user's input
                this.scene.sleep('combatScene').run('actionsScene');
            }
            
            // Otherwise if it is AI's turn have AI choose action using a random number
            else{
                let actionNumber = Phaser.Math.Between(0, 100);
                // Heal if the roll is 20 or under, it has a heal left, and it would receive full effect of heal
                if (actionNumber <= 20){
                    // If it should not heal reroll for a different action
                    if (!this.events.emit('aiHeal')){
                        actionNumber = Phaser.Math.Between(21, 100);
                    }
                }
                // If roll is between 21 and 50, then raise defense
                if (actionNumber > 20 && actionNumber <= 50){
                    this.events.emit('aiDefense');
                }
                // If the roll is over 50, then attack
                else if (actionNumber > 50){
                    this.events.emit('aiAttack');
                }
            }

            // Next actor's turn
            this.isPlayerTurn = !this.isPlayerTurn;
        });
    }
    update() {
    }
}