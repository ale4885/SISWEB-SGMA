document.addEventListener('DOMContentLoaded', function () {
    const formularioCambioContrasena = document.getElementById('formularioCambioContrasena');
    const contrasenaActualInput = document.getElementById('contrasenaActual');
    const nuevaContrasenaInput = document.getElementById('nuevaContrasena');
    const confirmarNuevaContrasenaInput = document.getElementById('confirmarNuevaContrasena');
    const mensajeContrasena = document.getElementById('mensajeContrasena');

    const userData = {
        nombreCompleto: "Juan Pérez",
        email: "juan.perez@example.com",
        rol: "Estudiante",
        currentPassword: "password123"
    };

    document.getElementById('nombreUsuarioHeader').textContent = userData.nombreCompleto;
    document.getElementById('rolUsuarioHeader').textContent = userData.rol;
    document.getElementById('detalleUsuarioHeader').textContent = userData.email;
    document.getElementById('nombreCompletoUsuario').textContent = userData.nombreCompleto;
    document.getElementById('correoUsuario').textContent = userData.email;
    document.getElementById('rolUsuario').textContent = userData.rol;

    formularioCambioContrasena.addEventListener('submit', function (event) {
        event.preventDefault();

        const contrasenaActual = contrasenaActualInput.value;
        const nuevaContrasena = nuevaContrasenaInput.value;
        const confirmarNuevaContrasena = confirmarNuevaContrasenaInput.value;

        mensajeContrasena.style.display = 'none';
        mensajeContrasena.className = 'mensaje-alerta';
        mensajeContrasena.textContent = '';

        if (contrasenaActual === '' || nuevaContrasena === '' || confirmarNuevaContrasena === '') {
            mostrarAlertaError('Todos los campos de contraseña son obligatorios.');
            return;
        }

        if (contrasenaActual !== userData.currentPassword) {
            mostrarAlertaError('La contraseña actual es incorrecta.');
            return;
        }

        if (nuevaContrasena.length < 6) {
            mostrarAlertaError('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (nuevaContrasena !== confirmarNuevaContrasena) {
            mostrarAlertaError('La nueva contraseña y la confirmación no coinciden.');
            return;
        }

        mostrarAlertaExito('Contraseña actualizada exitosamente.');
        
        console.log('Contraseña actualizada con éxito para el usuario:', userData.email);

        formularioCambioContrasena.reset();
    });

    function mostrarAlerta(mensaje, tipo) {
        Swal.fire({
            title: tipo === 'success' ? 'Éxito' : 'Error',
            text: mensaje,
            icon: tipo,
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                content: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            },
            buttonsStyling: false,
            confirmButtonText: 'Aceptar'
        });
    }

    function mostrarAlertaError(mensaje) {
        mostrarAlerta(mensaje, 'error');
    }

    function mostrarAlertaExito(mensaje) {
        mostrarAlerta(mensaje, 'success');
    }

    const formularioActualizarPerfil = document.getElementById('formularioActualizarPerfil');
    const nombreCompletoInput = document.getElementById('nombreCompleto');
    const correoElectronicoInput = document.getElementById('correoElectronico');

    nombreCompletoInput.value = userData.nombreCompleto;
    correoElectronicoInput.value = userData.email;

    formularioActualizarPerfil.addEventListener('submit', function (event) {
        event.preventDefault();

        const nuevoNombre = nombreCompletoInput.value;
        const nuevoCorreo = correoElectronicoInput.value;

        if (nuevoNombre === '' || nuevoCorreo === '') {
            mostrarAlertaError('Nombre y correo electrónico son obligatorios.');
            return;
        }

        if (!isValidEmail(nuevoCorreo)) {
            mostrarAlertaError('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        userData.nombreCompleto = nuevoNombre;
        userData.email = nuevoCorreo;

        document.getElementById('nombreUsuarioHeader').textContent = userData.nombreCompleto;
        document.getElementById('detalleUsuarioHeader').textContent = userData.email;
        document.getElementById('nombreCompletoUsuario').textContent = userData.nombreCompleto;
        document.getElementById('correoUsuario').textContent = userData.email;

        mostrarAlertaExito('Información de perfil actualizada exitosamente.');
        console.log('Información de perfil actualizada para:', userData.email);
    });

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});