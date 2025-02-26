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
    pintarCategorias(categorias)
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
let $formEditar = $("#form-editar")

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
    <td>
      <button id="${operacion.id}" class="button-edit border border-black shadow bg-green-600">Editar</button>
      <button id="${operacion.id}" class="button-delete border border-black shadow bg-red-600">Eliminar</button>
    </td>
    </tr>` 
  }
  agregarEventosEditYDelete()
}

///////// Prueba botón eliminar OK

function quitarOperacion(idOperacion) {
  const datos = leerLS("operaciones")
  const nuevoArray = datos.filter(operacion => operacion.id !== idOperacion)

  guardarEnLS("operaciones", nuevoArray)

  return nuevoArray
} 

////////

function agregarEventosEditYDelete() {
  const $$arrayButtonsDelete = $$(".button-delete")
  const $$arrayButtonsEdit = $$(".button-edit")

  $$arrayButtonsDelete.forEach(button => {
    button.addEventListener("click", (e) => {
      console.log(e.target.id)
      const nuevoArray = quitarOperacion(e.target.id)
      pintarOperaciones(nuevoArray)
    })
  })

///////

let $descripcionEditar = $("descripcion-editar");
let $montoEditar = $("monto-editar");
let $selectTipoEditar = $("tipo-editar");
let $selectCategoriaEditar = $("categoria-editar");
let inputFechaEditar = $("fecha-editar");
let $botonEditar = $("boton-editar");
let $formEditar = $("form-editar");


  $$arrayButtonsEdit.forEach(button => {
    button.addEventListener("click", (e) => {
      ocultarElemento([$sectionVistaBalance, $formAgregar ])
      mostrarElemento([$formEditar])

      const datos = leerLS("operaciones")
      const opBuscada = datos.find(elem => elem.id === e.target.id)

      $descripcionEditar.value = opBuscada.value

      $formEditar.id = opBuscada.id
    })
  })
}

///////

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

let $ulCategorias = $("#lista-categorias")

function pintarCategorias(arrayCategorias) {
  $ulCategorias.innerHTML = "";
  for (const { id, nombre} of arrayCategorias) {
    $ulCategorias.innerHTML += `<li>
    <span> ${nombre}</span>
    </li>`
  }
}

// function pintarDatos(arrayPersonajes) {
//   $main.innerHTML = "";
//   for (const { image, name, species, house, gender, alive, alternate_names } of arrayPersonajes) {
//     $main.innerHTML += `<div class="flex flex-col justify-center items-center border border-2 border-black rounded-xl w-5/6 md:w-5/12 lg:w-3/12 mx-8 my-2 h-72">
//       <img src="${image}" class="h-24 w-24">
//       <p>Nombre: ${capitalize(name)}</p>
//       <div class="flex flex-row justify-around w-full flex-wrap">
//         <p class="w-2/5">Especie: ${capitalize(species)}</p>
//         <p class="w-2/5">Casa: ${capitalize(house)}</p>
//         <p class="w-2/5">Genero: ${capitalize(gender)}</p>
//         <p class="w-2/5">Vivo: ${alive ? "Si, esta vivito" : "No, se despidio"}</p>
//       </div>
//       <p>Nombres Alt: ${alternate_names.length > 0 ? alternate_names : "No tiene nombres alternativos"}</p>
//     </div>`
//   }
// }





window.onload = () => {
  todasLasOp = leerLS("operaciones")
  pintarOperaciones(todasLasOp)
}