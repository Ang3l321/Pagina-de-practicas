document.addEventListener('DOMContentLoaded', function () {
    const tourBookingForm = document.getElementById('tourBookingForm');
    const summaryDate = document.querySelector('#summaryDate span');
    const summaryTime = document.querySelector('#summaryTime span');
    const summaryTransport = document.querySelector('#summaryTransport span');
    const summaryParticipants = document.querySelector('#summaryParticipants span');
    const totalCost = document.getElementById('totalCost');
    const bookingSummary = document.querySelector('.booking-summary');

    // Precios
    const transportPrices = {
        shuttle: 20000,
        private: 50000,
        self: 0
    };
    const entryFee = 10000;

    // Establecer fecha mínima (hoy)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tourDate').min = today;

    function updateSummary() {
        const date = document.getElementById('tourDate').value;
        const time = document.getElementById('tourTime').value;
        const transport = document.getElementById('transportType').value;
        const participants = parseInt(document.getElementById('participants').value) || 0;

        const formattedDate = date ? new Date(date).toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'No seleccionada';

        summaryDate.textContent = formattedDate;
        summaryTime.textContent = time || 'No seleccionada';

        switch (transport) {
            case 'shuttle':
                summaryTransport.textContent = 'Shuttle Turístico ($20.000 COP)';
                break;
            case 'private':
                summaryTransport.textContent = 'Transporte Privado ($50.000 COP)';
                break;
            case 'self':
                summaryTransport.textContent = 'Mi propio transporte (sin costo)';
                break;
            default:
                summaryTransport.textContent = 'No seleccionado';
        }

        summaryParticipants.textContent = participants === 1 ? '1 persona' : `${participants} personas`;

        const transportCost = transportPrices[transport] || 0;
        const total = (entryFee + transportCost) * participants;
        totalCost.textContent = `$${total.toLocaleString('es-CO')} COP`;
    }

    function toggleSummaryVisibility() {
        const date = document.getElementById('tourDate').value;
        const time = document.getElementById('tourTime').value;
        const transport = document.getElementById('transportType').value;
        const participants = document.getElementById('participants').value;

        if (date && time && transport && participants) {
            bookingSummary.style.display = 'block';
        } else {
            bookingSummary.style.display = 'none';
        }
    }

    // Event listeners
    ['tourDate', 'tourTime', 'transportType', 'participants'].forEach(id => {
        document.getElementById(id).addEventListener('change', function () {
            console.log(`${id} cambió a: ${this.value}`);
            updateSummary();
            toggleSummaryVisibility();
        });
    });

    tourBookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const requiredFields = ['tourDate', 'tourTime', 'transportType', 'participants'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        if (isValid) {
            const confirmation = document.createElement('div');
            confirmation.className = 'confirmation-message';
            confirmation.innerHTML = `
                <div class="confirmation-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>¡Reserva completada con éxito!</h3>
                    <p>Fecha: ${summaryDate.textContent}</p>
                    <p>Hora: ${summaryTime.textContent}</p>
                    <p>Total: ${totalCost.textContent}</p>
                    <button class="btn" onclick="this.parentElement.parentElement.remove()">Aceptar</button>
                </div>
            `;

            confirmation.style.position = 'fixed';
            confirmation.style.top = '0';
            confirmation.style.left = '0';
            confirmation.style.width = '100%';
            confirmation.style.height = '100%';
            confirmation.style.backgroundColor = 'rgba(0,0,0,0.8)';
            confirmation.style.display = 'flex';
            confirmation.style.justifyContent = 'center';
            confirmation.style.alignItems = 'center';
            confirmation.style.zIndex = '1000';

            document.body.appendChild(confirmation);

            tourBookingForm.reset();
            bookingSummary.style.display = 'none';
        } else {
            alert('Por favor completa todos los campos requeridos');
        }
    });

    toggleSummaryVisibility();
});
