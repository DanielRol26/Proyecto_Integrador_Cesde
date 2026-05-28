const elementoContador = document.getElementById("contador-redireccion");
const botonIniciarSesion = document.getElementById("boton-iniciar-sesion");
let tiempoRestante = 5;

function actualizarRedireccion() {
  tiempoRestante--;

  if (elementoContador) {
    elementoContador.textContent = tiempoRestante;
  }

  if (tiempoRestante <= 0) {
    clearInterval(intervaloRedireccion);
    window.location.href = "login.html";
  }
}

const intervaloRedireccion = setInterval(actualizarRedireccion, 1000);

if (botonIniciarSesion) {
  botonIniciarSesion.addEventListener("click", function () {
    clearInterval(intervaloRedireccion);
    window.location.href = "login.html";
  });
}
