const URL_BASE = 'https://pokeapi.co/api/v2/pokemon';
const CANTIDAD = 135;

const btnCargar = document.getElementById('btnCargar');
const zonaEstado = document.getElementById('zonaEstado');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const musicaFondo = document.getElementById('musicaFondo');
const btnPausa = document.getElementById('btnPausa');
const controlMusica = document.getElementById('controlMusica');

const COLORES_ESTADISTICAS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff', '#ff9a3c'];


// Traducción de los tipos de Pokémon
const TRADUCCIONES_TIPO = {
  fire: 'fuego', water: 'agua', grass: 'planta', electric: 'electrico',
  psychic: 'psiquico', ice: 'hielo', dragon: 'dragon', dark: 'oscuro',
  fairy: 'hada', fighting: 'lucha', poison: 'veneno', ground: 'tierra',
  flying: 'volador', bug: 'bicho', rock: 'roca', ghost: 'fantasma',
  steel: 'acero', normal: 'normal'
};

//Abreviar estadisticas
const NOMBRES_ESTADISTICAS = {
  hp: 'HP', attack: 'ATK', defense: 'DEF',
  'special-attack': 'SAT', 'special-defense': 'SDE', speed: 'SPD'
};

// Función para mostrar mensajes de estado (cargando, error, etc.)
function mostrarEstado(mensaje, tipo) {
  zonaEstado.textContent = '';
  zonaEstado.className = 'zona-estado';
  zonaEstado.classList.add(`zona-estado--${tipo}`);
  zonaEstado.classList.remove('oculto');
  zonaEstado.textContent = mensaje;
}

// Función para ocultar el mensaje de estado
function ocultarEstado() {
  zonaEstado.classList.add('oculto');
  zonaEstado.className = 'zona-estado oculto';
}

// Función para obtener el color asociado a un tipo de Pokémon
function obtenerColorTipo(tipo) {
  const mapa = {
    fire: '#ff6b35', water: '#4fc3f7', grass: '#56c15f', electric: '#f9d71c',
    psychic: '#f85888', ice: '#96d9d6', dragon: '#7038f8', dark: '#705848',
    fairy: '#ee99ac', fighting: '#c03028', poison: '#a040a0', ground: '#e0c068',
    flying: '#a890f0', bug: '#a8b820', rock: '#b8a038', ghost: '#705898',
    steel: '#b8b8d0', normal: '#a8a878'
  };
  return mapa[tipo] || '#888';
}

// Función para crear la tarjeta de un Pokémon a partir de sus datos
function crearTarjetaPokemon(datos) {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('tarjeta');

  const tipoPrincipal = datos.types[0].type.name;
  const colorPrimario = obtenerColorTipo(tipoPrincipal);
  
  tarjeta.style.borderColor = `${colorPrimario}55`;
  tarjeta.style.setProperty('--color-tipo', colorPrimario);
  tarjeta.addEventListener('mouseenter', () => {
    tarjeta.style.boxShadow = `0 16px 40px rgba(0,0,0,0.5), 0 0 30px ${colorPrimario}44`;
  });
  tarjeta.addEventListener('mouseleave', () => {
    tarjeta.style.boxShadow = '';
  });

  const fondoTipo = document.createElement('div');
  fondoTipo.classList.add('tarjeta__fondo-tipo');
  fondoTipo.style.background = `radial-gradient(circle at 50% 50%, ${colorPrimario}, transparent 70%)`;

  const numero = document.createElement('span');
  numero.classList.add('tarjeta__numero');
  numero.textContent = `#${String(datos.id).padStart(3, '0')}`;

  const imagenContenedor = document.createElement('div');
  imagenContenedor.classList.add('tarjeta__imagen-contenedor');

  const imagen = document.createElement('img');
  imagen.classList.add('tarjeta__imagen');
  const urlSprite = datos.sprites.other['official-artwork'].front_default || datos.sprites.front_default;
  imagen.src = urlSprite;
  imagen.alt = datos.name;
  imagen.loading = 'lazy';
  imagenContenedor.appendChild(imagen);

  const info = document.createElement('div');
  info.classList.add('tarjeta__info');

  const nombre = document.createElement('h2');
  nombre.classList.add('tarjeta__nombre');
  nombre.textContent = datos.name;

  const contenedorTipos = document.createElement('div');
  contenedorTipos.classList.add('tarjeta__tipos');
  datos.types.forEach(({ type }) => {
    const etiqueta = document.createElement('span');
    const nombreTipoES = TRADUCCIONES_TIPO[type.name] || type.name;
    etiqueta.classList.add('tipo-etiqueta', `tipo-${type.name}`);
    etiqueta.textContent = nombreTipoES;
    contenedorTipos.appendChild(etiqueta);
  });

  const contenedorStats = document.createElement('div');
  contenedorStats.classList.add('tarjeta__estadisticas');

  datos.stats.forEach((stat, indice) => {
    const nombreStat = NOMBRES_ESTADISTICAS[stat.stat.name] || stat.stat.name.toUpperCase();
    const valor = stat.base_stat;
    const porcentaje = Math.min((valor / 255) * 100, 100);

    const fila = document.createElement('div');
    fila.classList.add('estadistica');

    const nombreEl = document.createElement('span');
    nombreEl.classList.add('estadistica__nombre');
    nombreEl.textContent = nombreStat;

    const barraContenedor = document.createElement('div');
    barraContenedor.classList.add('estadistica__barra-contenedor');

    const barra = document.createElement('div');
    barra.classList.add('estadistica__barra');
    barra.style.width = '0%';
    barra.style.background = COLORES_ESTADISTICAS[indice] || colorPrimario;
    setTimeout(() => { barra.style.width = `${porcentaje}%`; }, 100 + indice * 80);

    barraContenedor.appendChild(barra);

    const valorEl = document.createElement('span');
    valorEl.classList.add('estadistica__valor');
    valorEl.textContent = valor;

    fila.appendChild(nombreEl);
    fila.appendChild(barraContenedor);
    fila.appendChild(valorEl);
    contenedorStats.appendChild(fila);
  });

  info.appendChild(nombre);
  info.appendChild(contenedorTipos);
  info.appendChild(contenedorStats);

  tarjeta.appendChild(fondoTipo);
  tarjeta.appendChild(numero);
  tarjeta.appendChild(imagenContenedor);
  tarjeta.appendChild(info);

  return tarjeta;
}

// Función para obtener los datos completos de un Pokémon a partir de su URL
async function obtenerDatosPokemon(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`Error al obtener ${url}: ${respuesta.status}`);
  return respuesta.json();
}

// Función principal para cargar los Pokémon y mostrar las tarjetas
async function cargarPokemons() {
  btnCargar.disabled = true;
  musicaFondo.play();
  controlMusica.classList.remove('oculto'); 
  contenedorTarjetas.innerHTML = '';
  mostrarEstado('Cargando Pokémon...', 'cargando');

  try {
    const respuestaLista = await fetch(`${URL_BASE}?limit=${CANTIDAD}&offset=251`);
    if (!respuestaLista.ok) throw new Error(`Error de red: ${respuestaLista.status}`);
    const listaJson = await respuestaLista.json();

    const promesas = listaJson.results.map(pokemon => obtenerDatosPokemon(pokemon.url));
    const todosLosPokemon = await Promise.all(promesas);

    ocultarEstado();

    todosLosPokemon.forEach((datos, indice) => {
      const tarjeta = crearTarjetaPokemon(datos);
      tarjeta.style.animationDelay = `${indice * 0.04}s`;
      contenedorTarjetas.appendChild(tarjeta);
    });

  } catch (error) {
    mostrarEstado('No se pudieron cargar los datos. Intenta más tarde.', 'error');
    console.error('Error al cargar Pokémon:', error);
  } finally {
    btnCargar.disabled = false;
  }
}

// Cargar Pokémon al hacer clic en el botón
btnCargar.addEventListener('click', cargarPokemons);

// Control de música de fondo
btnPausa.addEventListener('click', () => {
  if (musicaFondo.paused) {
    musicaFondo.play();
    btnPausa.textContent = '⏸ Pausa';
  } else {
    musicaFondo.pause();
    btnPausa.textContent = '▶ Reanudar';
  }
});
