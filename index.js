window.onload = () => {

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

// ========================================

//boton para desplegar menu hamburguesa
let $botonMenu = $("#boton-hamburguesa")
// contenedor botones menu hamburguesa
let $modalBotones = $("#botones-hamburguesa")


// =========================================

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


// ===========================================

// VISTAS

// secciones
let $sectionVistaBalance = $("#vista-balance");
let $sectionVistaCategorias = $("#vista-categorias");
let $sectionVistaReportes = $("#vista-reportes");

// botones para vistas
let $btnVistaBalance = $("#balance");
let $btnVistaCategorias = $("#categorias");
let $btnVistaReportes = $("#reportes")

// cambiar vistas

// Ocultar un elemento
$btnVistaCategorias.addEventListener("click", () => {
$sectionVistaCategorias.style.display = "flex";
$sectionVistaReportes.style.display = "none";
$sectionVistaBalance.style.display = "none";
});

$btnVistaBalance.addEventListener("click", () => {
  $sectionVistaBalance.style.display = "flex";
  $sectionVistaReportes.style.display = "none";
  $sectionVistaCategorias.style.display = "none";
});

$btnVistaReportes.addEventListener("click", () => {
  $sectionVistaReportes.style.display = "flex";
  $sectionVistaCategorias.style.display = "none";
  $sectionVistaBalance.style.display = "none";
});



// element.style.display = "none";  // JavaScript puro
// $("#elemento").hide();           // jQuery

// // Mostrar un elemento 
// element.style.display = "block"; // JavaScript puro
// $("#elemento").show();







// $btnVistaBalance.addEventListener("click", () => {
//   showElement([$sectionVistaBalance]);
//   hideElement([$sectionVistaCategorias, $sectionVistaReportes])
// })

// $btnVistaCategorias.addEventListener("click", () => {
//   showElement([$sectionVistaCategorias]);
//   hideElement([$sectionVistaBalance, $sectionVistaReportes])
// })

// $btnVistaReportes.addEventListener("click", () => {
//   showElement([$sectionVistaReportes]);
//   hideElement([$sectionVistaCategorias, $sectionVistaBalance])
// })
// $("#button-view-home").addEventListener("click", () => {
//   showElement([$sectionViewHome])
//   hideElement([$sectionViewVenta, $sectionViewReporte])
// })


// NUEVA OPERACION

//boton nueva operacion
let $botonNuevaOp = $$(".boton-nueva-op");

//cards vistas
let $cardSinOp = $("#card-sin-operaciones");
let $cardNuevaOp = $("#vista-nueva-op");
let $cardOpActivas = $("#operaciones-activas")

// $botonNuevaOp.addEventListener("click", () => {
// $cardNuevaOp.classList.toggle("hidden")
// })


// $("#button-view-home").addEventListener("click", () => {
//   showElement([$sectionViewHome])
//   hideElement([$sectionViewVenta, $sectionViewReporte])
// })

// cuando hago click en el boton nueva operacion pasan las siguientes cosas
// + se abre la vista nueva operacion con el formulario para rellenar la operacion
// + se oculta la vista balance o la vista operaciones activas









// CLASES 

// $modoOscuro.addEventListener("click", () => {
//     if($body.classList.contains("modo-claro")) {
//         $body.classList.remove("modo-claro")
//         $body.classList.add("modo-oscuro");
//         $modoOscuro.style.display = "none";
//         $modoClaro.style.display = "flex"
//     }
// })



}



