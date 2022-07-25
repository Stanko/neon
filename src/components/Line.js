import React, { Component } from 'react';

export default class Line extends Component {
  render() {
    const { strokeWidth, color, d, circles } = this.props;

    // return circles.map((circle, index) => {
    //   return (
    //     <circle
    //       key={index}
    //       cx={circle.x}
    //       cy={circle.y}
    //       r={circle.radius}
    //       fill={color}
    //       style={{ opacity: circle.opacity }}
    //     />
    //   );
    // });

    return (
      <path
        className="line"
        strokeLinecap="round"
        stroke={color}
        strokeWidth={strokeWidth || 5}
        d={d}
        fill="none"
      />
    );
  }
}
