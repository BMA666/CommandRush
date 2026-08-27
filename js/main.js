import MenuScene from "./MenuScene.js";
import GameScene from "./GameScene.js";
import ResultScene from "./ResultScene.js";


const config = {

    type: Phaser.AUTO,
    pixelArt: true,
    width: window.innerWidth,
    height: window.innerHeight,

    parent: "game",

    backgroundColor: "#111827",

    resolution: 1,

    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: "game",
        width: window.innerWidth,
        height: window.innerHeight
    },

    scene: [
        MenuScene,
        GameScene,
        ResultScene
    ]

};


new Phaser.Game(config);