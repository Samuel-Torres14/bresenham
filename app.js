function dibujar() {

    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    let canvas = document.getElementById("canvas");

    // Ajustar tamaño real del canvas al contenedor
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let ctx = canvas.getContext("2d");


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "<tr><th>x</th><th>y</th><th>err</th></tr>";

    // 🔥 Escala automática
    let maxX = Math.max(x0, x1) + 10;
    let maxY = Math.max(y0, y1) + 10;

    let escalaX = canvas.width / maxX;
    let escalaY = canvas.height / maxY;

    let escala = Math.min(escalaX, escalaY);

    dibujarCuadricula(ctx, canvas, escala);
    dibujarEjes(ctx, canvas, escala, maxX, maxY);

    // Guardar puntos para línea suave
    let puntos = [];

    bresenham(x0, y0, x1, y1, (x, y) => {

        puntos.push({
            x: x * escala,
            y: canvas.height - (y * escala)
        });

    });

    // 🔥 Dibujar línea suave
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;

    puntos.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    });

    ctx.stroke();
}


/**
 * Cuadrícula gris tenue
 */
function dibujarCuadricula(ctx, canvas, escala) {

    ctx.strokeStyle = "#ddd";

    for (let x = 0; x < canvas.width; x += escala) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += escala) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}


/**
 * Ejes dinámicos con números
 */
function dibujarEjes(ctx, canvas, escala, maxX, maxY) {

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";

    // Eje X
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    // Eje Y
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();

    // Números eje X
    for (let i = 0; i <= maxX; i += 10) {
        ctx.fillText(i, i * escala, canvas.height - 5);
    }

    // Números eje Y
    for (let i = 0; i <= maxY; i += 10) {
        ctx.fillText(i, 5, canvas.height - (i * escala));
    }
}


/**
 * Bresenham + tabla
 */
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
