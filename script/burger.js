/* BURGER */

const burgerOpen = document.querySelector('.header__content-mob-menu')
const burger = document.querySelector('.header__burger')
const percentPaw = document.querySelector('.guaranties__right-img')
const paw = document.querySelector('.paws')


burgerOpen.addEventListener('click', () => {
    burger.classList.toggle('is-active')
    percentPaw.classList.toggle('none')
    paw.classList.toggle('none')
})

burger.addEventListener('click', (e) => {
    if(e.target.closest('.close-burger') || e.target.closest('.nav-list__item-string')) {
        burger.classList.toggle("is-active")
    }
})