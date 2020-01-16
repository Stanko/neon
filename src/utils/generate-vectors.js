function getRandomVector(maxVectorVelocity) {
  const xSign = Math.random() > 0.5 ? 1 : -1;
  const ySign = Math.random() > 0.5 ? 1 : -1;

  const directionVector = {
    x: maxVectorVelocity * 0.5,
    y: 0,
  };

  return {
    x: Math.random() * xSign * maxVectorVelocity + directionVector.x,
    y: Math.random() * ySign * maxVectorVelocity + directionVector.y
  };
}

function getRandomVector2(maxVectorVelocity) {
  return {
    x: (Math.random() * 0.2) * maxVectorVelocity,
    y: (Math.random() * 0.11 - 0.05) * maxVectorVelocity,
  }
}

export default function generateVectors(gridSize, maxVectorVelocity) {
  const vectors = [];

  for (let x = 0; x <= gridSize; x++) {
    vectors[x] = [];

    for (let y = 0; y <= gridSize; y++) {
      vectors[x][y] = getRandomVector2(maxVectorVelocity);
    }
  }

  return vectors;
}