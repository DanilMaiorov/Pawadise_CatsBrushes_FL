/* TABS */

const largeImg = document.querySelector('.images-part__lagre');
const gallery = Array.from(document.querySelectorAll('.item-img'));
const tabsImage = document.querySelector('.images-part__lagre-img');
const iconsPanel = document.querySelector('.part-colors__items');
const icons = document.querySelectorAll('.color-item');
const iconsContent = document.querySelectorAll('.part__mini-items');
const buttonsColor = document.querySelectorAll('.colors-button'); 


const tabsImages = [{
        image: 'img/product-1.png'
    },
    {
        image: 'img/product-2-large.png'
    },
    {
        image: 'img/product-3-large.png'
    },
    {
        image: 'img/product-4-large.png'
    },
    {
        image: 'img/product-5-large.png'
    },
    {
        image: 'img/product-2-large.png'
    },
    {
        image: 'img/product-1.png'
    },
    {
        image: 'img/product-3-large.png'
    },
    {
        image: 'img/product-4-large.png'
    },
    {
        image: 'img/product-5-large.png'
    },
    {
        image: 'img/product-3-large.png'
    },
    {
        image: 'img/product-2-large.png'
    },
    {
        image: 'img/product-1.png'
    },
    {
        image: 'img/product-5-large.png'
    },
    {
        image: 'img/product-4-large.png'
    },
];
const itemCard = [{
        id: 0,
        image: 'img/product-1.png',
        color: 'green',
        price: 29.99,
        sale: true,
        title: 'Green Grooming Brush',
    },
    {
        id: 1,
        image: 'img/product-2-large.png',
        color: 'pink',
        price: 29.99,
        sale: true,
        title: 'Pink Grooming Brush',
    },
    {
        id: 2,
        image: 'img/product-3-large.png',
        color: 'white',
        price: 29.99,
        sale: true,
        title: 'White Grooming Brush',
    },
];
localStorage.setItem('goods', JSON.stringify(itemCard));

const changeLarge = (index) => {
    tabsImage.setAttribute('src', itemCard[index].image);
};
const changeContent = (index) => {
    tabsImage.setAttribute('src', tabsImages[index].image);
};
const changeActiveTabs = (indexClickedTab) => {
    gallery.forEach((tab, index) => {
        tab.classList.remove('active');
        if (index === indexClickedTab) {
            tab.classList.add('active');
        }
    });
    changeContent(indexClickedTab);
};
const changeActiveIcon = (indexClickedIcon) => {
    icons.forEach((tab, index) => {
        tab.classList.remove('active');
        if (index === indexClickedIcon) {
            tab.classList.add('active');
        }
    });
    changeLarge(indexClickedIcon);
};
iconsPanel.addEventListener('click', (e) => {
    if (e.target.closest('.color-item')) {
        const iconBtn = e.target.closest('.color-item');
        icons.forEach((icon, index) => {
            if (icon === iconBtn) {
                icon.classList.add('active');
                iconsContent[index].classList.remove('hidden');
            } else {
                icon.classList.remove('active');
                iconsContent[index].classList.add('hidden');
            }
        });
    }
});
icons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        (index < 1) ? changeActiveTabs(index): (index === 1) ? changeActiveTabs(iconsContent[index].children.length) : (index > 1) ? changeActiveTabs(iconsContent[index].children.length * index) : changeActiveTabs(index);
        changeActiveIcon(index);
    });
});
gallery.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        changeActiveTabs(index);
    });
});

buttonsColor.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        if(e.target === item) {
            changeActiveIcon(index);
            changeActiveTabs(index);
        }
    });
    
});

