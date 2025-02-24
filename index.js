// funciones de LocalStorage
import categorias from "./categorias.js";

function guardarEnLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
function leerLS(key) {
  const datos = JSON.parse(localStorage.getItem(key))
  return datos ? datos : [];
} 


// ==== selectores =============================

// selector de clases
function $$(selector) {
  return document.querySelectorAll(selector);
}
// selector de id
function $(selector) {
  return document.querySelector(selector);
}


// ==== menu hamburguesa ==========================

//boton para desplegar menu hamburguesa
let $botonMenu = $("#boton-hamburguesa")
// contenedor botones menu hamburguesa
let $modalBotones = $("#botones-hamburguesa")

// EVENTO CLICK menu hamburguesa
$botonMenu.addEventListener("click", () => {
  $modalBotones.classList.toggle("hidden")
})

// ==== vistas ==================================

// secciones
let $sectionVistaBalance = $("#vista-balance");
let $sectionVistaCategorias = $("#vista-categorias");
let $sectionVistaReportes = $("#vista-reportes");
// botones para vistas
let $btnVistaBalance = $$(".balance");
let $btnVistaCategorias = $$(".categorias");
let $btnVistaReportes = $$(".reportes")

// cambiar vistas
// funciones para mostrar y ocultar
function mostrarElemento(selectors) {
  for (const selector of selectors) {
    selector.classList.remove("hidden");
    selector.classList.add("flex");
  }
};
function ocultarElemento(selectors) {
  for (const selector of selectors) {
    selector.classList.add("hidden");
  }
};
//eventos click botones vistas
$btnVistaBalance.forEach(e => {
  e.addEventListener("click", () => {
    mostrarElemento([$sectionVistaBalance]);
    ocultarElemento([$sectionVistaReportes, $sectionVistaCategorias, $sectionNuevaOp, $modalBotones])
    });
})
$btnVistaCategorias.forEach(e => {
  e.addEventListener("click", () => {
    mostrarElemento([$sectionVistaCategorias]);
    ocultarElemento([$sectionVistaBalance, $sectionVistaReportes, $sectionNuevaOp, $modalBotones])
  });
})
$btnVistaReportes.forEach(e => {
  e.addEventListener("click", () => {
    mostrarElemento([$sectionVistaReportes]);
    ocultarElemento([$sectionVistaBalance, $sectionVistaCategorias, $sectionNuevaOp, $modalBotones])
  });
})


// ===== nueva operacion ============================================

//array vacio para guardar operaciones
let todasLasOp = []
//boton nueva operacion
let $botonNuevaOp = $$(".boton-nueva-op");
//boton agregar
let $botonAgregar = $("#boton-agregar")
//vistas
let $sectionNuevaOp = $("#nueva-op");
let $cardSinOp = $("#card-sin-operaciones")
let $vistaOpActivas = $("#card-operaciones-activas")
let $formAgregar = $("#form-agregar")

// evento click boton nuevaOp
$botonNuevaOp.forEach(e => {
  e.addEventListener("click", () => {
    mostrarElemento([$sectionNuevaOp]);
    ocultarElemento([$sectionVistaBalance]);
    });
})

// formulario nueva operacion
$formAgregar.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nuevaOp = {
    id: crypto.randomUUID(),
    descripcion: evento.target[0].value,
    monto: Number(evento.target[1].value),
    tipo: evento.target[2].value,
    categoria: evento.target[3].value,
    fecha: dayjs(evento.target[4].value).format("YYYY-MM-DD")
  }

  todasLasOp.push(nuevaOp)
  guardarEnLS("operaciones", todasLasOp)
  pintarOperaciones(todasLasOp)
   
})

// mostrar operaciones
const $tableOperaciones = $("#operacion")

function pintarOperaciones(array) {
  $tableOperaciones.innerHTML = ""

  for (const operacion of array) {
    $tableOperaciones.innerHTML += `<tr>
    <td>${operacion.descripcion} </td>
    <td>${operacion.monto} </td>
    <td>${operacion.categoria} </td>
    <td>${operacion.fecha} </td>
    </tr>` 
  }
}
//agregar y volver a "vistaBalance"
$botonAgregar.addEventListener("click", () => {
  mostrarElemento([$sectionVistaBalance, $vistaOpActivas]);
  ocultarElemento([$sectionNuevaOp, $cardSinOp])
})


// function pintarDatos(array) {

//   $divListVentas.innerHTML = "";
//   for (const venta of array) {
//     $divListVentas.innerHTML += `<div class="w-full border border-black my-2">
//       <h5>Tipo: ${venta.type}</h5>
//       <p>Valor: ${venta.value}</p>
//       <p>Valor: ${dayjs(venta.date).format("DD/MM/YYYY")}</p>
//       <p>Cantidad: ${venta.quantity}</p>
//       <div>
//         <button id="${venta.id}" class="button-edit border border-black shadow bg-green-600">Editar</button>
//         <button id="${venta.id}" class="button-delete border border-black shadow bg-red-600">Eliminar</button>
//       </div>
//     </div>`
//   }

//   agregarEventosEditYDelete()
// }


// function agregarVenta(objetoNuevaVenta) {
//   const datos = obtenerDatos("ventas")
//   guardarDatos("ventas", [...datos, objetoNuevaVenta])
// }



// $formCreate.addEventListener("submit", (evento) => {
//   evento.preventDefault();

//   const nuevaVenta = {
//     id: crypto.randomUUID(),
//     type: evento.target[0].value,
//     value: Number(evento.target[1].value),
//     date: dayjs(evento.target[2].value).format("YYYY-MM-DD"),
//     quantity: Number(evento.target[3].value)
//   }



//   funciones.agregarVenta(nuevaVenta)

//   const datos = funciones.obtenerDatos("ventas")
//   pintarDatos(datos)
// })











// // boton agregar operacion
// let $btnAgregar = $("#boton-agregar")

// $btnAgregar.addEventListener("click", () => {
//   mostrarElemento([$sectionVistaBalance, $vistaOpActivas])
//   ocultarElemento([$cardSinOp, $sectionNuevaOp])
// })

// function agregarVenta(objetoNuevaVenta) {
//   const datos = obtenerDatos("ventas")
//   guardarDatos("ventas", [...datos, objetoNuevaVenta])
// }

// function obtenerDatos(key) {
//   const datos = JSON.parse(localStorage.getItem(key))
//   return datos ? datos : [];
// }

// function guardarDatos(key, data) {
//   localStorage.setItem(key, JSON.stringify(data))
// }








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







window.onload = () => {
  todasLasOp = leerLS("operaciones")
  pintarOperaciones(todasLasOp)
}