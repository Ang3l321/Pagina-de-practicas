// script.js - Funcionalidad para los botones de navegación

// Función para manejar la navegación
function setupNavigation() {
    // Objeto con las rutas de cada destino
    const destinations = {
        tequendama: "../Salto/salto.html",
        museo: "../Museo/museo.html",
        boquemonte: "../Boquemonte/boquemonte.html",
        chicaque: "../Chicaque/chicaque.html",
        neuta: "../Neuta/neuta.html"
    };

    // Asignar evento click a cada botón
    Object.keys(destinations).forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', function() {
                // Verificar si la página existe antes de redirigir
                if (destinations[id]) {
                    window.location.href = destinations[id];
                } else {
                    console.warn(`Página para ${id} no configurada`);
                    // Opcional: mostrar mensaje al usuario
                    alert('Esta sección estará disponible pronto');
                }
            });
        }
    });
}

// Función para actualizar el año en el footer
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - iniciando funcionalidades');
    
    updateFooterYear();
    setupNavigation();
    
    // Opcional: Agregar clase 'active' al botón clickeado
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 200);
        });
    });
});
