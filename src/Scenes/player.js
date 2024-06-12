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
        this.maxDefenseRaise = 3;

        this.text = '';
    }

    create(){
        // Create reference variable for listening to turn scene
        const actionListener = this.scene.get('actionsScene');
        const opponentListener = this.scene.get('aiScene');

        // Player was hit so subtract health
        opponentListener.events.on('playerHit', (damage)=>{
            let netDamage = damage - this.defense;
            if (netDamage <= 0){
                this.text = `The enemy's attack of ${damage} was completely absorbed by your shields`;
            }
            else{
                this.health -= netDamage;
                this.text = `The enemy's attack hits you for ${netDamage} damage`;
                this.events.emit('updatePlayerHealth', this.health);
            }
            this.events.emit('message', this.text);
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


        // Player heals themselves so subtract a heal use and restore health
        // Returns true if they were able to heal and false otherwise
        actionListener.events.on('playerHeal', ()=>{
            // If they have a use of heal left then heal
            if (this.healsLeft > 0){
                // Heal and if go over set Health to max Health
                this.health += this.healAmount;
                if (this.health > this.maxHealth){this.health = this.maxHealth}

                // -1 remaining heals and send emits to display
                this.healsLeft--;
                this.text = `Repair Successful - You recovered ${this.healAmount} Health`;
                this.events.emit('updatePlayerHealth', this.health);
            }
            // Otherwise display that they could not heal
            else{
                this.text = `Repair Unsuccessful - You have no Repairs remaining`;
                
            }
            this.events.emit('message', this.text);
        });

        // Player raises their defense
        actionListener.events.on('playerDefense', ()=>{
            let defense = Phaser.Math.Between(this.minDefenseRaise, this.maxDefenseRaise);
            this.defense += defense;
            this.text = `You raised your shields by ${defense} to ${this.defense}`;
            this.events.emit('message', this.text);
            this.events.emit('updatePlayerDefense', this.defense);
        });

        this.scene.get('endingScene').events.on('reset', ()=>{
            this.init();
        })
    }
}