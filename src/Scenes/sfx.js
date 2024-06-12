class Sound extends Phaser.Scene{
    constructor(){
        super('soundScene');
    }
    create(){
        my.sfx.theme = this.sound.add('theme');
        my.sfx.theme.loop = true;
        my.sfx.theme.play();
    }
}