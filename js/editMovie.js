document.addEventListener('DOMContentLoaded', function () {
    const editMovieForm = document.getElementById('edit-movie-form');
    const movieIdInput = document.getElementById('movie-id');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const ageLimitInput = document.getElementById('age-limit');
    const genreInput = document.getElementById('genre');
    const durationInput = document.getElementById('duration');
    const movieImageUrl = document.getElementById('movieImageUrl'); // Corrected variable name

    // Get movie ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Fetch movie details and populate the form
    async function fetchMovieDetails() {
        try {
            const response = await fetch(`http://localhost:8080/movies/${movieId}`);
            const movie = await response.json();

            movieIdInput.value = movie.movieID;
            titleInput.value = movie.title;
            descriptionInput.value = movie.description;
            ageLimitInput.value = movie.ageLimit;
            genreInput.value = movie.genre;
            durationInput.value = movie.duration;
            movieImageUrl.value = movie.movieImageUrl;
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }

    // Event listener for form submission
    editMovieForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedMovie = {
            title: titleInput.value,
            description: descriptionInput.value,
            ageLimit: parseInt(ageLimitInput.value),
            genre: genreInput.value,
            duration: parseInt(durationInput.value),
            movieImageUrl: movieImageUrl.value // Corrected variable name
        };

        // Update movie details
        updateMovie(updatedMovie);
    });

    // Function to update movie details
    async function updateMovie(updatedMovie) {
        try {
            const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMovie)
            });

            if (response.ok) {
                alert('Movie details updated successfully!');
                // Redirect to movie management page after successful update
                window.location.href = 'manage.html';
            } else {
                console.error('Error updating movie details');
            }
        } catch (error) {
            console.error('Error updating movie details:', error);
        }
    }

    // Fetch and populate movie details on page load
    fetchMovieDetails();
});
