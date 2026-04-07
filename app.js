function dibujar() {

    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Limpiar tabla
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "<tr><th>x</th><th>y</th><th>err</th></tr>";

    // Dibujar ejes
    dibujarEjes(ctx, canvas.width, canvas.height);

    // Ejecutar Bresenham
    bresenham(x0, y0, x1, y1, (x, y) => {
        plotEscalado(ctx, x, y, canvas.height);
    });
}


// Algoritmo de Bresenham con tabla
function bresenham(x0, y0, x1, y1, plot) {

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    let tabla = document.getElementById("tabla");

    while (true) {

        plot(x0, y0);

        let fila = tabla.insertRow();
        fila.insertCell(0).innerText = x0;
        fila.insertCell(1).innerText = y0;
        fila.insertCell(2).innerText = err;

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}


//Dibuja puntos con escala y corrige eje Y

function plotEscalado(ctx, x, y, height) {
    let escala = 10;
    let canvasX = x * escala;
    let canvasY = height - (y
