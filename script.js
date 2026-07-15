// Welcome Message
window.addEventListener("load", () => {
    console.log("Welcome to Aarthi's Portfolio!");
});

// Smooth Scroll Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Active Navigation Highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Scroll Animation
const revealElements = document.querySelectorAll("section");

function revealOnScroll() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Back to Top Button
const topButton = document.createElement("button");

topButton.innerText = "↑";
topButton.id = "topBtn";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
let lastScrollTop = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    if(currentScroll > lastScrollTop){
        navbar.style.top = "-120px";
    }
    else{
        navbar.style.top = "20px";
    }

    lastScrollTop = currentScroll;
});
document.getElementById("contactForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch("http://localhost:3000/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        alert(result.message);

        document.getElementById("contactForm").reset();

    } catch (error) {

        alert("Server Connection Error");

        console.log(error);

    }

});