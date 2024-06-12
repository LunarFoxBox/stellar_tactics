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

        this.text = '';
    }

    create(){
        // Create reference variable for listening to turn scene
        const listener = this.scene.get('actionsScene');

        // Reset player
        listener.events.on('reset', ()=>{
            this.scene.restart();
        });

        // Player was hit so subtract health
        listener.events.on('playerHit', (attack)=>{
            console.log('in playerHit event');
            this.health -= attack - this.defense;
            console.log(this.health);

            this.text = `You are hit for ${attack} damage`;
            this.events.emit('message', this.text);
        });

        // Player heals themselves so subtract a heal use and restore health
        // Returns true if they were able to heal and false otherwise
        listener.events.on('playerHeal', ()=>{
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
        listener.events.on('playerDefense', (defense)=>{
            this.defense += defense;
        });
    }
}




class AI extends Phaser.Scene {
    constructor(){
        super({key: 'aiScene', active: true});
        console.log(AI);
    }

    init(){
        this.maxHealth = 100;
        this.maxHeals = 2;

        this.health = this.maxHealth;
        this.defense = 0;
        this.healsLeft = this.maxHeals;
        this.healAmount = 40;

        this.text = '';
    }

    create(){
        // Create reference variable for listening to turn scene
        let listener = this.scene.get('actionsScene');

        listener.events.on('aiAttack', ()=>{
            let dice = Phaser.Math.Between(1, 20);
            let damage = Phaser.Math.Between(10, 20);
            if (dice == 1){
                this.events.emit('playerHit', damage);
            }
            else{
                this.events.emit('message', "The enemy's attack misses you");
            }
        });

        listener.events.on('aiHit', (damage)=>{
            console.log('in aiHit event');
            this.health -= damage - this.defense;
            console.log(this.health);

            this.text = `They are hit for ${damage} damage`;
            console.log(this.text);
            this.events.emit('message', this.text);
        });

        listener.events.on('aiDefense', ()=>{

        });

        listener.events.on('aiHeal', ()=>{

        });
        
    }
}