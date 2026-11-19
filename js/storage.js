//  localStorage


const CLAVE_CARRITO = "carritoMiauShop";

function obtenerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    return JSON.parse(datos) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function vaciarCarritoStorage() {
    localStorage.removeItem(CLAVE_CARRITO);
}
