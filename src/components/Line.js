import React, { Component } from "react";
import generateRandomColor from "../utils/generate-random-color";

// https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

// The smoothing ratio
const smoothing = 0.2

// Properties of a line 
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
const lineProperties = (pointA, pointB) => {
  const lengthX = pointB.x - pointA.x
  const lengthY = pointB.y - pointA.y

  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  }
}

// Position of a control point 
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current, previous, next, reverse) => {

  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;

  // Properties of the opposed-line
  const o = lineProperties(p, n);

  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;

  // The control point position is relative to the current point
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return { x, y }
}

// Create the bezier curve command 
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
const bezierCommand = (point, i, a) => {
  // start control point
  const cps = controlPoint(a[i - 1], a[i - 2], point);

  // end control point
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true);

  return `C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`
}

// Render the svg <path> element 
// I:  - points (array): points coordinates
//     - command (function)
//       I:  - point (array) [x,y]: current point coordinates
//           - i (integer): index of 'point' in the array 'a'
//           - a (array): complete array of points coordinates
//       O:  - (string) a svg path command
// O:  - (string): a Svg <path> element
const svgPath = (points) => {

}

export default class Line extends Component {
  color = generateRandomColor();

  render() {
    const { 
      points, 
    } = this.props;

    // build the d attributes by looping over the points
    const d = points.reduce((acc, point, i, a) => {
      if (i === 0) {
        return `M ${ point.x },${ point.y }`;
      }

      return `${ acc } ${ bezierCommand(point, i, a) }`;
    }, "");
    
    console.log(d)

    return (
      <path className="Line" stroke={ this.color } d={ d } />
    );
  }
}