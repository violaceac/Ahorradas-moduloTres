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
    ocultarElemento([$sectionVistaReportes, $sectionVistaCategorias, $sectionNuevaOp, $modalBotones, $sectionEditarOp])
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


// ===== VISTA BALANCE ============================================
/////
// ===== nueva operacion ===================================

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
    $formAgregar.reset();
    mostrarElemento([$sectionNuevaOp, $formAgregar]);
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
  hayOp()
  actualizarBalance()
   
})

//agregar y volver a "vistaBalance"
$botonAgregar.addEventListener("click", () => {
  mostrarElemento([$sectionVistaBalance, $vistaOpActivas]);
  ocultarElemento([$sectionNuevaOp, $cardSinOp])
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

//funcion para mostrar las operaciones si hay cargadas
function hayOp() {
  if($tableOperaciones.firstChild) {
    mostrarElemento([$vistaOpActivas])
    ocultarElemento([$cardSinOp])
    
  } else {
    mostrarElemento([$cardSinOp])
    ocultarElemento([$vistaOpActivas])
  }
}

// ===== editar o eliminar operacion =======================
/////
//captura vista formulario editar
let $sectionEditarOp = $("#editar-op");
//captura formulario editar
let $formEditar = $(".form-editar");

// funcion eliminar operacion
function quitarOperacion(idOperacion) {
  const datos = leerLS("operaciones")
  const nuevoArray = datos.filter(operacion => operacion.id !== idOperacion)

  todasLasOp = nuevoArray; 

  guardarEnLS("operaciones", todasLasOp);

  return todasLasOp;
} 

// funcion para editar operacion
function editarOperacion(idOperacion, nuevosDatos) {
  const datos = leerLS("operaciones")
  const indiceBuscado = datos.findIndex((operacion) => operacion.id == idOperacion)

  datos.splice(indiceBuscado, 1, {...nuevosDatos, id: idOperacion});

  guardarEnLS("operaciones", datos)

  return datos
}

// eventos editar y eliminar
function agregarEventosEditYDelete() {
  let $$arrayButtonsDelete = $$(".button-delete")
  let $$arrayButtonsEdit = $$(".button-edit")

  $$arrayButtonsDelete.forEach(button => {
    button.addEventListener("click", (e) => {
      const nuevoArray = quitarOperacion(e.target.id)
      pintarOperaciones(nuevoArray)
      hayOp()
      actualizarBalance()
    })
  })

//////

// capturas de elementos input del formulario editar
  let $descripcionEditar = $("#descripcion-editar");
  let $montoEditar = $("#monto-editar");
  let $selectTipoEditar = $("#tipo-editar");
  let $selectCategoriaEditar = $("#categoria-editar");
  let $inputFechaEditar = $("#fecha-editar");


  $$arrayButtonsEdit.forEach(button => {
    button.addEventListener("click", (e) => {
      ocultarElemento([$sectionVistaBalance, $formAgregar])
      mostrarElemento([$sectionEditarOp])

      const datos = leerLS("operaciones");
      const opBuscada = datos.find(elem => elem.id === e.target.id);

      $descripcionEditar.value = opBuscada.descripcion;
      $montoEditar.value = opBuscada.monto;
      $selectTipoEditar.value = opBuscada.tipo;
      $selectCategoriaEditar.value = opBuscada.categoria;
      $inputFechaEditar.value = opBuscada.fecha;

      $formEditar.id = opBuscada.id
    })
  })
}

//subir los cambios del formulario editar
$formEditar.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = leerLS("operaciones")
  const opBuscada = datos.find(elem => elem.id === evento.target.id)

  const nuevosDatos = { 
    descripcion: evento.target[0].value,
    monto: Number(evento.target[1].value),
    tipo: evento.target[2].value,
    categoria: evento.target[3].value,
    fecha: dayjs(evento.target[4].value).format("YYYY-MM-DD")
  };
  const datosModificados = editarOperacion(opBuscada.id, nuevosDatos)

  pintarOperaciones(datosModificados);
  actualizarBalance()
  
});

//agregar edicion y volver a vista balance
let $btnEditarOp = $("#boton-editar")

$btnEditarOp.addEventListener("click", () => {
  mostrarElemento([$sectionVistaBalance, $vistaOpActivas]);
  ocultarElemento([$sectionEditarOp, $cardSinOp])
})

// ===== card balance =======================

//captura spans para mostrar montos
let $totalGanancias = $("#total-ganancia");
let $totalGastos = $("#total-gastos");
let $montoTotal = $("#monto-total")


//mostrar ganancias, gastos y total
function actualizarBalance() {
  const datos = leerLS("operaciones") 

  const gananciasFiltradas = datos.filter(elemento => elemento.tipo === "ganancia")
  let ganancias = gananciasFiltradas.reduce((acc, operacion) => acc + operacion.monto, 0)
  $totalGanancias.innerText = `+$${ganancias}`
  

//////

  const gastosFiltrados = datos.filter(elemento => elemento.tipo === "gasto")
  let gastos = gastosFiltrados.reduce((acc, operacion) => acc + operacion.monto, 0)
  $totalGastos.innerText = `-$${gastos}`

/////

  let total = ganancias - gastos
  if(total < 0) {
    $montoTotal.classList.add("text-red-500")
    $montoTotal.innerText = `-$${total}`
  } else if(total > 0) {
    $montoTotal.classList.add("text-green-500")
    $montoTotal.innerText = `+$${total}`
  } else {
    $montoTotal.classList.add("text-stone-700")
    $montoTotal.innerText = `$${total}`
  }

}


// ===== filtros =======================
//captura de elementos HTML
let $btnOcultarFiltros = $("#ocultar-filtros");
let $selectTipo = $("#tipo");
let $selectFiltroCategoria = $("#categoria");
let $inputDesdeFecha = $("#desde-fecha");
let $selectOrden = $("#orden");


// $selectFilterType.addEventListener("input", (e) => {
//   const datos = obtenerDatos("ventas")
//   if(e.target.value !== "all") {
//     const ventasFiltradas = datos.filter(elem => elem.type === e.target.value)
//     pintarDatos(ventasFiltradas)
//   } else {
//     pintarDatos(datos)
//   }
// })


//ocultar filtros

//filtrar por tipo

//filtrar por categoria

//desde (fecha)
$inputDesdeFecha.addEventListener("input", (e) => {
  let datos = leerLS("operaciones");

  let arrayFiltrado = datos.filter(operacion => new Date(operacion.fecha) >= new Date(e.target.value))
  pintarOperaciones(arrayFiltrado)
})

//ordenar por
$selectOrden.addEventListener("input", () => {
  let datos = leerLS("operaciones");
  if($selectOrden.value === "mas-reciente") {
    let arrayOrdenado = datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    pintarOperaciones(arrayOrdenado);
  } else if($selectOrden.value === "menos-reciente") {
    let arrayOrdenado = datos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    pintarOperaciones(arrayOrdenado);
  } else if($selectOrden.value === "mayor-monto") {
    let arrayOrdenado = datos.sort((a, b) => b.monto - a.monto);
    pintarOperaciones(arrayOrdenado);
  } else if($selectOrden.value === "menor-monto") {
    let arrayOrdenado = datos.sort((a, b) => a.monto - b.monto);
    pintarOperaciones(arrayOrdenado);
  } else if($selectOrden.value === "a-to-z") {
    let arrayOrdenado = datos.sort((a, b) => a.descripcion.localeCompare(b.descripcion))
    pintarOperaciones(arrayOrdenado);
  } else if($selectOrden.value === "z-to-a") {
    let arrayOrdenado = datos.sort((a, b) => b.descripcion.localeCompare(a.descripcion))
    pintarOperaciones(arrayOrdenado);
  }
})








////////////



















//==== VISTA CATEGORIAS =================================
/////
//captura del elemento contenedor de categorias
let $ulCategorias = $("#lista-categorias")

//mostrar las categorias existentes
function pintarCategorias() {
  let todasLasCat = leerLS("categorias")

  $ulCategorias.innerHTML = "";

  for (const {id, nombre} of todasLasCat) {
    $ulCategorias.innerHTML += `<li>
    <span> ${nombre}</span>
    <div>
      <button id="${id}" class="button-edit border border-black shadow bg-green-600">Editar</button>
      <button id="${id}" class="button-delete border border-black shadow bg-red-600">Eliminar</button>
    </div>
    </li>`
  }
  guardarEnLS("categorias", todasLasCat)
}

//===== agregar categoria ==================
//captura de elementos HTML
let $inputCategoria = $("#input-categoria");
let $btnAgregarCategoria = $("#agregar-categoria");
/////

//evento click del boton agregarCategoria
$btnAgregarCategoria.addEventListener("click", () => {

  let todasLasCat = leerLS("categorias")

  const nuevaCategoria = {
    id: crypto.randomUUID(),
    nombre: $inputCategoria.value
  }

  todasLasCat.push(nuevaCategoria)
  guardarEnLS("categorias", todasLasCat)
  pintarCategorias(todasLasCat)
  $inputCategoria.value = ""
  actualizarCategorias()

})

function actualizarCategorias() {
  leerLS("categorias")
  //agregar las nuevas y viejas categorias en el select de nuevaOp y editarOp
  //quitar las eliminadas cambiar el nombre de las editadas
  //eliminar las operaciones que esten subidas con la categorias recien eliminada
}

//tienen que actualizarse las categorias en el select, puede hacerse por fuera con una funcion y ejecutarla en este click, puede reutilizarse para cuando elimine o edite alguna categoria

// + editar categoria
//      - actualizar el localstorage con el nombre nuevo, esto probablemente haga que todas cambien de valor
//      - cambiar el nombre de la  categoria en la operacion
//      - actualizar el select

// + eliminar categoria
//      - actualizar el localstorage con la categoria eliminada
//      - eliminar las operaciones que estaban en esa categoria y volver a pintarOperaciones()
//      - actualizar el select





// $formAgregar.addEventListener("submit", (evento) => {
//   evento.preventDefault();

//   const nuevaOp = {
//     id: crypto.randomUUID(),
//     descripcion: evento.target[0].value,
//     monto: Number(evento.target[1].value),
//     tipo: evento.target[2].value,
//     categoria: evento.target[3].value,
//     fecha: dayjs(evento.target[4].value).format("YYYY-MM-DD")
//   }

//   todasLasOp.push(nuevaOp)
//   guardarEnLS("operaciones", todasLasOp)
//   pintarOperaciones(todasLasOp)
//   hayOp()
//   actualizarBalance()
   
// })



//////////////////



////////////

window.onload = () => {
  todasLasOp = leerLS("operaciones")
  pintarOperaciones(todasLasOp)
  hayOp()
  actualizarBalance()
}