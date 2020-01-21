import React from "react";

export default function Grid({
  imageWidth,
  imageHeight,
  numberOfColumns,
  numberOfRows,
  blockSize,
}) {
  const lines = [];

  for (let i = 0; i <= numberOfColumns; i++) {
    const coordinate = i * blockSize;
    
    lines.push(
      <path
        key={`y${ i }`}
        className="GridLine"
        d={ `M ${ coordinate } 0 L ${ coordinate } ${ imageHeight }` } 
      />
    );
  }

  for (let i = 0; i <= numberOfRows; i++) {
    const coordinate = i * blockSize;

    lines.push(
      <path
        key={`x${ i }`}
        className="GridLine"
        d={ `M 0 ${ coordinate } L ${ imageWidth } ${ coordinate }` } 
      />
    );
  }

  return lines;
}
