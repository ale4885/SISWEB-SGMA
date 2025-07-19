document.addEventListener('DOMContentLoaded', function() {
    const botonVerSeguimiento = document.getElementById('verSeguimientoBtn');
    const entradaPlaca = document.getElementById('placa');

    if (botonVerSeguimiento && entradaPlaca) {
        botonVerSeguimiento.addEventListener('click', function() {
            const placa = entradaPlaca.value.trim();

            if (placa) {
                window.location.href = `seguimiento.html?placa=${encodeURIComponent(placa)}`;
            } else {
                alert('Por favor, ingresa tu número de placa, tarjeta de circulación o DUI.');
            }
        });
    } else {
        console.error("Error: No se encontró el botón o el campo de entrada en el DOM.");
    }
});