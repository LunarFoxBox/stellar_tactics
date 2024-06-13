class Visuals extends Phaser.Scene{
    constructor(){
        super('vfxScene');
    }

    create(){
        // Shield vfx
        my.vfx.shield = this.add.particles(0, 0, 'particles', {
            frame: ['light_01.png', 'light_02.png', 'light_03.png'],
            scale: {start: 0.05, end: 0.45},
            lifespan: 500,
            alpha: {start: 0.5, end: 0.03},
            duration: 1000
        });
        my.vfx.shield.setParticleSpeed(100, 0);
        my.vfx.shield.stop();

        // Hit vfx
        my.vfx.hit = this.add.particles(0, 0, 'particles', {
            frame: ['scorch_01.png'],
            scale: {start: 0.2, end: 0.4},
            lifespan: 500,
            duration: 500,
            hold: 100
        });
        my.vfx.shield.setParticleSpeed(20, 100);
        my.vfx.hit.stop();

        // Repair vfx
        my.vfx.repair = this.add.particles(0, 0, 'particles', {
            frame: ['spark_04.png', 'spark_01.png'],
            scale: {start: 0.2, end: 0.02},
            lifespan: 400,
            duration: 800,
            delay: 100,
            x: {min: -700, max: 700},
            y: {min: -700, max: 700}
        });
        my.vfx.repair.setParticleSpeed(100, 100);
        my.vfx.repair.stop();
    }
}