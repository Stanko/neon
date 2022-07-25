import React, { Component } from 'react';
import random from '../utils/random';

import App from './App';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>;
    }

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
