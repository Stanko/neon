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
  searchRadiusFactor,
  plotting
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
        searchRadiusFactor,
        plotting
      )
    );
  }

  if (plotting) {
    lines.sort((a, b) => {
      if (a.color < b.color) { 
        return -1; 
      }
      if (a.color > b.color) { 
        return 1; 
      }
      return 0;
    });

    const lineGroups = [];

    let currentColor = null;
    let currentIndex = -1;

    lines.forEach(line => {
      if (line.color !== currentColor) {
        currentIndex++;
        lineGroups[currentIndex] = [];
        currentColor = line.color;
      }

      lineGroups[currentIndex].push(line);
    });

    console.log(lineGroups)

    return lineGroups;
  } else {
    return [lines];
  }
}
