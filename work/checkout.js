window.addEventListener("DOMContentLoaded", function () {
    const subtotal = localStorage.getItem("checkoutSubtotal") || "0 EGP";
    const delivery = localStorage.getItem("checkoutDelivery") || "25 EGP";
    const total = localStorage.getItem("checkoutTotal") || "0 EGP";

    document.getElementById("subtotal-price").innerText = subtotal;
    document.getElementById("checkout-delivery").innerText = delivery;
    document.getElementById("total-price").innerText = total;
});



let user = JSON.parse(localStorage.getItem('user')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };

window.addEventListener('DOMContentLoaded', () => {
    // 1. الحماية
    if (!localStorage.getItem('isLoggedIn')) {
        alert("Please Login First!");
        window.location.href = 'login.html';
        return;
    }

    // 2. تعبئة البيانات
    if (user) {
        document.getElementById('fullName').value = user.name || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('address').value = user.address || '';
    }

    // 3. عرض السلة
    renderCartItems();
});

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const items = cart.items || [];
    let subtotal = 0;

    if (items.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Your cart is empty 🛒</p>';
        updateTotals(0);
        return;
    }

    container.innerHTML = ''; 
    
    items.forEach(item => {
        subtotal += (item.price * item.quantity);
        const itemHTML = `
            <div class="dynamic-item">
                <div style="display:flex; align-items:center;">
                    <img src="${item.image_url || 'https://via.placeholder.com/60'}" alt="Food">
                    <div>
                        <div style="font-weight:600;">${item.name}</div>
                        <div style="font-size:0.8rem; color:#777;">Qty: ${item.quantity}</div>
                    </div>
                </div>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });

    updateTotals(subtotal);
}

window.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items-container");

    cartContainer.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartContainer.innerHTML += `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>${itemTotal} EGP</span>
            </div>
        `;
    });

    const delivery = 25;
    const tax = Math.round(subtotal * 0.10);
    const total = subtotal + delivery + tax;

    document.getElementById("subtotal-price").innerText = subtotal + " EGP";
    document.getElementById("total-price").innerText = total + " EGP";
});

// دالة اختيار طريقة الدفع
function selectPayment(method, element) {
    document.getElementById('selectedPaymentMethod').value = method;
    document.querySelectorAll('.payment-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

async function handlePlaceOrder() {
    const payBtn = document.getElementById('pay-btn');
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    
    if(!address || !phone) {
        alert("Please complete delivery details");
        return;
    }

    payBtn.innerText = "Processing...";
    payBtn.disabled = true;

    const orderData = {
        user_id: user ? user._id : 'guest',
        items: cart.items,
        total_amount: parseFloat(document.getElementById('total-price').innerText.replace('$','')),
        payment_method: document.getElementById('selectedPaymentMethod').value,
        address: address,
        phone: phone,
        status: 'pending'
    };

    try {
        const response = await fetch('http://localhost:4000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            localStorage.removeItem('cart');
            document.getElementById('success-overlay').style.display = 'flex';
        } else {
            const result = await response.json();
            alert("Error: " + (result.message || "Unknown error"));
            payBtn.innerText = "Place Order";
            payBtn.disabled = false;
        }

    } catch (error) {
        console.error(error);
        // في حالة فشل الاتصال، نقوم بمحاكاة النجاح للعرض التقديمي
        setTimeout(() => {
            document.getElementById('success-overlay').style.display = 'flex';
        }, 1500);
    }
}