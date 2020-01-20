import React from "react";

export default function Grid({
  svgWidth,
  svgHeight,
  gridSizeX,
  gridSizeY,
  gridStep,
}) {
  const lines = [];

  for (let i = 0; i <= gridSizeX; i++) {
    const coordinate = i * gridStep;
    
    lines.push(
      <path
        key={`y${ i }`}
        className="GridLine"
        d={ `M ${ coordinate } 0 L ${ coordinate } ${ svgHeight }` } 
      />
    );
  }

  for (let i = 0; i <= gridSizeY; i++) {
    const coordinate = i * gridStep;

    lines.push(
      <path
        key={`x${ i }`}
        className="GridLine"
        d={ `M 0 ${ coordinate } L ${ svgWidth } ${ coordinate }` } 
      />
    );
  }

  return lines;
}
