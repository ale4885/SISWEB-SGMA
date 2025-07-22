document.addEventListener('DOMContentLoaded', function() {
    const botonVerSeguimiento = document.getElementById('verSeguimientoBtn');
    const entradaPlaca = document.getElementById('placa');

    if (botonVerSeguimiento && entradaPlaca) {
        botonVerSeguimiento.addEventListener('click', function() {
            const placa = entradaPlaca.value.trim();

            if (placa) {
                // Basic validation: Check for minimum length (you can adjust this)
                if (placa.length < 3) { // Example: minimum 3 characters
                    Swal.fire({
                        title: 'Entrada Inválida',
                        text: 'Por favor, ingresa al menos 3 caracteres para la placa, tarjeta de circulación o DUI.',
                        icon: 'warning',
                        customClass: {
                            popup: 'swal-custom-popup',
                            title: 'swal-custom-title',
                            content: 'swal-custom-content',
                            confirmButton: 'swal-custom-confirm-button'
                        }
                    });
                    return; // Stop execution if validation fails
                }

                // More complex validation (example: plate format P000-000 or DUI format)
                const placaRegex = /^[A-Z]\d{3}-\d{3}$/; // Example: P123-456
                const duiRegex = /^\d{8}-\d{1}$/; // Example: 12345678-9

                if (!placaRegex.test(placa) && !duiRegex.test(placa) && isNaN(placa)) {
                    Swal.fire({
                        title: 'Formato Inválido',
                        text: 'El formato de entrada no es válido. Por favor, usa el formato P000-000 para placas, 00000000-0 para DUI, o solo números para tarjeta de circulación.',
                        icon: 'error',
                        customClass: {
                            popup: 'swal-custom-popup',
                            title: 'swal-custom-title',
                            content: 'swal-custom-content',
                            confirmButton: 'swal-custom-confirm-button'
                        }
                    });
                    return; // Stop execution if validation fails
                }

                // If all validations pass, redirect
                window.location.href = `seguimiento.html?placa=${encodeURIComponent(placa)}`;
            } else {
                Swal.fire({
                    title: 'Campo Vacío',
                    text: 'Por favor, ingresa tu número de placa, tarjeta de circulación o DUI.',
                    icon: 'info',
                    customClass: {
                        popup: 'swal-custom-popup',
                        title: 'swal-custom-title',
                        content: 'swal-custom-content',
                        confirmButton: 'swal-custom-confirm-button'
                    }
                });
            }
        });
    } else {
        console.error("Error: No se encontró el botón o el campo de entrada en el DOM.");
    }
});