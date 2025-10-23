document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.querySelector('.main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // =====================================
    // 1. HEADER STICKY CON EFFETTO "SCROLLED"
    // =====================================
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // =====================================
    // 2. GESTIONE MENU MOBILE
    // =====================================
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            
            // Cambia icona e previene lo scroll del body quando il menu è aperto
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Blocca scroll
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Riabilita scroll
            }
        });

        // Chiudi il menu quando si clicca su un link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // =====================================
    // 3. SLIDER TESTIMONIANZE
    // =====================================
    const sliderContainer = document.getElementById('testimonial-slider');
    if (sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.testimonial-slide');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentSlideIndex = 0;
        let autoPlayInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.display = 'none';
                if (i === index) {
                    currentSlideIndex = index;
                }
            });
            slides[index].style.display = 'flex';
            // Aggiungo un piccolo timeout per permettere l'animazione CSS se presente
            setTimeout(() => slides[index].classList.add('active'), 10);
        };

        const nextSlide = () => showSlide((currentSlideIndex + 1) % slides.length);
        const prevSlide = () => showSlide((currentSlideIndex - 1 + slides.length) % slides.length);

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 7000);
        };
        const stopAutoPlay = () => clearInterval(autoPlayInterval);
        
        if (slides.length > 1) {
            nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
            prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
            
            showSlide(currentSlideIndex);
            startAutoPlay();
        } else if (slides.length === 1) {
            // Se c'è un solo slide, lo mostro e nascondo i controlli
            showSlide(0);
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
        }
    }

    // =====================================
    // 4. ANIMAZIONE FADE-IN ON SCROLL (Performante)
    // =====================================
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null, // usa il viewport
        rootMargin: '0px',
        threshold: 0.1 // L'elemento è considerato visibile quando almeno il 10% è nel viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Smette di osservare l'elemento una volta animato
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => observer.observe(elem));

});