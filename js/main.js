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

            // ——— CARRUSEL MANUAL PARA DESKTOP ———
            const servicesList = document.getElementById('servicesList');
            const prevButton = document.getElementById('servicesPrev');
            const nextButton = document.getElementById('servicesNext');

            if (servicesList && prevButton && nextButton) {
                let currentIndex = 0;
                const cardWidth = 320; // Ancho de cada tarjeta
                const gap = 24; // Gap entre tarjetas
                const slideDistance = cardWidth + gap;
                
                // Calcular cuántas tarjetas son visibles
                function getVisibleCards() {
                    const containerWidth = servicesList.parentElement.offsetWidth;
                    return Math.floor(containerWidth / slideDistance);
                }

                function updateCarousel() {
                    // Solo aplicar en desktop (lg+)
                    if (window.innerWidth >= 1024) {
                        const visibleCards = getVisibleCards();
                        const totalCards = servicesList.children.length;
                        const maxIndex = Math.max(0, totalCards - visibleCards);
                        
                        // Asegurar que el índice esté dentro de los límites
                        currentIndex = Math.min(currentIndex, maxIndex);
                        currentIndex = Math.max(currentIndex, 0);
                        
                        // Aplicar transformación
                        const translateX = -(currentIndex * slideDistance);
                        servicesList.style.transform = `translateX(${translateX}px)`;
                        
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
                    } else {
                        // En móvil, resetear transformación
                        servicesList.style.transform = 'translateX(0)';
                        currentIndex = 0;
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

                // Inicializar carrusel
                setTimeout(() => {
                    updateCarousel();
                    equalizeHeights();
                }, 100);

                // Actualizar en resize
                window.addEventListener('resize', () => {
                    setTimeout(() => {
                        updateCarousel();
                        equalizeHeights();
                    }, 100);
                });
            }
        });