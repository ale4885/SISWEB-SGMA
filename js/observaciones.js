document.addEventListener('DOMContentLoaded', () => {
    const enviarBtn = document.getElementById('enviarObservacion');
    const observacionTextArea = document.getElementById('areaTextoObservaciones');

    if (enviarBtn && observacionTextArea) {
        enviarBtn.addEventListener('click', (event) => {
            // Prevent the default button action if it were inside a form
            event.preventDefault(); 

            const observacionTexto = observacionTextArea.value.trim();

            if (observacionTexto === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Campo Requerido',
                    text: 'Por favor, escribe tus observaciones antes de enviar.',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        popup: 'swal-custom-popup',
                        title: 'swal-custom-title',
                        content: 'swal-custom-content',
                        confirmButton: 'swal-custom-confirm-button'
                    }
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '¡Observación Enviada!',
                    text: 'Tu observación ha sido enviada exitosamente.',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        popup: 'swal-custom-popup',
                        title: 'swal-custom-title',
                        content: 'swal-custom-content',
                        confirmButton: 'swal-custom-confirm-button'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Optionally, redirect to another page or clear the textarea
                        window.location.href = 'bitacora-actu.html'; 
                        // observacionTextArea.value = ''; // To clear the text area
                    }
                });
            }
        });
    }
});