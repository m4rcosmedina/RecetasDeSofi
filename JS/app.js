let nombreReceta = document.getElementById('nombreReceta');
let ingredientesReceta = document.getElementById('ingredientesReceta');
let descripcionReceta = document.getElementById('descripcionReceta');
let urlReceta = document.getElementById('urlReceta');
let listaRecetas = JSON.parse(localStorage.getItem('arregloRecetasNew')) || [];
console.log(listaRecetas)

nombreReceta.addEventListener('blur', () => {
    campoRequerido(nombreReceta)
});
ingredientesReceta.addEventListener('blur', () => {
    campoRequerido(ingredientesReceta)
});
descripcionReceta.addEventListener('blur', () => {
    campoRequerido(descripcionReceta)
});
urlReceta.addEventListener('blur', () => {
    campoRequerido(urlReceta)
});
listaRecetas.addEventListener('submit');

function guardarRecetas(e) {
    e.preventDefault()
    if (validarGeneral(nombreReceta.ingredientesReceta.descripcionReceta.urlReceta)) {
        crearReceta();
    }

}

function crearReceta() {
    let nuevaReceta = new Receta(nombreReceta.value, ingredientesReceta.value, descripcionReceta.value, urlReceta.value);
    listaRecetas.push(nuevaReceta);
    console.log(listaRecetas);
    limpiarFormulario();
    guardarLocalStorage();

}


function limpiarFormulario() {
    listaRecetas.reset()
    nombreReceta.className = 'form-control'
    ingredientesReceta.className = 'form-control'
    descripcionReceta.className = 'form-control'
    urlReceta.className = 'form-control'
}

function guardarLocalStorage() {
    localStorage.setItem('arregloRecetasNew', JSON.stringify(listaRecetas))
}

function cardReceta(prueba) {
    let recetaCreada = document.getElementById('cardRecetaNueva');
    recetaCreada.innerHTML += `
  <p>${prueba.nombreReceta}</p>`


}





function campoRequerido(input) {
    if (input.value.length > 0) {
        input.className = 'form control is-valid';
        return true;
    } else {
        input.className = 'form-control is-invalid';
        return false
    }
}

function validarURL(input) {
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

    if (patron.test(input.value)) {
        input.className = 'form-control is-valid';
        return true
    } else {
        input.className = 'form-control is-invalid';
        return false
    }
}

function validarGeneral(nombreReceta, ingredientesReceta, descripcionReceta, urlReceta) {
    //prevenir el actualizar del submit
    console.log('desde la funcoin validar general');

    let alerta = document.getElementById('msj');

    if (campoRequerido(nombreReceta) &&
        campoRequerido(ingredientesReceta) &&
        campoRequerido(descripcionReceta) &&
        validarURL(urlReceta)
    ) {
        console.log('los datos estan listos para ser enviados')
        alerta.className = 'alert alert-info my-5 d-none';
        return true;
    } else {
        console.log('los datos estan mal');
        alerta.className = 'alert alert-info my-5';
        return false;
    }
}

function cargaInicial() {
    if (nuevaReceta.lenght > 0) {
        nuevaReceta.forEach((itemProducto) => {
            crearFila(itemProducto)
        });
    }
}