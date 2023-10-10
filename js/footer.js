// footer.js

// Function to load the footer
function loadFooter() {
    // Fetch the footer HTML using fetch or other methods
    fetch("footer.html")
        .then(response => response.text())
        .then(html => {
            // Set the fetched HTML to the footer container
            document.getElementById("footer-container").innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading footer:", error);
        });
}

// Call the function to load the footer when the page loads
window.addEventListener("DOMContentLoaded", loadFooter);
