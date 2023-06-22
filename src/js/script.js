'use strict';
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

const back = document.querySelector('.back');
function backToTop() {
    if (window.pageYOffset >= 1000) {
        back.classList.add('back_active');
    } else {
        back.classList.remove('back_active');
    }
}

function menu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.header__nav');
    hamburger.onclick = () => {
        nav.classList.toggle('header__nav_active');
        hamburger.classList.toggle('hamburger_active');
    }
}
menu();

function animationElement(settingArrey) {
    class Element {
        constructor(track, animateElement, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation) {
            this.track = track,
            this.animateElement = animateElement,
            this.activClass = activClass,
            this.disableClass = disableClass,
            this.enableClass = enableClass,
            this.startDelay = startDelay,
            this.delayBetweenElement = delayBetweenElement,
            this.ratio = ratio,
            this.cycleAnimation = cycleAnimation,
            this.sensivityOffset = sensivityOffset,
            this.visibleAnimate = false,
            this.done = false
        }
        detector() {
            const track = (this.track) ? this.track: this.animateElement;
            if ((track.offsetTop - window.innerHeight + this.sensivityOffset <= window.pageYOffset * this.ratio)) {
                this.visibleAnimate = true;
            }
            if ((track.offsetTop - window.innerHeight - this.sensivityOffset > window.pageYOffset * this.ratio)) {
                this.visibleAnimate = false;
            }
        }
    }
    
    function createElement(trackElement, animateElements, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation) {
        const track = (trackElement) ? document.querySelector(`${(trackElement)}`) : false; 
        const allAnimateElement = document.querySelectorAll(`${animateElements}`);
        const arr = [];
        for (let el of allAnimateElement) {
            arr.push(new Element(track, el, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation));
        }
        startupEnableClass(arr, enableClass);
        startupDisableClass(arr, disableClass);
        return arr;
    }

    const arrObjElement = [];

    for (let item of settingArrey) {
        arrObjElement.push(createElement(...item));
    }

    function  startupDisableClass(arrObjElement, disableClass) {
        if (disableClass) {
            removeClass(arrObjElement, disableClass);
        }
    }

    function removeClass(arrObjElement, disableClass) {
        for (item of disableClass.split(' ')) {
            arrObjElement.forEach(el => {
                if (el.animateElement.classList.contains(item)) {
                    el.animateElement.classList.remove(item);
                }
            })
        }  
    }

    function  startupEnableClass(arrObjElement, enableClass) {
        if (enableClass) {
            addClass(arrObjElement, enableClass);
        }
    }

    function addClass(arrObjElement, enableClass) {
        for (let item of enableClass.split(' ')) {
            arrObjElement.forEach(el => { 
                if (!el.animateElement.classList.contains(item)) {
                    el.animateElement.classList.add(item);
                }
            })
        } 
    }
   
    function baseLogic(arrObjElement) {
        arrObjElement.forEach((item, index, arr) => {
            item.detector();
            if (item.visibleAnimate) {
                if (!item.animateElement.classList.contains(item.activClass) & !item.done) {
                    item.done = true;
                    setTimeout(() => {
                        item.animateElement.classList.add(`${item.activClass}`);
                    }, item.startDelay + delay);
                    delay += item.delayBetweenElement;
                    if (arr.length <= index + 1) {
                        delay = 0;
                    }
         
                }
            }
            if (!item.visibleAnimate & item.cycleAnimation) {
                if (item.animateElement.classList.contains(item.activClass)) {
                    item.done = false;
                    delay = 0;
                    item.animateElement.classList.remove(`${item.activClass}`);
                }
            }
        })
    }

    let delay = 0;
    
    return function start() {
        for (let item of arrObjElement) {
            baseLogic(item);
        }
    }
}
const animation = animationElement([
    [false, ".advantages__item", "animation", '', 'advantages__item_translate-left', 0, 0, 1, 0, true],
    [false, ".work__item", "work__item_animation", '', '', 0, 500, 0.9, 0, true],
    [false, ".prices__item", "prices__item_animation", '', '', 0, 200, 1, 0, true],
    [false, ".scheme__item", "scheme__item_animation", '', '', 0, 0, 1, 0, true]
]);

window.onscroll = () => {
    animation();
    backToTop();
}


