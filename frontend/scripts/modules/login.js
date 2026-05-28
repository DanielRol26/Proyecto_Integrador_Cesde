const intentosSesion = [];
const usuariosValidos = [
  { email: "prueba@correo.com", contrasena: "123456" },
  { email: "admin@denim.com", contrasena: "admin123" },
  { email: "test@gmail.com", contrasena: "abcdef" }
];

const formularioLogin = document.getElementById("form-login-pasos");
const campoEmail = document.getElementById("campo-email");
const campoContrasena = document.getElementById("campo-contrasena");
const casillaRecordar = document.getElementById("casilla-recordar");
const botonEnviar = document.getElementById("boton-enviar-formulario");
const contenedorHistorial = document.getElementById("bloque-historial-login");
const MAXIMO_INTENTOS = 3;

function actualizarControlesFormulario() {
  const estaBloqueado = intentosSesion.length >= MAXIMO_INTENTOS;
  if (!botonEnviar) return;
  botonEnviar.disabled = estaBloqueado;
  if (estaBloqueado) {
    botonEnviar.style.opacity = "0.4";
    botonEnviar.style.cursor = "not-allowed";
    botonEnviar.textContent = "LÍMITE ALCANZADO";
  } else {
    botonEnviar.style.opacity = "1";
    botonEnviar.style.cursor = "pointer";
    botonEnviar.textContent = "INGRESAR";
  }
}

function crearAlertaVisual(textoMensaje, tipoAlerta) {
  const elementoMensaje = document.createElement("div");
  elementoMensaje.className = `alerta-login alerta-login-${tipoAlerta}`;
  elementoMensaje.textContent = textoMensaje;
  return elementoMensaje;
}

function mostrarHistorialIntentos() {
  contenedorHistorial.innerHTML = "";
  if (intentosSesion.length === 0) return;

  const cajaHistorial = document.createElement("div");
  cajaHistorial.className = "historial-caja-diseno";

  const tituloHistorial = document.createElement("h4");
  tituloHistorial.textContent = `HISTORIAL DE INTENTOS (${intentosSesion.length}/${MAXIMO_INTENTOS})`;
  tituloHistorial.className = "historial-titulo-diseno";
  cajaHistorial.appendChild(tituloHistorial);

  intentosSesion.slice(-MAXIMO_INTENTOS).forEach((registro, posicion) => {
    const renglon = document.createElement("div");
    renglon.className = "historial-renglon";

    const seccionIzquierda = document.createElement("div");
    seccionIzquierda.className = "historial-col-izq";
    seccionIzquierda.innerHTML = `<strong>0${posicion + 1}.</strong> <span>${registro.correoUsuario}</span>`;

    const seccionDerecha = document.createElement("div");
    seccionDerecha.className = `historial-col-der ${registro.resultadoExitoso ? 'texto-exito' : 'texto-fallo'}`;
    seccionDerecha.textContent = registro.resultadoExitoso ? "EXITOSO" : "FALLIDO";

    renglon.appendChild(seccionIzquierda);
    renglon.appendChild(seccionDerecha);
    cajaHistorial.appendChild(renglon);
  });

  contenedorHistorial.appendChild(cajaHistorial);
}

formularioLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  document.querySelectorAll(".alerta-login").forEach(elemento => elemento.remove());

  if (intentosSesion.length >= MAXIMO_INTENTOS) {
    formularioLogin.prepend(crearAlertaVisual("Límite de intentos alcanzado. La opción está bloqueada.", "error"));
    return;
  }

  const valorEmail = campoEmail.value.trim();
  const valorContrasena = campoContrasena.value.trim();

  if (!valorEmail || !valorContrasena) {
    formularioLogin.prepend(crearAlertaVisual("Por favor completa todos los campos.", "error"));
    return;
  }

  const esValido = usuariosValidos.some(u => u.email === valorEmail && u.contrasena === valorContrasena);

  if (!esValido) {
    intentosSesion.push({
      correoUsuario: valorEmail,
      resultadoExitoso: false,
      registroHora: new Date().toLocaleTimeString("es-CO")
    });
  }

  if (esValido) {
    formularioLogin.prepend(crearAlertaVisual("Sesión iniciada correctamente. Redirigiendo...", "exito"));
    if (casillaRecordar && casillaRecordar.checked) {
      sessionStorage.setItem("usuarioAutenticado", valorEmail);
    }
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 1200);
  } else {
    formularioLogin.prepend(crearAlertaVisual("Credenciales incorrectas. Intenta nuevamente.", "error"));
  }

  mostrarHistorialIntentos();
  actualizarControlesFormulario();
});

actualizarControlesFormulario();