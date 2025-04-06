// Función para inicializar el mapa (puede ser expandida)
function initMap() {
    console.log('Función de mapa lista para implementación futura');
    // Aquí puedes inicializar la API de Google Maps cuando sea necesaria
}

// Manejadores de eventos para los botones
function setupButtonEvents() {
    document.getElementById('tequendama').addEventListener('click', function() {
        console.log('Salto del Tequendama seleccionado');
        // Aquí puedes agregar navegación o mostrar más información
    });

    document.getElementById('museo').addEventListener('click', function() {
        console.log('Museo Arqueológico de Soacha seleccionado');
    });

    document.getElementById('boquemonte').addEventListener('click', function() {
        console.log('Boquemonte Reserva Natural seleccionado');
    });

    document.getElementById('chicaque').addEventListener('click', function() {
        console.log('Parque Natural Chicaque seleccionado');
    });

    document.getElementById('neuta').addEventListener('click', function() {
        console.log('Humedal Neuta seleccionado');
    });
}

// Función para actualizar el año en el footer
function updateFooterYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - lista para funcionalidad JavaScript');
    
    updateFooterYear();
    setupButtonEvents();
    initMap();
});