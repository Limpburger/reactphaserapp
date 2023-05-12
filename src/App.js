import React, { useEffect } from 'react';
import GameScene from './GameScene';
import Phaser from 'phaser';
import HouseScene from './HouseScene';
import CharacterCreator from './CharacterCreator';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import Avatar from './Avatar.jsx';

let screenWidth = window.screen.width;
let screenHeight = window.screen.height;

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: screenWidth,
      height: screenHeight,
      plugins: {
        scene: [
          {
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
          }
        ]
      },
      scale:{
        mode: Phaser.Scale.NONE,
      },
      backgroundColor: '#2d2d2d',
      scene: [GameScene, HouseScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          debug: false
        }
      }
    };
    console.log(config.width, "hi")
    const game = new Phaser.Game(config);
    return () => game.destroy(); // destroy game on unmount
  }, []);

  return (
    <div className="App">
      <div id="phaser-game" />
      <div id="game-container"></div>
    </div>
  );
}

export default App;
