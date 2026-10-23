
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// Open and close the mobile menu
menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});

// Close the menu when a navigation link is clicked
document.querySelectorAll("#nav a").forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// Display the current year in the footer
document.getElementById("year").textContent =
    new Date().getFullYear();
