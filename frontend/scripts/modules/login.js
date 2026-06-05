const formularioLogin = document.getElementById("form-login-pasos");

if (formularioLogin) {

  const usuariosValidos = JSON.parse(localStorage.getItem('users'));

  const campoEmail = document.getElementById("campo-email");
  const campoContrasena = document.getElementById("campo-contrasena");
  const casillaRecordar = document.getElementById("casilla-recordar");

  function crearAlertaVisual(textoMensaje, tipoAlerta) {
    const elementoMensaje = document.createElement("div");
    elementoMensaje.className = `alerta-login alerta-login-${tipoAlerta}`;
    elementoMensaje.textContent = textoMensaje;
    return elementoMensaje;
  }

  formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    document.querySelectorAll(".alerta-login")
      .forEach(elemento => elemento.remove());

    const valorEmail = campoEmail.value.trim();
    const valorContrasena = campoContrasena.value.trim();

    if (!valorEmail || !valorContrasena) {
      formularioLogin.prepend(
        crearAlertaVisual(
          "Por favor completa todos los campos.",
          "error"
        )
      );
      return;
    }

    const esValido = usuariosValidos.some(
      usuario =>
        usuario.email === valorEmail &&
        usuario.password === valorContrasena
    );

    if (esValido) {

      formularioLogin.prepend(
        crearAlertaVisual(
          "Sesión iniciada correctamente. Redirigiendo...",
          "exito"
        )
      );

      if (casillaRecordar && casillaRecordar.checked) {
        sessionStorage.setItem(
          "usuarioAutenticado",
          valorEmail
        );
      }

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1200);

    } else {

      formularioLogin.prepend(
        crearAlertaVisual(
          "Credenciales incorrectas. Intenta nuevamente.",
          "error"
        )
      );

    }
  });

}