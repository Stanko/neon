import seedrandom from "seedrandom";

import generateLine from "./generate-line";

export default function generateLines(
  linesSeed,
  numberOfLines,
  numberOfColumns,
  numberOfRows,
  blockSize,
  imageWidth,
  imageHeight,
  vectors,
  colorsSeed,
  searchRadiusFactor
) {
  const rng = new seedrandom(linesSeed);

  const lines = [];

  const colorRng = seedrandom(colorsSeed);

  for (let i = 0; i < numberOfLines; i++) {
    const startingPoint = {
      x: Math.round(rng() * (imageWidth - 10)) + 5,
      y: Math.round(rng() * (imageHeight - 10)) + 5
    };

    lines.push(
      generateLine(
        startingPoint,
        vectors,
        numberOfColumns,
        numberOfRows,
        blockSize,
        colorRng,
        searchRadiusFactor
      )
    );
  }

  return lines;
}
