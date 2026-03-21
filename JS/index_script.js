//adding hamburger on small screen sizes

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});

console.log("js in action");

//add to cart button

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
});

