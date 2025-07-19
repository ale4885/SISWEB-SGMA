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
        cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
        modulos = modulos.filter(modulo => modulo.id !== id);
        CargarModulos();
        Swal.fire(
            '¡Eliminado!',
            'El módulo ha sido eliminado.',
            'success'
        );
    } else {
        Swal.fire(
            'Cancelado',
            'La acción ha sido cancelada.',
            'error'
        );
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
        Swal.fire('Error', 'Módulo no encontrado para editar.', 'error');
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
        Swal.fire('Error', 'El nombre del módulo es obligatorio.', 'error');
        return;
    }

    if (id) {
        const indiceModulo = modulos.findIndex(modulo => modulo.id === id);
        if (indiceModulo > -1) {
            modulos[indiceModulo] = {
                id: id,
                name: nombre,
                description: descripcion
            };
            await Swal.fire('Éxito', 'Módulo actualizado correctamente.', 'success');
        } else {
            await Swal.fire('Error', 'No se pudo encontrar el módulo para actualizar.', 'error');
        }
    } else {
        const nuevoModulo = {
            id: 'mod-' + idModuloActual++,
            name: nombre,
            description: descripcion
        };
        modulos.push(nuevoModulo);
        await Swal.fire('Éxito', 'Módulo agregado correctamente.', 'success');
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