import seedrandom from "seedrandom";

export function generateRandomColor(rng) {
  const h = parseInt((rng() * 360 + 220) % 360, 10);

  return `hsl(${ h }, 70%, 60%)`;
}

const plottingColors = [
  // https://images-na.ssl-images-amazon.com/images/I/815Rgc6cU%2BL._AC_SL1500_.jpg
  '#d2f673', // yellow
  '#f0965d', // orange
  '#eb6373', // dark pink
  '#e54d90', // pink
  '#73cd65', // light green
  '#a0333b', // red
  '#8f3077', // light purple
  '#43308c', // purple
  '#3f8f84', // blue green
  '#26588d', // blue
];

function generateRandomPlottingColor(rng) {
  return plottingColors[Math.floor(rng() * plottingColors.length)];
}

function isDotInCircle(dot, circleCenter, radius) {
  const x = dot.x - circleCenter.x;
  const y = dot.y - circleCenter.y;

  return x * x + y * y < radius * radius;
}

function getDistance(v1, v2) {
  const x = v1.x - v2.x;
  const y = v1.y - v2.y;

  return Math.sqrt(x * x + y * y);
}

function addVectors(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}

function multiplyVector(v, factor) {
  return {
    x: v.x * factor,
    y: v.y * factor
  };
}

function getNextPoint(
  currentPoint,
  line,
  vectors,
  gridSizeX,
  gridSizeY,
  gridStep,
  searchRadiusFactor
) {
  const nearVectors = [];

  for (let x = 0; x <= gridSizeX; x++) {
    const xCoordinate = x * gridStep;

    for (let y = 0; y <= gridSizeY; y++) {
      const yCoordinate = y * gridStep;
      const start = {
        x: xCoordinate,
        y: yCoordinate
      };

      if (isDotInCircle(start, currentPoint, gridStep * searchRadiusFactor)) {
        nearVectors.push({
          start,
          vector: vectors[x][y]
        });
      }
    }
  }

  if (nearVectors.length === 0) {
    return;
  }

  let nextPoint = { ...currentPoint };

  nearVectors.forEach(vector => {
    const distance = getDistance(currentPoint, vector.start) / gridStep;

    nextPoint = addVectors(
      nextPoint,
      multiplyVector(vector.vector, distance / (searchRadiusFactor * 10))
    );
  });

  line.push(nextPoint);

  const width = gridSizeX * gridStep;
  const height = gridSizeY * gridStep;
  const offsetX = 0.1 * width;
  const offsetY = 0.1 * height;
  if (
    nextPoint.x > width + offsetX ||
    nextPoint.y > height + offsetY ||
    nextPoint.x < -offsetX ||
    nextPoint.y < -offsetY
  ) {
    return;
  }

  if (line.length < 50) {
    getNextPoint(nextPoint, line, vectors, gridSizeX, gridSizeY, gridStep, searchRadiusFactor);
  }
}

export default function generateLine(
  startingPoint,
  vectors,
  numberOfColumns,
  numberOfRows,
  blockSize,
  colorRng,
  searchRadiusFactor,
  plotting
) {
  const line = [startingPoint];

  getNextPoint(startingPoint, line, vectors, numberOfColumns, numberOfRows, blockSize, searchRadiusFactor);

  const maxWidth = 5;

  const widthRng = seedrandom(line.join(''));

  if (plotting) {
    line.strokeWidth = 2;
    line.color = generateRandomPlottingColor(colorRng);
  } else  {
    line.color = generateRandomColor(colorRng);
    line.strokeWidth = widthRng() * maxWidth + 1;
  }


  return line;
}
