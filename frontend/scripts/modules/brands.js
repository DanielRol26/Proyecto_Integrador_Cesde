const urlMockApi = "https://6a0f76ebd2a9857070357912.mockapi.io/api/v1/productos";
const CLAVE_CARRITO = "carritoRemainders";
let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    inicializarPersistencia();
    inicializarEventosEstructurales();
    document.getElementById('desencadenar-consulta').addEventListener('click', procesarLlamadaRemota);
    document.getElementById('filtro-busqueda-local').addEventListener('input', ejecutarFiltroProductos);
});

function inicializarPersistencia() {
    try {
        carrito = JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
        carrito = [];
    }
    actualizarInterfazCarrito();
}

function guardarPersistencia() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function formatearMoneda(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(valor);
}

async function procesarLlamadaRemota() {
    const visorResultados = document.getElementById('contenedor-servidor');
    visorResultados.innerHTML = '<p class="estado-carga">Cargando colección...</p>';

    try {
        const conexion = await fetch(urlMockApi);
        if (!conexion.ok) throw new Error();

        const conjuntoDatos = await conexion.json();
        visorResultados.innerHTML = '';

        conjuntoDatos.forEach((item) => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-producto';

            const contenedorImagen = document.createElement('div');
            contenedorImagen.className = 'contenedor-recurso';

            const elementoImagen = document.createElement('img');
            elementoImagen.src = item.imagen;
            elementoImagen.alt = item.titulo;
            elementoImagen.className = 'imagen-producto';
            contenedorImagen.appendChild(elementoImagen);

            const bloqueInfo = document.createElement('div');
            bloqueInfo.className = 'bloque-informacion';

            const elementoMarca = document.createElement('p');
            elementoMarca.className = 'marca-tag';
            elementoMarca.textContent = item.marca;

            const elementoTitulo = document.createElement('h3');
            elementoTitulo.textContent = item.titulo;

            const conversionPrecio = Number(item.precio) * 4500;

            const elementoPrecio = document.createElement('span');
            elementoPrecio.className = 'precio-tag';
            elementoPrecio.textContent = formatearMoneda(conversionPrecio);

            const elementoDesc = document.createElement('p');
            elementoDesc.className = 'descripcion-tag';
            elementoDesc.textContent = item.descripcion;

            const botonCarrito = document.createElement('button');
            botonCarrito.className = 'boton-agregar-carrito-js';
            botonCarrito.type = 'button';
            botonCarrito.textContent = 'Agregar al carrito';
            
            botonCarrito.addEventListener('click', () => {
                inyectarItemCarrito(item.id, item.titulo, item.marca, conversionPrecio, item.imagen);
            });

            bloqueInfo.appendChild(elementoMarca);
            bloqueInfo.appendChild(elementoTitulo);
            bloqueInfo.appendChild(elementoPrecio);
            bloqueInfo.appendChild(elementoDesc);
            bloqueInfo.appendChild(botonCarrito);

            tarjeta.appendChild(contenedorImagen);
            tarjeta.appendChild(bloqueInfo);
            visorResultados.appendChild(tarjeta);
        });

    } catch (falla) {
        visorResultados.innerHTML = '<p class="estado-error">No se pudieron cargar los datos. Intenta más tarde.</p>';
    }
}

function inyectarItemCarrito(id, nombre, marca, precio, imagen) {
    const coincidencia = carrito.find(item => item.id === id);
    if (coincidencia) {
        coincidencia.cantidad += 1;
    } else {
        carrito.push({ id, nombre, marca, precio, imagen, cantidad: 1 });
    }
    guardarPersistencia();
    actualizarInterfazCarrito();
    desplegarAlertaToast(`${nombre} agregado`);
}

function actualizarInterfazCarrito() {
    const listaNode = document.getElementById('listaCarrito');
    const totalNode = document.getElementById('totalCarrito');
    const contadorNode = document.getElementById('contador-global');

    if (!listaNode || !totalNode || !contadorNode) return;

    const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorNode.textContent = totalArticulos;
    contadorNode.classList.toggle('visible', totalArticulos > 0);

    if (carrito.length === 0) {
        listaNode.innerHTML = '<p class="carrito-vacio-js">Tu carrito está vacío.</p>';
        totalNode.textContent = formatearMoneda(0);
        return;
    }

    listaNode.innerHTML = carrito.map((item, index) => `
        <div class="item-carrito-js">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="item-carrito-info-js">
                <h3>${item.nombre}</h3>
                <p>${item.marca}</p>
                <p>${formatearMoneda(item.precio)}</p>
                <div class="item-carrito-acciones-js">
                    <button onclick="alterarCantidad(${index}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="alterarCantidad(${index}, 1)">+</button>
                    <button class="eliminar-carrito-js" onclick="removerItemCarrito(${index})">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');

    const neto = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    totalNode.textContent = formatearMoneda(neto);
}

window.alterarCantidad = (index, delta) => {
    if (!carrito[index]) return;
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
    guardarPersistencia();
    actualizarInterfazCarrito();
};

window.removerItemCarrito = (index) => {
    if (!carrito[index]) return;
    carrito.splice(index, 1);
    guardarPersistencia();
    actualizarInterfazCarrito();
};

function ejecutarFiltroProductos(e) {
    const criterio = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    document.querySelectorAll('.tarjeta-producto').forEach(tarjeta => {
        const contenido = tarjeta.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        tarjeta.classList.toggle('oculto-busqueda-js', !contenido.includes(criterio));
    });
}

function inicializarEventosEstructurales() {
    const header = document.getElementById('encabezado');
    const fondoCarrito = document.getElementById('fondoCarrito');

    document.getElementById('disparar-menu-lateral').addEventListener('click', () => alternarMenu(true));
    document.getElementById('botonCerrarMenu').addEventListener('click', () => alternarMenu(false));
    
    document.getElementById('desplegar-carrito-btn').addEventListener('click', () => alternarCarrito(true));
    document.getElementById('botonCerrarCarrito').addEventListener('click', () => alternarCarrito(false));
    fondoCarrito.addEventListener('click', () => alternarCarrito(false));
    
    document.getElementById('botonVaciarCarrito').addEventListener('click', limpiarTodoCarrito);
    document.getElementById('botonFinalizarCompra').addEventListener('click', () => operarSalida('Compra completada'));

    document.getElementById('botonCerrarModal').addEventListener('click', () => alternarModal(false));
    document.getElementById('modalGeneral').addEventListener('click', (e) => {
        if(e.target.id === 'modalGeneral') alternarModal(false);
    });

    document.getElementById('abrir-usuario-modal').addEventListener('click', () => invocarModal('Mi cuenta', '<form class="formulario-js" onsubmit="event.preventDefault(); window.operarSalida(\'Sesión iniciada\');"><input type="email" placeholder="Correo" required><input type="password" placeholder="Contraseña" required><button type="submit">Ingresar</button></form>'));
    document.getElementById('boletin-disparador').addEventListener('click', (e) => { e.preventDefault(); invocarModal('Boletín', '<form class="formulario-js" onsubmit="event.preventDefault(); window.operarSalida(\'Suscripción guardada\');"><input type="email" placeholder="Tu correo" required><button type="submit">Suscribirme</button></form>'); });

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 36) {
                header.classList.add('fijo-arriba');
            } else {
                header.classList.remove('fijo-arriba');
            }
        }
    });
}

window.alternarMenu = (estado) => document.body.classList.toggle('menu-abierto', estado);
window.alternarCarrito = (estado) => document.body.classList.toggle('carrito-abierto', estado);
window.alternarModal = (estado) => document.body.classList.toggle('modal-abierto', estado);

window.invocarModal = (titulo, html) => {
    document.getElementById('tituloModal').textContent = titulo;
    document.getElementById('contenidoModal').innerHTML = html;
    alternarModal(true);
};

window.operarSalida = (msg) => {
    alternarModal(false);
    alternarCarrito(false);
    desplegarAlertaToast(msg);
};

window.limpiarTodoCarrito = () => {
    carrito = [];
    guardarPersistencia();
    actualizarInterfazCarrito();
    desplegarAlertaToast('Carrito vacío');
};

let to;
window.desplegarAlertaToast = (msg) => {
    const el = document.getElementById('toast-global');
    if (!el) return;
    clearTimeout(to);
    el.textContent = msg;
    el.classList.add('visible');
    to = setTimeout(() => el.classList.remove('visible'), 2500);
};