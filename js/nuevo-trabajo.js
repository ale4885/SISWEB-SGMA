document.addEventListener('DOMContentLoaded', () => {
    const asignarTrabajoBtn = document.getElementById('asignarTrabajoBtn');
    const descripcionInput = document.getElementById('descripcion');
    const estudianteInput = document.getElementById('estudiante');
    const tiempoInput = document.getElementById('tiempo');

    if (asignarTrabajoBtn && descripcionInput && estudianteInput && tiempoInput) {
        asignarTrabajoBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button action

            const descripcion = descripcionInput.value.trim();
            const estudiante = estudianteInput.value.trim();
            const tiempo = tiempoInput.value.trim();

            if (descripcion === '' || estudiante === '' || tiempo === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos Incompletos',
                    text: 'Por favor, completa todos los campos requeridos (Descripción, Estudiante asignado, Tiempo).',
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
                    title: '¡Trabajo Asignado!',
                    text: 'El nuevo trabajo ha sido asignado exitosamente.',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        popup: 'swal-custom-popup',
                        title: 'swal-custom-title',
                        content: 'swal-custom-content',
                        confirmButton: 'swal-custom-confirm-button'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirect to the bitacora-actu.html page
                        window.location.href = 'bitacora-actu.html';
                    }
                });
            }
        });
    }
});