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
        this.actionListener = this.scene.get('combatScene');
        this.opponentListener = this.scene.get('playerScene');

        // AI took damage
        this.opponentListener.events.on('aiHit', (damage)=>{
            this.netDamage = damage - this.defense;
            // If defense is equal or more than damage only send message
            if (this.netDamage <= 0){
                this.text = `Your attack of ${damage} was completely absorbed by their shields`;
            }
            // Otherwise subtract health and send message
            else{
                this.health -= this.netDamage;
                this.text = `Your attack hits the enemy for ${this.netDamage} damage`;
                this.events.emit('updateAIHealth', this.health);
                my.vfx.hit.startFollow(my.sprite.ai, 0, 0, false);
                my.vfx.hit.start();
            }
            this.events.emit('message', this.text);
        });

        // AI attacks player
        this.actionListener.events.on('aiAttack', ()=>{
            this.dice = Phaser.Math.Between(1, 10);
            this.damage = Phaser.Math.Between(this.minDamage, this.maxDamage);
            // If AI rolled a 1 then send miss message
            if (this.dice == 1){
                this.events.emit('message', "The enemy's attack misses you");
            }
            // Otherwise the attack hits the player
            else{
                my.sfx.hitSound.play();
                this.events.emit('playerHit', this.damage);
            }
        });

        // AI heals themselves so subtract a heal use and restore health
        // Returns true if they were able to heal and false otherwise
        this.actionListener.events.on('aiHeal', ()=>{
            this.hasHealed = false;
            // If they have a use of heal left and would make the most of it, then heal
            if (this.healsLeft > 0 && (this.health + this.healAmount <= this.maxHealth)){
                this.health += this.healAmount;
                this.healsLeft--;
                this.hasHealed = true;
                this.text = `Enemy Repair Successful - They recovered ${this.healAmount} Health`;
                // Update Display
                this.events.emit('message', this.text);
                this.events.emit('updateAIHealth', this.health);
                my.vfx.repair.startFollow(my.sprite.ai, 0, 0, false);
                my.vfx.repair.start();
                my.sfx.repairSound.play();
            }
            return this.hasHealed;
        });
        
        // AI raise defense
        this.actionListener.events.on('aiDefense', ()=>{
            this.defenseGain = Phaser.Math.Between(this.minDefenseRaise, this.maxDefenseRaise);
            this.defense += this.defenseGain;
            this.text = `The enemy has raised their shields by ${this.defenseGain} to ${this.defense}`;
            // Update Display
            this.events.emit('message', this.text);
            this.events.emit('updateAIDefense', this.defense);
            my.sfx.shieldSound.play();
        });

        // Reset Variables
        this.scene.get('endingScene').events.on('reset', ()=>{
            this.init();
            //console.log(this.health);
        });
    }
}