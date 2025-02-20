/**
 * Arreglo de objetos que contiene la información de los productos.
 * Cada objeto representa un producto con sus propiedades:
 * - nombre: El nombre descriptivo del producto.
 * - tipo: La categoría del producto (ej: "zapato" o "bota").
 * - color: El color del producto.
 * - img: La ruta de la imagen asociada al producto.
 */
const productos = [
    { nombre: "Zapato negro", tipo: "zapato", color: "negro", img: "./assets/images/taco-negro.jpg" },
    { nombre: "Zapato azul", tipo: "zapato", color: "azul", img: "./assets/images/taco-azul.jpg" },
    { nombre: "Bota negra", tipo: "bota", color: "negro", img: "./assets/images/bota-negra.jpg" },
    { nombre: "Bota azul", tipo: "bota", color: "azul", img: "./assets/images/bota-azul.jpg" },
    { nombre: "Zapato rojo", tipo: "zapato", color: "rojo", img: "./assets/images/zapato-rojo.jpg" }
];

/**
 * Referencias a elementos del DOM.
 * Se utilizan para manipular la interfaz del usuario.
 */
// Se obtiene el contenedor donde se mostrarán los productos utilizando su id,
// ya que se garantiza que este id sea único en el documento.
const listaDeProductos = document.getElementById("lista-de-productos");

// Se selecciona el input de búsqueda utilizando la clase "input" definida en el HTML.
// Esto permitirá capturar el texto que el usuario ingresa para filtrar los productos.
const inputBusqueda = document.querySelector(".input");

// Se selecciona el botón que activará el filtrado cuando se haga clic.
const botonDeFiltro = document.querySelector("button");

/**
 * Función que crea y retorna un elemento HTML para representar un producto.
 * Esta función encapsula la creación de la estructura visual de cada producto.
 *
 * @param {Object} producto - Objeto que contiene los datos del producto (nombre, tipo, color, img).
 * @returns {HTMLElement} - Elemento <div> con la clase "producto" que incluye un párrafo para el nombre y una imagen.
 */
const crearElementoProducto = (producto) => {
    // Se crea un contenedor <div> para el producto y se le asigna la clase "producto"
    // para aplicar estilos CSS específicos.
    const contenedorProducto = document.createElement("div");
    contenedorProducto.classList.add("producto");

    // Se crea un elemento <p> que mostrará el nombre del producto.
    const tituloProducto = document.createElement("p");
    tituloProducto.classList.add("titulo");
    tituloProducto.textContent = producto.nombre;

    // Se crea un elemento <img> y se asigna la ruta de la imagen del producto.
    const imagenProducto = document.createElement("img");
    imagenProducto.setAttribute("src", producto.img);

    // Se agrega el título y la imagen al contenedor del producto.
    contenedorProducto.appendChild(tituloProducto);
    contenedorProducto.appendChild(imagenProducto);

    // Se retorna el contenedor completo, listo para ser insertado en el DOM.
    return contenedorProducto;
};

/**
 * Función para mostrar los productos en la página.
 * Se encarga de limpiar el contenedor actual y renderizar los elementos HTML
 * correspondientes a cada producto del arreglo recibido.
 *
 * @param {Array} productosArray - Arreglo de productos que se desea mostrar.
 */
const displayProductos = (productosArray) => {
    // Se limpia el contenido del contenedor para evitar duplicados.
    listaDeProductos.innerHTML = "";

    // Se recorre el arreglo de productos y se crea un elemento HTML para cada uno,
    // utilizando la función crearElementoProducto, luego se añade al contenedor.
    productosArray.forEach((producto) => {
        const elementoProducto = crearElementoProducto(producto);
        listaDeProductos.appendChild(elementoProducto);
    });
};

/**
 * Función para filtrar el arreglo de productos según el texto ingresado por el usuario.
 * La búsqueda se realiza sobre los campos "tipo" y "color" de cada producto.
 *
 * @param {Array} productosArray - Arreglo de productos a filtrar.
 * @param {string} texto - Texto ingresado por el usuario que se usará para filtrar.
 * @returns {Array} - Nuevo arreglo con los productos que cumplen la condición del filtrado.
 */
const filtrado = (productosArray, texto) => {
    // Se convierte el texto ingresado a minúsculas para que la búsqueda no distinga entre mayúsculas y minúsculas.
    const textoMinuscula = texto.toLowerCase();

    // Se utiliza el método filter para retornar solo los productos cuyo 'tipo' o 'color'
    // contienen el texto ingresado. Se compara en minúsculas para asegurar consistencia.
    return productosArray.filter(producto =>
        producto.tipo.toLowerCase().includes(textoMinuscula) ||
        producto.color.toLowerCase().includes(textoMinuscula)
    );
};

// Al cargar la página, se muestran todos los productos disponibles.
displayProductos(productos);

// Se añade un listener al botón para que, al hacer clic, se ejecute el filtrado.
// Esto permite al usuario buscar productos en función del texto ingresado en el input.
botonDeFiltro.addEventListener("click", () => {
    // Se obtiene el valor actual del input de búsqueda.
    const textoBusqueda = inputBusqueda.value;

    // Se filtran los productos utilizando la función filtrado,
    // pasando el arreglo completo y el texto ingresado.
    const productosFiltrados = filtrado(productos, textoBusqueda);

    // Se actualiza la visualización de productos mostrando únicamente los filtrados.
    displayProductos(productosFiltrados);
});