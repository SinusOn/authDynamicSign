class dtwService {
  CompareDynamocSign(ref, input) {
    const reference = ref.split(" ");
    const warpingPath = [];
    const n = reference.length;
    const m = input.length;
    const matrixDistance = [];

    // рассчет матрицы расстояний

    this.calculateDistanceMatrix(matrixDistance, reference, input, n, m);

    // рассчет матрицы деформации
    const matrixDeformation = [];
    matrixDeformation[0] = [];
    matrixDeformation[0][0] = matrixDistance[0][0];
    this.calculateMatrixDeformation(matrixDeformation, matrixDistance, n, m);

    // поиск оптимального пути

    this.searchWarpingPath(warpingPath, matrixDeformation, n, m);
    const distanceDWT =
      Math.sqrt(warpingPath.reduce((sum, item) => sum + item)) /
      warpingPath.length;
    console.log("расстояние DWT");
    console.log(distanceDWT);
    console.log("последняя координата");
    console.log(matrixDeformation[n - 1][m - 1]);
    if (distanceDWT >= 1) return false;
    return true;
  }

  calculateDistanceMatrix(matrixDistance, reference, input, n, m) {
    for (let i = 0; i < n; i++) {
      matrixDistance[i] = [];
      for (let j = 0; j < m; j++) {
        matrixDistance[i][j] = Math.abs(reference[i] - input[j]);
      }
    }
  }

  calculateMatrixDeformation(matrixDeformation, matrixDistance, n, m) {
    for (let j = 1; j < m; j++) {
      matrixDeformation[j] = [];
      matrixDeformation[0][j] =
        matrixDistance[0][j] + matrixDeformation[0][j - 1];
    }

    for (let i = 1; i < n; i++) {
      matrixDeformation[i] = [];
      matrixDeformation[i][0] =
        matrixDistance[i][0] + matrixDeformation[i - 1][0];
    }

    for (let i = 1; i < n; i++) {
      for (let j = 1; j < m; j++) {
        matrixDeformation[i][j] =
          matrixDistance[i][j] +
          Math.min(
            matrixDeformation[i - 1][j - 1],
            matrixDeformation[i - 1][j],
            matrixDeformation[i][j - 1]
          );
      }
    }
  }

  searchWarpingPath(warpingPath, matrixDeformation, n, m) {
    warpingPath.push(matrixDeformation[n - 1][m - 1]);
    let i = n - 1;
    let j = m - 1;
    do {
      if (i > 0 && j > 0) {
        if (matrixDeformation[i - 1][j - 1] <= matrixDeformation[i - 1][j]) {
          if (matrixDeformation[i - 1][j - 1] <= matrixDeformation[i][j - 1]) {
            i--;
            j--;
          } else {
            j--;
          }
        } else if (matrixDeformation[i - 1][j] <= matrixDeformation[i][j - 1]) {
          i--;
        } else {
          j--;
        }
      } else if (i === 0) {
        j--;
      } else {
        i--;
      }
      warpingPath.push(matrixDeformation[i][j]);
    } while (i != 0 && j != 0);
  }
}
export default new dtwService();
