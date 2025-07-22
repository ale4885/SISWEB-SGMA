document.addEventListener('DOMContentLoaded', function () {
    const formularioCambioContrasena = document.getElementById('formularioCambioContrasena');
    const contrasenaActualInput = document.getElementById('contrasenaActual');
    const nuevaContrasenaInput = document.getElementById('nuevaContrasena');
    const confirmarNuevaContrasenaInput = document.getElementById('confirmarNuevaContrasena');
    const mensajeContrasena = document.getElementById('mensajeContrasena');

    // Dummy data for user information (replace with actual data fetching)
    const userData = {
        nombreCompleto: "Juan Pérez",
        email: "juan.perez@example.com",
        rol: "Estudiante",
        // This would ideally come from a secure backend
        currentPassword: "password123" 
    };

    // Populate user profile data
    document.getElementById('nombreUsuarioHeader').textContent = userData.nombreCompleto;
    document.getElementById('rolUsuarioHeader').textContent = userData.rol;
    document.getElementById('detalleUsuarioHeader').textContent = userData.email;
    document.getElementById('nombreCompletoUsuario').textContent = userData.nombreCompleto;
    document.getElementById('correoUsuario').textContent = userData.email;
    document.getElementById('rolUsuario').textContent = userData.rol;

    formularioCambioContrasena.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const contrasenaActual = contrasenaActualInput.value;
        const nuevaContrasena = nuevaContrasenaInput.value;
        const confirmarNuevaContrasena = confirmarNuevaContrasenaInput.value;

        // Clear previous messages
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

        // If all validations pass
        mostrarAlertaExito('Contraseña actualizada exitosamente.');
        
        // In a real application, you would send this data to a server
        console.log('Contraseña actualizada con éxito para el usuario:', userData.email);

        // Reset the form
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
            buttonsStyling: false, // Important for custom button styles
            confirmButtonText: 'Aceptar'
        });
    }

    function mostrarAlertaError(mensaje) {
        mostrarAlerta(mensaje, 'error');
    }

    function mostrarAlertaExito(mensaje) {
        mostrarAlerta(mensaje, 'success');
    }
});