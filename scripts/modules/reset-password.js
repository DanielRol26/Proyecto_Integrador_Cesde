// ===== VARIABLES GLOBALES Y ESTADO =====
// Guarda todas las solicitudes de recuperación enviadas en esta sesión
const solicitudes = [];

// ===== REFERENCIAS AL DOM =====
const formulario = document.querySelector("form");
const inputEmail = document.getElementById("email");
const mainSection = document.querySelector("section");

// ===== CREACIÓN DE ELEMENTOS DINÁMICOS =====
const areaHistorial = document.createElement("div");
areaHistorial.id = "area-historial";
areaHistorial.className = "mt-6";
mainSection.querySelector(".bg-white").appendChild(areaHistorial);

const contenedorBusqueda = document.createElement("div");
contenedorBusqueda.id = "contenedor-busqueda";
contenedorBusqueda.className = "hidden mt-4 pt-4 border-t-2 border-gray-100";

const labelBusqueda = document.createElement("label");
labelBusqueda.htmlFor = "buscar-email";
labelBusqueda.className = "block text-archi-blue font-bold mb-2 text-sm";
labelBusqueda.textContent = "Buscar solicitud por correo:";

const inputBusqueda = document.createElement("input");
inputBusqueda.type = "text";
inputBusqueda.id = "buscar-email";
inputBusqueda.placeholder = "Filtrar por correo...";
inputBusqueda.className =
  "w-full p-2 border-2 border-archi-cyan rounded-lg text-sm focus:border-archi-light-cyan focus:outline-none";

const areaFiltrada = document.createElement("ul");
areaFiltrada.id = "area-filtrada";
areaFiltrada.className = "mt-3 space-y-2";

contenedorBusqueda.appendChild(labelBusqueda);
contenedorBusqueda.appendChild(inputBusqueda);
contenedorBusqueda.appendChild(areaFiltrada);
mainSection.querySelector(".bg-white").appendChild(contenedorBusqueda);

// ===== FUNCIONES AUXILIARES =====
function crearMensaje(texto, tipo) {
  const div = document.createElement("div");
  div.className =
    tipo === "error"
      ? "p-3 rounded-lg border-2 border-red-300 bg-red-50 text-red-700 text-sm font-medium mensaje-flash"
      : "p-3 rounded-lg border-2 border-green-300 bg-green-50 text-green-700 text-sm font-medium mensaje-flash";
  div.textContent = texto;
  return div;
}

function crearItemSolicitud(solicitud) {
  const item = document.createElement("li");
  item.className =
    "flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs";

  const emailSpan = document.createElement("span");
  emailSpan.className = "text-gray-700 font-medium truncate max-w-[180px]";
  emailSpan.textContent = solicitud.email;

  const horaSpan = document.createElement("span");
  horaSpan.className = "text-gray-400";
  horaSpan.textContent = solicitud.hora;

  const estadoSpan = document.createElement("span");
  estadoSpan.className = "text-archi-blue font-semibold";
  estadoSpan.textContent = "✉ Enviado";

  item.appendChild(emailSpan);
  item.appendChild(horaSpan);
  item.appendChild(estadoSpan);

  return item;
}

function renderizarHistorial(lista) {
  areaHistorial.innerHTML = "";

  if (lista.length === 0) return;

  const titulo = document.createElement("h4");
  titulo.className = "text-archi-blue font-bold text-sm mb-3 pt-4 border-t-2 border-gray-100";
  titulo.textContent = `Solicitudes enviadas (${lista.length}):`;
  areaHistorial.appendChild(titulo);

  const ul = document.createElement("ul");
  ul.className = "space-y-2";

  lista.forEach(function (solicitud) {
    ul.appendChild(crearItemSolicitud(solicitud));
  });

  areaHistorial.appendChild(ul);
}

// ===== EVENT LISTENERS =====
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const email = inputEmail.value.trim();

  const mensajesAnteriores = formulario.querySelectorAll(".mensaje-flash");
  mensajesAnteriores.forEach(function (m) {
    m.remove();
  });

  if (!email || !email.includes("@")) {
    const error = crearMensaje(
      "Por favor ingresa un correo electrónico válido.",
      "error"
    );
    formulario.insertBefore(error, formulario.querySelector(".flex"));
    return;
  }

  const yaExiste = solicitudes.filter(function (s) {
    return s.email === email;
  });

  if (yaExiste.length > 0) {
    const aviso = crearMensaje(
      `Ya enviamos un enlace a ${email}. Revisa tu bandeja de entrada o carpeta de spam.`,
      "error"
    );
    formulario.insertBefore(aviso, formulario.querySelector(".flex"));
    return;
  }

  const nuevaSolicitud = {
    email: email,
    hora: new Date().toLocaleTimeString("es-CO"),
    fecha: new Date().toLocaleDateString("es-CO"),
  };

  solicitudes.push(nuevaSolicitud);

  const exito = crearMensaje(
    `Enlace de recuperación enviado a ${email}. Revisa tu correo.`,
    "exito"
  );
  formulario.insertBefore(exito, formulario.querySelector(".flex"));

  inputEmail.value = "";

  renderizarHistorial(solicitudes);

  if (solicitudes.length >= 1) {
    contenedorBusqueda.classList.remove("hidden");
  }
});

inputBusqueda.addEventListener("input", function () {
  const termino = inputBusqueda.value.trim().toLowerCase();

  const resultados = solicitudes.filter(function (s) {
    return s.email.toLowerCase().includes(termino);
  });

  areaFiltrada.innerHTML = "";

  if (termino === "") return;

  if (resultados.length === 0) {
    const sinResultados = document.createElement("li");
    sinResultados.className = "text-xs text-gray-400 text-center py-2";
    sinResultados.textContent = "No se encontraron solicitudes con ese correo.";
    areaFiltrada.appendChild(sinResultados);
    return;
  }

  resultados.forEach(function (solicitud) {
    areaFiltrada.appendChild(crearItemSolicitud(solicitud));
  });
});

inputEmail.addEventListener("input", function () {
  const feedbackExistente = document.getElementById("feedback-email-reset");
  if (feedbackExistente) feedbackExistente.remove();

  const valor = inputEmail.value.trim();
  if (valor.length > 0 && !valor.includes("@")) {
    const feedback = document.createElement("span");
    feedback.id = "feedback-email-reset";
    feedback.className = "text-xs text-amber-500 mt-1 block";
    feedback.textContent = "Ingresa un correo con formato válido (ejemplo@correo.com).";
    inputEmail.insertAdjacentElement("afterend", feedback);
  }
});
