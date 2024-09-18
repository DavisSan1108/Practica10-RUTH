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

// Función recursiva para dividir una fila por el pivote
function dividirFila(matriz, fila, divisor, columna, n) {
    if (columna === n) return;
    matriz[fila][columna] /= divisor;
    dividirFila(matriz, fila, divisor, columna + 1, n);
}

// Función recursiva para eliminar valores en otras filas
function eliminarValores(matriz, filaActual, filaObjetivo, columna, n, factor) {
    if (columna === n) return;
    matriz[filaObjetivo][columna] -= factor * matriz[filaActual][columna];
    eliminarValores(matriz, filaActual, filaObjetivo, columna + 1, n, factor);
}

// Función recursiva para recorrer las filas y aplicar Gauss-Jordan
function gaussJordanRecursivo(matriz, fila, n) {
    if (fila === n) return; // Caso base: cuando hemos procesado todas las filas

    let pivot = matriz[fila][fila];
    dividirFila(matriz, fila, pivot, 0, n); // Normalizar la fila actual

    function eliminarColumnas(filaObjetivo) {
        if (filaObjetivo === n) return;
        if (filaObjetivo !== fila) {
            let factor = matriz[filaObjetivo][fila];
            eliminarValores(matriz, fila, filaObjetivo, 0, n, factor);
        }
        eliminarColumnas(filaObjetivo + 1);
    }

    eliminarColumnas(0); // Eliminar elementos de otras filas

    gaussJordanRecursivo(matriz, fila + 1, n); // Llamada recursiva para la siguiente fila
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

    // Aplicar el método de Gauss-Jordan usando recursividad
    gaussJordanRecursivo(matriz, 0, n);

    // Mostrar la matriz resultante en los inputs sin decimales
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(`matriz-${i}-${j}`).value = Math.round(matriz[i][j]);  // Redondear al número entero más cercano
        }
    }
}
