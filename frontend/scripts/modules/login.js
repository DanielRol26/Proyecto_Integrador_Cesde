const formularioLogin = document.getElementById("form-login-pasos");

if (formularioLogin) {
  const usuariosValidos = JSON.parse(localStorage.getItem("users")) || [];

  const campoEmail = document.getElementById("campo-email");
  const campoContrasena = document.getElementById("campo-contrasena");
  const casillaRecordar = document.getElementById("casilla-recordar");

  const MAX_INTENTOS = 3;

  function crearAlertaVisual(textoMensaje, tipoAlerta) {
    const elementoMensaje = document.createElement("div");

    elementoMensaje.textContent = textoMensaje;

    elementoMensaje.className = `
      alerta-login
      w-full max-w-[80%] mx-auto mb-5
      px-4 py-3 rounded-[10px]
      text-[14px] font-medium text-center
      border
      transition-all duration-300
    `;

    if (tipoAlerta === "exito") {
      elementoMensaje.classList.add(
        "bg-[#e8f8ef]",
        "text-[#1f7a3f]",
        "border-[#9de0b5]"
      );
    } else {
      elementoMensaje.classList.add(
        "bg-[#fff0f0]",
        "text-[#b42318]",
        "border-[#f5b5b5]"
      );
    }

    return elementoMensaje;
  }

  function mostrarAlerta(textoMensaje, tipoAlerta) {
    formularioLogin
      .querySelectorAll(".alerta-login")
      .forEach(elemento => elemento.remove());

    const alerta = crearAlertaVisual(textoMensaje, tipoAlerta);

    alerta.classList.add(
      "opacity-0",
      "-translate-y-2",
      "transition-all",
      "duration-300"
    );

    formularioLogin.prepend(alerta);

    setTimeout(() => {
      alerta.classList.remove("opacity-0", "-translate-y-2");
      alerta.classList.add("opacity-100", "translate-y-0");
    }, 10);
  }

  formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const valorEmail = campoEmail.value.trim().toLowerCase();
    const valorContrasena = campoContrasena.value.trim();

    if (!valorEmail || !valorContrasena) {
      mostrarAlerta("Por favor completa todos los campos.", "error");
      return;
    }

    const usuarioEncontrado = usuariosValidos.find(
      usuario => usuario.email.toLowerCase() === valorEmail
    );

    if (!usuarioEncontrado) {
      mostrarAlerta(
        "Credenciales incorrectas. Intenta nuevamente.",
        "error"
      );
      return;
    }

    if (usuarioEncontrado.accountStatus === "blocked") {
      mostrarAlerta(
        "Tu cuenta está bloqueada por seguridad. Comunícate con un asesor.",
        "error"
      );
      return;
    }

    if (usuarioEncontrado.password === valorContrasena) {
      usuarioEncontrado.loginAttempts = 0;
      usuarioEncontrado.accountStatus = "active";

      localStorage.setItem("users", JSON.stringify(usuariosValidos));

      mostrarAlerta(
        "Sesión iniciada correctamente. Redirigiendo...",
        "exito"
      );

      if (casillaRecordar && casillaRecordar.checked) {
        sessionStorage.setItem("usuarioAutenticado", valorEmail);
      }

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1200);

    } else {
      usuarioEncontrado.loginAttempts =
        (usuarioEncontrado.loginAttempts || 0) + 1;

      if (usuarioEncontrado.loginAttempts >= MAX_INTENTOS) {
        usuarioEncontrado.accountStatus = "blocked";

        localStorage.setItem("users", JSON.stringify(usuariosValidos));

        mostrarAlerta(
          "Demasiados intentos fallidos. Cuenta bloqueada por seguridad, comunícate con un asesor.",
          "error"
        );

        return;
      }

      localStorage.setItem("users", JSON.stringify(usuariosValidos));

      mostrarAlerta(
        `Contraseña incorrecta. Intentos restantes: ${MAX_INTENTOS - usuarioEncontrado.loginAttempts
        }.`,
        "error"
      );
    }
  });

  const botonVerContrasena = document.getElementById("boton-ver-contraseña");
  const iconoMostrarContrasena = document.getElementById("icono-mostrar-contraseña");
  const iconoOcultarContrasena = document.getElementById("icono-ocultar-contraseña");

  botonVerContrasena.addEventListener("click", function () {
    if (campoContrasena.type === "password") {
      campoContrasena.type = "text";

      iconoMostrarContrasena.classList.add("hidden");
      iconoOcultarContrasena.classList.remove("hidden");
    } else {
      campoContrasena.type = "password";

      iconoMostrarContrasena.classList.remove("hidden");
      iconoOcultarContrasena.classList.add("hidden");
    }
  });
}