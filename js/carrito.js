// carrito.html



document.addEventListener("DOMContentLoaded", function () {
    const listaCarrito = document.getElementById("lista-carrito");
    const carritoVacio = document.getElementById("carrito-vacio");
    const totalCarrito = document.getElementById("total-carrito");
    const btnVaciarCarrito = document.getElementById("vaciar-carrito");
    const btnFinalizarCompra = document.getElementById("finalizar-compra");
    const mensajeCarrito = document.getElementById("mensaje-carrito");

    function renderizarCarrito() {
        const carrito = obtenerCarrito();
        let totalPrecio = 0;

        listaCarrito.innerHTML = "";
        carritoVacio.style.display = carrito.length === 0 ? "block" : "none";

        carrito.forEach(function (producto) {
            const subtotal = producto.precio * producto.cantidad;
            totalPrecio += subtotal;

            const li = document.createElement("li");
            li.className = "carrito-item";

            const rutaImagen = producto.imagen.startsWith("../")
                ? producto.imagen
                : "../" + producto.imagen;

            li.innerHTML = `
                <img src="${rutaImagen}" alt="${producto.alt || producto.titulo}" class="carrito-item__img" />
                <div class="carrito-item__info">
                    <h2 class="carrito-item__titulo">${producto.titulo}</h2>
                    <p class="carrito-item__precio">
                        Precio unitario: $${producto.precio.toLocaleString("es-AR")} | Subtotal: $${subtotal.toLocaleString("es-AR")}
                    </p>
                </div>
                <div class="carrito-item__controles">
                    <button type="button" class="btn-cantidad btn-restar" data-id="${producto.id}" aria-label="Restar una unidad de ${producto.titulo}">-</button>
                    <span>${producto.cantidad}</span>
                    <button type="button" class="btn-cantidad btn-sumar" data-id="${producto.id}" aria-label="Sumar una unidad de ${producto.titulo}">+</button>
                    <button type="button" class="btn-eliminar" data-id="${producto.id}" aria-label="Eliminar ${producto.titulo} del carrito">Eliminar</button>
                </div>
            `;

            listaCarrito.appendChild(li);
        });

        totalCarrito.textContent = totalPrecio.toLocaleString("es-AR");
    }

    listaCarrito.addEventListener("click", function (event) {
        const id = Number(event.target.getAttribute("data-id"));
        if (!id) {
            return;
        }

        mensajeCarrito.textContent = "";

        if (event.target.classList.contains("btn-sumar")) {
            cambiarCantidadProducto(id, 1);
            renderizarCarrito();
        } else if (event.target.classList.contains("btn-restar")) {
            cambiarCantidadProducto(id, -1);
            renderizarCarrito();
        } else if (event.target.classList.contains("btn-eliminar")) {
            eliminarProductoDelCarrito(id);
            renderizarCarrito();
        }
    });

    btnVaciarCarrito.addEventListener("click", function () {
        vaciarCarritoCompleto();
        renderizarCarrito();
        mensajeCarrito.textContent = "El carrito de compras ha quedado vacio.";
    });

    btnFinalizarCompra.addEventListener("click", function () {
        const carrito = obtenerCarrito();

        if (carrito.length === 0) {
            mensajeCarrito.textContent =
                "Tu carrito está vacío. Favor, Agregá algún rascador.";
            return;
        }

        vaciarCarritoCompleto();
        renderizarCarrito();
        carritoVacio.style.display = "none";
        mensajeCarrito.textContent =
            "¡Gracias por tu compra en MiauShop! Tu pedido ya está en preparación.";
    });

    renderizarCarrito();
});
