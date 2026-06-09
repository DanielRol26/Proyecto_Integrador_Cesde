const solicitudesRecuperacion = [];

const formularioReset = document.getElementById("formulario-reset");
const campoCorreo = document.getElementById("campo-correo-reset");
const contenedorDinamico = document.getElementById("contenedor-dinamico-reset");

const areaHistorial = document.createElement("div");
areaHistorial.className = "historial-reset";

const contenedorBusqueda = document.createElement("div");
contenedorBusqueda.className = "buscador-reset-caja";
contenedorBusqueda.style.display = "none";

const inputBusqueda = document.createElement("input");
inputBusqueda.type = "text";
inputBusqueda.placeholder = "Filtrar solicitudes por correo...";

const areaFiltrada = document.createElement("div");

contenedorBusqueda.appendChild(inputBusqueda);
contenedorBusqueda.appendChild(areaFiltrada);

contenedorDinamico.appendChild(areaHistorial);
contenedorDinamico.appendChild(contenedorBusqueda);

function crearAlerta(texto, tipo) {
  const alerta = document.createElement("div");
  alerta.className = `alerta-reset alerta-${tipo}-reset mensaje-flash`;
  alerta.textContent = texto;
  return alerta;
}

function crearItemLista(solicitud) {
  const item = document.createElement("div");
  item.className = "item-solicitud-reset";

  const correoSpan = document.createElement("span");
  correoSpan.className = "item-solicitud-correo";
  correoSpan.textContent = solicitud.correo;

  const horaSpan = document.createElement("span");
  horaSpan.textContent = solicitud.hora;

  const estadoSpan = document.createElement("span");
  estadoSpan.className = "item-solicitud-estado";
  estadoSpan.textContent = "✉ ENVIADO";

  item.appendChild(correoSpan);
  item.appendChild(horaSpan);
  item.appendChild(estadoSpan);

  return item;
}

function renderizarHistorial(lista) {
  areaHistorial.innerHTML = "";
  if (lista.length === 0) return;

  const titulo = document.createElement("h4");
  titulo.className = "titulo-historial-reset";
  titulo.textContent = `Solicitudes enviadas (${lista.length})`;
  areaHistorial.appendChild(titulo);

  lista.forEach(function (solicitud) {
    areaHistorial.appendChild(crearItemLista(solicitud));
  });
}

formularioReset.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const mensajes = document.querySelectorAll(".mensaje-flash");
  mensajes.forEach(function (m) {
    m.remove();
  });

  const correo = campoCorreo.value.trim();

  if (!correo || !correo.includes("@")) {
    formularioReset.prepend(crearAlerta("Por favor ingresa un correo electrónico válido.", "error"));
    return;
  }

  const yaExiste = solicitudesRecuperacion.some(function (s) {
    return s.correo === correo;
  });

  if (yaExiste) {
    formularioReset.prepend(crearAlerta(`Ya enviamos un enlace de recuperación a ${correo}.`, "error"));
    return;
  }

  solicitudesRecuperacion.push({
    correo: correo,
    hora: new Date().toLocaleTimeString("es-CO")
  });

  formularioReset.prepend(crearAlerta(`Enlace de recuperación enviado a ${correo}. Revisa tu bandeja de entrada.`, "exito"));
  campoCorreo.value = "";

  renderizarHistorial(solicitudesRecuperacion);

  if (solicitudesRecuperacion.length > 0) {
    contenedorBusqueda.style.display = "block";
  }
});

inputBusqueda.addEventListener("input", function () {
  const termino = inputBusqueda.value.trim().toLowerCase();
  areaFiltrada.innerHTML = "";

  if (termino === "") return;

  const resultados = solicitudesRecuperacion.filter(function (s) {
    return s.correo.toLowerCase().includes(termino);
  });

  if (resultados.length === 0) {
    const vacio = document.createElement("p");
    vacio.style.fontSize = "10px";
    vacio.style.color = "#888";
    vacio.style.marginTop = "10px";
    vacio.style.textAlign = "center";
    vacio.textContent = "NO SE ENCONTRARON SOLICITUDES CON ESE CORREO.";
    areaFiltrada.appendChild(vacio);
    return;
  }

  resultados.forEach(function (solicitud) {
    areaFiltrada.appendChild(crearItemLista(solicitud));
  });
});

campoCorreo.addEventListener("input", function () {
  const alertaExistente = document.getElementById("alerta-en-linea");
  if (alertaExistente) alertaExistente.remove();

  const valor = campoCorreo.value.trim();
  if (valor.length > 0 && !valor.includes("@")) {
    const span = document.createElement("span");
    span.id = "alerta-en-linea";
    span.className = "alerta-en-linea-reset";
    span.textContent = "Ingresa un correo con formato válido.";
    campoCorreo.insertAdjacentElement("afterend", span);
  }
});