const barraAviso = document.getElementById("barra-aviso");
const botonCerrarAviso = document.querySelector("#barra-aviso .boton-cerrar");
const encabezado = document.getElementById("encabezado");
const botonSubir = document.getElementById("botonSubir");
const rutaBaseProyecto = window.location.pathname.includes("/pages/") ? "../" : "";

const botonesEncabezado = Array.from(
  document.querySelectorAll(".derecha-encabezado .icono-encabezado"),
);

const botonUsuario = botonesEncabezado[0];
const botonCarrito = botonesEncabezado[1];
const botonMenu =
  botonesEncabezado.find((boton) =>
    boton.textContent.trim().toUpperCase().includes("MENÚ"),
  ) || botonesEncabezado[2];

let avisoCerrado = false;

function cerrarAviso() {
  if (!barraAviso) return;

  avisoCerrado = true;
  barraAviso.style.height = "0";
  barraAviso.style.overflow = "hidden";
  barraAviso.style.transition = "height 0.3s ease";

  document.documentElement.style.setProperty("--alto-aviso", "0px");
  actualizarEncabezado();
}

function obtenerAltoAvisoVisible() {
  if (!barraAviso || avisoCerrado) return 0;

  const rectangulo = barraAviso.getBoundingClientRect();
  return Math.min(rectangulo.height, Math.max(0, rectangulo.bottom));
}

function actualizarEncabezado() {
  const desplazamientoY = window.scrollY || window.pageYOffset;
  const altoAvisoVisible = obtenerAltoAvisoVisible();

  if (encabezado) {
    encabezado.style.top = `${altoAvisoVisible}px`;
    encabezado.classList.toggle("aviso-oculto", altoAvisoVisible === 0);
    encabezado.classList.toggle("con-scroll", desplazamientoY > 60);
  }

  if (botonSubir) {
    botonSubir.classList.toggle("visible", desplazamientoY > 400);
  }
}

botonCerrarAviso?.addEventListener("click", cerrarAviso);

window.addEventListener("scroll", actualizarEncabezado, { passive: true });
window.addEventListener("resize", actualizarEncabezado);
window.addEventListener("load", actualizarEncabezado);
actualizarEncabezado();

botonSubir?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const elementosRevelables = document.querySelectorAll(".revelar");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elementosRevelables.forEach((el) => observador.observe(el));
} else {
  elementosRevelables.forEach((el) => el.classList.add("visible"));
}

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function desplazarAElemento(elemento) {
  if (!elemento) return;

  const altoHeader = encabezado ? encabezado.offsetHeight : 0;
  const posicion =
    elemento.getBoundingClientRect().top + window.pageYOffset - altoHeader - 16;

  window.scrollTo({
    top: posicion,
    behavior: "smooth",
  });
}

function obtenerSeccionPorTexto(textoBuscado) {
  const secciones = Array.from(
    document.querySelectorAll(".seccion-ancho-completo"),
  );

  return secciones.find((seccion) =>
    normalizarTexto(seccion.textContent).includes(
      normalizarTexto(textoBuscado),
    ),
  );
}

function obtenerDestinoMenu(destino) {
  const destinos = {
    productos: document.querySelector(".seccion-productos"),
    mujer: obtenerSeccionPorTexto("ropa femenina"),
    hombre: obtenerSeccionPorTexto("ropa masculina"),
    accesorios: obtenerSeccionPorTexto("accesorios"),
    servicios: document.querySelector(".seccion-servicios"),
    footer: document.querySelector("footer"),
  };

  return destinos[destino] || document.querySelector(".seccion-productos");
}

function crearMenuDesplegable() {
  if (document.getElementById("menuDesplegable")) return;

  const menu = document.createElement("aside");
  menu.id = "menuDesplegable";
  menu.setAttribute("aria-hidden", "true");

  menu.innerHTML = `
    <div class="menu-imagen-js">
      <div class="menu-logo-js">
        <img src="landingpage/images/remainders_white.svg" alt="Remainders">
      </div>
      <img src="landingpage/images/tarjetamujer.png" alt="Colección Remainders">
    </div>
    <div class="menu-contenido-js">
      <div>
        <div class="menu-superior-js">
          <p>Envíos a: <strong>Colombia</strong> • <strong>ES</strong></p>
          <button class="boton-cerrar-menu-js" id="botonCerrarMenu" aria-label="Cerrar menú">×</button>
        </div>

        <div class="menu-columnas-js">
          <div class="menu-columna-js">
            <button class="enlace-menu-js activo" data-menu-destino="mujer">
              WOMEN <span>→</span>
            </button>
            <button class="enlace-menu-js" data-menu-destino="hombre">MEN</button>
            <button class="enlace-menu-js" data-menu-destino="accesorios">ACCESORIOS</button>
            <button class="enlace-menu-js" data-menu-destino="productos">PRODUCTOS</button>
            <button class="enlace-menu-js" data-menu-destino="servicios">SERVICIOS</button>
          </div>

          <div class="menu-columna-js">
            <button class="enlace-menu-js activo" data-menu-destino="productos">
              Nuevo <span>→</span>
            </button>
            <button class="enlace-menu-js" data-menu-destino="mujer">Ropa femenina</button>
            <button class="enlace-menu-js" data-menu-destino="hombre">Ropa masculina</button>
            <button class="enlace-menu-js" data-menu-destino="accesorios">Accesorios</button>
          </div>

          <div>
            <div class="menu-bloque-js">
              <p class="menu-subtitulo-js">Destacados</p>
              <button class="menu-link-pequeno-js" data-menu-destino="productos">Nueva temporada</button>
              <button class="menu-link-pequeno-js" data-menu-destino="mujer">Colección femenina</button>
            </div>

            <div class="menu-bloque-js">
              <p class="menu-subtitulo-js">Comprar por</p>
              <button class="menu-link-pequeno-js" data-menu-destino="accesorios">Accesorios</button>
              <button class="menu-link-pequeno-js" data-menu-destino="productos">Gafas</button>
              <button class="menu-link-pequeno-js" data-menu-destino="hombre">Hombre</button>
              <button class="menu-link-pequeno-js" data-menu-destino="mujer">Mujer</button>
            </div>
          </div>
        </div>
      </div>

      <div class="menu-inferior-js">
        <button data-menu-destino="servicios">Servicio al cliente</button>
        <button data-menu-destino="footer">Localizador de tiendas</button>
        <button data-menu-destino="footer">Solicitar una cita</button>
      </div>
    </div>
  `;

  document.body.appendChild(menu);
}

crearMenuDesplegable();

const menuDesplegable = document.getElementById("menuDesplegable");
const botonCerrarMenu = document.getElementById("botonCerrarMenu");

function abrirMenu() {
  if (!menuDesplegable) return;

  document.body.classList.add("menu-abierto");
  menuDesplegable.setAttribute("aria-hidden", "false");
  botonMenu?.setAttribute("aria-expanded", "true");
}

function cerrarMenu() {
  if (!menuDesplegable) return;

  document.body.classList.remove("menu-abierto");
  menuDesplegable.setAttribute("aria-hidden", "true");
  botonMenu?.setAttribute("aria-expanded", "false");
}

botonMenu?.setAttribute("aria-label", "Abrir menú");
botonMenu?.setAttribute("aria-expanded", "false");
botonMenu?.addEventListener("click", abrirMenu);

botonCerrarMenu?.addEventListener("click", cerrarMenu);

menuDesplegable?.addEventListener("click", (evento) => {
  const botonDestino = evento.target.closest("[data-menu-destino]");
  if (!botonDestino) return;

  const destino = botonDestino.dataset.menuDestino;
  const elementoDestino = obtenerDestinoMenu(destino);

  cerrarMenu();

  setTimeout(() => {
    desplazarAElemento(elementoDestino);
  }, 350);
});

const inputBusqueda = document.querySelector(".busqueda-encabezado input");
const grillaProductos = document.querySelector(".grilla-productos");
const tarjetasProducto = Array.from(
  document.querySelectorAll(".tarjeta-producto"),
);

function crearMensajeBusqueda() {
  if (!grillaProductos) return null;

  let mensaje = document.querySelector(".mensaje-busqueda-js");

  if (!mensaje) {
    mensaje = document.createElement("p");
    mensaje.className = "mensaje-busqueda-js";
    mensaje.textContent = "No encontramos productos con esa búsqueda.";
    grillaProductos.insertAdjacentElement("afterend", mensaje);
  }

  return mensaje;
}

const mensajeBusqueda = crearMensajeBusqueda();

function filtrarProductos() {
  if (!inputBusqueda) return;

  const busqueda = normalizarTexto(inputBusqueda.value);
  let productosVisibles = 0;

  tarjetasProducto.forEach((tarjeta) => {
    const contenido = normalizarTexto(tarjeta.textContent);
    const coincide = busqueda === "" || contenido.includes(busqueda);

    tarjeta.classList.toggle("oculto-busqueda-js", !coincide);

    if (coincide) productosVisibles++;
  });

  if (mensajeBusqueda) {
    mensajeBusqueda.style.display =
      busqueda !== "" && productosVisibles === 0 ? "block" : "none";
  }
}

inputBusqueda?.addEventListener("input", filtrarProductos);

inputBusqueda?.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    desplazarAElemento(document.querySelector(".seccion-productos"));
  }
});

const CLAVE_CARRITO = "carritoRemainders";

function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
  } catch {
    return [];
  }
}

let carrito = cargarCarrito();

function guardarCarrito() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function convertirPrecioANumero(precioTexto) {
  return Number(String(precioTexto).replace(/[^\d]/g, "")) || 0;
}

function formatearCOP(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

function obtenerProductoDesdeTarjeta(tarjeta) {
  const nombre =
    tarjeta.querySelector(".nombre-producto")?.textContent.trim() || "Producto";
  const marca =
    tarjeta.querySelector(".marca-producto")?.textContent.trim() || "";
  const precioTexto =
    tarjeta.querySelector(".precio-producto")?.textContent.trim() || "$0";
  const precio = convertirPrecioANumero(precioTexto);
  const imagen =
    tarjeta.querySelector(".imagen-gafas")?.getAttribute("src") ||
    tarjeta.querySelector("img")?.getAttribute("src") ||
    "";

  return {
    id: normalizarTexto(`${nombre}-${marca}`),
    nombre,
    marca,
    precio,
    precioTexto,
    imagen,
    cantidad: 1,
  };
}

function crearPanelCarrito() {
  if (document.getElementById("panelCarrito")) return;

  const fondo = document.createElement("div");
  fondo.className = "fondo-carrito-js";
  fondo.id = "fondoCarrito";

  const panel = document.createElement("aside");
  panel.id = "panelCarrito";
  panel.setAttribute("aria-hidden", "true");

  panel.innerHTML = `
    <div class="carrito-superior-js">
      <h2>Carrito</h2>
      <button class="boton-cerrar-carrito-js" id="botonCerrarCarrito" aria-label="Cerrar carrito">×</button>
    </div>

    <div class="lista-carrito-js" id="listaCarrito"></div>

    <div class="carrito-inferior-js">
      <div class="total-carrito-js">
        <span>Total</span>
        <strong id="totalCarrito">$0</strong>
      </div>
      <button class="boton-finalizar-js" id="botonFinalizarCompra">Finalizar compra</button>
      <button class="boton-vaciar-js" id="botonVaciarCarrito">Vaciar carrito</button>
    </div>
  `;

  document.body.appendChild(fondo);
  document.body.appendChild(panel);
}

crearPanelCarrito();

const panelCarrito = document.getElementById("panelCarrito");
const fondoCarrito = document.getElementById("fondoCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const botonCerrarCarrito = document.getElementById("botonCerrarCarrito");
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");

function crearContadorCarrito() {
  if (!botonCarrito || botonCarrito.querySelector(".contador-carrito-js"))
    return;

  const contador = document.createElement("span");
  contador.className = "contador-carrito-js";
  contador.textContent = "0";
  botonCarrito.appendChild(contador);
}

crearContadorCarrito();

function actualizarContadorCarrito() {
  const contador = botonCarrito?.querySelector(".contador-carrito-js");
  if (!contador) return;

  const totalCantidad = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  contador.textContent = totalCantidad;
  contador.classList.toggle("visible", totalCantidad > 0);
}

function actualizarCarrito() {
  if (!listaCarrito || !totalCarrito) return;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <p class="carrito-vacio-js">
        Tu carrito está vacío. Agrega productos desde la sección principal.
      </p>
    `;
  } else {
    listaCarrito.innerHTML = carrito
      .map((item, index) => {
        return `
          <div class="item-carrito-js">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="item-carrito-info-js">
              <h3>${item.nombre}</h3>
              <p>${item.marca}</p>
              <p>${formatearCOP(item.precio)}</p>

              <div class="item-carrito-acciones-js">
                <button data-carrito-accion="restar" data-index="${index}">−</button>
                <span>${item.cantidad}</span>
                <button data-carrito-accion="sumar" data-index="${index}">+</button>
                <button class="eliminar-carrito-js" data-carrito-accion="eliminar" data-index="${index}">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  const total = carrito.reduce(
    (acumulado, item) => acumulado + item.precio * item.cantidad,
    0,
  );

  totalCarrito.textContent = formatearCOP(total);
  actualizarContadorCarrito();
  guardarCarrito();
}

function agregarAlCarrito(producto) {
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push(producto);
  }

  actualizarCarrito();
  mostrarToast(`${producto.nombre} agregado al carrito`);
}

function prepararBotonesAgregarCarrito() {
  tarjetasProducto.forEach((tarjeta) => {
    if (tarjeta.querySelector(".boton-agregar-carrito-js")) return;

    const infoProducto = tarjeta.querySelector(".info-producto");
    if (!infoProducto) return;

    const botonAgregar = document.createElement("button");
    botonAgregar.className = "boton-agregar-carrito-js";
    botonAgregar.type = "button";
    botonAgregar.textContent = "Agregar al carrito";

    botonAgregar.addEventListener("click", (evento) => {
      evento.stopPropagation();

      const producto = obtenerProductoDesdeTarjeta(tarjeta);
      agregarAlCarrito(producto);
    });

    infoProducto.appendChild(botonAgregar);
  });
}

function abrirCarrito() {
  document.body.classList.add("carrito-abierto");
  panelCarrito?.setAttribute("aria-hidden", "false");
  actualizarCarrito();
}

function cerrarCarrito() {
  document.body.classList.remove("carrito-abierto");
  panelCarrito?.setAttribute("aria-hidden", "true");
}

botonCarrito?.setAttribute("aria-label", "Abrir carrito");
botonCarrito?.addEventListener("click", abrirCarrito);
botonCerrarCarrito?.addEventListener("click", cerrarCarrito);
fondoCarrito?.addEventListener("click", cerrarCarrito);

listaCarrito?.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-carrito-accion]");
  if (!boton) return;

  const index = Number(boton.dataset.index);
  const accion = boton.dataset.carritoAccion;

  if (!carrito[index]) return;

  if (accion === "sumar") {
    carrito[index].cantidad += 1;
  }

  if (accion === "restar") {
    carrito[index].cantidad -= 1;

    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }
  }

  if (accion === "eliminar") {
    carrito.splice(index, 1);
  }

  actualizarCarrito();
});

botonVaciarCarrito?.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
  mostrarToast("Carrito vacío");
});

botonFinalizarCompra?.addEventListener("click", () => {
  if (carrito.length === 0) {
    mostrarToast("Tu carrito está vacío");
    return;
  }

  mostrarToast("Compra simulada correctamente");
});

prepararBotonesAgregarCarrito();
actualizarCarrito();

function crearModalGeneral() {
  if (document.getElementById("modalGeneral")) return;

  const modal = document.createElement("div");
  modal.id = "modalGeneral";
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div class="modal-caja-js">
      <button class="boton-cerrar-modal-js" id="botonCerrarModal" aria-label="Cerrar modal">×</button>
      <h2 class="titulo-modal-js" id="tituloModal"></h2>
      <div id="contenidoModal"></div>
    </div>
  `;

  document.body.appendChild(modal);
}

crearModalGeneral();

const modalGeneral = document.getElementById("modalGeneral");
const tituloModal = document.getElementById("tituloModal");
const contenidoModal = document.getElementById("contenidoModal");
const botonCerrarModal = document.getElementById("botonCerrarModal");

function abrirModal(titulo, contenido) {
  if (!modalGeneral || !tituloModal || !contenidoModal) return;

  tituloModal.textContent = titulo;
  contenidoModal.innerHTML = contenido;

  document.body.classList.add("modal-abierto");
  modalGeneral.setAttribute("aria-hidden", "false");
}

function cerrarModal() {
  document.body.classList.remove("modal-abierto");
  modalGeneral?.setAttribute("aria-hidden", "true");
}

botonCerrarModal?.addEventListener("click", cerrarModal);

modalGeneral?.addEventListener("click", (evento) => {
  if (evento.target === modalGeneral) cerrarModal();
});

botonUsuario?.setAttribute("aria-label", "Abrir usuario");
botonUsuario?.addEventListener("click", () => {
  abrirModal(
    "Mi cuenta",
    `
      <p class="texto-modal-js">
        Ingresa tus datos para simular el acceso de usuario dentro del proyecto.
      </p>

      <form class="formulario-js" id="formUsuario">
        <input type="email" name="correo" placeholder="Correo electrónico" required>
        <input type="password" name="clave" placeholder="Contraseña" required>
        <button type="submit">Ingresar</button>
      </form>
    `,
  );
});

const enlaceBoletin = document.querySelector(".enlace-boletin-pie");

enlaceBoletin?.addEventListener("click", (evento) => {
  evento.preventDefault();

  abrirModal(
    "Boletín",
    `
      <p class="texto-modal-js">
        Suscríbete para recibir novedades, lanzamientos y actualizaciones de temporada.
      </p>

      <form class="formulario-js" id="formBoletin">
        <input type="email" name="correo" placeholder="Tu correo electrónico" required>
        <button type="submit">Suscribirme</button>
      </form>
    `,
  );
});

document.querySelectorAll(".enlace-servicio").forEach((enlace) => {
  enlace.addEventListener("click", (evento) => {
    evento.preventDefault();

    abrirModal(
      enlace.textContent.replace("→", "").trim(),
      `
        <p class="texto-modal-js">
          Esta sección está activa como interacción del proyecto. Aquí podrías mostrar
          más información del servicio seleccionado, horarios, condiciones o un formulario.
        </p>
      `,
    );
  });
});

modalGeneral?.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const formulario = evento.target;
  const datos = new FormData(formulario);
  const correo = datos.get("correo");

  if (formulario.id === "formUsuario") {
    cerrarModal();
    mostrarToast(`Sesión simulada para ${correo}`);
  }

  if (formulario.id === "formBoletin") {
    localStorage.setItem("boletinRemainders", correo);
    cerrarModal();
    mostrarToast("Suscripción guardada correctamente");
  }
});

document
  .querySelectorAll("a.boton-principal, a.boton-contorno-blanco")
  .forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      if (enlace.getAttribute("href") !== "#") return;

      evento.preventDefault();

      const texto = normalizarTexto(enlace.textContent);
      let destino = document.querySelector(".seccion-productos");

      if (texto.includes("mujer")) {
        destino = obtenerDestinoMenu("mujer");
      } else if (texto.includes("hombre")) {
        destino = obtenerDestinoMenu("hombre");
      } else if (texto.includes("accesorio")) {
        destino = obtenerDestinoMenu("accesorios");
      }

      desplazarAElemento(destino);
    });
  });

document.querySelectorAll("#barra-aviso a").forEach((enlace) => {
  enlace.addEventListener("click", (evento) => {
    evento.preventDefault();

    const texto = normalizarTexto(enlace.textContent);
    const destino = texto.includes("hombre")
      ? obtenerDestinoMenu("hombre")
      : obtenerDestinoMenu("mujer");

    desplazarAElemento(destino);
  });
});

const videoHero = document.querySelector(".hero-video");
const controlesHero = document.querySelector(".hero-controls");

function actualizarBotonesVideo() {
  const botonPausa = document.getElementById("botonPausarVideo");
  const botonSonido = document.getElementById("botonSonidoVideo");

  if (!videoHero || !botonPausa || !botonSonido) return;

  botonPausa.textContent = videoHero.paused ? "▶" : "Ⅱ";
  botonPausa.setAttribute(
    "aria-label",
    videoHero.paused ? "Reproducir video" : "Pausar video",
  );

  botonSonido.textContent = videoHero.muted ? "🔇" : "🔊";
  botonSonido.setAttribute(
    "aria-label",
    videoHero.muted ? "Activar sonido" : "Silenciar video",
  );
}

if (videoHero && controlesHero) {
  controlesHero.innerHTML = `
    <button class="boton-video-js" id="botonPausarVideo" type="button" aria-label="Pausar video">Ⅱ</button>
    <button class="boton-video-js" id="botonSonidoVideo" type="button" aria-label="Activar sonido">🔇</button>
  `;

  const botonPausarVideo = document.getElementById("botonPausarVideo");
  const botonSonidoVideo = document.getElementById("botonSonidoVideo");

  botonPausarVideo?.addEventListener("click", () => {
    if (videoHero.paused) {
      videoHero.play();
    } else {
      videoHero.pause();
    }

    actualizarBotonesVideo();
  });

  botonSonidoVideo?.addEventListener("click", () => {
    videoHero.muted = !videoHero.muted;
    actualizarBotonesVideo();
  });

  actualizarBotonesVideo();
}

function crearToast() {
  if (document.querySelector(".toast-js")) return;

  const toast = document.createElement("div");
  toast.className = "toast-js";
  document.body.appendChild(toast);
}

crearToast();

let temporizadorToast;

function mostrarToast(mensaje) {
  const toast = document.querySelector(".toast-js");
  if (!toast) return;

  clearTimeout(temporizadorToast);

  toast.textContent = mensaje;
  toast.classList.add("visible");

  temporizadorToast = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

document.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape") return;

  cerrarMenu();
  cerrarCarrito();
  cerrarModal();
});