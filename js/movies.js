import { fetchAnyUrl } from "/js/modulejson.js";

const urlMovies = "http://localhost:8080/movies";
const moviesContainer = document.getElementById("movies-container");

//Creates a movie card + maybe add if statement for theater hall, so we can dynamically add the correct link
function createMovieCard(movie) {
    const movieTemplate = document.createElement("div");
    movieTemplate.classList.add("col-6", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");
    movieTemplate.innerHTML = `
        <div class="card">
            <div class="film">
                <a class="movie poster" href="movieinfo.html?id=${movie.id}">
                    <img src="${movie.movieImageUrl}" height="390" width="304" alt="${movie.title}" />
                </a>
                <div class="movieTitle p-2">
                    <div class="col-12">
                        <h5 class="card-title text-center">${movie.title}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <a href="movieinfo.html?id=${movie.id}">
                            <div class="d-grid gap-2">
                            <button class="btn btn-secondary">See all days</button>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    return movieTemplate;
}

//Adds movies from the backend to html
async function fetchMovies() {
    try {
        const movies = await fetchAnyUrl(urlMovies);

        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesContainer.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

fetchMovies();


