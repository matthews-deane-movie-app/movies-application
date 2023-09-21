// let movieAPI = "../data/movies.json";

//
// //Generates Movies on Load
// function getMovies() {
//     return fetch(movieAPI)
//         .then((response) =>
//             response.json());
// }
//
// getMovies().then((movies) => {
//
//     $('#loader').css('display', 'none');
//
//     console.log(movies)
//
//     //loops through the cards
//     movies.forEach((movie) => {
//
//         $('#movies-div').append(
//
//             `<div class="card col-md-4 flip-card" id="${movie.id}">
//             <div class="flip-card-inner">
//
//             <div class="flip-card-front">
//             <img class="card-img-top" src="${movie.poster}">
//             </div>
//
//             <div class="flip-card-back">
//             <h3 class="card-title">${movie.title}</h3>
//             <h6 class="card-text">${movie.genre}</h6>
//              <div class="card-body">
//             <p class="card-text">${movie.plot}</p>
//             // <p class="card-text">Rating: ${movie.rating}</p>
//
//
// <!--Pulls from API OMDB-->
// function movieSearch(movieName) {
//     const url = `http://www.omdbapi.com/?i=tt3896198&apikey=5a824055&t=${movieName}&plot=full`;
//     // console.log(url);
//     const options = {
//         method: 'GET',
//     };
//
//     fetch(url, options)
//         .then(response => response.json())
//         .then((data) => {
//             console.log(data)
//             console.log(data.Plot);
//
//             let newMovieOMDB = {
//                 title: data.Title,
//                 rating: data.imdbRating,
//                 genre: data.Genre,
//                 plot: data.Plot,
//                 poster: data.Poster,
//                 id: data.imdbID
//             };
//
//             console.log(newMovieOMDB);
//             createNewMovie(newMovieOMDB)
//
//             alert("Your search has been added to your favorite movies!");
//
//
//             $('#movies-div').append(
//                 `
//                 <div class="card " id="${data.imdbID}">
//                 <div class="">
//
//
//                     <div class="">
//                         <img class="card" src="${data.Poster}">
//                     </div>
//                       <div class="">
//                         <h3 class="card-title">${data.Title}</h3>
//                          <h6 class="card-text">${data.Genre}</h6>
//                         <div class="card-body">
//                         <p class="card-text">${data.Plot}</p>
//                         <p class="card-text">Rating: ${data.imdbRating}</p>
//
//                         <button class="btn btn-primary myBtn float-left"
//                             data-movie-id="${data.imdbID}"
//                             data-movie-title="${data.Title}"
//                             data-movie-rating="${data.imdbRating}"
//                             data-movie-genre="${data.Plot}"
//                             data-movie-description="${data.Plot}"
//                             data-movie-poster="${data.Poster}"
//                             >Edit Movie
//                         </button>
//                             <button type="button" class="btn btn-primary" data-movie-id="${data.imdbid}">Delete></button>
//
//                     </div>
//
//                 </div>
//
//                 </div>
//              </div>`)
//             // functions needed to be added for edit and delete
//             editButton();
//
//             deleteButton();
//
//         })
//
// }
//
//     $('#omdb-btn').on("click", function (e) {
//         e.preventDefault()
//         let omdbUserInput = $('#site-search').val()
//         //console.log(omdbUserInput)
//         movieSearch(omdbUserInput)
//
// });

const getMovies = async () => {
    const url = "OMDBKeyAPI";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movies = await response.json();
    return movies;
};

const getMovie = async (id) => {
    const url = `OMDBKeyAPI/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movie = await response.json();
    return movie;
};

const deleteMovie = async (id) => {
    const url = `OMDBKeyAPI/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movie = await response.json();
    return movie;
};

const postMovie = async (movie) => {
    try {
        //todo: validate movie isn't already in the db
        const searchResult = await searchMovieByTitle(movie.title);
        if (searchResult.length > 0) {
            // movie already exists
            // throw error
            throw new Error("movie already exists in the database");
        }
        const url = `OMDBKeyAPI`;
        const body = movie;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        const response = await fetch(url, options);
        const newId = await response.json();
        return newId;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const patchMovie = async (movie) => {
    try {
        const url = `OMDBKeyAPI/${movie.id}`;
        const body = movie;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        const response = await fetch(url, options);
        const newId = await response.json();
        return newId;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const searchMovieByTitle = async (title) => {
    const url = `OMDBKeyAPI + ?title=${title}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
     const response = await fetch(url, options);
     const movies = await response.json();
     return movies;
 };

// export {getMovies, getMovie, deleteMovie, postMovie, patchMovie, searchMovieByTitle};