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
            row.dataset.movieid = movie.movieID; // Set data-movieid attribute for identifying movies
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

// Function to edit a movie by ID
function editMovie(movieID) {
    // Redirect to the editMovie.html page with the movie ID as a query parameter
    window.location.href = `editMovie.html?id=${movieID}`;
}




// Function to delete a movie by ID
async function deleteMovie(movieID) {
    // Display a confirmation dialog to confirm deletion
    const confirmDeletion = confirm('Are you sure you want to delete this movie?');

    if (!confirmDeletion) {
        // If the user cancels the deletion, do nothing
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/movies/${movieID}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Movie deleted successfully, you can display a success message or perform other actions
            console.log('Movie deleted successfully');

            // Remove the deleted movie row from the table
            const moviesTable = document.getElementById('movies-table');
            const rowToDelete = document.querySelector(`#movies-table tr[data-movieid="${movieID}"]`);
            if (rowToDelete) {
                moviesTable.removeChild(rowToDelete);
            }
        } else {
            // Handle error, display an error message, etc.
            console.error('Error deleting movie');
        }
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
}


async function deleteShowtime(showtimeID) {
    try {
        // Delete the showtime
        const response = await fetch(`http://localhost:8080/showtimes/${showtimeID}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Delete associated reservations
            const responseReservations = await fetch(`http://localhost:8080/showtimes/deleteReservationsByShowtime/${showtimeID}`, {
                method: 'DELETE',
            });

            if (responseReservations.ok) {
                console.log('Associated reservations deleted successfully');
            } else {
                console.error('Error deleting associated reservations');
            }

            // Remove the deleted showtime row from the table
            const showtimesTable = document.getElementById('showtimes-table');
            const rowToDelete = document.querySelector(`#showtimes-table tr[data-showtimeid="${showtimeID}"]`);
            if (rowToDelete) {
                showtimesTable.removeChild(rowToDelete);
            }
        } else {
            console.error('Error deleting showtime');
        }
    } catch (error) {
        console.error('Error deleting showtime:', error);
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
            row.dataset.showtimeid = showtime.showtimeID; // Set data-showtimeid attribute for identifying showtimes
            row.innerHTML = `
                <td>${showtime.showtimeID}</td>
                <td>${showtime.date}</td>
                <td>${showtime.time}</td>
                <td>${showtime.movie.movieID}</td>
                <td>${showtime.theater.theaterID}</td>
                <td>
                    <button onclick="editShowtime(${showtime.showtimeID})">Edit</button>
                    <button onclick="confirmDeleteShowtime(${showtime.showtimeID})">Delete</button>

                </td>
            `;
            showtimesTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching showtimes:', error);
    }
}
function editShowtime(showtimeID) {
    // Redirect to the editMovie.html page with the movie ID as a query parameter
    window.location.href = `editShowtime.html?id=${showtimeID}`;
}

function confirmDeleteShowtime(showtimeID) {
    const confirmDeletion = confirm('Are you sure you want to delete this showtime?');

    if (confirmDeletion) {
        deleteShowtime(showtimeID);
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
