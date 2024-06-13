class Sound extends Phaser.Scene{
    constructor(){
        super('sfxScene');
    }
    create(){
        // Create all sounds that will be used
        my.sfx.theme = this.sound.add('theme', {volume: 0.3});
        my.sfx.theme.loop = true;
        my.sfx.theme.play();

        my.sfx.selectSound = this.sound.add('selectSound');
        my.sfx.hitSound = this.sound.add('hitSound', {volume: 2});
        my.sfx.shieldSound = this.sound.add('shieldSound');
        my.sfx.repairSound = this.sound.add('repairSound');
    }
}