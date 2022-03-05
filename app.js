//import { PRODUCTS } from "./getdata.JSON";//

let carritoDeCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");

const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

const selectCategoria = document.getElementById("selectCategoria");

selectCategoria.addEventListener("change", () => {
  console.log(selectCategoria.value);
  selectCategoria.value == "all"
    ? mostrarProductos(stockProductos)
    : mostrarProductos(
        stockProductos.filter(
          (elemento) => elemento.categoria == selectCategoria.value
        )
      );
});

mostrarProductos(stockProductos);

function mostrarProductos(array) {
  contenedorProductos.innerHTML = "";

  array.forEach((producto) => {
    const {
      img: imagen,
      nombre,
      color,
      id,
      desc,
      categoria,
      precio,
    } = producto;

    let div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
                        <div class="card">
                        <div class="card-image">
                            <img src=${imagen}>
                            <span class="card-title">${nombre}</span>
                            <a id="botonAgregar${id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${desc}</p>
                           ${
                             categoria
                               ? `<p>Categoria: ${categoria}</p>`
                               : `<p>Color:${color}</p>`
                           }
                            <p> $${precio}</p>
                        </div>
                    </div>
        `;
    contenedorProductos.appendChild(div);

    let btnAgregar = document.getElementById(`botonAgregar${producto.id}`);
    // console.log(btnAgregar)

    btnAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
      Toastify({
        text: " 🛒 Agregaste el cereal al carrito",
        className: "info",
        style: {
          background: "orange",
        },
      }).showToast();
    });
  });
}

function agregarAlCarrito(id) {
  let agregarProducto = stockProductos.find((item) => item.id == id);

  carritoDeCompras = [...carritoDeCompras, agregarProducto];

  actualizarCarrito();
  mostrarCarrito(agregarProducto);
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

function mostrarCarrito(agregarProducto) {
  let div = document.createElement("div");
  div.className = "productoEnCarrito";
  div.innerHTML = `
                    <p>${agregarProducto.nombre}</p>
                    <p>Precio: $${agregarProducto.precio}</p>
                    <p>Cantidad: ${agregarProducto.cantidad}</p>
                    <button id="btnEliminar${agregarProducto.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`;

  contenedorCarrito.appendChild(div);

  let btnEliminar = document.getElementById(`btnEliminar${agregarProducto.id}`);

  btnEliminar.addEventListener("click", () => {
    Toastify({
      text: " ❌ Quitaste el cereal del carrito",
      className: "info",
      style: {
        background: "red",
      },

      avatar: `${agregarProducto.img}`,
    }).showToast();
    btnEliminar.parentElement.remove();
    carritoDeCompras = carritoDeCompras.filter(
      (elemento) => elemento.id != agregarProducto.id
    );
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
  });
}

function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
}

function recueperar() {
  let recueperarLS = JSON.parse(localStorage.getItem("carrito")); //null undefined,false, 0 ," "... falsy

  recueperarLS &&
    recueperarLS.forEach((elemento) => {
      mostrarCarrito(elemento);
      carritoDeCompras.push(elemento);
      actualizarCarrito();
    });

  let arrayNuevo = [...stockProductos, ...carritoDeCompras];

  console.log(arrayNuevo);
}

recueperar();
