const CLAVE_CARRITO = "carritoRemainders";

function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function formatearCOP(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

function agregarProductoAlCarrito(producto) {
  const carrito = cargarCarrito();

  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca || "",
      precio: Number(producto.precio),
      imagen: producto.imagen || "",
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
  mostrarMensajeCarrito(`${producto.nombre} agregado al carrito`);
}

function eliminarProductoCarrito(id) {
  let carrito = cargarCarrito();
  carrito = carrito.filter((item) => item.id !== id);

  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarContadorCarrito();
}

function sumarProductoCarrito(id) {
  const carrito = cargarCarrito();

  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad += 1;
  }

  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarContadorCarrito();
}

function restarProductoCarrito(id) {
  let carrito = cargarCarrito();

  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad -= 1;
  }

  carrito = carrito.filter((item) => item.cantidad > 0);

  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarContadorCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
  renderizarCarrito();
  actualizarContadorCarrito();
}

function contarProductosCarrito() {
  const carrito = cargarCarrito();

  return carrito.reduce((total, producto) => {
    return total + producto.cantidad;
  }, 0);
}

function actualizarContadorCarrito() {
  const contador = document.querySelector(".contador-carrito-js");

  if (!contador) return;

  const cantidad = contarProductosCarrito();

  contador.textContent = cantidad;
  contador.classList.toggle("visible", cantidad > 0);
}

function crearContadorCarrito() {
  const botonesEncabezado = Array.from(
    document.querySelectorAll(".derecha-encabezado .icono-encabezado"),
  );

  const botonCarrito = botonesEncabezado[1];

  if (!botonCarrito) return;
  if (botonCarrito.querySelector(".contador-carrito-js")) return;

  const contador = document.createElement("span");
  contador.className = "contador-carrito-js";
  contador.textContent = "0";

  botonCarrito.appendChild(contador);
}

function crearPanelCarrito() {
  if (document.getElementById("panelCarrito")) return;

  const fondo = document.createElement("div");
  fondo.className = "fondo-carrito-js";
  fondo.id = "fondoCarrito";

  const panel = document.createElement("aside");
  panel.id = "panelCarrito";

  panel.innerHTML = `
    <div class="carrito-superior-js">
      <h2>Carrito</h2>
      <button class="boton-cerrar-carrito-js" id="botonCerrarCarrito">×</button>
    </div>

    <div class="lista-carrito-js" id="listaCarrito"></div>

    <div class="carrito-inferior-js">
      <div class="total-carrito-js">
        <span>Total</span>
        <strong id="totalCarrito">$0</strong>
      </div>

      <button class="boton-finalizar-js" id="botonFinalizarCompra">
        Finalizar compra
      </button>

      <button class="boton-vaciar-js" id="botonVaciarCarrito">
        Vaciar carrito
      </button>
    </div>
  `;

  document.body.appendChild(fondo);
  document.body.appendChild(panel);

  document
    .getElementById("fondoCarrito")
    ?.addEventListener("click", cerrarCarrito);
  document
    .getElementById("botonCerrarCarrito")
    ?.addEventListener("click", cerrarCarrito);
  document
    .getElementById("botonVaciarCarrito")
    ?.addEventListener("click", vaciarCarrito);

  document
    .getElementById("botonFinalizarCompra")
    ?.addEventListener("click", () => {
      const carrito = cargarCarrito();

      if (carrito.length === 0) {
        mostrarMensajeCarrito("Tu carrito está vacío");
        return;
      }

      mostrarMensajeCarrito("Compra simulada correctamente");
    });
}

function abrirCarrito() {
  document.body.classList.add("carrito-abierto");
  renderizarCarrito();
}

function cerrarCarrito() {
  document.body.classList.remove("carrito-abierto");
}

function renderizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarrito = document.getElementById("totalCarrito");

  if (!listaCarrito || !totalCarrito) return;

  const carrito = cargarCarrito();

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <p class="carrito-vacio-js">
        Tu carrito está vacío.
      </p>
    `;

    totalCarrito.textContent = formatearCOP(0);
    return;
  }

  listaCarrito.innerHTML = carrito
    .map((producto) => {
      return `
      <div class="item-carrito-js">
        <img src="${producto.imagen}" alt="${producto.nombre}">

        <div class="item-carrito-info-js">
          <h3>${producto.nombre}</h3>
          <p>${producto.marca}</p>
          <p>${formatearCOP(producto.precio)}</p>

          <div class="item-carrito-acciones-js">
            <button data-restar-carrito="${producto.id}">−</button>
            <span>${producto.cantidad}</span>
            <button data-sumar-carrito="${producto.id}">+</button>
            <button class="eliminar-carrito-js" data-eliminar-carrito="${producto.id}">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  const total = carrito.reduce((acumulado, producto) => {
    return acumulado + producto.precio * producto.cantidad;
  }, 0);

  totalCarrito.textContent = formatearCOP(total);
}

function crearToastCarrito() {
  if (document.querySelector(".toast-js")) return;

  const toast = document.createElement("div");
  toast.className = "toast-js";

  document.body.appendChild(toast);
}

let temporizadorToast;

function mostrarMensajeCarrito(mensaje) {
  const toast = document.querySelector(".toast-js");

  if (!toast) return;

  clearTimeout(temporizadorToast);

  toast.textContent = mensaje;
  toast.classList.add("visible");

  temporizadorToast = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2500);
}

document.addEventListener("click", (evento) => {
  const botonAgregar = evento.target.closest("[data-agregar-carrito]");
  const botonSumar = evento.target.closest("[data-sumar-carrito]");
  const botonRestar = evento.target.closest("[data-restar-carrito]");
  const botonEliminar = evento.target.closest("[data-eliminar-carrito]");

  if (botonAgregar) {
    const producto = {
      id: botonAgregar.dataset.id,
      nombre: botonAgregar.dataset.nombre,
      marca: botonAgregar.dataset.marca,
      precio: botonAgregar.dataset.precio,
      imagen: botonAgregar.dataset.imagen,
    };

    agregarProductoAlCarrito(producto);
  }

  if (botonSumar) {
    sumarProductoCarrito(botonSumar.dataset.sumarCarrito);
  }

  if (botonRestar) {
    restarProductoCarrito(botonRestar.dataset.restarCarrito);
  }

  if (botonEliminar) {
    eliminarProductoCarrito(botonEliminar.dataset.eliminarCarrito);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  crearContadorCarrito();
  crearPanelCarrito();
  crearToastCarrito();
  actualizarContadorCarrito();

  const botonesEncabezado = Array.from(
    document.querySelectorAll(".derecha-encabezado .icono-encabezado"),
  );

  const botonCarrito = botonesEncabezado[1];

  botonCarrito?.addEventListener("click", abrirCarrito);
});
