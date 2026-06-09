# Pokédex — Proyecto Frontend

Aplicación web que consume la [PokéAPI](https://pokeapi.co) para mostrar los primeros 151 Pokémon en tarjetas interactivas con diseño temático.

---

## Cómo usar

1. Abrir `index.html` en el navegador.
2. Hacer clic en el botón **Pokébola** en el centro de la pantalla.
3. La app cargará los 151 Pokémon de la primera generación mostrando nombre, imagen, tipos y estadísticas base.

---

## Estructura del proyecto

```
proyecto/
├── index.html    # Estructura HTML de la página
├── styles.css    # Estilos y diseño temático Pokémon
├── main.js       # Lógica asíncrona, fetch y manipulación del DOM
└── README.md     # Este archivo
```

---

## Criterios de entrega cumplidos

### 1. Consumo asíncrono (Fetch API)
El botón Pokébola dispara la función `cargarPokemons()`, la cual realiza:
- Un primer `fetch()` al endpoint `/pokemon?limit=151` para obtener la lista.
- Un `fetch()` por cada Pokémon usando `Promise.all()` para obtener sus datos detallados en paralelo.

### 2. Manejo de promesas — async/await + try/catch
```js
async function cargarPokemons() {
  try {
    const respuesta = await fetch(`${URL_BASE}?limit=${CANTIDAD}&offset=0`);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    // ...procesamiento de datos...
  } catch (error) {
    mostrarEstado('No se pudieron cargar los datos. Intenta más tarde.', 'error');
  }
}
```

### 3. Manejo de carga
Al iniciarse la solicitud se muestra `"Cargando Pokémon..."` en el DOM mediante la función `mostrarEstado()`. El mensaje desaparece con `ocultarEstado()` al finalizar la carga exitosa.

### 4. Manejo de errores
- Bloque `try...catch` envuelve toda la lógica asíncrona.
- En caso de error (red caída, API no disponible, respuesta no-OK) se muestra un mensaje amigable en el DOM: _"No se pudieron cargar los datos. Intenta más tarde."_

### 5. Actualización del DOM
Una vez recibidos los datos:
- Se borra el mensaje de "Cargando...".
- Se usa `createElement`, `classList.add`, `appendChild`, etc. para construir dinámicamente cada `<article>` con la información de cada Pokémon.

---

## Documento de Integración — Relación Frontend / Backend

### Escenario
En un entorno de producción real, este frontend no consumiría directamente la PokéAPI externa, sino una **API propia** construida en el backend del equipo (ej. Spring Boot).

### Flujo de integración

```
[Navegador / Frontend]
        |
        | HTTP GET /api/pokemon?limit=151
        ↓
[Backend — Spring Boot]
        |
        | Consulta a base de datos (PostgreSQL / H2)
        | o actúa como proxy hacia PokéAPI
        ↓
[Respuesta JSON]
        |
        ↓
[Frontend renderiza tarjetas en el DOM]
```

### Cambio necesario en el código

Actualmente el frontend apunta a:
```js
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon';
```

Con un backend propio, se cambiaría a:
```js
const URL_BASE = 'http://localhost:8080/api/pokemon';
// o en producción:
const URL_BASE = 'https://mi-servidor.com/api/pokemon';
```

### Contrato de API esperado

El backend debe responder en el mismo formato que PokéAPI (o uno compatible), con al menos:

```json
{
  "results": [
    { "name": "bulbasaur", "url": "http://localhost:8080/api/pokemon/1" },
    { "name": "ivysaur",   "url": "http://localhost:8080/api/pokemon/2" }
  ]
}
```

Y cada endpoint de detalle (`/api/pokemon/{id}`) debe incluir:
- `id`, `name`
- `types[]` → `type.name`
- `stats[]` → `stat.name`, `base_stat`
- `sprites.other.official-artwork.front_default`

### CORS
El backend debe habilitar CORS para permitir peticiones desde el dominio del frontend:
```java
// Spring Boot — ejemplo con @CrossOrigin
@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/api/pokemon")
public class PokemonController { ... }
```

---

## Tecnologías usadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Diseño, variables, animaciones |
| JavaScript ES2017+ | Lógica, `async/await`, DOM |
| Fetch API | Peticiones HTTP asíncronas |
| PokéAPI | Fuente de datos |
| Google Fonts | Tipografías (Press Start 2P, Nunito) |



