import generateLine, { generateRandomColor } from './generate-line';
import random from './random';

export default function generateLines(
  numberOfLines,
  numberOfColumns,
  numberOfRows,
  blockSize,
  imageWidth,
  imageHeight,
  vectors,
  searchRadiusFactor
) {
  const lines = [];

  for (let i = 0; i < numberOfLines; i++) {
    const startingPoint = {
      x: Math.round(fxrand() * (imageWidth - 10)) + 5,
      y: Math.round(fxrand() * (imageHeight - 10)) + 5,
    };

    let fullLine = generateLine(
      startingPoint,
      vectors,
      numberOfColumns,
      numberOfRows,
      blockSize,
      fxrand,
      searchRadiusFactor
    );

    const step = random(3, 7);
    const gap = random(2, 5);

    while (fullLine.length > step) {
      const part = fullLine.splice(0, step);
      // part.color = fullLine.color;
      part.color = generateRandomColor();
      part.strokeWidth = fullLine.strokeWidth;

      lines.push(part);
      fullLine.splice(0, gap);
    }
  }

  return lines;
}
