class Player extends Phaser.Scene {
    constructor(){
        super({key: 'playerScene', active: true});
    }

    init(){
        this.maxHealth = 100;
        this.maxHeals = 2;

        this.health = this.maxHealth;
        this.defense = 0;
        this.healsLeft = this.maxHeals;
        this.healAmount = 40;

        this.minDamage = 10;
        this.maxDamage = 25;

        this.minDefenseRaise = 1;
        this.maxDefenseRaise = 5;

        this.text = '';
    }

    create(){
        // Create reference variable for listening to turn scene
        const actionListener = this.scene.get('actionsScene');
        const opponentListener = this.scene.get('aiScene');

        // Reset player
        actionListener.events.on('reset', ()=>{
            this.scene.restart();
        });

        actionListener.events.on('playerAttack', ()=>{
            let dice = Phaser.Math.Between(1, 10);
            let damage = Phaser.Math.Between(this.minDamage, this.maxDamage);
            if (dice == 1){
                this.events.emit('message', "Your attack misses the enemy");
            }
            else{
                this.events.emit('aiHit', damage);
            }
        });

        // Player was hit so subtract health
        opponentListener.events.on('playerHit', (damage)=>{
            this.health -= damage - this.defense;
            this.text = `The enemy's attack hits you for ${damage} damage`;
            this.events.emit('message', this.text);
        });

        // Player heals themselves so subtract a heal use and restore health
        // Returns true if they were able to heal and false otherwise
        actionListener.events.on('playerHeal', ()=>{
            let hasHealed = false;
            // If they have a use of heal left then heal
            if (this.healsLeft > 0){
                this.health += this.healAmount;
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
        actionListener.events.on('playerDefense', ()=>{
            let defense = Phaser.Math.Between(this.minDefenseRaise, this.maxDefenseRaise);
            this.defense += defense;
            this.text = `You raised your shields by ${defense} to ${this.defense}`;
            this.events.emit('message', this.text);
        });
    }
}