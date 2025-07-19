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
    alert('No se pudieron cargar los roles. Intenta de nuevo más tarde.');
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
    alert('No se pudieron cargar los usuarios. Intenta de nuevo más tarde.');
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
  const confirmacion = confirm('¿Eliminar este usuario?');

  if (confirmacion) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      cargarUsuarios();
      alert("El registro fue eliminado.");
    } catch (error) {
      console.error('Error al borrar usuario:', error);
      alert('No se pudo eliminar el usuario. Intenta de nuevo.');
    }
  } else {
    alert("Se canceló la acción.");
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
    fotoPerfilArchivoEl.value = '';
    idUsuarioEl.value = usuario.id;

    btnEnviar.textContent = 'Actualizar Usuario';
    btnCancelar.hidden = false;
  } catch (error) {
    console.error('Error al cargar usuario para editar:', error);
    alert('No se pudo cargar la información del usuario para editar.');
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
    previsualizacionFotoPerfilEl.src = urlFotoPerfilEl.value || 'https://i.ibb.co/N6fL89pF/yo.jpg';
  }
});

btnCancelar.addEventListener('click', () => {
  formulario.reset();
  idUsuarioEl.value = '';
  btnEnviar.textContent = 'Agregar Usuario';
  btnCancelar.hidden = true;
  fotoPerfilArchivoEl.value = '';
  previsualizacionFotoPerfilEl.src = '';
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
    alert('No se pudo subir la imagen. Intenta de nuevo.');
    return null;
  }
}

formulario.addEventListener('submit', async e => {
  e.preventDefault();

  let urlFoto = urlFotoPerfilEl.value;
  if (fotoPerfilArchivoEl.files.length > 0) {
    const nuevaUrlFoto = await subirImagen(fotoPerfilArchivoEl.files[0]);
    if (nuevaUrlFoto) {
      urlFoto = nuevaUrlFoto;
    } else {
      return;
    }
  } else if (!urlFoto) {
    urlFoto = 'https://i.ibb.co/N6fL89pF/yo.jpg';
  }

  const cargaUtil = {
    fullName: nombreCompletoEl.value,
    email: correoEl.value,
    password: contrasenaEl.value,
    tbRoleId: idRolEl.value,
    fotoPerfil: urlFoto
  };

  try {
    if (idUsuarioEl.value) {
      await fetch(`${API_URL}/${idUsuarioEl.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cargaUtil)
      });
      alert("Usuario actualizado.");
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cargaUtil)
      });
      alert("Usuario agregado.");
    }
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    alert('No se pudo guardar el usuario. Intenta de nuevo.');
  }

  formulario.reset();
  btnCancelar.hidden = true;
  btnEnviar.textContent = 'Agregar Usuario';
  fotoPerfilArchivoEl.value = '';
  previsualizacionFotoPerfilEl.src = '';
  cargarUsuarios();
});

barraNavegacionDerecha.addEventListener('click', () => {
    window.location.href = '#'; // Redirige al apartado de perfil, ajusta esta URL según tu estructura
});