// Burger scales up/down based on scroll position (no rotation)
const floatingBurger = document.getElementById("floating-burger");

window.addEventListener("scroll", () => {
    if (!floatingBurger) return;

    const scrollY = window.scrollY || window.pageYOffset;

    // Scale value (from 1 up to 1.6 – adjust as you like)
    let scaleValue = 1 + scrollY * 0.0005;

    // Optional limit so it doesn’t get too big
    if (scaleValue > 1.6) scaleValue = 1.6;

    floatingBurger.style.transform = `
        scale(${scaleValue})
    `;
});

// CART VARIABLES
const cart = [];
const cartModal = document.getElementById("cart-modal");
const cartItemsList = document.getElementById("cart-items");
const viewCartBtn = document.getElementById("view-cart-btn");





// UPDATE CART UI
function updateCart() {
    cartItemsList.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(li);
    });
}

// ADD TO CART BUTTON LOGIC
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".menu-item");
        const name = item.querySelector("h3").innerText;
        const priceText = itemElement.querySelector(".price").innerText; 
        const price = parseFloat(priceText); // remove EGP, symbols, etc.

cart.push({
    name,
    price,
    image
});

        updateCart();

        // Button click bounce
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"), 200);

        // Hearts animation
        spawnHearts(button);

        // Shake View Cart button
        viewCartBtn.classList.add("shake");
        setTimeout(() => viewCartBtn.classList.remove("shake"), 500);
    });
});

// VIEW CART MODAL
viewCartBtn.onclick = () => {
    cartModal.style.display = "flex";
    cartModal.style.transform = "scale(1.05)";
    setTimeout(() => {
        cartModal.style.transform = "scale(1)";
    }, 150);
};

// CLOSE CART MODAL
document.getElementById("close-cart").onclick = () => {
    cartModal.style.display = "none";
};

// CLOSE MODAL WHEN CLICKING OUTSIDE
window.onclick = (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
};
