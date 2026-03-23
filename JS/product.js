//add to cart button
/*
const buttons = document.querySelectorAll(".add-to-cart");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        //alert("Item added to cart 🛒 ");
        const message = document.createElement("div");
        message.textContent = "Added to cart 🛒";
        
        message.style.position = "fixed";
        message.style.top = "10%";
        message.style.left = "50%";
        message.style.transform = "translate(-50%, -50%)";
        message.style.background = "teal";
        message.style.color = "white";
        message.style.padding = "15px 25px";
        message.style.borderRadius = "8px";
        message.style.fontSize = "16px";
        message.style.zIndex = "1000";
        message.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";


        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 2000);
       
    });
});*/

// Adding hamburger on small screen sizes

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});


// Cart array
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Update cart count badge
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? "inline-block" : "none";
    }
}

// Update cart sidebar display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById("cartItems");
    const cartTotalSpan = document.getElementById("cartTotal");
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: gray;">Your cart is empty</p>';
        if (cartTotalSpan) cartTotalSpan.textContent = "GH₵0.00";
        updateCartCount();
        return;
    }
    
    let total = 0;
    cartItemsDiv.innerHTML = "";
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">GH₵${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">✕</button>
            </div>
            <div>GH₵${itemTotal.toFixed(2)}</div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    
    if (cartTotalSpan) cartTotalSpan.textContent = `GH₵${total.toFixed(2)}`;
    updateCartCount();
}

// Update quantity
window.updateQuantity = function(index, change) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
};

// Remove from cart
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
};

// Add to cart function (modify your existing one)
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    saveCart();
    
    // Show success message
    const message = document.createElement("div");
    message.textContent = `Added ${productName} to cart 🛒`;
    message.style.cssText = `
        position: fixed;
        bottom: 50px;
        right: 20px;
        background: teal;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        z-index: 2001;
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
}

// Update your existing add-to-cart buttons to use this function
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        const card = this.closest(".card");
        const productName = card.querySelector("h3").textContent;
        const priceText = card.querySelector(".card-info p").textContent;
        const productPrice = parseFloat(priceText.replace("GH₵", "").replace(",", ""));
        addToCart(productName, productPrice);
    });
});

// Cart sidebar controls
const viewCartBtn = document.getElementById("viewCartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCartBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

if (viewCartBtn) {
    viewCartBtn.addEventListener("click", function(e) {
        e.preventDefault();
        cartSidebar.classList.add("cart-open");
        cartOverlay.style.display = "block";
    });
}

if (closeCartBtn) {
    closeCartBtn.addEventListener("click", function() {
        cartSidebar.classList.remove("cart-open");
        cartOverlay.style.display = "none";
    });
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", function() {
        cartSidebar.classList.remove("cart-open");
        cartOverlay.style.display = "none";
    });
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function() {
        cart = [];
        saveCart();
        updateCartDisplay();
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert(`Total: GH₵${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}\nThank you for shopping!`);
            // Clear cart after checkout
            cart = [];
            saveCart();
            cartSidebar.classList.remove("cart-open");
            cartOverlay.style.display = "none";
        }
    });
}

// Load cart on page load
loadCart();