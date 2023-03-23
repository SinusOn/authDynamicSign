const first = ["6", "7", "9"],
  second = ["0", "1", "2", "2", "3"];

const n = first.length,
  m = second.length;
const arr = [];
for (let i = 0; i < n; i++) {
  arr[i] = [];
  for (let j = 0; j < m; j++) {
    arr[i][j] = Math.abs(first[i] - second[j]);
  }
}
console.log(arr);
const minDist = [];
minDist[0] = arr[0][0];
for (let i = 1; i < m; i++) {
  minDist[i] = [];
  arr[i] = [];
  minDist[i][0] = arr[i][0] + minDist[i - 1][0];
}

console.log(minDist);
