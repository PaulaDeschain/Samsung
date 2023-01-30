const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	clave: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	
}

const campos = {
	nombre: false,
	clave: false,
	email: false
	
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "clave":
			validarCampo(expresiones.clave, e.target, 'clave');
			validarClave2();
		break;
		case "clave2":
			validarClave2();
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarClave2 = () => {
	const inputClave1 = document.getElementById('clave');
	const inputClave2 = document.getElementById('clave2');

	if(inputClave1.value !== inputClave2.value){
		document.getElementById(`grupo__clave2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__clave2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__clave2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['clave'] = false;
	} else {
		document.getElementById(`grupo__clave2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__clave2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__clave2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['clave'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	
	if(campos.nombre && campos.clave && campos.email ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);

	}
});