import { fetchAnyUrl } from "/js/modulejson.js";

const showtimesContainer = document.getElementById("showtimes");
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

//Create showtime card
function createShowtimeCard(showtime) {
    return `
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
                    <a href="seatSelection.html?showtimeId=${showtime.showtimeID}" class="btn btn-primary">Book Ticket</a>
                </div>
            </div>
        </div>
    `;
}

//Fetch showtimes for specific movie
async function fetchShowtimesForMovie(movieId) {
    try {
        const showtimesData = await fetchAnyUrl(`http://localhost:8080/showtimes?movieID=${movieId}`);
        //new row
        const showtimesRow = document.createElement("div");
        showtimesRow.classList.add("row");
        //create html card and set it
        const showtimesHtml = showtimesData.map(showtime => createShowtimeCard(showtime)).join('');
        showtimesRow.innerHTML = showtimesHtml;
        showtimesContainer.appendChild(showtimesRow);

    } catch (error) {
        console.error("Error fetching showtimes:", error);
    }
}

fetchShowtimesForMovie(movieId);
