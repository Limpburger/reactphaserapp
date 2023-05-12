import Phaser from 'phaser';
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

const headArray = [head1, head2, head3];
const chestArray = [chest1, chest2, chest3];
const legsArray = [legs1, legs2, legs3];
const shoesArray = [shoes1, shoes2, shoes3];

export default class Character extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    this.currentHeadIndex = 0;
    this.currentChestIndex = 0;
    this.currentLegsIndex = 0;
    this.currentShoesIndex = 0;

    this.head = new headArray[this.currentHeadIndex](scene, 0, 0);
    this.chest = new chestArray[this.currentChestIndex](scene, 0, 0);
    this.legs = new legsArray[this.currentLegsIndex](scene, 0, 0);
    this.shoes = new shoesArray[this.currentShoesIndex](scene, 0, 0);

    this.add([this.chest, this.head, this.legs, this.shoes]);
  }

  update() {
    // Update the SVG images based on the current index state
    this.head.setTexture(headArray[this.currentHeadIndex].default);
    this.chest.setTexture(chestArray[this.currentChestIndex].default);
    this.legs.setTexture(legsArray[this.currentLegsIndex].default);
    this.shoes.setTexture(shoesArray[this.currentShoesIndex].default);
  }

  changeHeadIndex = (index) => {
    this.currentHeadIndex = index;
    this.update();
  };

  changeChestIndex = (index) => {
    this.currentChestIndex = index;
    this.update();
  };

  changeLegsIndex = (index) => {
    this.currentLegsIndex = index;
    this.update();
  };

  changeShoesIndex = (index) => {
    this.currentShoesIndex = index;
    this.update();
  };
}
