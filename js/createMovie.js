// createMovie.js

document.addEventListener('DOMContentLoaded', function () {
    const createMovieForm = document.getElementById('create-movie-form');

    createMovieForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(createMovieForm);
        const movieData = {
            title: formData.get('title'),
            description: formData.get('description'),
            ageLimit: parseInt(formData.get('ageLimit')),
            genre: formData.get('genre'),
            duration: parseInt(formData.get('duration')),
            movieImageUrl: formData.get('movieImageUrl')
        };

        try {
            const response = await fetch('http://localhost:8080/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (response.ok) {
                // Movie created successfully, you can display a success message or perform other actions
                alert('Movie created successfully');
                createMovieForm.reset();

                // Redirect back to manage.html after a short delay (e.g., 2 seconds)
                setTimeout(function () {
                    window.location.href = 'manage.html';
                }, 2000); // Redirect after 2 seconds
            } else {
                // Handle error, display an error message, etc.
                console.error('Error creating movie');
            }
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    });
});
