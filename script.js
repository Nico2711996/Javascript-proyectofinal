/* let productos = [
    {
        id: 1,
        nombreProducto: "Termo negro",
        descripcion: "Termo negro Stanley",
        precio: 20000,
        imagen: "./img/messirve.jpg",
    },
    {
        id: 2,
        nombreProducto: "Termo rosa",
        descripcion: "Termo rosa Stanley",
        precio: 25000,
        imagen: "./img/messirve.jpg",
    },
    {
        id: 3,
        nombreProducto: "Termo verde",
        descripcion: "Termo verde Stanley",
        precio: 20000,
        imagen: "./img/messirve.jpg",
    },
    {
        id: 4,
        nombreProducto: "Termo blanco",
        descripcion: "Termo blanco Stanley",
        precio: 20000,
        imagen: "./img/messirve.jpg",
    },
    {
        id: 5,
        nombreProducto: "Termo azul",
        descripcion: "Termo azul Stanley",
        precio: 25000,
        imagen: "./img/messirve.jpg",
    },
    {
        id: 6,
        nombreProducto: "Termo rojo",
        descripcion: "Termo rojo Stanley",
        precio: 20000,
        imagen: "./img/messirve.jpg",
    }
] */

let productosCards = document.getElementById("productCards")
let carrito = [];

fetch("./productos.json")
    .then(response => response.json())
    .then(productos => {


for (let i = 0; i < productos.length; i++) {
    let producto = productos [i]
    let cardBootstrap = `
    <div class="col-md-4 mb-4">
    <div class="card">
        <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
        <div class="card-body">
            <h5 class="card-title">${producto.descripcion}</h5>
            <p class="card-text">Precio: ${producto.precio.toFixed(2)}</p>
            <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0">
            <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
        </div>
    </div>
</div>
`;
  productosCards.innerHTML += cardBootstrap;
}
})


let cantidadInputs = document.querySelectorAll('input [type="number"]')

for (let i = 0; i < cantidadInputs.length; i++) {
    let input = cantidadInputs[i]
    input.addEventListener("input", actualizarCantidad)   
}

let agregarButtons = document.getElementsByClassName("btn-agregar-carrito")

for (let i = 0; i < agregarButtons.length; i++) {
    let button = agregarButtons[i] 
    button.addEventListener("click", agregarAlCarrito)
}

function actualizarCantidad (event) {
    let input = event.target
    let productoId = input.getAttribute("data-producto-id")
    let cantidad = parseInt(input.value)

    let producto = productos.find((producto) => producto.id == parseInt(producto.id))
    producto.cantidad = cantidad
}

function agregarAlCarrito(event) {
    let button = event.target
    let productoId = button.getAttribute("data-producto-id")

    let producto = productos.find((producto) => producto.id == parseInt(productoId))
    let productoEnCarrito = carrito.find((item) => item.id == producto.id)

    if (productoEnCarrito) {
        productoEnCarrito += producto.cantidad
    }else{
        carrito.push({...producto})
    }
    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado al carrito!',
        text: `${producto.descripcion} ha sido agregado al carrito.`,
        showConfirmButton: false,
        timer: 3000
    });

    console.log("Poducto agregado al carrito. ID: " + productoId)
    console.log("Carrito", carrito)
}


/* DARK MODE  */

let boton = document.querySelector("#boton")

boton.addEventListener("click", function(){
if (localStorage.getItem("theme") == "dark") {
    lightmode()
}else{
    darkMode()
}
})

document.addEventListener("DOMContentLoaded", function(){
if (localStorage.getItem("theme") == "dark") {
    darkMode()
}else{
    lightmode()
}
})
function darkMode () {
let body = document.querySelector("body")
/* body.style.backgroundColor = "black" */
body.classList.add("dark-theme")

let titulo = document.querySelector("#titulo")
/* titulo.style.color = "white" */
titulo.classList.add("dark-text")

localStorage.setItem("theme", "dark")
}


function lightmode () {
    let body = document.querySelector("body")
    /* body.style.backgroundColor = "white" */
    body.classList.remove("dark-theme")
    
    let titulo = document.querySelector("#titulo")
    /* titulo.style.color = "black" */
    titulo.classList.remove("dark-text")
    localStorage.setItem("theme", "light")           
    }

    /* BUSCADOR */

    let buscador = document.getElementById("search-button");

    buscador.addEventListener("click", function () {
        let searchInput = document.getElementById("search-input").value.toLowerCase();
        let productosFiltrados = productos.filter(producto => producto.nombreProducto.toLowerCase().includes(searchInput));
    
        mostrarProductosFiltrados(productosFiltrados);
    });

    function mostrarProductosFiltrados(products) {
        productosCards.innerHTML = "";
    
        products.forEach(producto => {
            let cardBootstrap = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
                    <div class="card-body">
                        <h5 class="card-title">${producto.descripcion}</h5>
                        <p class="card-text">Precio: ${producto.precio.toFixed(2)}</p>
                        <input type="number" class="form-control mb-2" placeholder="Cantidad" value="0">
                        <button class="btn btn-agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            `;
    
            productosCards.innerHTML += cardBootstrap;
        });
    }
    
