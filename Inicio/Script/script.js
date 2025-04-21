// script.js - Funcionalidad completa para Mi Soacha Turística

// Función para manejar la navegación
function setupNavigation() {
    const destinations = {
        tequendama: "../Salto/salto.html",
        museo: "../Museo/museo.html",
        boquemonte: "../Boquemonte/boquemonte.html",
        chicaque: "../Parque/parque.html",
        neuta: "../Humedal/Humedal.html"
    };

    Object.keys(destinations).forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', function() {
                if (destinations[id]) {
                    window.location.href = destinations[id];
                } else {
                    console.warn(`Página para ${id} no configurada`);
                    alert('Esta sección estará disponible pronto');
                }
            });
        }
    });
}

// Función para el carrusel de imágenes
function setupCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-slide'));
            updateCarousel();
            stopAutoplay();
            startAutoplay();
        });
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        stopAutoplay();
        startAutoplay();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        stopAutoplay();
        startAutoplay();
    });

    // Pausar autoplay al interactuar con el carrusel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    updateCarousel();
    startAutoplay();
}

// Función para actualizar el año en el footer
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Función para animar botones al hacer clic
function setupButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 200);
        });
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - iniciando funcionalidades');
    
    updateFooterYear();
    setupNavigation();
    setupButtonEffects();
    setupCarousel();
});