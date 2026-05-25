// ===== DATOS EN MEMORIA =====

const productos = [
  {
    id: 1,
    nombre: "Camiseta Básica",
    descripcion: "Camiseta 100% algodón, cómoda y versátil",
    precio: 45000,
    imagen: "/assets/images/products/shirts/short-sleeve/white-shirt.png",
    categoria: "Camisetas",
    marca: "Archipiélago",
    genero: "Unisex"
  },
  {
    id: 2,
    nombre: "Pantalón Casual",
    descripcion: "Pantalón de mezclilla, estilo moderno",
    precio: 85000,
    imagen: "/assets/images/products/pants/jeans/blue-jean.png",
    categoria: "Pantalones",
    marca: "Archipiélago",
    genero: "Unisex"
  },
  {
    id: 3,
    nombre: "Sudadera con Capucha",
    descripcion: "Perfecta para el clima frío",
    precio: 95000,
    imagen: "/assets/images/products/hoodies/hoodie-blue.png",
    categoria: "Sudaderas",
    marca: "Archipiélago",
    genero: "Unisex"
  },
  {
    id: 4,
    nombre: "Vestido Elegante",
    descripcion: "Ideal para ocasiones especiales",
    precio: 120000,
    imagen: "/assets/images/products/dresses/dress-blue.png",
    categoria: "Vestidos",
    marca: "Archipiélago",
    genero: "Mujer"
  },
  {
    id: 5,
    nombre: "Chaqueta Deportiva",
    descripcion: "Ligera y resistente al agua",
    precio: 110000,
    imagen: "/assets/images/products/jackets/jacket-black.png",
    categoria: "Chaquetas",
    marca: "Archipiélago",
    genero: "Unisex"
  },
  {
    id: 6,
    nombre: "Falda Plisada",
    descripcion: "Estilo clásico y elegante",
    precio: 65000,
    imagen: "/assets/images/products/skirts/skirt-beige.png",
    categoria: "Faldas",
    marca: "Archipiélago",
    genero: "Mujer"
  },
  {
    id: 7,
    nombre: "Camisa Formal",
    descripcion: "Perfecta para el trabajo",
    precio: 75000,
    imagen: "/assets/images/products/shirts/long-sleeve/black-shirt.png",
    categoria: "Camisas",
    marca: "Archipiélago",
    genero: "Hombre"
  },
  {
    id: 8,
    nombre: "Short Deportivo",
    descripcion: "Cómodo para hacer ejercicio",
    precio: 50000,
    imagen: "/assets/images/products/shorts/sport-short.png",
    categoria: "Shorts",
    marca: "Archipiélago",
    genero: "Unisex"
  },
  {
    id: 9,
    nombre: "Abrigo de Invierno",
    descripcion: "Cálido y elegante",
    precio: 180000,
    imagen: "/assets/images/products/jackets/puffer-jacket-black.png",
    categoria: "Abrigos",
    marca: "Archipiélago",
    genero: "Unisex"
  },
  // ===== PRODUCTOS ADICIONALES DE LUJO =====
  {
    id: 10,
    nombre: "T-Bar Slim Sunglasses",
    descripcion: "Gafas de sol slim para un look sofisticado",
    precio: 250000,
    imagen: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    categoria: "Accesorios",
    marca: "Alexander McQueen",
    genero: "Unisex"
  },
  {
    id: 11,
    nombre: "Oversized Sneaker Blanco",
    descripcion: "Zapatillas blancas oversize de Alexander McQueen",
    precio: 1200000,
    imagen: "https://images.stockx.com/360/Alexander-McQueen-Oversized-Ivory-Black/Images/Alexander-McQueen-Oversized-Ivory-Black/Lv2/img13.jpg?w=576&q=60&dpr=1&updated_at=1700839827&h=384 1x",
    categoria: "Calzado",
    marca: "Alexander McQueen",
    genero: "Hombre"
  },
  {
    id: 12,
    nombre: "Oversized Sneaker Negro",
    descripcion: "Zapatillas negras oversize de Alexander McQueen",
    precio: 1200000,
    imagen: "https://images.stockx.com/360/Alexander-McQueen-Oversized-Black-Shiny-Sole/Images/Alexander-McQueen-Oversized-Black-Shiny-Sole/Lv2/img01.jpg?w=576&q=57&dpr=2&updated_at=1635342558&h=384",
    categoria: "Calzado",
    marca: "Alexander McQueen",
    genero: "Hombre"
  },
  {
    id: 13,
    nombre: "The Multi-Tattoo Suit Jacket",
    descripcion: "Chaqueta de traje con diseño multi-tatuaje",
    precio: 2500000,
    imagen: "https://cdn.shopify.com/s/files/1/0550/7537/3249/files/U-OU038-W092-6959_1_adb9d9b6-a904-45cd-9218-9aa7807d6492.jpg?width=3840",
    categoria: "Chaquetas",
    marca: "Jean Paul Gaultier",
    genero: "Hombre"
  },
  {
    id: 14,
    nombre: "The Belted Denim Jacket",
    descripcion: "Chaqueta de mezclilla con cinturón",
    precio: 1800000,
    imagen: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop",
    categoria: "Chaquetas",
    marca: "Jean Paul Gaultier",
    genero: "Hombre"
  },
  {
    id: 15,
    nombre: "The Buttoned Blue Denim Shorts",
    descripcion: "Shorts de mezclilla azul con botones",
    precio: 1200000,
    imagen: "https://images.unsplash.com/photo-1591044474274-495f033ffaa8?w=400&h=400&fit=crop",
    categoria: "Shorts",
    marca: "Jean Paul Gaultier",
    genero: "Hombre"
  },
  {
    id: 16,
    nombre: "Tabi Ankle Boots Camel",
    descripcion: "Botines Tabi color camel",
    precio: 1400000,
    imagen: "https://images.unsplash.com/photo-1543163521-9145f931371e?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Maison Margiela",
    genero: "Hombre"
  },
  {
    id: 17,
    nombre: "Tabi Sneakers Cuero Granulado",
    descripcion: "Zapatillas Tabi en cuero granulado",
    precio: 1300000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Maison Margiela",
    genero: "Hombre"
  },
  {
    id: 18,
    nombre: "Bolso 5AC Shopping Large Negro",
    descripcion: "Bolso shopping 5AC grande en negro",
    precio: 1600000,
    imagen: "https://images.unsplash.com/photo-1555620519-46d1e76dc4d0?w=400&h=400&fit=crop",
    categoria: "Bolsos",
    marca: "Maison Margiela",
    genero: "Hombre"
  },
  {
    id: 19,
    nombre: "Mini Jacket Dress Negro",
    descripcion: "Vestido mini chaqueta en negro",
    precio: 1900000,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    categoria: "Vestidos",
    marca: "Alexander McQueen",
    genero: "Mujer"
  },
  {
    id: 20,
    nombre: "Lace Mini Dress Negro",
    descripcion: "Vestido mini de encaje en negro",
    precio: 1700000,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    categoria: "Vestidos",
    marca: "Alexander McQueen",
    genero: "Mujer"
  },
  {
    id: 21,
    nombre: "Asymmetric Drape Dress Azul",
    descripcion: "Vestido drapeado asimétrico en azul",
    precio: 1850000,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    categoria: "Vestidos",
    marca: "Alexander McQueen",
    genero: "Mujer"
  },
  {
    id: 22,
    nombre: "The Le Classique Long Dress",
    descripcion: "Vestido largo clásico de Jean Paul Gaultier",
    precio: 2200000,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    categoria: "Vestidos",
    marca: "Jean Paul Gaultier",
    genero: "Mujer"
  },
  {
    id: 23,
    nombre: "The Le Male Long Dress",
    descripcion: "Vestido largo Le Male de Jean Paul Gaultier",
    precio: 2300000,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    categoria: "Vestidos",
    marca: "Jean Paul Gaultier",
    genero: "Mujer"
  },
  {
    id: 24,
    nombre: "The Corset Suit Jacket",
    descripcion: "Chaqueta de traje corset de Jean Paul Gaultier",
    precio: 2400000,
    imagen: "https://images.unsplash.com/photo-1591047990508-42e39c33ee5b?w=400&h=400&fit=crop",
    categoria: "Chaquetas",
    marca: "Jean Paul Gaultier",
    genero: "Mujer"
  },
  {
    id: 25,
    nombre: "Tabi Mirror Block Heel Boots",
    descripcion: "Botines Tabi con tacón espejo",
    precio: 1500000,
    imagen: "https://images.unsplash.com/photo-1543163521-9145f931371e?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Maison Margiela",
    genero: "Mujer"
  },
  {
    id: 26,
    nombre: "Tabi Sneakers Negras de Tela",
    descripcion: "Zapatillas Tabi negras en tela",
    precio: 1200000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Maison Margiela",
    genero: "Mujer"
  },
  {
    id: 27,
    nombre: "Bolso 5AC Classique Bianchetto Medium",
    descripcion: "Bolso 5AC Classique Bianchetto mediano",
    precio: 1700000,
    imagen: "https://images.unsplash.com/photo-1555620519-46d1e76dc4d0?w=400&h=400&fit=crop",
    categoria: "Bolsos",
    marca: "Maison Margiela",
    genero: "Mujer"
  },
  {
    id: 28,
    nombre: "America's Cup Sneaker Negro",
    descripcion: "Zapatilla America's Cup en negro",
    precio: 900000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Prada",
    genero: "Hombre"
  },
  {
    id: 29,
    nombre: "America's Cup Sneaker Rosa Alabastro",
    descripcion: "Zapatilla America's Cup en rosa alabastro",
    precio: 950000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Prada",
    genero: "Hombre"
  },
  {
    id: 30,
    nombre: "America's Cup Patent Leather Antracita",
    descripcion: "America's Cup en cuero patente antracita",
    precio: 1000000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Prada",
    genero: "Mujer"
  },
  {
    id: 31,
    nombre: "America's Cup Patent Leather Negro",
    descripcion: "America's Cup en cuero patente negro",
    precio: 1000000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Prada",
    genero: "Mujer"
  },
  {
    id: 32,
    nombre: "La Casquette Bob Marin Jaune",
    descripcion: "Gorra bob marinera amarilla de Jean Paul Gaultier",
    precio: 550000,
    imagen: "https://images.unsplash.com/photo-1551716679-9c6ae9dec224?w=400&h=400&fit=crop",
    categoria: "Accesorios",
    marca: "Jean Paul Gaultier",
    genero: "Unisex"
  },
  {
    id: 33,
    nombre: "Boina de Lana Gruesa",
    descripcion: "Boina de lana gruesa de Maison Margiela",
    precio: 450000,
    imagen: "https://images.unsplash.com/photo-1551716679-9c6ae9dec224?w=400&h=400&fit=crop",
    categoria: "Accesorios",
    marca: "Maison Margiela",
    genero: "Unisex"
  },
  {
    id: 34,
    nombre: "Le City Bag Small Blue",
    descripcion: "Bolso Le City pequeño en azul de Balenciaga",
    precio: 1450000,
    imagen: "https://images.unsplash.com/photo-1555620519-46d1e76dc4d0?w=400&h=400&fit=crop",
    categoria: "Bolsos",
    marca: "Balenciaga",
    genero: "Unisex"
  },
  {
    id: 35,
    nombre: "Paradigme EDP 100ml",
    descripcion: "Perfume Paradigme 100ml de Prada",
    precio: 850000,
    imagen: "https://images.unsplash.com/photo-1547318369-7ebc0d2d237c?w=400&h=400&fit=crop",
    categoria: "Accesorios",
    marca: "Prada",
    genero: "Unisex"
  },
  {
    id: 36,
    nombre: "Gabrio Sunglasses Green",
    descripcion: "Gafas Gabrio en verde de Vivienne Westwood",
    precio: 680000,
    imagen: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    categoria: "Accesorios",
    marca: "Vivienne Westwood",
    genero: "Unisex"
  },
  {
    id: 37,
    nombre: "Sunday Dress Negro",
    descripcion: "Vestido Sunday en negro de Vivienne Westwood",
    precio: 1350000,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    categoria: "Vestidos",
    marca: "Vivienne Westwood",
    genero: "Mujer"
  },
  {
    id: 38,
    nombre: "Empire Boot Negro",
    descripcion: "Bota Empire en negro de Vivienne Westwood",
    precio: 1200000,
    imagen: "https://images.unsplash.com/photo-1543163521-9145f931371e?w=400&h=400&fit=crop",
    categoria: "Calzado",
    marca: "Vivienne Westwood",
    genero: "Mujer"
  },
];

// ===== SELECTORES DEL DOM =====

// Contenedor vacío del grid — aquí se inyectarán las tarjetas
const contenedor = document.getElementById("contenedor-productos");

// Input de búsqueda por nombre
const inputBuscador = document.getElementById("buscador-productos");

// Select de ordenamiento por precio
const selectOrden = document.getElementById("filtro-orden");

// Selectores de filtros adicionales
const selectCategoria = document.getElementById("filtro-categoria");
const selectMarca = document.getElementById("filtro-marca");
const selectGenero = document.getElementById("filtro-genero");

// Párrafo que muestra cuántos productos están visibles
const contadorProductos = document.getElementById("contador-productos");

// Botón y menú móvil del header
const botonMenu = document.getElementById("menu-toggle");
const menuMovil = document.getElementById("mobileMenu");

// ===== CREAR TARJETA =====

function crearTarjeta(producto) {
  const tarjeta = document.createElement("div");
  tarjeta.className =
    "bg-white border-2 border-gray-300 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-archi-cyan";
  tarjeta.dataset.id = producto.id;

  const contenedorImg = document.createElement("div");
  contenedorImg.className =
    "w-full h-[300px] md:h-[250px] overflow-hidden bg-gray-50 flex items-center justify-center";

  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.className =
    "w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105";

  contenedorImg.appendChild(img);

  const info = document.createElement("div");
  info.className = "p-5 flex flex-col flex-grow";

  const nombre = document.createElement("h3");
  nombre.className = "text-archi-blue text-xl mb-2.5 font-bold";
  nombre.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.className = "text-gray-600 text-sm mb-4 flex-grow";
  descripcion.textContent = producto.descripcion;

  const precio = document.createElement("p");
  precio.className = "text-archi-dark text-2xl font-bold mb-4";
  precio.textContent = "$" + producto.precio.toLocaleString("es-CO");

  const boton = document.createElement("button");
  boton.className =
    "bg-archi-cyan text-archi-dark py-3 px-5 border-none rounded-lg text-base font-bold cursor-pointer transition-colors duration-300 w-full hover:bg-archi-light-cyan btn-comprar";
  boton.textContent = "Comprar";

  info.appendChild(nombre);
  info.appendChild(descripcion);
  info.appendChild(precio);
  info.appendChild(boton);

  tarjeta.appendChild(contenedorImg);
  tarjeta.appendChild(info);

  return tarjeta;
}

// ===== POBLACIÓN DINÁMICA DE SELECTS =====

function llenarSelectUnico(select, array, key) {
  const opciones = Array.from(new Set(array.map(p => p[key]).filter(Boolean)));
  opciones.sort();
  opciones.forEach(op => {
    const option = document.createElement("option");
    option.value = op;
    option.textContent = op;
    select.appendChild(option);
  });
}

// Llenar los selectores con las opciones disponibles
llenarSelectUnico(selectCategoria, productos, "categoria");
llenarSelectUnico(selectMarca, productos, "marca");
llenarSelectUnico(selectGenero, productos, "genero");

// ===== RENDERIZADO =====

function renderizarProductos(lista) {
  contenedor.innerHTML = "";

  contadorProductos.textContent =
    lista.length === productos.length
      ? `Mostrando ${lista.length} productos`
      : `Mostrando ${lista.length} de ${productos.length} productos`;

  if (lista.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.className = "text-gray-400 text-center col-span-3 py-10";
    mensaje.textContent = "No se encontraron productos con esos criterios.";
    contenedor.appendChild(mensaje);
    return;
  }

  lista.forEach(function (producto) {
    const tarjeta = crearTarjeta(producto);
    contenedor.appendChild(tarjeta);
  });
}

// ===== FILTRO Y ORDEN =====

function aplicarFiltros() {
  const termino = inputBuscador.value.trim().toLowerCase();
  const orden = selectOrden.value;
  const categoria = selectCategoria.value;
  const marca = selectMarca.value;
  const genero = selectGenero.value;

  let resultado = productos.filter(function (p) {
    const coincideNombre = p.nombre.toLowerCase().includes(termino);
    const coincideCategoria = categoria === "default" || (p.categoria && p.categoria === categoria);
    const coincideMarca = marca === "default" || (p.marca && p.marca === marca);
    const coincideGenero = genero === "default" || (p.genero && p.genero === genero);

    return coincideNombre && coincideCategoria && coincideMarca && coincideGenero;
  });

  if (orden === "menor") {
    resultado.sort(function (a, b) {
      return a.precio - b.precio;
    });
  } else if (orden === "mayor") {
    resultado.sort(function (a, b) {
      return b.precio - a.precio;
    });
  }

  renderizarProductos(resultado);
}

// ===== EVENTOS DE FILTRO =====

inputBuscador.addEventListener("input", function () {
  aplicarFiltros();
});

selectOrden.addEventListener("change", function () {
  aplicarFiltros();
});

selectCategoria.addEventListener("change", function () {
  aplicarFiltros();
});

selectMarca.addEventListener("change", function () {
  aplicarFiltros();
});

selectGenero.addEventListener("change", function () {
  aplicarFiltros();
});

// ===== DELEGACIÓN DE EVENTOS =====

contenedor.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-comprar")) {

    const tarjeta = e.target.parentElement.parentElement;
    const idProducto = Number(tarjeta.dataset.id);

    const productoSeleccionado = productos.filter(function (p) {
      return p.id === idProducto;
    })[0];

    e.target.textContent = "✓ Agregado";
    e.target.style.backgroundColor = "#C2E7D9";

    setTimeout(function () {
      e.target.textContent = "Comprar";
      e.target.style.backgroundColor = "";
    }, 1500);

    console.log("Producto agregado:", productoSeleccionado.nombre, "-", "$" + productoSeleccionado.precio.toLocaleString("es-CO"));
  }
});

// ===== INICIALIZACIÓN =====

if (botonMenu && menuMovil) {
  botonMenu.addEventListener("click", function () {
    menuMovil.classList.toggle("hidden");
  });
}

renderizarProductos(productos);