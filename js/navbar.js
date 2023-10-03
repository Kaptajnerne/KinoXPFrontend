// navbar.js

// Function to load the navigation bar
function loadNavbar() {
    // Fetch the navigation bar HTML using fetch or other methods
    fetch("navbar.html")
        .then(response => response.text())
        .then(html => {
            // Set the fetched HTML to the navbar container
            document.getElementById("navbar-container").innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading navigation bar:", error);
        });
}

// Call the function to load the navigation bar when the page loads
window.addEventListener("DOMContentLoaded", loadNavbar);
