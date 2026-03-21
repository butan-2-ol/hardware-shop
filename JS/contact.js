
// Adding hamburger on small screen sizes

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});

//form submission
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const message = document.getElementById("message").value;
            
            // Check if all fields are filled
            if (name && email && phone && message) {
                // Create popup message
                const popup = document.createElement("div");
                popup.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: teal;
                        color: white;
                        padding: 20px 30px;
                        border-radius: 12px;
                        text-align: center;
                        z-index: 2000;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                        min-width: 280px;
                    ">
                        <i class="fa-regular fa-circle-check" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                        <h3 style="margin-bottom: 8px;">Thank You, ${name}!</h3>
                        <p style="margin: 0;">Thanks for your input.<br>You will hear from us soon!</p>
                        <button id="closePopup" style="
                            margin-top: 15px;
                            background: white;
                            color: teal;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-weight: bold;
                        ">OK</button>
                    </div>
                `;
                
                // Add overlay background
                const overlay = document.createElement("div");
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 1999;
                `;
                
                document.body.appendChild(overlay);
                document.body.appendChild(popup);
                
                // Close popup when clicking OK
                const closeBtn = document.getElementById("closePopup");
                closeBtn.addEventListener("click", function() {
                    popup.remove();
                    overlay.remove();
                    contactForm.reset();
                });
                
                // Optional: Close when clicking overlay
                overlay.addEventListener("click", function() {
                    popup.remove();
                    overlay.remove();
                });
                
            } else {
                alert("Please fill in all fields before submitting.");
            }
        });
    }
