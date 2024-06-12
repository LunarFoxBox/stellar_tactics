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
        this.maxDefenseRaise = 5;

        this.text = '';
    }

    create(){
        // Create reference variable for listening to turn scene
        let actionListener = this.scene.get('combatScene');
        let opponentListener = this.scene.get('playerScene');

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

        opponentListener.events.on('aiHit', (damage)=>{
            this.health -= damage - this.defense;
            this.text = `Your attack hits the enemy for ${damage} damage`;
            this.events.emit('message', this.text);
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
            }
            return hasHealed;
        });
        
        actionListener.events.on('aiDefense', ()=>{
            let defense = Phaser.Math.Between(this.minDefenseRaise, this.maxDefenseRaise);
            this.defense += defense;
            this.text = `The enemy has raised their shields by ${defense} to ${this.defense}`;
            this.events.emit('message', this.text);
        });
    }
}