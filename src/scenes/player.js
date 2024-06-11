class Player extends Phaser.Scene {
    constructor(){
        super('playerScene')
    }

    init(){
        this.maxHealth = 100;
        this.maxHeals = 2;

        this.playerHealth = this.maxHealth;
        this.playerDefense = 0;
        this.healsLeft = this.maxHeals;
        this.healAmount = 40
    }

    create(){
        game.events.on('reset', ()=> {
            this.playerHealth = 100;
            this.playerDefense = 0;
        });

        game.events.on('playerHit', attack, ()=> {
            this.playerHealth -= attack - this.playerDefense;
        });

        game.events.on('playerHeal', ()=> {
            if (this.healsLeft > 0){
                this.playerHealth += this.healAmount;
                this.healsLeft--;
                this.events.emit('healed', 'You');
            }
            else {
                this.events.emit('cannotHeal');
            }
        });
    }
}