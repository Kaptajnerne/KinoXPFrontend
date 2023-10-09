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

        // Create a Bootstrap row to contain showtime cards
        const showtimesRow = document.createElement("div");
        showtimesRow.classList.add("row");

        // Create HTML for showtime cards
        const showtimesHtml = showtimesData.map(showtime => `
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Theater ${showtime.theater.theaterID}</h5>
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Date</th>
                                    <td>${showtime.date}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Time</th>
                                    <td>${showtime.time}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-primary" data-showtime-id="${showtime.showTimeID}">Book Ticket</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Set the showtimes HTML to the container
        showtimesRow.innerHTML = showtimesHtml;
        showtimesContainer.appendChild(showtimesRow);

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
