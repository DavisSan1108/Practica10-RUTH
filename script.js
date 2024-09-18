function generarMatriz() {
    const n = parseInt(document.getElementById('n').value);
    const matriz = document.getElementById('matriz');
    matriz.innerHTML = '';
    matriz.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const valor = i === j ? 1 : 0;
            matriz.innerHTML += `<span>${valor}</span>`;
        }
    }
}
