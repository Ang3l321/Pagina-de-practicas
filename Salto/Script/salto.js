document.addEventListener('DOMContentLoaded', () => {
    console.log("Página del Salto del Tequendama cargada");

    aplicarEfectoCargaSuave();
    animarTarjetas();
    configurarBotonInicio(); // Configurar funcionalidad del botón
});

/**
 * Aplica un efecto de carga suave al cuerpo de la página.
 */
function aplicarEfectoCargaSuave() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

/**
 * Aplica animaciones a las tarjetas de actividades y reseñas.
 */
function animarTarjetas() {
    const cards = document.querySelectorAll('.activity-card, .review-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

/**
 * Configura la funcionalidad del botón para redirigir a la página de inicio.
 */
function configurarBotonInicio() {
    const botonInicio = document.querySelector('.btn'); // Selecciona el botón con la clase "btn"
    if (botonInicio) {
        botonInicio.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            window.location.href = 'index.html'; // Redirige a la página de inicio
        });
    }
}