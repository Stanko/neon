function getRandomVector(rng, maxVectorVelocity) {
  const xSign = rng() > 0.5 ? 1 : -1;
  const ySign = rng() > 0.5 ? 1 : -1;

  const directionVector = {
    x: maxVectorVelocity * 0.1,
    y: 0,
  };

  return {
    x: rng() * xSign * maxVectorVelocity + directionVector.x,
    y: rng() * ySign * maxVectorVelocity + directionVector.y,
  };
}

export default function generateVectors(
  gridSizeX,
  gridSizeY,
  maxVectorVelocity
) {
  const vectors = [];

  for (let x = 0; x <= gridSizeX; x++) {
    vectors[x] = [];

    for (let y = 0; y <= gridSizeY; y++) {
      vectors[x][y] = getRandomVector(fxrand, maxVectorVelocity);
    }
  }

  return vectors;
}
