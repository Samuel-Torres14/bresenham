//Función principal que se ejecuta al presionar el botón
function dibujar() {

    // Obtener valores del usuario
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuración visual
    ctx.fillStyle = "blue";
    ctx.font = "10px Arial";

    // Limpiar tabla
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = `
        <tr>
            <th>x</th>
            <th>y</th>
            <th>err</th>
        </tr>
    `;

    // Dibujar ejes
    dibujarEjes(ctx, canvas.width, canvas.height);

    // Ejecutar algoritmo
    bresenham(x0, y0, x1, y1, (x, y) => {
        plotEscalado(ctx, x, y, canvas.height);
    });
}


//Algoritmo de Bresenham
 //Dibuja línea y guarda pasos en tabla
function bresenham(x0, y0, x1, y1, plot) {

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    let tabla = document.getElementById("tabla");

    while (true) {

        // Dibujar punto
        plot(x0, y0);

        // Guardar en tabla
        let fila = tabla.insertRow();
        fila.insertCell(0).innerText = x0;
        fila.insertCell(1).innerText = y0;
        fila.insertCell(2).innerText = err;

        // Condición de parada
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


//Convierte coordenadas a canvas (escala + inversión eje Y)
function plotEscalado(ctx, x, y, height) {
    let escala = 5;

    let canvasX = x * escala;
    let canvasY = height - (y * escala);

    ctx.fillRect(canvasX, canvasY, 5, 5);
}


// Dibuja ejes cartesianos con numeración
 
function dibujarEjes(ctx, w, h) {

    ctx.beginPath();

    // Eje X
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);

    // Eje Y
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);

    ctx.stroke();

    // Escala
    for (let i = 0; i < w; i += 50) {
        ctx.fillText(i / 5, i, h - 5);
    }

    for (let i = 0; i < h; i += 50) {
        ctx.fillText(i / 5, 5, h - i);
    }
}
