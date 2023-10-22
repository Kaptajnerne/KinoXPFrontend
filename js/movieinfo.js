import { fetchAnyUrl } from "/js/modulejson.js";

const movieInfoContainer = document.getElementById("movie-info");
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

//Fetch movie details
async function fetchMovieDetails() {
    try {
        const movieData = await fetchAnyUrl(`http://localhost:8080/movies/${movieId}`);
        const movieInfoHtml = createMovieInfoHtml(movieData);
        movieInfoContainer.innerHTML = movieInfoHtml;
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

//Create HTML
function createMovieInfoHtml(movieData) {
    return `
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
}

console.log(movieId);
fetchMovieDetails();


