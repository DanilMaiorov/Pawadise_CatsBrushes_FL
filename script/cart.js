/*CART*/
const cartBtn = document.querySelector('.header__nav-shoppingbag');
const burgerCartBtn = document.querySelector('.header__shoppingbag');
const openCartArr = [cartBtn, burgerCartBtn];
const cartModal = document.querySelector('.cart');
const cartClose = document.querySelector('.cart__close');
const addToCartBtn = document.querySelector('.green-btn');
const cartWrapper = document.querySelector('.cart__wrapper');
const sumCart = document.querySelector('.cart__total > span');
const cartArr = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) : [];



const renderCart = (goods) => {
    cartWrapper.innerHTML = '';
    if (goods.length === 0) {
        cartWrapper.innerHTML =
            `<div class="cart__empty">
                Your cart is empty yet
            </div>`;
    } else {
        goods.forEach((good, index) => {
            const newCard = document.createElement('div');
            newCard.classList.add('card');
            //data-key="${goodsItem.id}
            newCard.innerHTML = `
            <div class="card__img-wrapper">
                <img src="${good.image}" alt="">
            </div>
            <div class="card__body">
                <div class="card__price">$ ${good.price}</div>
                <h5 class="card__title">${good.title}</h5>
                <div class="card__descr">
                    <button class="card__btn-minus">-</button>
                    <div class="card__count">${good.count}</div>
                    <button class="card__btn-plus">+</button>
                    <div class="card__total" data-sum="${index}"> $${(+good.price * +good.count).toFixed(2)}</div>
                </div>
                <button type="button" class="btn green-btn delete-btn">Delete</button>
            </div>
        </div>`;
            cartWrapper.append(newCard);
            newCard.addEventListener('click', (e) => {
                if (e.target.classList.contains('card__btn-minus')) {
                    minusCartItem(good.id);
                } else if (e.target.classList.contains('card__btn-plus')) {
                    plusCartItem(good.id);
                } else if (e.target.classList.contains('delete-btn')) {
                    deleteCartItem(good.id);
                }
            });
        });
    }
};

function addToCart(id) { //функция добавления товаров в корзину
    const goods = JSON.parse(localStorage.getItem('goods'));
    const clickedGood = goods.find((good) => {
        return good.id === +id;
    });
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if (cart.some(good => good.id === clickedGood.id)) {
        cart.map(good => {
            if (good.id === clickedGood.id) {
                good.count++;
            }
            return good;
        });
    } else {
        clickedGood.count = 1;
        cart.push(clickedGood);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteCartItem(id) { //функция удаления элементов из корзины
    let cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter(good => {
        return good.id !== id;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    if (cart = []) {
        sumCart.innerHTML = 0;
    }
    actuallyCart();
}

function plusCartItem(id) { //функция удаления элементов из корзины
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.map(good => {
        if (good.id === id) {
            good.count++;
        }
        return good;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    actuallyCart();
}

function minusCartItem(id) { //функция удаления элементов из корзины
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.map(good => {
        if (good.id === id) {
            if (good.count > 0) {
                good.count--;
            }
        }
        return good;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    actuallyCart();
}

function actuallyCart() { //функция для отсутствия дублирования кода
    renderCart(JSON.parse(localStorage.getItem('cart')));
    console.log();
    summary(JSON.parse(localStorage.getItem('cart')));
}

function summary(goods) { //функция сложения
    let sum = 0;
    goods.forEach(good => {
        let summ = +good.price * +good.count;
        sum += summ;
        sumCart.innerHTML = `${sum.toFixed(2)}`;
    });
}
const openCart = () => {
    const cart = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
    cartModal.style.display = 'block';
    sumCart.innerHTML = '0';
    summary(JSON.parse(localStorage.getItem('cart')));
    renderCart(cart);
};
addToCartBtn.addEventListener('click', () => {
    icons.forEach(item => {
        if (item.closest('.active')) {
            const key = item.dataset.color;
            addToCart(key);
        }
    });
});

openCartArr.forEach(item => {
    item.addEventListener('click', openCart);
});
cartClose.addEventListener('click', () => {
    cartModal.style.display = 'none';
});
