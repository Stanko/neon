import React from "react";

export default function Grid({
  gridStep,
  vectors,
}) {
  const vectorElements = [
    <marker 
      key="marker"
      id="arrow" 
      viewBox="0 0 10 10" 
      refX="5" 
      refY="5"
      markerWidth="5" 
      markerHeight="5"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 Z" />
    </marker>
  ];

  vectors.forEach((verticalSet, x) => {
    verticalSet.forEach((vector, y) => {
      const xCoordinate = x * gridStep;
      const yCoordinate = y * gridStep;
      
      vectorElements.push(
        <path 
          key={ `vector-${ x }-${ y }` }
          className="Vector"
          d={ `M ${ xCoordinate } ${ yCoordinate } L ${ (xCoordinate + vector.x).toFixed(2) } ${ (yCoordinate + vector.y).toFixed(2) }` } 
          markerEnd="url(#arrow)"
        />
      );
    });
  });

  return vectorElements;
}
