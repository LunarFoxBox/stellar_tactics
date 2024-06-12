class Turns extends Phaser.Scene {
    constructor(){
        super('turnScene');
    }
    init() {
        console.log('construct')
        this.isPlayerTurn = true;
        this.action = '';
    }

    create() {
    }
    update() {
        if (this.isPlayerTurn){
            //this.events.emit('playerTurn')
            console.log('before emitter');
            this.scene.sleep('turnScene').run('actionsScene');
            console.log('returned from scene');
        }

        else{
            let actionNumber = Phaser.Math.Between(0, 100);

            // Heal
            if (actionNumber <= 20 && this.healsLeft > 0){
                this.events.emit('aiHeal');
            }
            else if (actionNumber > 20 && actionNumber <= 50){

            }
            else{

            }
        }
        this.isPlayerTurn = !this.isPlayerTurn;
    }
}