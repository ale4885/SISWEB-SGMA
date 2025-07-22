const formulario = document.getElementById('formulario-modulo');
const nombreModuloEl = document.getElementById('nombreModulo');
const descripcionModuloEl = document.getElementById('descripcionModulo');
const idModuloEl = document.getElementById('idModulo');
const botonCancelar = document.getElementById('btn-cancelar');
const botonEnviar = document.getElementById('btn-enviar');
const cuerpoTabla = document.getElementById('cuerpo-tabla-modulos');
const barraNavegacionDerecha = document.querySelector('.barra-navegacion-derecha');

let modulos = [];
let idModuloActual = 1;

function CargarModulos() {
    CargarTabla(modulos);
}

function CargarTabla(modulosACargar) {
    cuerpoTabla.innerHTML = '';
    if (modulosACargar.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="4" style="text-align: center;">No hay módulos registrados.</td></tr>`;
        return;
    }
    modulosACargar.forEach(modulo => {
        cuerpoTabla.innerHTML += `
        <tr>
            <td>${modulo.id}</td>
            <td>${modulo.name}</td>
            <td>${modulo.description}</td>
            <td>
                <button onclick="CargarParaEditarModulo('${modulo.id}')">Editar</button>
                <button onclick="BorrarModulo('${modulo.id}')">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    CargarModulos();
});

async function BorrarModulo(id) {
    const resultado = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#881F1E',
        cancelButtonColor: '#555',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            htmlContainer: 'swal-custom-content',
            confirmButton: 'swal-custom-confirm-button',
            cancelButton: 'swal-custom-cancel-button'
        }
    });

    if (resultado.isConfirmed) {
        modulos = modulos.filter(modulo => modulo.id !== id);
        CargarModulos();
        Swal.fire({
            title: '¡Eliminado!',
            text: 'El módulo ha sido eliminado.',
            icon: 'success',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            }
        });
    } else {
        Swal.fire({
            title: 'Cancelado',
            text: 'La acción ha sido cancelada.',
            icon: 'error',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            }
        });
    }
}

function CargarParaEditarModulo(id) {
    const moduloAEditar = modulos.find(modulo => modulo.id === id);

    if (moduloAEditar) {
        nombreModuloEl.value = moduloAEditar.name;
        descripcionModuloEl.value = moduloAEditar.description;
        idModuloEl.value = moduloAEditar.id;

        botonEnviar.textContent = 'Actualizar Módulo';
        botonCancelar.hidden = false;
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Módulo no encontrado para editar.',
            icon: 'error',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            }
        });
    }
}

botonCancelar.addEventListener('click', () => {
    formulario.reset();
    idModuloEl.value = '';
    botonEnviar.textContent = 'Agregar Módulo';
    botonCancelar.hidden = true;
});

formulario.addEventListener('submit', async e => {
    e.preventDefault();

    const nombre = nombreModuloEl.value.trim();
    const descripcion = descripcionModuloEl.value.trim();
    const id = idModuloEl.value;

    if (!nombre) {
        Swal.fire({
            title: 'Error',
            text: 'El nombre del módulo es obligatorio.',
            icon: 'error',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            }
        });
        return;
    }

    // Basic validation: Check if module name already exists (case-insensitive) for new modules
    if (!id && modulos.some(modulo => modulo.name.toLowerCase() === nombre.toLowerCase())) {
        Swal.fire({
            title: 'Error',
            text: 'Ya existe un módulo con este nombre. Por favor, elija otro.',
            icon: 'error',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            }
        });
        return;
    }

    if (id) {
        // Update existing module
        const indiceModulo = modulos.findIndex(modulo => modulo.id === id);
        if (indiceModulo > -1) {
            // Check for duplicate name if name is changed for existing module
            if (modulos[indiceModulo].name.toLowerCase() !== nombre.toLowerCase() && 
                modulos.some((modulo, index) => index !== indiceModulo && modulo.name.toLowerCase() === nombre.toLowerCase())) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ya existe otro módulo con este nombre. Por favor, elija otro.',
                    icon: 'error',
                    customClass: {
                        popup: 'swal-custom-popup',
                        title: 'swal-custom-title',
                        htmlContainer: 'swal-custom-content',
                        confirmButton: 'swal-custom-confirm-button'
                    }
                });
                return;
            }

            modulos[indiceModulo] = {
                id: id,
                name: nombre,
                description: descripcion
            };
            await Swal.fire({
                title: 'Éxito',
                text: 'Módulo actualizado correctamente.',
                icon: 'success',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    htmlContainer: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            });
        } else {
            await Swal.fire({
                title: 'Error',
                text: 'No se pudo encontrar el módulo para actualizar.',
                icon: 'error',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    htmlContainer: 'swal-custom-content',
                    confirmButton: 'swal-custom-confirm-button'
                }
            });
        }
    } else {
        // Add new module
        const nuevoModulo = {
            id: 'mod-' + idModuloActual++,
            name: nombre,
            description: descripcion
        };
        modulos.push(nuevoModulo);
        await Swal.fire({
            title: 'Éxito',
            text: 'Módulo agregado correctamente.',
            icon: 'success',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-content',
                confirmButton: 'swal-custom-confirm-button'
            }
        });
    }

    formulario.reset();
    botonCancelar.hidden = true;
    botonEnviar.textContent = 'Agregar Módulo';
    CargarModulos();
});

barraNavegacionDerecha.addEventListener('click', () => {
    // Navigate to the profile section or perform a profile-related action
    window.location.href = 'perfil.html'; // Placeholder for profile page
});