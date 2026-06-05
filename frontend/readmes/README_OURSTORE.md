Documento de Integración FrontEnd - BackEnd
Descripción General

La aplicación FrontEnd consume una API REST desarrollada y almacenada en MockAPI para obtener información dinámica sobre marcas y tiendas del proyecto Remainders COL.

La comunicación entre el FrontEnd y el BackEnd se realiza mediante peticiones HTTP utilizando fetch() en JavaScript.

Arquitectura de Integración
FrontEnd

Tecnologías utilizadas:

HTML5
TailwindCSS
JavaScript Vanilla

Responsabilidades del FrontEnd:

Mostrar la interfaz visual.
Consumir la API.
Renderizar dinámicamente las marcas y tiendas.
Filtrar información.
Mostrar loaders y estados de carga.
BackEnd (API)

La API fue desarrollada utilizando MockAPI como servicio REST.

URL base de la API:

https://6a0f75e0d2a9857070357693.mockapi.io/api/remainders

Responsabilidades del BackEnd:

Almacenar la información.
Retornar datos en formato JSON.
Gestionar endpoints de marcas y tiendas.
Comunicación FrontEnd - BackEnd

La comunicación se realiza mediante peticiones GET utilizando fetch().

Ejemplo:

const response = await fetch(`${URI_API}/brands`);
const brands = await response.json();
Flujo de Funcionamiento
1. Obtención de marcas

Cuando el usuario presiona el botón:

fetchBtn.addEventListener('click')

El FrontEnd realiza una petición GET a:

/api/remainders/brands

La API responde con un arreglo JSON de marcas.

Ejemplo de respuesta:

[
  {
    "storeName": "Nike",
    "description": "Ropa deportiva",
    "logo": "url",
    "mainImage": "url"
  }
]
2. Renderizado dinámico

El FrontEnd recibe los datos y crea dinámicamente tarjetas HTML utilizando JavaScript:

const cardBrand = document.createElement('a');

Estas tarjetas muestran:

Imagen principal
Logo
Nombre
Descripción
Tipo de marca
3. Consulta de tiendas

Cuando el usuario selecciona una marca:

cardBrand.addEventListener('click')

El FrontEnd realiza otra petición GET:

/api/remainders/brandStores

Posteriormente se filtran las tiendas relacionadas mediante:

const filteredStores = stores.filter(
    store => store.brandSlug === selectedBrandSlug
);
Relación entre FrontEnd y BackEnd
FrontEnd	BackEnd
Solicita datos mediante fetch()	Responde peticiones HTTP
Consume endpoints REST	Expone endpoints REST
Renderiza información dinámica	Almacena información
Filtra y muestra tiendas	Entrega datos en formato JSON
Endpoints Consumidos
Obtener marcas
GET /brands
Obtener tiendas
GET /brandStores
Manejo de Estados

El FrontEnd implementa:

Loaders de carga.
Manejo de errores.
Bloqueo temporal del botón mientras carga información.

Ejemplo:

fetchBtn.disabled = true;
Tecnologías de Comunicación
Tecnología	Uso
fetch API	Consumo de API
JSON	Intercambio de datos
HTTP	Comunicación cliente-servidor
Resultado Final

Gracias a esta integración:

El FrontEnd obtiene información dinámica desde la API.
Los datos pueden actualizarse sin modificar el código visual.
La aplicación queda desacoplada entre interfaz y almacenamiento de datos.
El sistema simula una arquitectura real cliente-servidor.