const formularioContacto = document.getElementById("formulario-contacto");
const campoNombre = document.getElementById("campo-nombre");
const campoCorreo = document.getElementById("campo-correo");
const campoAsunto = document.getElementById("campo-asunto");
const campoMensaje = document.getElementById("campo-mensaje");
const contenedorAlertas = document.getElementById(
  "contenedor-alertas-contacto",
);
const botonSubmit = document.getElementById("boton-contacto");

function crearAlertaVisual(texto, tipo) {
  const alerta = document.createElement("div");
  alerta.className = `alerta-contacto alerta-${tipo}-contacto alerta-global`;
  alerta.textContent = texto;
  return alerta;
}

function limpiarAlertas() {
  const alertas = document.querySelectorAll(".alerta-global");
  alertas.forEach(function (alerta) {
    alerta.remove();
  });
}

function verificarEmail(email) {
  return email.includes("@") && email.includes(".");
}

campoCorreo.addEventListener("input", function () {
  const valor = campoCorreo.value.trim();
  const alertaExistente = document.getElementById("alerta-correo-linea");

  if (alertaExistente) {
    alertaExistente.remove();
  }

  if (valor.length > 0 && !verificarEmail(valor)) {
    const alertaLinea = document.createElement("span");
    alertaLinea.id = "alerta-correo-linea";
    alertaLinea.className = "alerta-en-linea-contacto";
    alertaLinea.textContent = "Ingresa un correo electrónico válido.";
    campoCorreo.insertAdjacentElement("afterend", alertaLinea);
  }
});

formularioContacto.addEventListener("submit", function (evento) {
  evento.preventDefault();
  limpiarAlertas();

  const nombre = campoNombre.value.trim();
  const correo = campoCorreo.value.trim();
  const asunto = campoAsunto.value;
  const mensaje = campoMensaje.value.trim();

  if (!nombre || !correo || !asunto || !mensaje) {
    contenedorAlertas.appendChild(
      crearAlertaVisual(
        "Por favor, completa todos los campos del formulario.",
        "error",
      ),
    );
    return;
  }

  if (!verificarEmail(correo)) {
    contenedorAlertas.appendChild(
      crearAlertaVisual(
        "El correo electrónico ingresado no tiene un formato válido.",
        "error",
      ),
    );
    return;
  }

  botonSubmit.disabled = true;
  botonSubmit.textContent = "Enviando...";
  botonSubmit.style.opacity = "0.7";

  setTimeout(function () {
    limpiarAlertas();
    contenedorAlertas.appendChild(
      crearAlertaVisual(
        "¡Mensaje enviado correctamente! Nuestro equipo te contactará pronto.",
        "exito",
      ),
    );

    formularioContacto.reset();

    botonSubmit.disabled = false;
    botonSubmit.textContent = "Enviar mensaje";
    botonSubmit.style.opacity = "1";

    setTimeout(function () {
      limpiarAlertas();
    }, 5000);
  }, 1200);
});
