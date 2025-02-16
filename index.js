
// "CATEGORIA CON MAYOR GANANCIA"
// REDUCE PARA CADA CATEGORIA PARA OBTENER UN TOTAL Y HACER COMPARACION


// selector de clases
function $$(selector) {
    return document.querySelectorAll(selector);
  }

// selector de id
function $(selector) {
    return document.querySelector(selector);
  }

//boton para desplegar menu hamburguesa
let $botonMenu = $("#boton-hamburguesa")

// contenedor botones 
let $modalBotones = $("#botones-hamburguesa")

// botones para vistas
let $btnVistaBalance = $$(".balance");
let $btnVistaCategorias = $$(".categorias");
let $btnVistaReportes = $$(".reportes")



// EVENTO CLICK menu hamburguesa
$botonMenu.addEventListener("click", () => {
    $modalBotones.classList.toggle("hidden")
})

// FORMA LARGA MENU HAMBURGUESA
// $botonMenu.addEventListener("click", () => {
//     if ($modalBotones.classList.contains("hidden")) {
//         $modalBotones.classList.remove("hidden")
//         $modalBotones.classList.add("flex")
//     } else if($modalBotones.classList.contains("flex")) {
//         $modalBotones.classList.remove("flex")
//         $modalBotones.classList.add("hidden")
//     }
// })


// CLASES 

// $modoOscuro.addEventListener("click", () => {
//     if($body.classList.contains("modo-claro")) {
//         $body.classList.remove("modo-claro")
//         $body.classList.add("modo-oscuro");
//         $modoOscuro.style.display = "none";
//         $modoClaro.style.display = "flex"
//     }
// })