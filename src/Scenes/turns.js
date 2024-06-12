class Turns extends Phaser.Scene {
    constructor(){
        super('turnScene');
    }
    init() {
        console.log('construct')
        this.isPlayerTurn = true;
    }

    create() {
        if (this.isPlayerTurn){
            //this.events.emit('playerTurn')
            console.log('before emitter');
            this.events.emit('playerHit', 15);
        }
    }
    update() {

    }
}