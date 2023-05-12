import React, { useState } from 'react';
import { render } from 'react-dom';

import Phaser from 'phaser';
import { ReactComponent as head1 } from './img/head1.svg';

import { ReactComponent as chest1 } from './img/chest1.svg';

import { ReactComponent as legs1 } from './img/legs1.svg';

import { ReactComponent as shoes1 } from './img/shoes1.svg';

class CharacterCreator extends Phaser.Scene {
  constructor() {
    super({ key: 'char' });
  }
  create() {
    console.log('CharacterCreator created!');
    // Create a container element for the React component
    const container = this.add.dom(window.innerWidth / 2, window.innerHeight / 2, 'div', { id: 'react-container' });


    // Render the Avatar component within the container element
    render(<Avatar />, container.node);

  }
}

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      head: head1,
      shirt: chest1,
      pants: legs1,
      shoes: shoes1
    };
  }

  render() {
    const { head, shirt, pants, shoes } = this.state;

    // Combine the SVG files into a single avatar SVG element
    const avatar = (
      <svg>
        <image xlinkHref={head} />
        <image xlinkHref={shirt} />
        <image xlinkHref={pants} />
        <image xlinkHref={shoes} />
      </svg>
    );

    // Render the avatar component with the SVG and controls
    return (
      <div>
        {avatar}
        <button onClick={() => this.setState({ head: head1 })}>
          Next Head
        </button>
        <button onClick={() => this.setState({ shirt: chest1 })}>
          Next Shirt
        </button>
        <button onClick={() => this.setState({ pants: legs1 })}>
          Next Pants
        </button>
        <button onClick={() => this.setState({ shoes: shoes1 })}>
          Next Shoes
        </button>
      </div>
    );
  }
}

export default CharacterCreator;