document.addEventListener('DOMContentLoaded', () => {
    // ——— IGUALAR ALTURAS DE TARJETAS ———
    function equalizeHeights() {
        const cards = document.querySelectorAll('.services__item');
        let maxH = 0;

        // resetear altura para recálculo
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        // encontrar la mayor
        cards.forEach(card => {
            maxH = Math.max(maxH, card.offsetHeight);
        });
        // aplicar a todas
        cards.forEach(card => {
            card.style.height = `${maxH}px`;
        });
    }

    // ——— CARRUSEL MANUAL PARA DESKTOP Y MÓVIL ———
    const servicesList = document.getElementById('servicesList');
    const prevButton = document.getElementById('servicesPrev');
    const nextButton = document.getElementById('servicesNext');

    if (servicesList && prevButton && nextButton) {
        let currentIndex = 0;
        const cardWidthDesktop = 320; // Ancho de cada tarjeta desktop
        const cardWidthMobile = 280; // Ancho de cada tarjeta móvil
        const gap = 24; // Gap entre tarjetas
        
        // Calcular cuántas tarjetas son visibles
        function getVisibleCards() {
            const containerWidth = servicesList.parentElement.offsetWidth;
            const cardWidth = window.innerWidth >= 1024 ? cardWidthDesktop : cardWidthMobile;
            const slideDistance = cardWidth + gap;
            return Math.floor(containerWidth / slideDistance);
        }

        function updateCarousel() {
            const cardWidth = window.innerWidth >= 1024 ? cardWidthDesktop : cardWidthMobile;
            const slideDistance = cardWidth + gap;
            const visibleCards = getVisibleCards();
            const totalCards = servicesList.children.length;
            const maxIndex = Math.max(0, totalCards - visibleCards);
            
            // Asegurar que el índice esté dentro de los límites
            currentIndex = Math.min(currentIndex, maxIndex);
            currentIndex = Math.max(currentIndex, 0);
            
            if (window.innerWidth >= 1024) {
                // DESKTOP: Usar transform
                const translateX = -(currentIndex * slideDistance);
                servicesList.style.transform = `translateX(${translateX}px)`;
                servicesList.style.scrollLeft = '0'; // Reset scroll
            } else {
                // MÓVIL: Usar scrollLeft para el scroll nativo
                servicesList.style.transform = 'translateX(0)';
                const scrollPosition = currentIndex * slideDistance;
                servicesList.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
            
            // Actualizar estado de botones
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= maxIndex;
            
            // Estilos para botones deshabilitados
            if (prevButton.disabled) {
                prevButton.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            
            if (nextButton.disabled) {
                nextButton.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Event listeners para las flechas
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextButton.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, servicesList.children.length - visibleCards);
            
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        // ——— FUNCIONALIDAD ADICIONAL PARA MÓVIL ———
        let isScrolling = false;

        // Detectar scroll manual en móvil y sincronizar con currentIndex
        servicesList.addEventListener('scroll', () => {
            if (window.innerWidth < 1024 && !isScrolling) {
                const cardWidth = cardWidthMobile;
                const slideDistance = cardWidth + gap;
                const scrollPosition = servicesList.scrollLeft;
                const newIndex = Math.round(scrollPosition / slideDistance);
                
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    // Actualizar botones sin mover el carrusel
                    const visibleCards = getVisibleCards();
                    const totalCards = servicesList.children.length;
                    const maxIndex = Math.max(0, totalCards - visibleCards);
                    
                    prevButton.disabled = currentIndex === 0;
                    nextButton.disabled = currentIndex >= maxIndex;
                    
                    if (prevButton.disabled) {
                        prevButton.classList.add('opacity-50', 'cursor-not-allowed');
                    } else {
                        prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
                    }
                    
                    if (nextButton.disabled) {
                        nextButton.classList.add('opacity-50', 'cursor-not-allowed');
                    } else {
                        nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
                    }
                }
            }
        });

        // Mostrar/ocultar botones según el viewport
        function toggleButtons() {
            if (window.innerWidth >= 1024) {
                // Desktop: mostrar botones
                prevButton.classList.remove('hidden');
                nextButton.classList.remove('hidden');
                prevButton.classList.add('lg:flex');
                nextButton.classList.add('lg:flex');
            } else {
                // Móvil: mostrar botones también (opcional, puedes ocultarlos si prefieres)
                prevButton.classList.remove('hidden');
                nextButton.classList.remove('hidden');
                prevButton.classList.add('flex');
                nextButton.classList.add('flex');
            }
        }

        // Inicializar carrusel
        setTimeout(() => {
            toggleButtons();
            updateCarousel();
            equalizeHeights();
        }, 100);

        // Actualizar en resize
        window.addEventListener('resize', () => {
            setTimeout(() => {
                toggleButtons();
                updateCarousel();
                equalizeHeights();
            }, 100);
        });
    }

    // ——— SWITCHER DE SECCIONES MEDIANTE MENÚ ———
    const menuItems = document.querySelectorAll('.menu-item');
    const contentContainer = document.getElementById('content-container');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remover clase active de todos los items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Iniciar transición de salida
            contentContainer.classList.add('fade-out');
            
            setTimeout(() => {
                // Ocultar todas las secciones de contenido
                contentSections.forEach(section => {
                    section.classList.add('hidden');
                });
                
                // Mostrar la sección correspondiente
                const targetContent = document.querySelector(`[data-content="${targetSection}"]`);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
                
                // Iniciar transición de entrada
                contentContainer.classList.remove('fade-out');
                contentContainer.classList.add('fade-in');
            }, 250);
            
            // Limpiar clase de transición
            setTimeout(() => {
                contentContainer.classList.remove('fade-in');
            }, 750);
        });
    });

}); 
