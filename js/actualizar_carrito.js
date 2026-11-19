// Se actualizan la cantidad de productos

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    if (!contadorCarrito) {
        return;
    }

    const carrito = obtenerCarrito();
    let cantidadTotal = 0;

    carrito.forEach(function (producto) {
        cantidadTotal += producto.cantidad;
    });

    contadorCarrito.textContent = cantidadTotal;
}

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarrito();
});
