document.addEventListener('DOMContentLoaded', function () {
    const editShowtimeForm = document.getElementById('edit-showtime-form');
    const showtimeIdInput = document.getElementById('showtime-id');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const movieIdInput = document.getElementById('movie-id');
    const theaterIdInput = document.getElementById('theater-id');

    const urlParams = new URLSearchParams(window.location.search);
    const showtimeId = urlParams.get('id');

    async function fetchShowtimeDetails() {
        try {
            const response = await fetch(`http://localhost:8080/showtimes/${showtimeId}`);
            const showtime = await response.json();

            showtimeIdInput.value = showtime.showtimeID;
            dateInput.value = showtime.date;
            timeInput.value = showtime.time;
            movieIdInput.value = showtime.movie.movieID;
            theaterIdInput.value = showtime.theater.theaterID;
        } catch (error) {
            console.error('Error fetching showtime details:', error);
        }
    }

    editShowtimeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedShowtime = {
            date: dateInput.value,
            time: timeInput.value,
            movie: {
                movieID: movieIdInput.value
            },
            theater: {
                theaterID: theaterIdInput.value
            }
        };

        updateShowtime(updatedShowtime);
    });

    async function updateShowtime(updatedShowtime) {
        try {
            const response = await fetch(`http://localhost:8080/showtimes/${showtimeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedShowtime)
            });

            if (response.ok) {
                alert('Showtime details updated successfully!');
                // Redirect to showtime management page after successful update
                window.location.href = 'manage.html';
            } else {
                console.error('Error updating showtime details');
            }
        } catch (error) {
            console.error('Error updating showtime details:', error);
        }
    }

    fetchShowtimeDetails();
});
