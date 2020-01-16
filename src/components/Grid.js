import React from "react";

export default function Grid({
  svgSize,
  gridSize,
  gridStep,
}) {
  const lines = [];
  for (let i = 0; i <= gridSize; i++) {
    const coordinate = i * gridStep;

    lines.push(
      <path
        key={`x${ i }`}
        className="GridLine"
        d={ `M 0 ${ coordinate } L ${ svgSize } ${ coordinate }` } 
      />
    );
    
    lines.push(
      <path
        key={`y${ i }`}
        className="GridLine"
        d={ `M ${ coordinate } 0 L ${ coordinate } ${ svgSize }` } 
      />
    );
  }

  return lines;
}
