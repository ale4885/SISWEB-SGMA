const API_URL = 'https://685b5bb389952852c2d94520.mockapi.io/tbUsers';
const ROLES_API_URL = 'https://685b5bb389952852c2d94520.mockapi.io/tbRoles';

const IMG_API_URL = 'https://api.imgbb.com/1/upload?key=eaf6049b5324954d994475cb0c0a6156';

const formulario = document.getElementById('formulario-usuario');
const nombreCompletoEl = document.getElementById('nombreCompleto');
const correoEl = document.getElementById('correo');
const contrasenaEl = document.getElementById('contrasena');
const idRolEl = document.getElementById('idRol');
const fotoPerfilArchivoEl = document.getElementById('fotoPerfil-archivo');
const urlFotoPerfilEl = document.getElementById('url-foto-perfil');
const previsualizacionFotoPerfilEl = document.getElementById('previsualizacion-foto-perfil');
const idUsuarioEl = document.getElementById('idUsuario');
const btnCancelar = document.getElementById('btn-cancelar');
const btnEnviar = document.getElementById('btn-enviar');
const cuerpoTablaUsuarios = document.getElementById('cuerpo-tabla-usuarios');
const barraNavegacionDerecha = document.querySelector('.barra-navegacion-derecha');

let roles = [];

async function cargarRoles() {
  try {
    const res = await fetch(ROLES_API_URL);
    roles = await res.json();
    idRolEl.innerHTML = '';
    roles.forEach(rol => {
      const opcion = document.createElement('option');
      opcion.value = rol.roleId;
      opcion.textContent = rol.roleName;
      idRolEl.appendChild(opcion);
    });
  } catch (error) {
    console.error('Error al cargar los roles:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los roles. Intenta de nuevo más tarde.',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm-button'
      }
    });
  }
}

function obtenerNombreRolPorId(idRol) {
  const rol = roles.find(r => r.roleId === idRol);
  return rol ? rol.roleName : 'Desconocido';
}

async function cargarUsuarios() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    cargarTabla(data);
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los usuarios. Intenta de nuevo más tarde.',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm-button'
      }
    });
  }
}

function cargarTabla(usuarios) {
  cuerpoTablaUsuarios.innerHTML = '';
  usuarios.forEach(usuario => {
    cuerpoTablaUsuarios.innerHTML += `
        <tr>
            <td><img src="${usuario.fotoPerfil || 'https://i.ibb.co/N6fL89pF/yo.jpg'}" alt="Foto de ${usuario.fullName}" class="miniatura-perfil" /></td>
            <td>${usuario.fullName}</td>
            <td>${usuario.email}</td>
            <td>${obtenerNombreRolPorId(usuario.tbRoleId)}</td>
            <td>
                <button onclick="cargarParaEditarUsuario('${usuario.id}')">Editar</button>
                <button onclick="borrarUsuario('${usuario.id}')">Eliminar</button>
            </td>
        </tr>
        `;
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  await cargarRoles();
  await cargarUsuarios();
});

async function borrarUsuario(id) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      content: 'swal-custom-content',
      confirmButton: 'swal-custom-confirm-button',
      cancelButton: 'swal-custom-cancel-button' // You might want to define a custom class for cancel button too
    }
  });

  if (result.isConfirmed) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      cargarUsuarios();
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El usuario ha sido eliminado.',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          content: 'swal-custom-content',
          confirmButton: 'swal-custom-confirm-button'
        }
      });
    } catch (error) {
      console.error('Error al borrar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el usuario. Intenta de nuevo.',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          content: 'swal-custom-content',
          confirmButton: 'swal-custom-confirm-button'
        }
      });
    }
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Cancelado',
      text: 'La eliminación del usuario ha sido cancelada.',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm-button'
      }
    });
  }
}

async function cargarParaEditarUsuario(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const usuario = await res.json();

    nombreCompletoEl.value = usuario.fullName;
    correoEl.value = usuario.email;
    contrasenaEl.value = usuario.password;
    idRolEl.value = usuario.tbRoleId;
    urlFotoPerfilEl.value = usuario.fotoPerfil;
    previsualizacionFotoPerfilEl.src = usuario.fotoPerfil || 'https://i.ibb.co/N6fL89pF/yo.jpg';
    fotoPerfilArchivoEl.value = ''; // Clear file input when editing
    idUsuarioEl.value = usuario.id;

    btnEnviar.textContent = 'Actualizar Usuario';
    btnCancelar.hidden = false;
  } catch (error) {
    console.error('Error al cargar usuario para editar:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cargar la información del usuario para editar.',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm-button'
      }
    });
  }
}

fotoPerfilArchivoEl.addEventListener('change', function() {
  const archivo = this.files[0];
  if (archivo) {
    const lector = new FileReader();
    lector.onload = function(e) {
      previsualizacionFotoPerfilEl.src = e.target.result;
    };
    lector.readAsDataURL(archivo);
  } else {
    // If no file is selected, revert to the current stored URL or default
    previsualizacionFotoPerfilEl.src = urlFotoPerfilEl.value || 'https://i.ibb.co/N6fL89pF/yo.jpg';
  }
});

btnCancelar.addEventListener('click', () => {
  formulario.reset();
  idUsuarioEl.value = '';
  btnEnviar.textContent = 'Agregar Usuario';
  btnCancelar.hidden = true;
  fotoPerfilArchivoEl.value = ''; // Clear file input
  previsualizacionFotoPerfilEl.src = ''; // Clear image preview
});

async function subirImagen(archivo) {
  const fd = new FormData();
  fd.append('image', archivo);
  try {
    const res = await fetch(IMG_API_URL, { method: 'POST', body: fd });
    const obj = await res.json();
    if (obj.data && obj.data.url) {
      return obj.data.url;
    } else {
      throw new Error('URL de imagen no encontrada en la respuesta de ImgBB.');
    }
  } catch (error) {
    console.error('Error al subir imagen:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error de Subida',
      text: 'No se pudo subir la imagen. Intenta de nuevo.',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm-button'
      }
    });
    return null;
  }
}

// Validation functions
function validateFullName(name) {
  if (!name.trim()) {
    return 'El nombre completo es obligatorio.';
  }
  if (name.trim().length < 3) {
    return 'El nombre completo debe tener al menos 3 caracteres.';
  }
  return null;
}

function validateEmail(email) {
  if (!email.trim()) {
    return 'El correo electrónico es obligatorio.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Introduce un correo electrónico válido.';
  }
  return null;
}

function validatePassword(password, isEditing) {
  if (!isEditing && !password.trim()) {
    return 'La contraseña es obligatoria.';
  }
  if (password.trim() && password.trim().length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return null;
}

function validateRole(roleId) {
  if (!roleId || roleId === '0') { // Assuming '0' might be a default or invalid option
    return 'Selecciona un rol válido.';
  }
  return null;
}

formulario.addEventListener('submit', async e => {
  e.preventDefault();

  const isEditing = !!idUsuarioEl.value; // True if idUsuarioEl has a value

  // Perform validations
  const fullNameError = validateFullName(nombreCompletoEl.value);
  const emailError = validateEmail(correoEl.value);
  const passwordError = validatePassword(contrasenaEl.value, isEditing);
  const roleError = validateRole(idRolEl.value);

  if (fullNameError || emailError || passwordError || roleError) {
    Swal.fire({
      icon: 'error',
      title: 'Error de Validación',
      html: [fullNameError, emailError, passwordError, roleError].filter(Boolean).join('<br>'),
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm-button'
      }
    });
    return;
  }

  let urlFoto = urlFotoPerfilEl.value;
  if (fotoPerfilArchivoEl.files.length > 0) {
    const nuevaUrlFoto = await subirImagen(fotoPerfilArchivoEl.files[0]);
    if (nuevaUrlFoto) {
      urlFoto = nuevaUrlFoto;
    } else {
      // If image upload fails, stop the submission
      return;
    }
  } else if (!urlFoto) {
    urlFoto = 'https://i.ibb.co/N6fL89pF/yo.jpg'; // Default image if none provided and not editing existing
  }


  const cargaUtil = {
    fullName: nombreCompletoEl.value,
    email: correoEl.value,
    password: contrasenaEl.value,
    tbRoleId: idRolEl.value,
    fotoPerfil: urlFoto
  };

  try {
    if (isEditing) {
      await fetch(`${API_URL}/${idUsuarioEl.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cargaUtil)
      });
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El usuario ha sido actualizado correctamente.',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          content: 'swal-custom-content',
          confirmButton: 'swal-custom-confirm-button'
        }
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cargaUtil)
      });
      Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: 'El usuario ha sido agregado correctamente.',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          content: 'swal-custom-content',
          confirmButton: 'swal-custom-confirm-button'
        }
      });
    }
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar el usuario. Intenta de nuevo.',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm-button'
      }
    });
  }

  formulario.reset();
  idUsuarioEl.value = ''; // Clear hidden ID after submission
  btnCancelar.hidden = true;
  btnEnviar.textContent = 'Agregar Usuario';
  fotoPerfilArchivoEl.value = '';
  previsualizacionFotoPerfilEl.src = ''; // Clear image preview
  cargarUsuarios();
});

barraNavegacionDerecha.addEventListener('click', () => {
    window.location.href = '#'; // Redirige al apartado de perfil, ajusta esta URL según tu estructura
});