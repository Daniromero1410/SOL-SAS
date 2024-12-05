// Móvil
const mobileNav = document.querySelector('.mnav');
const closeBtn = document.querySelector('.mnav__close-btn');
const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');

// Clases
const navOpenedClass = 'left-0';
const navClosedClass = '-left-[300px]';
const arrowLeftClass = 'ri-arrow-left-s-line';
const arrowRightClass = 'ri-arrow-right-s-line';

// Evento de click
closeBtn.addEventListener('click', () => {
    if (mobileNav.classList.contains(navClosedClass)) {
        // Abre el menú
        mobileNav.classList.remove(navClosedClass);
        mobileNav.classList.add(navOpenedClass);

        // Cambia ícono
        closeBtnIcn.classList.remove(arrowRightClass);
        closeBtnIcn.classList.add(arrowLeftClass);
    } else {
        // Cierra el menú
        mobileNav.classList.remove(navOpenedClass);
        mobileNav.classList.add(navClosedClass);

        // Cambia ícono
        closeBtnIcn.classList.remove(arrowLeftClass);
        closeBtnIcn.classList.add(arrowRightClass);
    }
});
