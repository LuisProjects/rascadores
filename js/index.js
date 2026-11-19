// Toma los productos del json


document.addEventListener("DOMContentLoaded", function () {
    const contenedorProductos = document.getElementById("productos-container");
    const mensajeProductos = document.getElementById("mensaje-productos");
    let productosDisponibles = [];

    async function cargarProductos() {
        try {
            const respuesta = await fetch("data/productos.json");

            if (!respuesta.ok) {
                throw new Error("Error al cargar el catálogo: " + respuesta.status);
            }

            const data = await respuesta.json();
            productosDisponibles = data;

            if (mensajeProductos) {
                mensajeProductos.textContent = "";
            }

            data.forEach(function (producto) {
                const card = document.createElement("article");
                card.className = "card text-dark";

                card.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.alt}" />
                    <h3>${producto.titulo}</h3>
                    <p>${producto.descripcion}</p>
                    <p>$ ${producto.precio.toLocaleString("es-AR")}</p>
                    <button type="button" class="btn bg-secondary text-dark card-producto__btn" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                `;

                contenedorProductos.appendChild(card);
            });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            if (mensajeProductos) {
                mensajeProductos.textContent =
                    "Hubo un problema al cargar los productos. Por favor, intentá recargar la página.";
                mensajeProductos.classList.add("mensaje-productos--error");
            }
        }
    }

    if (contenedorProductos) {
        cargarProductos();

        contenedorProductos.addEventListener("click", function (event) {
            const boton = event.target.closest(".card-producto__btn");
            if (!boton) {
                return;
            }

            const idProducto = Number(boton.getAttribute("data-id"));
            const productoElegido = productosDisponibles.find(function (item) {
                return item.id === idProducto;
            });

            if (productoElegido) {
                agregarAlCarrito(productoElegido);
            }
        });
    }
});
