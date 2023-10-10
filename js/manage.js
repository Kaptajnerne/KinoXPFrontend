// manage.js

// Function to fetch and display movies
async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:8080/movies');
        const movies = await response.json();

        const moviesTable = document.getElementById('movies-table');
        // Clear existing table rows
        moviesTable.innerHTML = '';

        // Create table headers
        const headers = ['ID', 'Title', 'Description', 'Age Limit', 'Genre', 'Duration', 'Actions'];
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        moviesTable.appendChild(headerRow);

        // Create table rows for movies
        movies.forEach(movie => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movie.movieID}</td>
                <td>${movie.title}</td>
                <td>${movie.description}</td>
                <td>${movie.ageLimit}</td>
                <td>${movie.genre}</td>
                <td>${movie.duration}</td>
                <td>
                    <button onclick="editMovie(${movie.movieID})">Edit</button>
                    <button onclick="deleteMovie(${movie.movieID})">Delete</button>
                </td>
            `;
            moviesTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to fetch and display showtimes
async function fetchShowtimes() {
    try {
        const response = await fetch('http://localhost:8080/showtimes');
        const showtimes = await response.json();

        const showtimesTable = document.getElementById('showtimes-table');
        // Clear existing table rows
        showtimesTable.innerHTML = '';

        // Create table headers
        const headers = ['ID', 'Date', 'Time', 'Movie ID', 'Theater ID', 'Actions'];
        const headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        showtimesTable.appendChild(headerRow);

        // Create table rows for showtimes
        showtimes.forEach(showtime => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${showtime.showtimeID}</td>
                <td>${showtime.date}</td>
                <td>${showtime.time}</td>
                <td>${showtime.movie.movieID}</td>
                <td>${showtime.theater.theaterID}</td>
                <td>
                    <button onclick="editShowtime(${showtime.showtimeID})">Edit</button>
                    <button onclick="deleteShowtime(${showtime.showtimeID})">Delete</button>
                </td>
            `;
            showtimesTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching showtimes:', error);
    }
}

document.getElementById('create-movie').addEventListener('click', function () {
    window.location.href = 'createMovie.html';
});

document.getElementById('create-showtime').addEventListener('click', function () {
    window.location.href = 'createShowtime.html';
});

// Initial load
fetchMovies();
fetchShowtimes();
