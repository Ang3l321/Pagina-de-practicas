document.addEventListener('DOMContentLoaded', () => {
    console.log("Página del Salto del Tequendama cargada");

    aplicarEfectoCargaSuave();
    animarTarjetas();
    configurarBotonInicio();
    configurarFormularioReserva();
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
    const botonInicio = document.querySelector('.home-button');
    if (botonInicio) {
        botonInicio.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = '../Inicio/index.html';
        });
    }
}

/**
 * Configura el formulario de reservas con validación y actualización en tiempo real.
 */
function configurarFormularioReserva() {
    // Configurar fecha mínima (hoy)
    document.getElementById('tourDate').min = new Date().toISOString().split('T')[0];

    // Actualizar resumen en tiempo real
    const formInputs = document.querySelectorAll('#tourBookingForm input, #tourBookingForm select');
    formInputs.forEach(input => {
        input.addEventListener('change', updateBookingSummary);
    });

    // Manejar envío del formulario
    document.getElementById('tourBookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            date: document.getElementById('tourDate').value,
            time: document.getElementById('tourTime').value,
            transport: document.getElementById('transportType').value,
            participants: document.getElementById('participants').value
        };
        
        // Validación básica
        if (!formData.date || !formData.time || !formData.transport || !formData.participants) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }
        
        // Aquí normalmente enviarías los datos a un servidor
        console.log('Datos de reserva:', formData);
        
        // Mensaje de confirmación
        alert(`¡Reserva confirmada para el ${formData.date} a las ${formData.time}!\n\nTransporte: ${getTransportText(formData.transport)}\nPersonas: ${formData.participants}`);
        
        // Resetear formulario (opcional)
        this.reset();
        updateBookingSummary();
    });
}

/**
 * Actualiza el resumen de la reserva en tiempo real.
 */
function updateBookingSummary() {
    // Obtener valores del formulario
    const date = document.getElementById('tourDate').value;
    const time = document.getElementById('tourTime').value;
    const transport = document.getElementById('transportType').value;
    const participants = document.getElementById('participants').value || 0;
    
    // Actualizar resumen
    document.getElementById('summaryDate').innerHTML = 
        `<i class="fas fa-calendar-check"></i> <span>${date || 'Fecha no seleccionada'}</span>`;
    
    document.getElementById('summaryTime').innerHTML = 
        `<i class="fas fa-clock"></i> <span>${time ? time + ' hrs' : 'Hora no seleccionada'}</span>`;
    
    document.getElementById('summaryTransport').innerHTML = 
        `<i class="fas fa-bus"></i> <span>${getTransportText(transport)}</span>`;
    
    document.getElementById('summaryParticipants').innerHTML = 
        `<i class="fas fa-users"></i> <span>${participants} persona(s)</span>`;
    
    // Calcular costo total
    let transportCost = 0;
    if (transport === 'shuttle') transportCost = 20000;
    if (transport === 'private') transportCost = 50000;
    
    const totalCost = transportCost * parseInt(participants);
    document.getElementById('totalCost').textContent = `$${totalCost.toLocaleString('es-CO')} COP`;
}

/**
 * Devuelve el texto descriptivo para el tipo de transporte seleccionado.
 */
function getTransportText(transport) {
    switch(transport) {
        case 'shuttle': return 'Shuttle Turístico';
        case 'private': return 'Transporte Privado';
        case 'self': return 'Propio transporte';
        default: return 'Transporte no seleccionado';
    }
}