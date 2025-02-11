const products = [
    { id: 1, name: "Laptop", price: 800, image: "laptop.jpg", description: "Powerful laptop for work & gaming" },
    { id: 2, name: "Phone", price: 500, image: "phone.jpg", description: "Latest smartphone with high-end features" },
    { id: 3, name: "Headphones", price: 100, image: "headphones.jpg", description: "Noise-cancelling wireless headphones" }
];

let cart = [];

function displayProducts() {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    document.getElementById("cart-count").textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const checkoutContainer = document.querySelector(".checkout-items");
    checkoutContainer.innerHTML = "";

    cart.forEach(item => {
        const checkoutItem = document.createElement("div");
        checkoutItem.classList.add("checkout-item");
        checkoutItem.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <div>
                <button onclick="updateQuantity(${item.id}, -1)">➖</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">➕</button>
            </div>
            <p>Total: $${item.price * item.quantity}</p>
        `;
        checkoutContainer.appendChild(checkoutItem);
    });

    document.getElementById("checkout-total").textContent = `$${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}`;
    document.querySelector(".modal").style.display = "flex";
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    openCheckout();
    updateCart();
}

document.getElementById("confirm-checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    generateReceipt();  // Generate the receipt when checkout is confirmed
    document.querySelector(".modal").style.display = "none";  // Close the modal
    cart = [];  // Empty the cart
    updateCart();
});

function generateReceipt() {
    const receiptContainer = document.querySelector(".receipt-items");
    receiptContainer.innerHTML = "";

    cart.forEach(item => {
        const receiptItem = document.createElement("p");
        receiptItem.innerHTML = `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`;
        receiptContainer.appendChild(receiptItem);
    });

    document.getElementById("order-id").textContent = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById("order-date").textContent = new Date().toLocaleString();
    document.getElementById("receipt-total").textContent = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    document.querySelector(".receipt-modal").style.display = "flex";
}

document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});

document.getElementById("close-receipt-btn").addEventListener("click", () => {
    document.querySelector(".receipt-modal").style.display = "none";
});

document.getElementById("print-receipt-btn").addEventListener("click", () => {
    window.print();
});

document.addEventListener("DOMContentLoaded", displayProducts);

// 🆕 Clear Cart ফিচার
document.getElementById("clear-cart-btn").addEventListener("click", () => {
    cart = [];  // Empty the cart
    updateCart();
    alert("Cart has been cleared!");
});
