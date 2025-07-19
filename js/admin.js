document.addEventListener('DOMContentLoaded', function() {
  const enlacesNavegacion = document.querySelectorAll('.barra-navegacion-centro .enlace-navegacion');
  const enlacePerfilUsuario = document.querySelector('.barra-navegacion-derecha .info-usuario-enlace');

  function establecerEnlaceActivo() {
    const rutaActual = window.location.pathname.split('/').pop();

    enlacesNavegacion.forEach(enlace => {
      enlace.classList.remove('active');
      const hrefEnlace = enlace.getAttribute('href');

      if (hrefEnlace && hrefEnlace.includes(rutaActual)) {
        enlace.classList.add('active');
      }
    });

    if (rutaActual === 'perfil-coord.html' && enlacePerfilUsuario) {
        // No hay clase 'active' en el enlace del perfil, pero podemos hacer algo visual si es necesario
        // Por ejemplo, agregar un borde o cambiar un color si el diseño lo requiere
    }
  }

  enlacePerfilUsuario.addEventListener('click', function(e) {
    // Permite la navegación predeterminada al perfil
  });

  establecerEnlaceActivo();

  window.addEventListener('hashchange', establecerEnlaceActivo);
});