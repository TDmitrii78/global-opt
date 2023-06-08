function slider() {
    const items = document.querySelectorAll('.slider__item');
    const wrapper = document.querySelector('.slider__wrapper');
    const screen = document.querySelector('.slider__window');

    const back = document.querySelector('.slider__back');
    const forward = document.querySelector('.slider__forward');

    function warn() {
        const width = getComputedStyle(items[0]).width;
        const widthWindow = getComputedStyle(screen).width;
        if (widthWindow !== width) {
            console.log('warning!!! ширина окна .slider__window и ширина элемента слайдера должна быть одинакова!!!');
        }
    }

    function itemWidth(items) {
        const width = getComputedStyle(items[0]).width;
        return +width.slice(0, width.indexOf('px'));
    }

    function gapSizePx(wrapper) {
        const gap = getComputedStyle(wrapper).gap;
        return +gap.slice(0, gap.indexOf('px'));
    }

    function countSlides(items) {
        return items.length;
    }

    let currentSlide = 1;

    back.onclick = () => {
        if (currentSlide > 1) {
            --currentSlide;
            wrapper.style.transform = `translate(-${(currentSlide - 1) * (itemWidth(items) + gapSizePx(wrapper))}px)`;
            active();
        }
    }

    forward.onclick = () => {
        if (currentSlide < countSlides(items)) {
            ++currentSlide;
            wrapper.style.transform = `translate(-${(currentSlide - 1) * (itemWidth(items) + gapSizePx(wrapper))}px)`;
            active();
        }
    }

    function active() {
        items.forEach(el => {
            el.classList.remove('slider__item_active');
            el.classList.remove('slider__item_prevSibling');
            el.classList.remove('slider__item_nextSibling');
        })
        items[currentSlide - 1].classList.add('slider__item_active');
        const prevSibl = items[currentSlide - 1].previousElementSibling;
        const nextSibl = items[currentSlide - 1].nextElementSibling;
        (prevSibl) ? prevSibl.classList.add('slider__item_prevSibling') : false;
        (nextSibl) ? nextSibl.classList.add('slider__item_nextSibling') : false;
    }
    active();
    warn();
}
slider();

function topFixedMenu() {
    const nav = document.querySelector('.header__nav');
    window.onscroll = () => {
        if (window.pageYOffset >= 1000) {
            nav.classList.add('header__nav_menu-top-fixed-active')
        } else {
            nav.classList.remove('header__nav_menu-top-fixed-active')
        }
    }

}
topFixedMenu();
