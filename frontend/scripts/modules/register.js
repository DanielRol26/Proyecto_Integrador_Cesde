const usuariosRegistrados = [];

const formularioRegistro = document.getElementById("formulario-registro");
const campoNombre = document.getElementById("campo-nombre");
const campoApellido = document.getElementById("campo-apellido");
const campoCorreo = document.getElementById("campo-correo");
const campoContrasena = document.getElementById("campo-contrasena");
const campoConfirmar = document.getElementById("campo-confirmar");
const casillaTerminos = document.getElementById("casilla-terminos");
const botonRegistro = document.getElementById("boton-registro");

function crearMensaje(texto, tipo) {
  const mensaje = document.createElement("div");
  mensaje.className = `alerta-validacion-registro alerta-${tipo}-registro mensaje-global`;
  mensaje.textContent = texto;
  return mensaje;
}

function limpiarMensajes() {
  const mensajes = document.querySelectorAll(".mensaje-global");
  mensajes.forEach(function (m) {
    m.remove();
  });
}

function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

campoCorreo.addEventListener("input", function () {
  const valor = campoCorreo.value.trim();
  const retroalimentacionExistente = document.getElementById("alerta-correo");
  if (retroalimentacionExistente) retroalimentacionExistente.remove();

  if (valor.length > 0 && !validarEmail(valor)) {
    const retroalimentacion = document.createElement("span");
    retroalimentacion.id = "alerta-correo";
    retroalimentacion.className = "alerta-inline-registro";
    retroalimentacion.textContent = "Ingresa un correo electrónico válido.";
    campoCorreo.insertAdjacentElement("afterend", retroalimentacion);
  }
});

campoContrasena.addEventListener("input", function () {
  const longitud = campoContrasena.value.length;
  const retroalimentacionExistente =
    document.getElementById("alerta-contrasena");
  if (retroalimentacionExistente) retroalimentacionExistente.remove();

  if (longitud > 0 && longitud < 6) {
    const retroalimentacion = document.createElement("span");
    retroalimentacion.id = "alerta-contrasena";
    retroalimentacion.className = "alerta-inline-registro";
    retroalimentacion.textContent = `Mínimo 6 caracteres (${longitud}/6).`;
    campoContrasena.insertAdjacentElement("afterend", retroalimentacion);
  }
});

formularioRegistro.addEventListener("submit", function (evento) {
  evento.preventDefault();
  limpiarMensajes();

  const nombre = campoNombre.value.trim();
  const apellido = campoApellido.value.trim();
  const correo = campoCorreo.value.trim();
  const contrasena = campoContrasena.value.trim();
  const confirmar = campoConfirmar.value.trim();
  const terminos = casillaTerminos.checked;

  if (!nombre || !apellido || !correo || !contrasena || !confirmar) {
    formularioRegistro.prepend(
      crearMensaje("Por favor, completa todos los campos.", "error"),
    );
    return;
  }

  if (!validarEmail(correo)) {
    formularioRegistro.prepend(
      crearMensaje("El correo electrónico no es válido.", "error"),
    );
    return;
  }

  if (contrasena.length < 6) {
    formularioRegistro.prepend(
      crearMensaje("La contraseña debe tener al menos 6 caracteres.", "error"),
    );
    return;
  }

  if (contrasena !== confirmar) {
    formularioRegistro.prepend(
      crearMensaje("Las contraseñas no coinciden.", "error"),
    );
    return;
  }

  if (!terminos) {
    formularioRegistro.prepend(
      crearMensaje("Debes aceptar los términos y condiciones.", "error"),
    );
    return;
  }

  const existeCorreo = usuariosRegistrados.some(function (usuario) {
    return usuario.correo === correo;
  });

  if (existeCorreo) {
    formularioRegistro.prepend(
      crearMensaje("Este correo ya se encuentra registrado.", "error"),
    );
    return;
  }

  const nuevoUsuario = {
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    contrasena: contrasena,
    rol: "cliente",
  };

  usuariosRegistrados.push(nuevoUsuario);

  botonRegistro.disabled = true;
  botonRegistro.textContent = "Procesando...";
  botonRegistro.style.opacity = "0.7";

  formularioRegistro.prepend(
    crearMensaje("¡Cuenta creada exitosamente! Redirigiendo...", "exito"),
  );

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1500);
});
