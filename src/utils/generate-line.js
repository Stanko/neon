import generateRandomColor from "./generate-random-color";

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

function getNextPoint(currentPoint, line, vectors, gridSize, gridStep) {
  const nearVectors = [];

  const searchRadiusFactor = 1.5;

  for (let x = 0; x <= gridSize; x++) {
    const xCoordinate = x * gridStep;

    for (let y = 0; y <= gridSize; y++) {
      const yCoordinate = y * gridStep;
      const start = { 
        x: xCoordinate, 
        y: yCoordinate, 
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
      multiplyVector(vector.vector, searchRadiusFactor - distance)
    );
  });

  line.push(nextPoint);

  // TODO Parametrize
  // if (
  //   nextPoint.x > size * 1.1 ||
  //   nextPoint.y > size * 1.1 ||
  //   nextPoint.x < size * -0.1 ||
  //   nextPoint.y < size * -0.1
  // ) {
  //   return;
  // }

  if (line.length < 100) {
    getNextPoint(nextPoint, line, vectors, gridSize, gridStep);
  }
}

export default function generateLine(startingPoint, vectors, gridSize, gridStep) {
  const line = [startingPoint];

  getNextPoint(startingPoint, line, vectors, gridSize, gridStep);

  return line;
}

