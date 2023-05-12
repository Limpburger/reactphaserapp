import Phaser from 'phaser';
import gameScene from './GameScene';
import React, {useState, useRef} from "react";
import './App.css';
import Avatar from './Avatar.jsx';
import Character from './Character.jsx';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import Koala from "./koala.svg";

import { ReactComponent as head1 } from './img/head1.svg';
import { ReactComponent as head2 } from './img/head2.svg';
import { ReactComponent as head3 } from './img/head3.svg';

import { ReactComponent as chest1 } from './img/chest1.svg';
import { ReactComponent as chest2 } from './img/chest2.svg';
import { ReactComponent as chest3 } from './img/chest3.svg';

import { ReactComponent as legs1 } from './img/legs1.svg';
import { ReactComponent as legs2 } from './img/legs2.svg';
import { ReactComponent as legs3 } from './img/legs3.svg';

import { ReactComponent as shoes1 } from './img/shoes1.svg';
import { ReactComponent as shoes2 } from './img/shoes2.svg';
import { ReactComponent as shoes3 } from './img/shoes3.svg';


let screenWidth = window.screen.width;
let screenHeight = window.screen.height;

class HouseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'house' });
    this.headArray = [head1, head2, head3];
    this.chestArray = [chest1, chest2, chest3];
    this.legsArray = [legs1, legs2, legs3];
    this.shoesArray = [shoes1, shoes2, shoes3];
    this.currentHeadIndex = 0;
    this.currentChestIndex = 0;
    this.currentLegsIndex = 0;
    this.currentShoesIndex = 0;
  }
    preload() {
      this.load.scenePlugin({
        key: 'rexUI',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
      });
  }

  create(data) {
    const createAvatar = () => {
      const avatar = <Avatar/>
      console.log(avatar)
    
      return avatar;
    }


    const avatar = createAvatar();

    this.load.svg('avatar', avatar);
    const sprite = this.add.sprite(0, 0, 'avatar');


    //render player
    const player = data.player;
    const playerSprite = this.add.sprite(screenWidth/2, screenHeight/2, 'player');
    playerSprite.setScale(0.5);

    this.rexUI.add.label({
      x: 400,
      y: 300,
      width: 200,
      height: 40,
      text: this.add.text(0, 0, 'Hello world', { fontSize: '24px' }),
    });
    // Add your game objects to the scene here
    this.gameScene = this.scene.get('game');

    // Add the text
    const text = this.add.text(screenWidth/10, screenHeight/4, 'You entered the house!', { fontSize: '32px', fill: '#fff' });

    // Add a close window button
    const closeButton = this.add.text(700, 20, 'X', { fontSize: '32px', fill: '#fff' }).setInteractive();
    closeButton.on('pointerdown', () => {
      this.scene.stop('house');
      this.scene.start('game');
    });




     // Add four buttons to cycle through the SVG arrays
     const buttonWidth = 80;
     const buttonHeight = 40;
     const buttonSpacing = 20;
     const buttonX = 100;
     const buttonY = 100;
     const buttonStyle = { fontSize: '24px' };
 
     const headButtonLeft = createButton(this, '<');
     const headButtonRight = createButton(this, '>');
     const chestButtonLeft = createButton(this, '<');
     const chestButtonRight = createButton(this, '>');
     const legsButtonLeft = createButton(this, '<');
     const legsButtonRight = createButton(this, '>');
     const shoesButtonLeft = createButton(this, '<');
     const shoesButtonRight = createButton(this, '>');
 
     // Set button positions
     headButtonLeft.setPosition(buttonX, buttonY);
     headButtonRight.setPosition(buttonX + buttonWidth + buttonSpacing, buttonY);
     chestButtonLeft.setPosition(buttonX, buttonY + buttonHeight + buttonSpacing);
     chestButtonRight.setPosition(buttonX + buttonWidth + buttonSpacing, buttonY + buttonHeight + buttonSpacing);
     legsButtonLeft.setPosition(buttonX, buttonY + 2 * (buttonHeight + buttonSpacing));
     legsButtonRight.setPosition(buttonX + buttonWidth + buttonSpacing, buttonY + 2 * (buttonHeight + buttonSpacing));
     shoesButtonLeft.setPosition(buttonX, buttonY + 3 * (buttonHeight + buttonSpacing));
     shoesButtonRight.setPosition(buttonX + buttonWidth + buttonSpacing, buttonY + 3 * (buttonHeight + buttonSpacing));
 
     // Add button functionality
     headButtonLeft.on('pointerdown', () => {
       this.currentHeadIndex = (this.currentHeadIndex - 1 + this.headArray.length) % this.headArray.length;
       sprite.setTexture(this.headArray[this.currentHeadIndex].default);
     });
     headButtonRight.on('pointerdown', () => {
       this.currentHeadIndex = (this.currentHeadIndex + 1) % this.headArray.length;
       sprite.setTexture(this.headArray[this.currentHeadIndex].default);
     });
     chestButtonLeft.on('pointerdown', () => {
       this.currentChestIndex = (this.currentChestIndex - 1 + this.chestArray.length) % this.chestArray.length;
       sprite.setTexture(this.chestArray[this.currentChestIndex].default);
     });
     chestButtonRight.on('pointerdown', () => {
       this.currentChestIndex = (this.currentChestIndex + 1) % this.chestArray.length;
       sprite.setTexture(this.chestArray[this.currentChestIndex].default);
     });
     legsButtonLeft.on('pointerdown', () => {
       this.currentLegsIndex = (this.currentLegsIndex - 1 + this.legsArray.length) % this.legsArray.length;
       sprite.setTexture(this.legsArray[this.currentLegIndex].default);
     });
  }
}

// Helper function to create a button
function createButton(scene, text) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xffffff),
    text: scene.add.text(0, 0, text, {
      fontSize: '24px', color: 'red'
    }),
    space: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    }
  });
}

export default HouseScene;


