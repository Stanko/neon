import seedrandom from 'seedrandom';

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

// function getRandomVector3(maxVectorVelocity) {
//   return {
//     x: maxVectorVelocity * 0.5,
//     y: 0,
//   };
// }

// function getRandomVector2(maxVectorVelocity) {
//   return {
//     x: (Math.random() * 0.2) * maxVectorVelocity,
//     y: (Math.random() * 0.11 - 0.05) * maxVectorVelocity,
//   }
// }

export default function generateVectors(
  vectorsSeed,
  gridSizeX,
  gridSizeY,
  maxVectorVelocity
) {
  const rng = new seedrandom(vectorsSeed);

  const vectors = [];

  for (let x = 0; x <= gridSizeX; x++) {
    vectors[x] = [];

    for (let y = 0; y <= gridSizeY; y++) {
      vectors[x][y] = getRandomVector(rng, maxVectorVelocity);
    }
  }

  return vectors;
}
