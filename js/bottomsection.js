// bottom-section.js

// Function to load the bottom section
function loadBottomSection() {
    // Fetch the bottom section HTML using fetch or other methods
    fetch("bottom-section.html")
        .then(response => response.text())
        .then(html => {
            // Set the fetched HTML to the bottom section container
            document.getElementById("bottom-section").innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading bottom section:", error);
        });
}
window.addEventListener("DOMContentLoaded", loadBottomSection)