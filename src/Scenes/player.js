class Player extends Phaser.Scene {
    constructor(){
        super({key: 'playerScene', active: true});
    }

    init(){
        this.maxHealth = 100;
        this.maxHeals = 2;

        this.playerHealth = this.maxHealth;
        this.playerDefense = 0;
        this.healsLeft = this.maxHeals;
        this.healAmount = 40;

        this.text = '';
    }

    create(){
        // Create reference variable for listening to turn scene
        let player = this.scene.get('turnScene');

        // Reset player
        player.events.on('reset', ()=>{
            this.scene.restart();
        });

        // Player was hit so subtract health
        player.events.on('playerHit', (attack)=>{
            console.log('in playerHit event');
            this.playerHealth -= attack - this.playerDefense;
            console.log(this.playerHealth);
        });

        // Player heals themselves so subtract a heal use and restore health
        // Returns true if they were able to heal and false otherwise
        player.events.on('playerHeal', ()=>{
            let hasHealed = false;
            // If they have a use of heal left then heal
            if (this.healsLeft > 0){
                this.playerHealth += this.healAmount;
                this.healsLeft--;
                hasHealed = true;
                this.text = `Repair Successful - You recovered ${this.healAmount} Health`;
            }
            // Otherwise display that they could not heal
            else{
                this.text = `Repair Unsuccessful - You have no Repairs remaining`;
            }
            this.events.emit('message', this.text);
            return hasHealed;
        });

        // Player raises their defense
        player.events.on('playerDefense', (defense)=>{
            this.playerDefense += defense;
        });
    }
}