document.addEventListener('DOMContentLoaded', function () {
    const createShowtimeForm = document.getElementById('create-showtime-form');

    createShowtimeForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(createShowtimeForm);
        const showtimeData = {
            date: formData.get('date'),
            time: formData.get('time'),
            theaterId: parseInt(formData.get('theaterId')),
            movieId: parseInt(formData.get('movieId'))
        };

        try {
            const response = await fetch('http://localhost:8080/showtimes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(showtimeData),
            });

            if (response.ok) {
                // Showtime created successfully, you can display a success message or perform other actions
                alert('Showtime created successfully');
                createShowtimeForm.reset();

                // Redirect back to manage.html after a short delay (e.g., 2 seconds)
                setTimeout(function () {
                    window.location.href = 'manage.html';
                }, 2000); // Redirect after 2 seconds
            } else {
                // Handle error, display an error message, etc.
                console.error('Error creating showtime');
            }
        } catch (error) {
            console.error('Error creating showtime:', error);
        }
    });
});
