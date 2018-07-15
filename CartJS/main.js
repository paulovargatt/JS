"use strict";

let cart = [];

if (JSON.parse(localStorage.getItem('cart')) !== null) {
    cart = JSON.parse(localStorage.getItem('cart'))
}

const cartDOM = document.querySelector('.cart');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');


if (cart.length > 0) {
    cart.forEach(product => {
        insertItemDOM(product);

        addToCartButtonsDOM.forEach(addcartButtonDOM => {
            const productDOM = addcartButtonDOM.parentNode;
            if (productDOM.querySelector('.product__name').innerText === product.name) {
                handleActionButtons(addcartButtonDOM, product)
            }
        })
    })
}


addToCartButtonsDOM.forEach(addCart => {
    addCart.addEventListener('click', () => {
        const productDOM = addCart.parentNode;

        const product = {
            'image': productDOM.querySelector('.product__image').getAttribute('src'),
            'name': productDOM.querySelector('.product__name').innerText,
            'price': productDOM.querySelector('.product__price').innerText,
            'quantity': 1
        };

        const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);
        if (!isInCart) {
            insertItemDOM(product);
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            handleActionButtons(addCart, product)
        }
    });
});


function insertItemDOM(product) {
    cartDOM.insertAdjacentHTML('beforeend', `
        <div class="cart__item">
            <img class="cart__item__image" src="${product.image}" alt="${product.name}">
            <h3 class="cart__item_name">${product.name}</h3>
            <h3 class="cart__item_price">${product.price}</h3>
            <button class="btn btn--primary btn--small ${(product.quantity === 1 ? 'btn--danger' : '')}" data-action="DECREASE_ITEM">&minus;</button>
            <h3 class="cart__item_quantity">${product.quantity}</h3>
            <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
            <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
        </div>
    `);

    addCartFooter()
}

function addCartFooter() {
    if (document.querySelector('.cart-footer') === null) {
        cartDOM.insertAdjacentHTML('afterend', `
            <div class="cart-footer">
                <button class="btn btn--danger" data-action="CLEAR_CART">Limpar</button>
                <button class="btn btn--primary" data-action="CHECKOUT">Comprar</button>
            </div>
        `);

        document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => {
            clearCart();
        });
        document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => {
            checkout();
        })

    }
}

function clearCart() {
    cartDOM.querySelectorAll('.cart__item').forEach(cartItemDom => {
        cartItemDom.classList.add('cart__item--removed');
        setTimeout(() => cartItemDom.remove(), 250);
    });
    cart = [];

    localStorage.removeItem('cart');

    
    if (cart.length < 1) {
        document.querySelector('.cart-footer').remove();
    }
    addToCartButtonsDOM.forEach(addToCartButtonsDOM => {
        addToCartButtonsDOM.innerText = 'Adicionar no Carrinho'
        addToCartButtonsDOM.disabled = false;
    })
}

function checkout() {

}

function handleActionButtons(AddToCartButtonDOM, product) {
    AddToCartButtonDOM.innerText = 'No carrinho';
    AddToCartButtonDOM.disabled = true;
    const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
    cartItemsDOM.forEach(cartItemDom => {
        if (cartItemDom.querySelector('.cart__item_name').innerText === product.name) {

            cartItemDom.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {
                increaseItem(product, cartItemDom)
            });
            cartItemDom.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => {
                decreaseItem(product, AddToCartButtonDOM, cartItemDom)
            });
            cartItemDom.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => {
                removeItem(product, AddToCartButtonDOM, cartItemDom)
            });
        }
    })
}

function increaseItem(product, cartItemDom) {
    cart.forEach(cartItem => {
        if (cartItem.name === product.name) {
            cartItem.quantity++;
            cartItemDom.querySelector('.cart__item_quantity').innerText = cartItem.quantity;
            cartItemDom.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn--danger')
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
}

function decreaseItem(product, AddToCartButtonDOM, cartItemDom) {
    cart.forEach(cartItem => {
        if (cartItem.name === product.name) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                cartItemDom.querySelector('.cart__item_quantity').innerText = cartItem.quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                removeItem(product, AddToCartButtonDOM, cartItemDom)
            }
            if (cartItem.quantity === 1) {
                cartItemDom.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn--danger')
            }
        }
    });
}

function removeItem(product, AddToCartButtonDOM, cartItemDom) {
    cartItemDom.classList.add('cart__item--removed');
    setTimeout(() => {
        cartItemDom.remove();
    }, 250);
    cart = cart.filter(cartItem => cartItem.name !== product.name);
    localStorage.setItem('cart', JSON.stringify(cart));
    AddToCartButtonDOM.innerText = 'Adicionar no Carrinho'
    AddToCartButtonDOM.disabled = false;

    if (cart.length < 1) {
        document.querySelector('.cart-footer').remove();
    }
}