function dibujar() {
    console.log("dibujar...");
}

let x0 = parseInt(document.getElementById("x0").value);
let y0 = parseInt(document.getElementById("y0").value);
let x1 = parseInt(document.getElementById("x1").value);
let y1 = parseInt(document.getElementById("y1").value);

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);
