class Combat extends Phaser.Scene {
    constructor(){
        super('combatScene');
    }

    create() {
        this.scene.run('spriteScene');

        // Keeps track of who's turn it is
        this.isPlayerTurn = true;

        this.input.on('pointerup', ()=>{
            // If it is the player's turn let them choose action
            if (this.isPlayerTurn){
                this.events.emit('clear');
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
            this.isPlayerTurn = !this.isPlayerTurn;
        });
    }
    update() {
    }
}