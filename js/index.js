// import {getMovies, getMovie, deleteMovie, postMovie, patchMovie, searchMovieByTitle} from "./movies.js";

const renderCategories = (categories) => {
    // create a single HTML string made up of all the categories
    const categoriesHTML = categories.map((category) => `<span class="movie-card-tag">${category}</span>`).join("");
    return categoriesHTML;
};
const renderMovie = (movie, target) => {
    const movieCard = document.createElement("article");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
        <div class="movie-card-title">${movie.title}</div>
        <p class="movie-card-year">${movie.year}</p>
        <p class="movie-card-description">${movie.description}.</p>
        <div class="d-flex align-items-center justify-content-between">
            <span class="movie-card-span">Rating</span>
            <span class="movie-card-rating">${movie.rating}/10</span>
        </div>
        <meter class="movie-card-meter" min="0" max="10" value="${movie.rating}"></meter>
        <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
            ${renderCategories(movie.categories)}
        </div>
    `;
    // IF we had buttons in here that needed event listeners, we would do it here
    const editBtn = movieCard.querySelector("button");
    editBtn.addEventListener("click", async () => {
        /// DO THE THANG!
    });
    // THEN append it into the DOM
    target.appendChild(movieCard);
};

//////// MAIN METHOD
(async () => {
    /////
    const movies = await getMovies();
    console.log(movies);
    for (let movie of movies) {
        const target = document.querySelector(".movies-grid");
        renderMovie(movie, target);
    }
})();