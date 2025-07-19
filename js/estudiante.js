document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuarioSpan = document.getElementById('nombreBienvenida');
    const nombreUsuarioHeader = document.getElementById('nombreUsuarioHeader');
    const rolUsuarioHeader = document.getElementById('rolUsuarioHeader');
    const detalleUsuarioHeader = document.getElementById('detalleUsuarioHeader');
    const avatarUsuarioHeader = document.getElementById('avatarUsuarioHeader');

    const loggedInUserName = localStorage.getItem('loggedInUserName');
    const loggedInUserPhoto = localStorage.getItem('loggedInUserPhoto');
    // Asumiendo que también guardas el rol y detalle del usuario en localStorage
    const loggedInUserRole = localStorage.getItem('loggedInUserRole') || 'Rol Desconocido';
    const loggedInUserDetail = localStorage.getItem('loggedInUserDetail') || 'Detalle Desconocido';

    if (nombreUsuarioSpan && loggedInUserName) {
        nombreUsuarioSpan.textContent = loggedInUserName;
    } else if (nombreUsuarioSpan) {
        nombreUsuarioSpan.textContent = 'Usuario';
        console.warn('No se encontró el nombre de usuario en localStorage para el mensaje de bienvenida.');
    }

    if (nombreUsuarioHeader) {
        nombreUsuarioHeader.textContent = loggedInUserName || 'Usuario';
    }
    if (rolUsuarioHeader) {
        rolUsuarioHeader.textContent = loggedInUserRole;
    }
    if (detalleUsuarioHeader) {
        detalleUsuarioHeader.textContent = loggedInUserDetail;
    }

    if (avatarUsuarioHeader && loggedInUserPhoto) {
        avatarUsuarioHeader.src = loggedInUserPhoto;
    } else if (avatarUsuarioHeader) {
        avatarUsuarioHeader.src = 'imgs/default-profile.png';
    }

    const perfilUsuarioNav = document.getElementById('perfilUsuarioNav');
    if (perfilUsuarioNav) {
        perfilUsuarioNav.addEventListener('click', () => {
            window.location.href = 'perfil.html';
        });
    }
});