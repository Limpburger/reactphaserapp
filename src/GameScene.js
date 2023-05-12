import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Score from './Score';
import map1 from './map7.JSON';
import tiles1 from './tileset.png';
import player1 from './player.svg';
import Avatar from './Avatar.jsx';
import CombinedAvatar from "./combinedAvatar.svg";
import HouseScene from './HouseScene';
import coin from './Coins/Gold_1.png';
import CharacterCreator from './Avatar.jsx';
import Koala from './koala.svg';

const tileWidth = 45;
const tileHeight = 45;
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;

const coinImages = {};


class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
    this.physics = null;
    this.cursors = null;
    this.map = null;
    this.score = 0;
    this.scoreText = null;
    // add a property for Layer
    this.floorLayer = null; 
    this.boundsLayer = null;
    this.moving = null;
    this.inHouse = false;
    
    this.player = null;
    this.lastPlayerPosition = { x: 0, y: 0 };

    this.coins = null; 

  }

  Character = ({}) => {

    return(
      <div>
        <Avatar/>
      </div>
    );
  };

  handleHouseCollision = () => {
    const player = this.player;
    const currentTileX = Math.floor(player.x / tileWidth);
    const currentTileY = Math.floor(player.y / tileHeight);
    const nextTile = this.map.getTileAt(currentTileX - 1, currentTileY, true);

    this.inHouse = true;
    console.log('collided with house tile');
    this.scene.pause('game');
  
//     if (!this.scene.get('house')) { // check if the 'house' scene already exists
//       // pass the player's avatar as a prop to the 'house' scene
//       this.scene.add('house', HouseScene, false, { 
//       onClose: () => this.scene.resume(), 
//       playerAvatar: this.player.texture.key
// });
//     }
    console.log(this.lastPlayerPosition );
    //this.lastPlayerPosition = { x: nextTile.pixelX, y: nextTile.pixelY };

    this.scene.start('house', { previousScene: this.scene.key, player: player });
  }


  

  preload = () => {
   // You can now access the physics object
    this.physics.world.gravity.y = 0;
    // Load the tilemap and tileset
    this.load.image('tileset1', tiles1);
    this.load.tilemapTiledJSON('map', map1);
    // Load the player SVG file
    this.load.svg('player', CombinedAvatar, { width: 1000, height: 1000 });

    this.load.image('coin', coin, { width: 45, height: 45 });

  }

  handleLeaveHouse = () => {
    this.inHouse = false;
    this.player.setPosition(0, 0);
    this.moving = false;
  }

  create = () => {


    this.scale.displaySize.setAspectRatio( screenWidth/screenHeight );
    this.scale.refresh();
    console.log(screenWidth, screenHeight)
    //this.physics.world.gravity.y = 500;
    // Load the tilemap
    this.map = this.add.tilemap('map');



    const mapWidth = this.map.width;
    const mapHeight = this.map.height;
    const tiles = this.map.addTilesetImage('tileset1', 'tileset1'); // <-- use 'tileset1' for both arguments
    const houseTileIndex = [5,6,7,9,10,11];
    //this.floorLayer = this.map.createLayer('FloorLayer', tiles, 0, 0);

    this.boundsLayer = this.map.createLayer('BoundsLayer', tiles, 0, 0);

    // create the player sprite
    const player = this.physics.add.sprite(0, 0, 'player');
    const initialX = mapWidth / 2 + tileWidth / 2;
    const initialY = mapHeight / 2 + tileHeight / 2;
    player.setPosition(initialX - tileWidth / 2, initialY - tileHeight / 2); // adjust player position
    player.setScale(3);
    player.setDisplaySize(45, 45);

    // Set up the camera to follow the player
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels *2, this.map.heightInPixels*2);
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(2); // Adjust the zoom level as needed

    this.player = player; // add this line to set player as a property of GameScene


    this.player.setPosition(this.lastPlayerPosition.x, this.lastPlayerPosition.y);
    //this.floorLayer.setCollisionByProperty({ collides: true });
    //this.boundsLayer.setCollisionByProperty({ collides: true });


    this.boundsLayer.setTileIndexCallback(houseTileIndex, this.handleHouseCollision, this);
    this.physics.add.collider(this.player, this.boundsLayer, null, null, this);
    
    // this.boundsLayer.setCollisionBetween(7, 8);
    // this.physics.add.collider(this.player, this.boundsLayer);

    // create a div element for the React component
    const uiContainer = document.createElement('div');

    // render the React component using ReactDOM.createPortal()
    this.add
      .dom(0, 0, uiContainer)
      .setOrigin(0)
      .setScrollFactor(0);

    const root = ReactDOM.createRoot(uiContainer);
    root.render(<Score score={0} />); // pass score as a prop
    
    // render the score inside the canvas
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    this.scoreText.setScrollFactor(0, 0); // add this line to attach the score text to the camera



    //COINS
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);



    const numCoins = 5; // change this to the number of coins you want to add
    this.coins = this.physics.add.group(); // create a new group for the coins
        
    for (let i = 0; i < numCoins; i++) {
        let x = Phaser.Math.Between(0, this.map.widthInPixels/2);
        let y = Phaser.Math.Between(0, this.map.heightInPixels/2);
        let coin = this.coins.create(x, y, 'coin');
        coin.setScale(0.05);
        coin.body.setCircle(coin.width / 4);
        coin.body.setOffset(coin.width / 4, coin.height / 4);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    }
    
  

    


    // set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys(); 
  }

collectCoin(player, coins) {
    coins.disableBody(true, true);  // remove the coin from the screen
    this.score += 10;  // add 10 points to the score
    this.scoreText.setText('Score: ' + this.score);  // update the score text
}


update = () => {
  const player = this.player;
  // calculate the player's current tile position
  const currentTileX = Math.floor(player.x / tileWidth);
  const currentTileY = Math.floor(player.y / tileHeight);
  const currentTileXY = (currentTileX, currentTileY)
  const nextTile = this.map.getTileAt(currentTileX - 1, currentTileY, true);
  const treeTileIndex = 8;
  const houseTileIndex = [5,6,7,9,10,11];
  

  console.log(this.score);

  // move the player horizontally
  // check input
  if (this.cursors.left.isDown && !this.moving) {
    const nextTile = this.map.getTileAt(currentTileX - 1, currentTileY, true);
    console.log(nextTile);
    // check tile validity
    if (nextTile && nextTile.index !== -1) {
      // check if tree tile
      if(nextTile.index !== treeTileIndex){
        this.moving = true;
        this.tweens.add({
          targets: player,
          x: (currentTileX - 1) * tileWidth + tileWidth / 2,
          duration: 100,
          onComplete: () => {
            this.moving = false;
          }
       });
      }

              // check if house tile
              for(var i = 0; i < houseTileIndex.length; i++){
                if(houseTileIndex.includes(nextTile.index)){
                  console.log(this.lastPlayerPosition);
                  console.log(this.player.x, this.player.y);
                  console.log("house");
                  this.moving = false;
                  this.lastPlayerPosition = { x: player.x, y: player.y +45};
                  this.handleHouseCollision();  
                }
              }
    }
  } else if (this.cursors.right.isDown && !this.moving) {
    const nextTile = this.map.getTileAt(currentTileX + 1, currentTileY, true);
    if (nextTile && nextTile.index !== -1) {
      if(nextTile.index !== treeTileIndex){
      this.moving = true;
      this.tweens.add({
        targets: player,
        x: (currentTileX + 1) * tileWidth + tileWidth / 2,
        duration: 100,
        onComplete: () => {
          this.moving = false;
        }
      });
    }
    }
  }

  // move the player vertically
  if (this.cursors.up.isDown && !this.moving) {
    const nextTile = this.map.getTileAt(currentTileX, currentTileY - 1, true);
    if (nextTile && nextTile.index !== -1) {
      this.moving = true;
      if(nextTile.index !== treeTileIndex){
      this.tweens.add({
        targets: player,
        y: (currentTileY - 1) * tileHeight + tileHeight / 2,
        duration: 100,
        onComplete: () => {
          this.moving = false;
        }
      });
    }
    }
  } else if (this.cursors.down.isDown && !this.moving) {
    const nextTile = this.map.getTileAt(currentTileX, currentTileY + 1, true);
    if (nextTile && nextTile.index !== -1) {
      if(nextTile.index !== treeTileIndex){
      this.moving = true;
      this.tweens.add({
        targets: player,
        y: (currentTileY + 1) * tileHeight + tileHeight / 2,
        duration: 100,
        onComplete: () => {
          this.moving = false;
        }
      });
    }
    }
}
}
}


export default GameScene;