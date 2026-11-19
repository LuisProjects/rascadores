// Agregar rascador al carrito


function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const productoExistente = carrito.find(function (item) {
        return item.id === producto.id;
    });

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            imagen: producto.imagen,
            alt: producto.alt,
            cantidad: 1,
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();

    alert("** Has agregado " + producto.titulo + " al carrito **");
}

function cambiarCantidadProducto(idProducto, cambio) {
    let carrito = obtenerCarrito();

    carrito.forEach(function (item) {
        if (item.id === idProducto) {
            item.cantidad += cambio;
        }
    });

    carrito = carrito.filter(function (item) {
        return item.cantidad > 0;
    });

    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

function eliminarProductoDelCarrito(idProducto) {
    const carrito = obtenerCarrito();
    const carritoActualizado = carrito.filter(function (item) {
        return item.id !== idProducto;
    });

    guardarCarrito(carritoActualizado);
    actualizarContadorCarrito();
}

function vaciarCarritoCompleto() {
    vaciarCarritoStorage();
    actualizarContadorCarrito();
}
