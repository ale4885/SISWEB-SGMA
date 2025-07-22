document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioCambioContrasena');
    const contrasenaActualInput = document.getElementById('contrasenaActual');
    const nuevaContrasenaInput = document.getElementById('nuevaContrasena');
    const confirmarNuevaContrasenaInput = document.getElementById('confirmarNuevaContrasena');
    const mensajeContrasenaDiv = document.getElementById('mensajeContrasena');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        mensajeContrasenaDiv.textContent = '';
        mensajeContrasenaDiv.className = 'mensaje-alerta';

        const contrasenaActual = contrasenaActualInput.value;
        const nuevaContrasena = nuevaContrasenaInput.value;
        const confirmarNuevaContrasena = confirmarNuevaContrasenaInput.value;

        // Basic validations
        if (contrasenaActual.trim() === '' || nuevaContrasena.trim() === '' || confirmarNuevaContrasena.trim() === '') {
            displayMessage('Todos los campos de contraseña son obligatorios.', 'error');
            return;
        }

        if (nuevaContrasena.length < 6) {
            displayMessage('La nueva contraseña debe tener al menos 6 caracteres.', 'error');
            return;
        }

        if (nuevaContrasena !== confirmarNuevaContrasena) {
            displayMessage('Las nuevas contraseñas no coinciden.', 'error');
            return;
        }

        // Simulate a password change success (replace with actual backend call)
        // In a real application, you would send these values to a server for validation and update.
        // For demonstration, we'll just check if the current password is '123456'
        if (contrasenaActual === '123456') { // This is a placeholder for actual backend validation
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Su contraseña ha sido actualizada correctamente.',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            }).then(() => {
                form.reset(); // Clear the form after success
                mensajeContrasenaDiv.textContent = ''; // Clear any residual messages
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: 'La contraseña actual es incorrecta.',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            });
        }
    });

    function displayMessage(message, type) {
        mensajeContrasenaDiv.textContent = message;
        mensajeContrasenaDiv.classList.add(type);

        Swal.fire({
            icon: type === 'error' ? 'error' : 'info', // Use 'info' for general messages, 'error' for errors
            title: type === 'error' ? 'Error' : 'Advertencia',
            text: message,
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                content: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            }
        });
    }
});