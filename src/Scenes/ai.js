class SimpleAI extends Phaser.Scene {
    constructor(){
        super({key: 'aiScene', active: true});
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
        let actionListener = this.scene.get('combatScene');
        let opponentListener = this.scene.get('playerScene');

        opponentListener.events.on('aiHit', (damage)=>{
            let netDamage = damage - this.defense;
            if (netDamage <= 0){
                this.text = `Your attack of ${damage} was completely absorbed by their shields`;
            }
            else{
                this.health -= netDamage;
                this.text = `Your attack hits the enemy for ${netDamage} damage`;
                this.events.emit('updateAIHealth', this.health);
            }
            this.events.emit('message', this.text);
        });
        

        actionListener.events.on('aiAttack', ()=>{
            let dice = Phaser.Math.Between(1, 10);
            let damage = Phaser.Math.Between(this.minDamage, this.maxDamage);
            if (dice == 1){
                this.events.emit('message', "The enemy's attack misses you");
            }
            else{
                this.events.emit('playerHit', damage);
            }
        });

        actionListener.events.on('aiHeal', ()=>{
            let hasHealed = false;
            // If they have a use of heal left then heal
            if (this.healsLeft > 0 && (this.health + this.healAmount <= this.maxHealth)){
                this.health += this.healAmount;
                this.healsLeft--;
                hasHealed = true;
                this.text = `Enemy Repair Successful - They recovered ${this.healAmount} Health`;
                this.events.emit('message', this.text);
                this.events.emit('updateAIHealth', this.health);
            }
            return hasHealed;
        });
        
        actionListener.events.on('aiDefense', ()=>{
            let defense = Phaser.Math.Between(this.minDefenseRaise, this.maxDefenseRaise);
            this.defense += defense;
            this.text = `The enemy has raised their shields by ${defense} to ${this.defense}`;
            this.events.emit('message', this.text);
            this.events.emit('updateAIDefense', this.defense);
        });

        this.scene.get('endingScene').events.on('reset', ()=>{
            this.init();
        })
    }
}