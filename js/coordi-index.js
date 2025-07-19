document.addEventListener('DOMContentLoaded', function() {
    const elementosNav = document.querySelectorAll('.navbar-center .nav-link');
    const zonaPerfilClicable = document.querySelector('.zona-perfil-clicable');

    function establecerElementoNavActivo() {
        const rutaActual = window.location.pathname.split('/').pop();
        const hashActual = window.location.hash;

        elementosNav.forEach(item => {
            item.classList.remove('active');
            const itemHref = item.getAttribute('href');

            if (rutaActual === 'coordi-index.html' && (itemHref === 'coordi-index.html#inicio' || (itemHref === '#inicio' && !hashActual))) {
                item.classList.add('active');
            } else if (itemHref && itemHref.includes(rutaActual) && rutaActual !== 'coordi-index.html') {
                item.classList.add('active');
            }
        });
    }

    elementosNav.forEach(item => {
        item.addEventListener('click', function(e) {
            const itemHref = this.getAttribute('href');

            if (itemHref.includes('coordi-index.html#inicio') || itemHref === '#inicio') {
                e.preventDefault();
                const seccionObjetivo = document.querySelector('#inicio');
                if (seccionObjetivo) {
                    seccionObjetivo.scrollIntoView({ behavior: 'smooth' });
                }
                establecerElementoNavActivo();
            }
        });
    });

    if (zonaPerfilClicable) {
        zonaPerfilClicable.addEventListener('click', function() {
            window.location.href = 'perfil-coord.html';
        });
    }

    establecerElementoNavActivo();

    window.addEventListener('hashchange', establecerElementoNavActivo);

    const mensajeBienvenidaElemento = document.getElementById('mensajeBienvenida');
    const conteoVehiculosRegistradosElemento = document.getElementById('conteoVehiculosRegistrados');
    const conteoAlumnosRegistradosElemento = document.getElementById('conteoAlumnosRegistrados');
    const nombreUsuarioElemento = document.getElementById('nombreUsuario');

    const nombreUsuarioLogeado = localStorage.getItem('loggedInUserName');
    if (nombreUsuarioElemento && nombreUsuarioLogeado) {
        nombreUsuarioElemento.textContent = nombreUsuarioLogeado.toUpperCase();
    }

    if (mensajeBienvenidaElemento) {
        if (nombreUsuarioLogeado) {
            mensajeBienvenidaElemento.textContent = `¡Bienvenido/a, ${nombreUsuarioLogeado}!`;
        } else {
            mensajeBienvenidaElemento.textContent = `¡Bienvenido/a al SGMA!`;
        }
    }

    if (conteoVehiculosRegistradosElemento) {
        conteoVehiculosRegistradosElemento.textContent = '125';
    }
    if (conteoAlumnosRegistradosElemento) {
        conteoAlumnosRegistradosElemento.textContent = '340';
    }

    const botonesFiltro = document.querySelectorAll('.boton-filtro');
    const elementosModulo = document.querySelectorAll('.elemento-modulo');

    function aplicarFiltroModulos(filtro) {
        elementosModulo.forEach(item => {
            const estado = item.dataset.status;
            if (filtro === 'all' || estado === filtro) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', function() {
            botonesFiltro.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filtro = this.dataset.filter;
            console.log('Filtro seleccionado:', filtro);
            aplicarFiltroModulos(filtro);
        });
    });

    const botonFiltroTodos = document.querySelector('.boton-filtro[data-filter="all"]');
    if (botonFiltroTodos) {
        botonFiltroTodos.classList.add('active');
        aplicarFiltroModulos('all');
    } else {
        aplicarFiltroModulos('all');
    }
});