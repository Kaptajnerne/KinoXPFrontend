// movieinfo-and-showtimes.js

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieInfoContainer = document.getElementById("movie-info");
const showtimesContainer = document.getElementById("showtimes");

// Function to fetch movie details based on the provided ID
async function fetchMovieDetails() {
    try {
        const response = await fetch(`http://localhost:8080/movies/${movieId}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const movieData = await response.json();

        // Create HTML to display movie details
        const movieInfoHtml = `
            <div class="card">
                <img src="${movieData.movieImageUrl}" height="405" width="289" alt="${movieData.title}">
                <div class="card-body">
                    <h5 class="card-title">${movieData.title}</h5>
                    <p class="card-text">${movieData.description}</p>
                    <p class="card-text">Age Limit: ${movieData.ageLimit}</p>
                    <p class="card-text">Genre: ${movieData.genre}</p>
                    <p class="card-text">Duration: ${movieData.duration} minutes</p>
                </div>
            </div>
        `;

        // Set the movie info HTML to the container
        movieInfoContainer.innerHTML = movieInfoHtml;
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

// Function to fetch showtimes for the specific movie
async function fetchShowtimesForMovie() {
    try {
        const response = await fetch(`http://localhost:8080/showtimes?movieId=${movieId}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const showtimesData = await response.json();

        // Create HTML to display showtimes
        const showtimesHtml = showtimesData.map(showtime => `
            <div class="showtime-card">
                <p>Date: ${showtime.date}</p>
                <p>Time: ${showtime.time}</p>
                <p>Theater: ${showtime.theater.name}</p>
                <button class="btn btn-primary" data-showtime-id="${showtime.showTimeID}">Book Ticket</button>
            </div>
        `).join('');

        // Set the showtimes HTML to the container
        showtimesContainer.innerHTML = showtimesHtml;
    } catch (error) {
        console.error("Error fetching showtimes:", error);
    }
}

// Call both fetch functions to populate movie info and showtimes
fetchMovieDetails();
fetchShowtimesForMovie();
