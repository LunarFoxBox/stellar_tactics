class Background extends Phaser.Scene{
    constructor(){
        super('backgroundScene');
    }
    create(){
        // Create background

        this.map = this.add.tilemap("background", 64, 64, 30, 20);
        this.tileset = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles");
        // Create ground layer
        this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        // Create building layer
        this.buildingLayer = this.map.createLayer("buildings", this.tileset, 0, 0);
    }
}