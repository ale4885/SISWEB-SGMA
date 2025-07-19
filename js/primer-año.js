document.addEventListener('DOMContentLoaded', () => {
    const modalVehiculo = document.getElementById("modalVehiculo");
    const botonesAbrirModalVehiculo = document.querySelectorAll(".item-registro .mas-opciones i.fa-ellipsis-v");
    const botonCerrarModalVehiculo = modalVehiculo.querySelector(".boton-cerrar");

    if (modalVehiculo) {
        modalVehiculo.style.display = "none";
    }

    botonesAbrirModalVehiculo.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            if (modalVehiculo) {
                modalVehiculo.style.display = "flex";
            }
        };
    });

    botonCerrarModalVehiculo.onclick = () => {
        modalVehiculo.style.display = "none";
    };

    window.onclick = (e) => {
        if (e.target === modalVehiculo) {
            modalVehiculo.style.display = "none";
        }
    };

    const modalPerfil = document.getElementById("modalPerfil");
    const activadorIconoPerfil = document.getElementById("activadorIconoPerfil");
    const botonCerrarModalPerfil = modalPerfil ? modalPerfil.querySelector(".cerrar") : null;

    if (modalPerfil) {
        modalPerfil.style.display = "none";
    }

    if (activadorIconoPerfil) {
        activadorIconoPerfil.addEventListener('click', () => {
            if (modalPerfil) {
                modalPerfil.style.display = "flex";
                mostrarPerfilUsuario();
            }
        });
    }

    if (botonCerrarModalPerfil) {
        botonCerrarModalPerfil.addEventListener('click', () => {
            if (modalPerfil) {
                modalPerfil.style.display = "none";
            }
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modalPerfil) {
            modalPerfil.style.display = "none";
        }
    });

    function mostrarPerfilUsuario() {
        const contenidoPerfilDiv = document.getElementById('contenido-perfil');
        const nombreUsuarioNav = document.getElementById('nombreUsuario');
        const rolUsuarioNav = document.getElementById('rolUsuario');
        const detalleUsuarioNav = document.getElementById('detalleUsuario');
        const imagenAvatarNav = document.getElementById('imagenAvatar');

        const nombreUsuarioAlmacenado = localStorage.getItem('loggedInUserName');
        const fotoUsuarioAlmacenada = localStorage.getItem('loggedInUserPhoto');
        const rolUsuarioAlmacenado = localStorage.getItem('loggedInUserRole') || 'Rol Desconocido';
        const detalleUsuarioAlmacenado = localStorage.getItem('loggedInUserDetail') || 'Detalle Desconocido';


        if (nombreUsuarioAlmacenado) {
            nombreUsuarioNav.textContent = nombreUsuarioAlmacenado;
            rolUsuarioNav.textContent = rolUsuarioAlmacenado;
            detalleUsuarioNav.textContent = detalleUsuarioAlmacenado;

            if (fotoUsuarioAlmacenada) {
                imagenAvatarNav.src = fotoUsuarioAlmacenada;
            } else {
                imagenAvatarNav.src = 'placeholder-avatar.png';
            }

            let htmlPerfil = `
                <div class="visualizacion-perfil">
                    ${fotoUsuarioAlmacenada ? `<img src="${fotoUsuarioAlmacenada}" alt="Foto de Perfil" class="foto-perfil">` : `<i class="fas fa-user-circle icono-perfil-defecto"></i>`}
                    <p class="nombre-usuario">${nombreUsuarioAlmacenado}</p>
                    <p class="rol-usuario">${rolUsuarioAlmacenado}</p>
                    <p class="detalle-usuario">${detalleUsuarioAlmacenado}</p>
                </div>
            `;
            contenidoPerfilDiv.innerHTML = htmlPerfil;
        } else {
            nombreUsuarioNav.textContent = "Usuario";
            rolUsuarioNav.textContent = "Invitado";
            detalleUsuarioNav.textContent = "";
            imagenAvatarNav.src = 'placeholder-avatar.png';
            contenidoPerfilDiv.innerHTML = '<p>No se encontraron datos de perfil. Por favor, inicia sesión.</p>';
        }
    }

    mostrarPerfilUsuario();
});