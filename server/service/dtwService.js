class dtwService {
  CompareDynamocSign(ref, inp) {
    const reference = ref.split(" ");
    const input = inp.split(" ");
    console.log(`refer ${reference}`);
    console.log(`-------`);
    console.log(`input ${input}`);
    const W = [];
    const n = reference.length,
      m = input.length;
    const matrixDistance = [];
    // рассчет матрицы расстояний
    for (let i = 0; i < n; i++) {
      matrixDistance[i] = [];
      for (let j = 0; j < m; j++) {
        matrixDistance[i][j] = Math.abs(reference[i] - input[j]);
      }
    }

    // рассчет матрицы деформации
    const matrixDeformation = [];
    matrixDeformation[0] = [];
    matrixDeformation[0][0] = matrixDistance[0][0];

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

    //поиск оптимального пути
    W.push(matrixDeformation[n - 1][m - 1]);
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
      } else if (i == 0) {
        j--;
      } else {
        i--;
      }
      W.push(matrixDeformation[i][j]);
    } while (i != 0 && j != 0);

    const distanceDWT =
      Math.sqrt(W.reduce((sum, item) => sum + item)) / W.length;
    console.log("расстояние DWT");
    console.log(distanceDWT);
    console.log("последняя координата");
    console.log(matrixDeformation[n - 1][m - 1]);
    if (distanceDWT > 1) return false;
    return true;
  }
}
export default new dtwService();
