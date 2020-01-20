function getRandomVector(maxVectorVelocity) {
  const xSign = Math.random() > 0.5 ? 1 : -1;
  const ySign = Math.random() > 0.5 ? 1 : -1;

  const directionVector = {
    x: maxVectorVelocity * 0.1,
    y: 0,
  };

  return {
    x: Math.random() * xSign * maxVectorVelocity + directionVector.x,
    y: Math.random() * ySign * maxVectorVelocity + directionVector.y
  };
}

function getRandomVector3(maxVectorVelocity) {
  return {
    x: maxVectorVelocity * 0.5,
    y: 0,
  };
}


function getRandomVector2(maxVectorVelocity) {
  return {
    x: (Math.random() * 0.2) * maxVectorVelocity,
    y: (Math.random() * 0.11 - 0.05) * maxVectorVelocity,
  }
}

export default function generateVectors(gridSizeX, gridSizeY, maxVectorVelocity) {
  const vectors = [];

  for (let x = 0; x <= gridSizeX; x++) {
    vectors[x] = [];

    for (let y = 0; y <= gridSizeY; y++) {
      vectors[x][y] = getRandomVector(maxVectorVelocity);
    }
  }

  return vectors;
}