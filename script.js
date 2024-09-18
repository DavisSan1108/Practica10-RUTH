// Generar una matriz de inputs para que el usuario ingrese los valores
function generarMatriz() {
    const n = parseInt(document.getElementById('n').value);
    const matriz = document.getElementById('matriz');
    matriz.innerHTML = '';
    matriz.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matriz.innerHTML += `<input type="number" class="matriz-elemento" id="matriz-${i}-${j}" value="0">`;
        }
    }
}

// Aplicar el método de Gauss-Jordan para convertir la matriz en una matriz identidad
function aplicarGaussJordan() {
    const n = parseInt(document.getElementById('n').value);
    let matriz = [];

    // Obtener los valores de los inputs y formar la matriz
    for (let i = 0; i < n; i++) {
        let fila = [];
        for (let j = 0; j < n; j++) {
            fila.push(parseFloat(document.getElementById(`matriz-${i}-${j}`).value));
        }
        matriz.push(fila);
    }

    // Aplicar el método de Gauss-Jordan
    for (let i = 0; i < n; i++) {
        let pivot = matriz[i][i];
        for (let j = 0; j < n; j++) {
            matriz[i][j] /= pivot;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = matriz[k][i];
                for (let j = 0; j < n; j++) {
                    matriz[k][j] -= factor * matriz[i][j];
                }
            }
        }
    }

    // Mostrar la matriz resultante en los inputs sin decimales
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(`matriz-${i}-${j}`).value = Math.round(matriz[i][j]);  // Redondear al número entero más cercano
        }
    }
}
