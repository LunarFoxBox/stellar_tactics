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
        this.actionListener = this.scene.get('actionsScene');
        this.opponentListener = this.scene.get('aiScene');

        // Player was hit so subtract health
        this.opponentListener.events.on('playerHit', (damage)=>{
            this.netDamage = damage - this.defense;
            // If defense is equal or more than damage only send message
            if (this.netDamage <= 0){
                this.text = `The enemy's attack of ${damage} was completely absorbed by your shields`;
            }
            // Otherwise subtract health and send message
            else{
                this.health -= this.netDamage;
                this.text = `The enemy's attack hits you for ${this.netDamage} damage`;
                this.events.emit('updatePlayerHealth', this.health);
                my.vfx.hit.startFollow(my.sprite.player, 0, 0, false);
                my.vfx.hit.start();
            }
            this.events.emit('message', this.text);
        });

        // Player is attacking
        this.actionListener.events.on('playerAttack', ()=>{

            this.dice = Phaser.Math.Between(1, 10);
            this.damage = Phaser.Math.Between(this.minDamage, this.maxDamage);
            // If player rolls a 1 then they miss
            if (this.dice == 1){
                this.events.emit('message', "Your attack misses the enemy");
            }
            // Otherwise they hit the AI
            else{
                my.sfx.hitSound.play();
                this.events.emit('aiHit', this.damage);
            }
        });


        // Player heals themselves so subtract a heal use and restore health
        // Returns true if they were able to heal and false otherwise
        this.actionListener.events.on('playerHeal', ()=>{
            // If they have a use of heal left then heal
            if (this.healsLeft > 0){
                // Heal and if go over set Health to max Health
                this.health += this.healAmount;
                if (this.health > this.maxHealth){this.health = this.maxHealth}

                // -1 remaining heals and send emits to display
                this.healsLeft--;
                this.text = `Repair Successful - You recovered ${this.healAmount} Health`;
                this.events.emit('updatePlayerHealth', this.health);
                my.vfx.repair.startFollow(my.sprite.player, 0, 0, false);
                my.vfx.repair.start();
                my.sfx.repairSound.play();
            }
            // Otherwise display that they could not heal
            else{
                this.text = `Repair Unsuccessful - You have no Repairs remaining`;
                
            }
            this.events.emit('message', this.text);
        });

        // Player raises their defense
        this.actionListener.events.on('playerDefense', ()=>{
            this.defenseGain = Phaser.Math.Between(this.minDefenseRaise, this.maxDefenseRaise);
            this.defense += this.defenseGain;
            this.text = `You raised your shields by ${this.defenseGain} to ${this.defense}`;
            this.events.emit('message', this.text);
            this.events.emit('updatePlayerDefense', this.defense);
            my.sfx.shieldSound.play();
        });

        // Reset player variables
        this.scene.get('endingScene').events.on('reset', ()=>{
            this.init();
            //console.log(this.health);
        });
    }
}