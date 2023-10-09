// Get the showtimes container element
const showtimesContainer = document.getElementById("showtimes");

// Get the movieId from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Function to fetch showtimes for the specific movie
async function fetchShowtimesForMovie() {
    try {
        const response = await fetch(`http://localhost:8080/showtimes?movieID=${movieId}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const showtimesData = await response.json();

        // Create HTML to display showtimes
        const showtimesHtml = showtimesData.map(showtime => `
            <div class="showtime-card">
                <p>Date: ${showtime.date}</p>
                <p>Time: ${showtime.time}</p>
                <p>Theater: ${showtime.theater.theaterID}</p>
                <button class="btn btn-primary" data-showtime-id="${showtime.showTimeID}">Book Ticket</button>
            </div>
        `).join('');

        // Set the showtimes HTML to the container
        showtimesContainer.innerHTML = showtimesHtml;

        // Add event listeners for booking tickets
        const bookButtons = document.querySelectorAll('.btn-primary');
        bookButtons.forEach(button => {
            button.addEventListener('click', () => {
                const showtimeId = button.getAttribute('data-showtime-id');
                // Redirect to a reservation page with the selected showtimeId
                window.location.href = `reservation.html?showtimeId=${showtimeId}`;
            });
        });
    } catch (error) {
        console.error("Error fetching showtimes:", error);
    }
}

// Call the fetchShowtimesForMovie function to populate showtimes
fetchShowtimesForMovie(movieId);

