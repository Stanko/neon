export default function generateRandomColor() {
  const goldenRatio = 0.618033988749895 * 360;
  const h = parseInt((Math.random() * 360 + goldenRatio) % 360, 10);
  
  return `hsl(${ h }, 70%, 60%)`;
}