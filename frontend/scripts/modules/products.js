const articulosBolsa = [
  { 
    id: 1, 
    nombre: "SCULPTURAL KNIT MIDI DRESS", 
    color: "BLACK", 
    talla: "M", 
    cantidad: 1, 
    precio: 2490, 
    imagen: "../landingpage/images/producto_femenino_1.jpg" 
  },
  { 
    id: 2, 
    nombre: "THE SEAL SMALL BAG", 
    color: "IVORY", 
    talla: "ONE SIZE", 
    cantidad: 1, 
    precio: 1850, 
    imagen: "../landingpage/images/producto_femenino_2.jpg" 
  }
];

const articulosComplementarios = [
  { id: 101, nombre: "METAL CUFF", precio: 690 },
  { id: 102, nombre: "WANDER BOOT", precio: 1150 },
  { id: 103, nombre: "OVERSIZED SNEAKER", precio: 590 },
  { id: 104, nombre: "SKULL SCARF", precio: 345 }
];

const contenedorBolsa = document.getElementById("lista-articulos-bolsa");
const contenedorComplementarios = document.getElementById("lista-articulos-complementarios");

function formatearMoneda(valor) {
  return "$" + valor.toLocaleString("en-US");
}

function renderizarArticulosBolsa() {
  contenedorBolsa.innerHTML = "";
  
  articulosBolsa.forEach(articulo => {
    const elementoFila = document.createElement("div");
    elementoFila.className = "item-bolsa";

    const elementoImagen = document.createElement("div");
    elementoImagen.className = "item-bolsa-imagen";
    
    const etiquetaImagen = document.createElement("img");
    etiquetaImagen.src = articulo.imagen;
    elementoImagen.appendChild(etiquetaImagen);

    const elementoInfo = document.createElement("div");
    elementoInfo.className = "item-bolsa-info";

    const elementoNombre = document.createElement("div");
    elementoNombre.className = "item-bolsa-nombre";
    elementoNombre.textContent = articulo.nombre;

    const elementoVariante = document.createElement("div");
    elementoVariante.className = "item-bolsa-variante";
    elementoVariante.textContent = "COLOR: " + articulo.color + " | SIZE: " + articulo.talla;

    const elementoCantidad = document.createElement("div");
    elementoCantidad.className = "item-bolsa-cantidad";
    elementoCantidad.textContent = "QTY: " + articulo.cantidad;

    const elementoAcciones = document.createElement("div");
    elementoAcciones.className = "item-bolsa-acciones";
    
    const botonFavoritos = document.createElement("button");
    botonFavoritos.className = "boton-accion-item";
    botonFavoritos.textContent = "MOVE TO WISHLIST";
    
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "boton-accion-item";
    botonEliminar.textContent = "REMOVE";

    elementoAcciones.appendChild(botonFavoritos);
    elementoAcciones.appendChild(botonEliminar);

    elementoInfo.appendChild(elementoNombre);
    elementoInfo.appendChild(elementoVariante);
    elementoInfo.appendChild(elementoCantidad);
    elementoInfo.appendChild(elementoAcciones);

    const elementoPrecio = document.createElement("div");
    elementoPrecio.className = "item-bolsa-precio";
    elementoPrecio.textContent = formatearMoneda(articulo.precio);

    elementoFila.appendChild(elementoImagen);
    elementoFila.appendChild(elementoInfo);
    elementoFila.appendChild(elementoPrecio);

    contenedorBolsa.appendChild(elementoFila);
  });
}

function renderizarArticulosComplementarios() {
  contenedorComplementarios.innerHTML = "";
  
  articulosComplementarios.forEach(articulo => {
    const elementoTarjeta = document.createElement("div");
    elementoTarjeta.className = "item-completar";

    const cajaImagen = document.createElement("div");
    cajaImagen.className = "item-completar-imagen";

    const textoNombre = document.createElement("div");
    textoNombre.className = "item-completar-nombre";
    textoNombre.textContent = articulo.nombre;

    const textoPrecio = document.createElement("div");
    textoPrecio.className = "item-completar-precio";
    textoPrecio.textContent = formatearMoneda(articulo.precio);

    elementoTarjeta.appendChild(cajaImagen);
    elementoTarjeta.appendChild(textoNombre);
    elementoTarjeta.appendChild(textoPrecio);

    contenedorComplementarios.appendChild(elementoTarjeta);
  });
}

renderizarArticulosBolsa();
renderizarArticulosComplementarios();