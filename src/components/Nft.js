import React, { Component } from 'react';
import random from '../utils/random';

import App from './App';

export default class Controls extends Component {
  render() {
    return (
      <App
        blockSize={50}
        blockCount={16}
        numberOfLines={random(175, 250, null, 0)}
        searchRange={5}
        maxVectorVelocity={random(30, 150, null, 0)}
        imageSize={50 * 16}
      />
    );
  }
}
