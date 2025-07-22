document.addEventListener('DOMContentLoaded', function () {
    const casillaPoliza = document.getElementById('casilla-poliza');
    const entradaPoliza = document.getElementById('poliza');
    const entradaPlaca = document.getElementById('placa');
    const aceptarTerminosCasilla = document.getElementById('aceptarTerminos');
    const botonEnviarSolicitud = document.getElementById('boton-enviar-solicitud');

    // Inputs del formulario de vehículo
    const formRegistroVehiculo = document.getElementById('form-registro-vehiculo');
    const marcaInput = document.getElementById('marca');
    const modeloInput = document.getElementById('modelo');
    const tipoSelect = document.getElementById('tipo');
    const colorInput = document.getElementById('color');
    const tarjetaCirculacionInput = document.getElementById('tarjetaCirculacion');

    // Inputs del formulario de detalles de orden
    const instructorResponsableInput = document.getElementById('instructorResponsable');
    const estudianteAsignadoInput = document.getElementById('estudianteAsignado');
    const carnetInput = document.getElementById('carnet');
    const operacionesEfectuarSelect = document.getElementById('operacionesEfectuar1');
    const moduloRespuestaSelect = document.getElementById('moduloRespuesta');
    const tipoOperacionPreventivo = document.getElementById('tipoOperacionPreventivo');
    const tipoOperacionCorrectivo = document.getElementById('tipoOperacionCorrectivo');
    const tiempoEstimadoInput = document.getElementById('tiempoEstimado');

    // Inputs del formulario de términos y condiciones
    const dueñoVehiculoInput = document.getElementById('dueñoVehiculo');
    const duiDueñoInput = document.getElementById('duiDueño');
    const telDueñoInput = document.getElementById('telDueño');

    const entradasFoto = [
        { entrada: document.getElementById('foto1'), vistaPrevia: document.getElementById('vista-previa-1') },
        { entrada: document.getElementById('foto2'), vistaPrevia: document.getElementById('vista-previa-2') },
        { entrada: document.getElementById('foto3'), vistaPrevia: document.getElementById('vista-previa-3') },
        { entrada: document.getElementById('foto4'), vistaPrevia: document.getElementById('vista-previa-4') }
    ];

    function manejarCambioFoto(evento) {
        const entrada = evento.target;
        const vistaPrevia = entradasFoto.find(item => item.entrada === entrada).vistaPrevia;

        if (entrada.files && entrada.files[0]) {
            const lector = new FileReader();

            lector.onload = function (e) {
                vistaPrevia.src = e.target.result;
                vistaPrevia.style.display = 'block';
            };

            lector.readAsDataURL(entrada.files[0]);
        } else {
            vistaPrevia.src = '#';
            vistaPrevia.style.display = 'none';
        }
        actualizarEstadoBotonEnviar();
    }

    entradasFoto.forEach(item => {
        item.entrada.addEventListener('change', manejarCambioFoto);
    });

    function estanTodasLasFotosTomadas() {
        return entradasFoto.every(item => item.entrada.files && item.entrada.files.length > 0);
    }

    function actualizarEstadosPolizaYPlaca() {
        if (casillaPoliza.checked) {
            entradaPoliza.disabled = true;
            entradaPoliza.value = '';
            entradaPoliza.placeholder = 'No aplica';
            entradaPoliza.classList.remove('is-invalid'); // Eliminar cualquier estado de validación
            entradaPlaca.disabled = true;
            entradaPlaca.value = '';
            entradaPlaca.placeholder = 'No aplica';
            entradaPlaca.classList.remove('is-invalid'); // Eliminar cualquier estado de validación
        } else {
            entradaPoliza.disabled = false;
            entradaPoliza.placeholder = 'N° de póliza';
            entradaPlaca.disabled = false;
            entradaPlaca.placeholder = 'N° de placa';
        }
        actualizarEstadoBotonEnviar();
    }

    // Función genérica para mostrar error de validación
    function mostrarError(element, message) {
        element.classList.add('is-invalid');
        let errorDiv = element.nextElementSibling; // Asume que small es el siguiente
        if (errorDiv && errorDiv.tagName === 'SMALL') {
            errorDiv.textContent = message;
            errorDiv.style.color = '#e74c3c'; // Rojo para errores
        } else {
            errorDiv = document.createElement('small');
            errorDiv.textContent = message;
            errorDiv.style.color = '#e74c3c';
            element.parentNode.insertBefore(errorDiv, element.nextSibling);
        }
    }

    // Función genérica para limpiar error de validación
    function limpiarError(element) {
        element.classList.remove('is-invalid');
        let errorDiv = element.nextElementSibling;
        if (errorDiv && errorDiv.tagName === 'SMALL') {
            // Restaurar el mensaje original o dejarlo vacío
            const originalSmallText = element.getAttribute('data-original-small-text');
            errorDiv.textContent = originalSmallText || '';
            errorDiv.style.color = 'var(--color-texto-pequeño)'; // Color original
        }
    }

    // Guardar el texto original de small para restaurar
    document.querySelectorAll('.grupo-formulario small').forEach(smallElement => {
        const input = smallElement.previousElementSibling;
        if (input) {
            input.setAttribute('data-original-small-text', smallElement.textContent);
        }
    });

    function validarCampo(inputElement, regex, errorMessage) {
        if (inputElement.disabled) {
            limpiarError(inputElement);
            return true;
        }
        if (!inputElement.value.trim()) {
            mostrarError(inputElement, 'Este campo es obligatorio.');
            return false;
        }
        if (regex && !regex.test(inputElement.value.trim())) {
            mostrarError(inputElement, errorMessage);
            return false;
        }
        limpiarError(inputElement);
        return true;
    }

    function validarSelect(selectElement, errorMessage) {
        if (!selectElement.value) {
            mostrarError(selectElement, errorMessage);
            return false;
        }
        limpiarError(selectElement);
        return true;
    }

    function validarFotos() {
        if (!estanTodasLasFotosTomadas()) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Validación',
                text: 'Debes subir las 4 fotos del vehículo.',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            });
            return false;
        }
        return true;
    }

    function validarFormularioCompleto() {
        let isValid = true;

        // Sección Datos del vehículo
        if (!validarCampo(entradaPlaca, /^P\d{3}-\d{3}$/, 'Formato de placa inválido (Ej: P123-456).')) isValid = false;
        if (!casillaPoliza.checked) {
            if (!validarCampo(entradaPoliza, /^P\d{3}-\d{3}$/, 'Formato de póliza inválido (Ej: P123-456).')) isValid = false;
        }
        if (!validarCampo(marcaInput, /^[a-zA-Z0-9\s]+$/, 'La marca no puede estar vacía y solo debe contener letras/números.')) isValid = false;
        if (!validarCampo(modeloInput, /^[a-zA-Z0-9\s]+$/, 'El modelo no puede estar vacío y solo debe contener letras/números.')) isValid = false;
        if (!validarSelect(tipoSelect, 'Debes seleccionar un tipo de vehículo.')) isValid = false;
        if (!validarCampo(colorInput, /^[a-zA-Z\s]+$/, 'El color no puede estar vacío y solo debe contener letras.')) isValid = false;
        if (!validarCampo(tarjetaCirculacionInput, /^\d\/\d{8}$/, 'Formato de tarjeta de circulación inválido (Ej: 0/12345678).')) isValid = false;

        // Sección Detalles orden de trabajo
        if (!validarCampo(instructorResponsableInput, /^[a-zA-Z\s]+$/, 'El nombre del instructor es obligatorio.')) isValid = false;
        if (!validarCampo(estudianteAsignadoInput, /^[a-zA-Z\s]+$/, 'El nombre del estudiante es obligatorio.')) isValid = false;
        if (!validarCampo(carnetInput, /^\d{8}$/, 'Formato de carnet inválido (8 dígitos numéricos).')) isValid = false;
        if (!validarSelect(operacionesEfectuarSelect, 'Debes seleccionar una operación a efectuar.')) isValid = false;
        if (!validarSelect(moduloRespuestaSelect, 'Debes seleccionar un módulo de respuesta.')) isValid = false;
        
        // Validar al menos una casilla de tipo de operación marcada
        if (!tipoOperacionPreventivo.checked && !tipoOperacionCorrectivo.checked) {
            // No hay un elemento small directo para estas casillas, así que podríamos mostrar un error general o usar SweetAlert
            Swal.fire({
                icon: 'warning',
                title: 'Validación Incompleta',
                text: 'Debes seleccionar al menos un tipo de operación (Preventivo o Correctivo).',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            });
            isValid = false;
        }

        if (!validarCampo(tiempoEstimadoInput, /^\d{2}:\d{2}$/, 'Formato de tiempo estimado inválido (Ej: 02:30).')) isValid = false;

        // Sección Términos y Condiciones
        if (!validarCampo(dueñoVehiculoInput, /^[a-zA-Z\s]+$/, 'El nombre del propietario es obligatorio.')) isValid = false;
        if (!validarCampo(duiDueñoInput, /^\d{7}-\d{1}$/, 'Formato de DUI inválido (Ej: 0000000-0).')) isValid = false;
        if (!validarCampo(telDueñoInput, /^\d{4}-\d{4}$/, 'Formato de teléfono inválido (Ej: 0000-0000).')) isValid = false;

        // Validar aceptación de términos
        if (!aceptarTerminosCasilla.checked) {
            Swal.fire({
                icon: 'warning',
                title: 'Aceptar Términos',
                text: 'Debes aceptar los términos y condiciones del servicio para enviar la solicitud.',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            });
            isValid = false;
        }

        // Validar fotos al final
        if (!validarFotos()) isValid = false;

        return isValid;
    }

    // Añadir event listeners para validación en tiempo real (al perder el foco)
    entradaPlaca.addEventListener('blur', () => validarCampo(entradaPlaca, /^P\d{3}-\d{3}$/, 'Formato de placa inválido (Ej: P123-456).'));
    entradaPoliza.addEventListener('blur', () => {
        if (!casillaPoliza.checked) validarCampo(entradaPoliza, /^P\d{3}-\d{3}$/, 'Formato de póliza inválido (Ej: P123-456).');
    });
    marcaInput.addEventListener('blur', () => validarCampo(marcaInput, /^[a-zA-Z0-9\s]+$/, 'La marca no puede estar vacía y solo debe contener letras/números.'));
    modeloInput.addEventListener('blur', () => validarCampo(modeloInput, /^[a-zA-Z0-9\s]+$/, 'El modelo no puede estar vacío y solo debe contener letras/números.'));
    tipoSelect.addEventListener('change', () => validarSelect(tipoSelect, 'Debes seleccionar un tipo de vehículo.'));
    colorInput.addEventListener('blur', () => validarCampo(colorInput, /^[a-zA-Z\s]+$/, 'El color no puede estar vacío y solo debe contener letras.'));
    tarjetaCirculacionInput.addEventListener('blur', () => validarCampo(tarjetaCirculacionInput, /^\d\/\d{8}$/, 'Formato de tarjeta de circulación inválido (Ej: 0/12345678).'));

    instructorResponsableInput.addEventListener('blur', () => validarCampo(instructorResponsableInput, /^[a-zA-Z\s]+$/, 'El nombre del instructor es obligatorio.'));
    estudianteAsignadoInput.addEventListener('blur', () => validarCampo(estudianteAsignadoInput, /^[a-zA-Z\s]+$/, 'El nombre del estudiante es obligatorio.'));
    carnetInput.addEventListener('blur', () => validarCampo(carnetInput, /^\d{8}$/, 'Formato de carnet inválido (8 dígitos numéricos).'));
    operacionesEfectuarSelect.addEventListener('change', () => validarSelect(operacionesEfectuarSelect, 'Debes seleccionar una operación a efectuar.'));
    moduloRespuestaSelect.addEventListener('change', () => validarSelect(moduloRespuestaSelect, 'Debes seleccionar un módulo de respuesta.'));
    tiempoEstimadoInput.addEventListener('blur', () => validarCampo(tiempoEstimadoInput, /^\d{2}:\d{2}$/, 'Formato de tiempo estimado inválido (Ej: 02:30).'));

    dueñoVehiculoInput.addEventListener('blur', () => validarCampo(dueñoVehiculoInput, /^[a-zA-Z\s]+$/, 'El nombre del propietario es obligatorio.'));
    duiDueñoInput.addEventListener('blur', () => validarCampo(duiDueñoInput, /^\d{7}-\d{1}$/, 'Formato de DUI inválido (Ej: 0000000-0).'));
    telDueñoInput.addEventListener('blur', () => validarCampo(telDueñoInput, /^\d{4}-\d{4}$/, 'Formato de teléfono inválido (Ej: 0000-0000).'));


    function actualizarEstadoBotonEnviar() {
        // El botón ahora se habilita solo si el checkbox de términos está marcado y las fotos están subidas.
        // La validación completa del formulario se hará al hacer clic en el botón.
        if (aceptarTerminosCasilla.checked && estanTodasLasFotosTomadas()) {
            botonEnviarSolicitud.disabled = false;
            botonEnviarSolicitud.style.backgroundColor = 'var(--rojo-primario)'; // Usar la variable CSS
            botonEnviarSolicitud.style.cursor = 'pointer';
        } else {
            botonEnviarSolicitud.disabled = true;
            botonEnviarSolicitud.style.backgroundColor = '#555555'; // Un color gris para deshabilitado
            botonEnviarSolicitud.style.cursor = 'not-allowed';
        }
    }

    botonEnviarSolicitud.addEventListener('click', function (evento) {
        evento.preventDefault(); // Evitar el envío por defecto del formulario

        if (validarFormularioCompleto()) {
            Swal.fire({
                icon: 'success',
                title: '¡Solicitud Enviada!',
                text: 'Las fotos y datos han sido procesados exitosamente.',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            }).then(() => {
                // Opcional: Resetear el formulario o redirigir
                document.getElementById('form-registro-vehiculo').reset();
                document.getElementById('form-terminos').reset();
                entradasFoto.forEach(item => {
                    item.vistaPrevia.src = '#';
                    item.vistaPrevia.style.display = 'none';
                });
                actualizarEstadosPolizaYPlaca(); // Resetear el estado de los campos de placa y póliza
                actualizarEstadoBotonEnviar(); // Actualizar el estado del botón después del reseteo
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Errores en el Formulario',
                text: 'Por favor, corrige los errores en el formulario antes de enviar la solicitud.',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            });
        }
    });

    casillaPoliza.addEventListener('change', actualizarEstadosPolizaYPlaca);
    aceptarTerminosCasilla.addEventListener('change', actualizarEstadoBotonEnviar);

    // Inicializar el estado del botón y los campos al cargar la página
    actualizarEstadosPolizaYPlaca();
    actualizarEstadoBotonEnviar();
});