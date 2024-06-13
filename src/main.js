// Jade Hernandez
// Created: 6/5/2024
// Phaser: 3.70.0
//
// Stellar Tactics
//
// A turn based combat game where you try to defeat an AI opponent
// 
// Art assets from Kenny Assets:
// https://kenney.nl/assets

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            },
            fps: 60
        }
    },
    width: 1600,
    height: 800,
    scene: [Load, Background, MainMenu, CreditsMenu, ControlsMenu, Ending, Combat, Display, Actions, Player, SimpleAI, Sprites, Sound, Visuals]
}

const SCALE = 1;
let my = {sprite: {}, vfx: {}, sfx: {}};

const game = new Phaser.Game(config);
