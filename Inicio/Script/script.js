document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año en el footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Carrusel de imágenes
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    const slideCount = slides.length;

    // Crear puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.slide = index;
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    dots[0].classList.add('active');

    // Funciones del carrusel
    function goToSlide(slideIndex) {
        carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        
        // Actualizar puntos activos
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }

    // Event listeners
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Navegación por puntos
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.dataset.slide);
            goToSlide(slideIndex);
        });
    });

    // Cambio automático cada 5 segundos
    setInterval(nextSlide, 5000);

    // Efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});