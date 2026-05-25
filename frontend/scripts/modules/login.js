
// Almacena el historial de intentos fallidos de login en la sesión actual
const sesiones = [];

// Lista de usuarios válidos para autenticación
const usuarios = [
  { email: "prueba@correo.com", password: "123456" },
  { email: "admin@denim.com", password: "admin123" },
  { email: "test@gmail.com", password: "abcdef" },
];


// Elementos del formulario de login
const formulario = document.querySelector("form");
const inputUsuario = document.getElementById("username");
const inputPassword = document.getElementById("password");
const checkRecordar = document.getElementById("recordar");
const checkNotificaciones = document.getElementById("notificaciones");
const botonEnviar = document.querySelector('button[type="submit"]');
const btnLimpiar = document.querySelector('button[type="reset"]');

// Elementos del menú móvil
const botonMenu = document.getElementById("menu-toggle");
const menuMovil = document.getElementById("mobileMenu");

// Constante de seguridad
const MAX_INTENTOS = 3;

// ===== CREACIÓN DE ELEMENTOS DINÁMICOS =====
// Contenedor para mostrar el historial de intentos
const areaResultados = document.createElement("div");
areaResultados.id = "area-resultados";
areaResultados.className = "mt-6 space-y-3";
document.getElementById("formulario").appendChild(areaResultados);

// Contador visual de intentos de sesión
const contadorDiv = document.createElement("div");
contadorDiv.id = "contador-sesiones";
contadorDiv.className = "text-sm text-archi-blue/80 text-center mt-2 font-medium";
document.getElementById("formulario").appendChild(contadorDiv);


// Controla si el botón de envío está habilitado o bloqueado según intentos
function actualizarEstadoBoton() {
  const bloqueado = sesiones.length >= MAX_INTENTOS;

  if (!botonEnviar) return;

  botonEnviar.disabled = bloqueado;
  botonEnviar.classList.toggle("opacity-60", bloqueado);
  botonEnviar.classList.toggle("cursor-not-allowed", bloqueado);
  botonEnviar.textContent = bloqueado ? "Límite alcanzado" : "Iniciar sesión";
}

// Crea elementos visuales de mensajes de error o éxito
function crearMensaje(texto, tipo) {
  const mensaje = document.createElement("div");
  mensaje.className =
    tipo === "error"
      ? "p-3 rounded-lg border-2 border-red-300 bg-red-50 text-red-700 text-sm font-medium"
      : "p-3 rounded-lg border-2 border-green-300 bg-green-50 text-green-700 text-sm font-medium";
  mensaje.textContent = texto;
  return mensaje;
}

// Actualiza el texto del contador de intentos en el formulario
function actualizarContador() {
  const total = sesiones.length;
  contadorDiv.textContent =
    total === 0 ? "" : `Intentos de inicio de sesión en esta sesión: ${total}`;
}


// Genera y muestra la tarjeta con el historial de intentos de login
function renderizarHistorial() {
  areaResultados.innerHTML = "";

  if (sesiones.length === 0) return;

  const tarjeta = document.createElement("section");
  tarjeta.className =
    "rounded-2xl border border-archi-blue/10 bg-white shadow-[0_10px_30px_rgba(38,64,139,0.08)] overflow-hidden";

  const cabecera = document.createElement("div");
  cabecera.className =
    "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-4 border-b border-archi-blue/10 bg-gradient-to-r from-archi-cyan/20 to-transparent";

  const titulo = document.createElement("h4");
  titulo.className = "text-archi-blue font-semibold text-base";
  titulo.textContent = "Historial de intentos";

  const estado = document.createElement("span");
  estado.className =
    "inline-flex w-fit items-center rounded-full border border-archi-blue/15 bg-white px-3 py-1 text-xs font-semibold text-archi-blue";
  estado.textContent = `${sesiones.length}/${MAX_INTENTOS} intentos usados`;

  cabecera.appendChild(titulo);
  cabecera.appendChild(estado);

  const lista = document.createElement("ul");
  lista.className = "divide-y divide-archi-blue/10";

  sesiones.slice(-MAX_INTENTOS).forEach(function (sesion, indice) {
    const item = document.createElement("li");
    item.className = "px-4 py-4 hover:bg-archi-blue/5 transition-colors";

    const fila = document.createElement("div");
    fila.className = "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";

    const bloqueIzquierdo = document.createElement("div");
    bloqueIzquierdo.className = "flex items-center gap-3 min-w-0";

    const numero = document.createElement("div");
    numero.className =
      "w-10 h-10 rounded-full bg-archi-blue text-archi-beige flex items-center justify-center font-semibold flex-shrink-0";
    numero.textContent = indice + 1;

    const infoSpan = document.createElement("span");
    infoSpan.className = "truncate text-sm font-medium text-gray-700";
    infoSpan.textContent = sesion.usuario;

    const meta = document.createElement("p");
    meta.className = "text-xs text-gray-500 mt-0.5";
    meta.textContent = "Intento registrado en esta sesión";

    const infoCaja = document.createElement("div");
    infoCaja.className = "min-w-0";
    infoCaja.appendChild(infoSpan);
    infoCaja.appendChild(meta);

    bloqueIzquierdo.appendChild(numero);
    bloqueIzquierdo.appendChild(infoCaja);

    const estadoSpan = document.createElement("span");
    estadoSpan.className = sesion.exitoso
      ? "inline-flex items-center justify-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200"
      : "inline-flex items-center justify-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200";
    estadoSpan.textContent = sesion.exitoso ? "Exitoso" : "Fallido";

    const horaSpan = document.createElement("span");
    horaSpan.className = "text-xs text-gray-500 sm:text-right";
    horaSpan.textContent = sesion.hora;

    const bloqueDerecho = document.createElement("div");
    bloqueDerecho.className = "flex flex-wrap items-center gap-2 sm:justify-end";
    bloqueDerecho.appendChild(estadoSpan);
    bloqueDerecho.appendChild(horaSpan);

    fila.appendChild(bloqueIzquierdo);
    fila.appendChild(bloqueDerecho);
    item.appendChild(fila);
    lista.appendChild(item);
  });

  tarjeta.appendChild(cabecera);
  tarjeta.appendChild(lista);
  areaResultados.appendChild(tarjeta);
}

// Filtra y retorna solo los intentos de login fallidos
function buscarSesionesFallidas() {
  const fallidas = sesiones.filter(function (s) {
    return !s.exitoso;
  });
  return fallidas;
}


// Valida credenciales y procesa el envío del formulario de login
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (sesiones.length >= MAX_INTENTOS) {
    const bloqueo = crearMensaje(
      "Has alcanzado el máximo de 3 intentos. La opción de inicio de sesión quedó bloqueada.",
      "error",
    );
    bloqueo.classList.add("mensaje-validacion");
    formulario.appendChild(bloqueo);
    actualizarEstadoBoton();
    return;
  }

  const usuario = inputUsuario.value.trim();
  const password = inputPassword.value.trim();
  const hora = new Date().toLocaleTimeString("es-CO");

  const mensajesAnteriores = formulario.querySelectorAll(".mensaje-validacion");
  mensajesAnteriores.forEach(function (m) {
    m.remove();
  });

  if (!usuario || !password) {
    const error = crearMensaje(
      "Por favor completa todos los campos antes de continuar.",
      "error",
    );
    error.classList.add("mensaje-validacion");
    formulario.appendChild(error);
    return;
  }

  const exitoso = usuarios.some(function (u) {
    return u.email === usuario && u.password === password;
  });

  if (!exitoso) {
    const nuevaSesion = {
      usuario: usuario,
      exitoso: false,
      hora: hora,
      recordar: checkRecordar.checked,
      notificaciones: checkNotificaciones.checked,
    };

    sesiones.push(nuevaSesion);
  }

  const fallidas = sesiones;

  let mensajeTexto;
  if (exitoso) {
    mensajeTexto = `¡Bienvenido, ${usuario}! Sesión iniciada correctamente.`;
    if (checkRecordar.checked) {
      mensajeTexto += " Tu sesión será recordada.";
    }

    sessionStorage.setItem("usuarioAutenticado", usuario);

    setTimeout(function () {
      window.location.href = "../index.html";
    }, 900);
  } else {
    mensajeTexto = `Credenciales incorrectas. Intentos fallidos acumulados: ${fallidas.length}.`;
  }

  const mensaje = crearMensaje(mensajeTexto, exitoso ? "exito" : "error");
  mensaje.classList.add("mensaje-validacion");
  formulario.appendChild(mensaje);

  actualizarContador();
  renderizarHistorial();
  actualizarEstadoBoton();
});

// Proporciona feedback en tiempo real mientras se escribe el email
inputUsuario.addEventListener("input", function () {
  const valor = inputUsuario.value.trim();
  const feedbackExistente = document.getElementById("feedback-usuario");
  if (feedbackExistente) feedbackExistente.remove();

  if (valor.length > 0 && !valor.includes("@")) {
    const feedback = document.createElement("span");
    feedback.id = "feedback-usuario";
    feedback.className = "text-xs text-amber-500 mt-1 block";
    feedback.textContent = "Recuerda ingresar un correo electrónico válido.";
    inputUsuario.insertAdjacentElement("afterend", feedback);
  }
});

// Valida la longitud de la contraseña y muestra progreso
inputPassword.addEventListener("input", function () {
  const feedbackExistente = document.getElementById("feedback-password");
  if (feedbackExistente) feedbackExistente.remove();

  const longitud = inputPassword.value.length;
  if (longitud > 0 && longitud < 6) {
    const feedback = document.createElement("span");
    feedback.id = "feedback-password";
    feedback.className = "text-xs text-red-400 mt-1 block";
    feedback.textContent = `La contraseña debe tener al menos 6 caracteres (${longitud}/6).`;
    inputPassword.insertAdjacentElement("afterend", feedback);
  }
});

// Limpia los mensajes y feedback cuando se presiona el botón de reset
btnLimpiar.addEventListener("click", function () {
  const mensajes = formulario.querySelectorAll(".mensaje-validacion");
  mensajes.forEach(function (m) {
    m.remove();
  });
  const feedbacks = document.querySelectorAll(
    "#feedback-usuario, #feedback-password",
  );
  feedbacks.forEach(function (f) {
    f.remove();
  });
});

// Toggle del menú móvil
if (botonMenu && menuMovil) {
  botonMenu.addEventListener("click", function () {
    menuMovil.classList.toggle("hidden");
  });
}

// ===== INICIALIZACIÓN =====
// Carga inicial de elementos y estado de la página
actualizarContador();
renderizarHistorial();
actualizarEstadoBoton();
