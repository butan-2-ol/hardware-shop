
// Adding hamburger on small screen sizes

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});
