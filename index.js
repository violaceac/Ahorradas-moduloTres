// import categorias from "./categorias.js"

// funciones de LocalStorage

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
let $vistaListaCategorias = $("#vista-lista-categorias")
let $vistaEditarCat = $("#vista-editar-cat");
// botones para vistas
let $btnVistaBalance = $$(".balance");
let $btnVistaCategorias = $$(".categorias");
let $btnVistaReportes = $$(".reportes");

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
    hayOp()
    actualizarBalance()
    });
})
$btnVistaCategorias.forEach(e => {
  e.addEventListener("click", () => {
    mostrarElemento([$sectionVistaCategorias, $vistaListaCategorias]);
    ocultarElemento([$sectionVistaBalance, $sectionVistaReportes, $sectionNuevaOp, $modalBotones, $vistaEditarCat])
    pintarCategorias()
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
let $formEditar = $("#form-editar");

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
  let $inputFechaEditar = $("#fecha-editar");


  $$arrayButtonsEdit.forEach(button => {
    button.addEventListener("click", (e) => {
      ocultarElemento([$sectionVistaBalance, $formAgregar])
      mostrarElemento([$sectionEditarOp])
      console.log($selectCategoriaEditar)


      const datos = leerLS("operaciones");
      const opBuscada = datos.find(elem => elem.id === e.target.id);

      $descripcionEditar.value = opBuscada.descripcion;
      $montoEditar.value = opBuscada.monto;
      $selectTipoEditar.value = opBuscada.tipo;
      $selectCategoriaEditar.value = opBuscada.categoria;
      $inputFechaEditar.value = opBuscada.fecha;
      console.log($selectCategoriaEditar.value)

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

const categoriasIniciales = [
  {
      id: crypto.randomUUID(),
      nombre:"comida"
  },
  {
      id: crypto.randomUUID(),
      nombre: "servicios",
  },
  {
      id: crypto.randomUUID(),
      nombre: "salidas",
  },
  {
      id: crypto.randomUUID(),
      nombre: "educación",
  },
  {
      id: crypto.randomUUID(),
      nombre: "transporte",
  },
  {
      id: crypto.randomUUID(),
      nombre: "trabajo",
  }
]

// Función para inicializar categorías si no existen
function inicializarCategorias() {
  const categorias = leerLS("categorias");
  if(!categorias || categorias.length === 0) {
    guardarEnLS("categorias", categoriasIniciales);
  }
}

//captura de elementos contenedores de categorias
let $ulCategorias = $("#lista-categorias");
let $selectCategoriasNuevaOp =$("#categorias-nueva-op");
let $selectCategoriaEditar = $("#categorias-editar");


//mostrar las categorias existentes en section selects y filtros
function pintarCategorias() {
  let todasLasCat = leerLS("categorias")

  $ulCategorias.innerHTML = "";
  $selectCategoriasNuevaOp.innerHTML = "";
  $selectCategoriaEditar.innerHTML = "";
  $selectFiltroCategoria.innerHTML = "";

  for (const {id, nombre} of todasLasCat) {


    let valueCat = nombre.trim().replace(/\s+/g, "-").toLowerCase();

    $selectCategoriasNuevaOp.innerHTML += `
    <option value="${valueCat}">${nombre}</option>
    `

    $selectCategoriaEditar.innerHTML += `
    <option value="${valueCat}">${nombre}</option>
    `

    $selectFiltroCategoria.innerHTML += `
    <option value="${valueCat}">${nombre}</option>
    `

    $ulCategorias.innerHTML += `<li class="flex justify-between items-center>
    <span class="bg-sky-100 text-sky-800 px-2 py-2 mb-2 rounded-md"> ${nombre}</span>
    <div class="flex space-x-2">
      <button id="${id}" class="button-edit-cat text-blue-500 hover:text-blue-700 pr-2 ml-0">Editar</button>
      <button id="${id}" class="button-delete-cat text-red-500 hover:text-red-700 pr-0 ml-0">Eliminar</button>
    </div>
    </li>`
  }
  editDeleteCategorias()

}


function quitarCategoria(idCategoria) {
  const datos = leerLS("categorias")
  const nuevoArray = datos.filter(categoria => categoria.id !== idCategoria)


  guardarEnLS("categorias", nuevoArray);

  return nuevoArray;
} 


function quitarOpPorCategoria(categoriaEliminada) {
  const datos = leerLS("operaciones");

  const nuevoArray = datos.filter(operacion => operacion.categoria !== categoriaEliminada);

  guardarEnLS("operaciones", nuevoArray);
  return nuevoArray
}


function editDeleteCategorias() {
  let $$arrayButtonsDeleteCat = $$(".button-delete-cat")
  let $$arrayButtonsEditCat = $$(".button-edit-cat")

  //eliminar categoria
  $$arrayButtonsDeleteCat.forEach(button => {
    button.addEventListener("click", (e) => {
      const datos = leerLS("categorias")
      const categoriaEliminada = datos.find(cat => cat.id === e.target.id)?.nombre;
      
      const nuevoArrayCategorias = quitarCategoria(e.target.id)
      pintarCategorias(nuevoArrayCategorias)

      const arraySinOp = quitarOpPorCategoria(categoriaEliminada)
      pintarOperaciones(arraySinOp)
      
    })
  })


//////

  //ir a editar categoria
  $$arrayButtonsEditCat.forEach(button => {
    button.addEventListener("click", (e) => {

      ocultarElemento([$vistaListaCategorias])
      mostrarElemento([$vistaEditarCat])


      const datos = leerLS("categorias");
      catBuscada = datos.find(elem => elem.id === e.target.id);

      $inputNombreCat.value = catBuscada.nombre;

      console.log(catBuscada)
    })
  })
}

function actualizarCategoria(categoriaEditada, todasLasCategorias) {

  const categoriasActualizadas = todasLasCategorias.map(categoria => {
    
    if (categoria.id === categoriaEditada.id) {
      return { ...categoriaEditada };
    }
   
    return categoria;
  });
  
  return categoriasActualizadas;
}

let $inputNombreCat = $("#nombre-cat");
let catBuscada
let $btnCancelarEditarCat = $("#boton-cancelar-editar-cat");
let $btnAgregarEdicion = $("#boton-agregar-edicion-cat");

//agregar la edicion de la categoria
$btnAgregarEdicion.addEventListener("click", () => {
  let catEditada = catBuscada;
  console.log(catEditada)

  catEditada.nombre = $inputNombreCat.value;
  console.log(catEditada)

  
  let todasLasCat = leerLS("categorias");
  console.log(todasLasCat)
  
  const categoriasActualizadas = actualizarCategoria(catEditada, todasLasCat);
  console.log(categoriasActualizadas)
  
  guardarEnLS("categorias", categoriasActualizadas);
  console.log(categoriasActualizadas)
  
  // Actualizar las operaciones que usan esta categoría
  let operaciones = leerLS("operaciones");
  
  // Obtener el valor de categoría anterior (para buscar en operaciones)
  const valorCategoriaAnterior = catBuscada.nombre.trim().replace(/\s+/g, "-").toLowerCase();
  const valorCategoriaNueva = catEditada.nombre.trim().replace(/\s+/g, "-").toLowerCase();
  
  // Actualizar todas las operaciones que usan esta categoría pero no lo hace, consologueamos las operaciones despues de esto y las muestra tal cual asi que en guardar en LS se esta guardando como el array original 

  operaciones = operaciones.map((op) => 
    op.categoria === valorCategoriaAnterior ? { ...op, categoria: valorCategoriaNueva } : op
  );


  
  guardarEnLS("operaciones", operaciones);
  
  pintarOperaciones(operaciones);
  

  

  ocultarElemento([$vistaEditarCat]);
  mostrarElemento([$vistaListaCategorias]);
  
  // Actualizar la lista de categorías en la interfaz
  pintarCategorias();
});

  $btnCancelarEditarCat.addEventListener("click", () => {
    ocultarElemento([$vistaEditarCat]);
    mostrarElemento([$vistaListaCategorias]);
  });


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
  pintarCategorias("categorias")
  $inputCategoria.value = ""

})




//////////////////



////////////

window.onload = () => {
  inicializarCategorias();
  todasLasOp = leerLS("operaciones")
  pintarOperaciones(todasLasOp)
  pintarCategorias()
  hayOp()
  actualizarBalance()
}