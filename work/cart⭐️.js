//------------------------------------
// Load Cart From Local Storage
//------------------------------------
function renderCart() {
    const cartItemsList = document.getElementById("cart-items-list");
    const emptyMsg = document.getElementById("empty-cart-message");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
        cartItemsList.style.display = "none";
        emptyMsg.style.display = "flex";
        updateTotals();
        return;
    }

    cartItemsList.style.display = "flex";
    emptyMsg.style.display = "none";

    cart.forEach((item, index) => {
        cartItemsList.innerHTML += `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">${item.price} EGP</p>
                </div>

                <div class="item-controls">
                    <span class="quantity-arrow" onclick="changeQuantity(${index}, 1)">&#9650;</span>
                    <span class="quantity-value">${item.quantity}</span>
                    <span class="quantity-arrow" onclick="changeQuantity(${index}, -1)">&#9660;</span>
                </div>


                <div class="item-total">
                    <p>${item.price * item.quantity} EGP</p>
                </div>

                <button class="btn-remove" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    updateTotals();
}



//------------------------------------
// Quantity Change
//------------------------------------
function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;
    if (cart[index].quantity < 1) cart[index].quantity = 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    updateTotals();
}


//------------------------------------
// Remove Item
//------------------------------------
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    updateTotals();
}


//------------------------------------
// Totals Calculation
//------------------------------------
function updateTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const deliveryFee = 25;
    const tax = Math.round(subtotal * 0.10);
    const total = subtotal + deliveryFee + tax;

    document.getElementById("subtotal").innerText = subtotal + " EGP";
    document.getElementById("delivery-fee").innerText = deliveryFee + " EGP";
    document.getElementById("tax").innerText = tax + " EGP";
    document.getElementById("total-amount").innerText = total + " EGP";
}


//------------------------------------
// Checkout
//------------------------------------
function goToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}


//------------------------------------
// Auto Load Cart on Page Start
//------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateTotals();
});

function restoreOldButtonsOnLoad() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        // ابحث عن زر العنصر بحسب الاسم
        let btn = document.querySelector(
            `.AddToCart[data-name="${item.name}"]`
        );

        if (btn) {
            btn.outerHTML = `
                <div class="qty-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(this, '${item.name}')">-</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(this, '${item.name}')">+</button>
                </div>
            `;
        }
    });

    updateCartButton();
}
window.addEventListener("DOMContentLoaded", restoreOldButtonsOnLoad);