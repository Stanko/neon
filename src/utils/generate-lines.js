import seedrandom from "seedrandom";

import generateLine from "./generate-line";

const colorLayerName = {
  '#d34d3e': '11-red-1',
  '#da3a32': '12-red-2',
  '#da3a7a': '13-dark-pink',
  '#d575a9': '14-pink',
  '#4e989d': '15-green-blue',
  '#e6843b': '16-orange',
  '#4968ae': '17-blue',
  '#5e3288': '18-purple',
  '#4aa57b': '19-green',
  '#f7eb4e': '20-yellow',
}

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
        lineGroups[currentIndex].color = colorLayerName[line.color];
      }

      lineGroups[currentIndex].push(line);
    });

    console.log(lineGroups)

    return lineGroups;
  } else {
    return [lines];
  }
}
