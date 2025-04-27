// Espera que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar el formulario y elementos del resumen
    const tourBookingForm = document.getElementById('tourBookingForm');
    const summaryDate = document.querySelector('#summaryDate span');
    const summaryTime = document.querySelector('#summaryTime span');
    const summaryTransport = document.querySelector('#summaryTransport span');
    const summaryParticipants = document.querySelector('#summaryParticipants span');
    const totalCost = document.getElementById('totalCost');

    // Precios de transporte
    const transportPrices = {
        shuttle: 20000, // COP
        private: 50000,
        self: 0
    };

    // Función para actualizar el resumen y el costo total
    function updateSummary() {
        const date = document.getElementById('tourDate').value;
        const time = document.getElementById('tourTime').value;
        const transport = document.getElementById('transportType').value;
        const participants = parseInt(document.getElementById('participants').value) || 0;

        // Actualizar los textos del resumen
        summaryDate.textContent = date || 'Fecha no seleccionada';
        summaryTime.textContent = time || 'Hora no seleccionada';

        if (transport === 'shuttle') {
            summaryTransport.textContent = 'Shuttle Turístico ($20.000 COP)';
        } else if (transport === 'private') {
            summaryTransport.textContent = 'Transporte Privado ($50.000 COP)';
        } else if (transport === 'self') {
            summaryTransport.textContent = 'Mi propio transporte (sin costo)';
        } else {
            summaryTransport.textContent = 'Transporte no seleccionado';
        }

        summaryParticipants.textContent = `${participants} persona${participants !== 1 ? 's' : ''}`;

        // Calcular el total: costo de transporte + entrada ($10.000 por persona)
        const transportCost = transportPrices[transport] || 0;
        const entryFee = 10000; // Valor de entrada en COP
        const total = (entryFee + transportCost) * participants;

        // Actualizar el total en formato colombiano
        totalCost.textContent = `$${total.toLocaleString('es-CO')} COP`;
    }

    // Detectar cambios en todos los campos del formulario
    ['tourDate', 'tourTime', 'transportType', 'participants'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateSummary);
    });

    // Establecer la fecha mínima para hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tourDate').setAttribute('min', today);

    // Evitar que el formulario recargue la página al enviarse
    tourBookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('¡Reserva enviada con éxito! 🌟 Gracias por confiar en Mi Soacha Turística.');
    });
});