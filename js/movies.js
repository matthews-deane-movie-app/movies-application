let movieAPI = "movies.json";


function movieSearch(movieName) {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=5a824055&t=${movieName}&plot=full`;
    // console.log(url);
    const options = {
        method: 'GET',
    };


    fetch(url, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.Plot);

            let newMovieOMDB = {
                title: data.Title,
                rating: data.imdbRating,
                genre: data.Genre,
                plot: data.Plot,
                poster: data.Poster,
                id: data.imdbID
            };

            console.log(newMovieOMDB);
            createNewMovie(newMovieOMDB)

            alert("Your search has been added to your favorite movies!");


            $('#movies-div').append(
                `
                <div class="card " id="${data.imdbID}">
                <div class="">


                    <div class="">
                        <img class="card" src="${data.Poster}">
                    </div>
                      <div class="">
                        <h3 class="card-title">${data.Title}</h3>
                         <h6 class="card-text">${data.Genre}</h6>
                        <div class="card-body">
                        <p class="card-text">${data.Plot}</p>
                        <p class="card-text">Rating: ${data.imdbRating}</p>

                        <button class="btn btn-primary myBtn float-left"
                            data-movie-id="${data.imdbID}"
                            data-movie-title="${data.Title}"
                            data-movie-rating="${data.imdbRating}"
                            data-movie-genre="${data.Plot}"
                            data-movie-description="${data.Plot}"
                            data-movie-poster="${data.Poster}"
                            >Edit Movie</button>
                            <button type="button" class="btn btn-primary" data-movie-id="${data.imdbid}">Delete></button>

                    </div>

                </div>

                </div>
             </div>`)


            editButton(); //Calls editButton function (lines 293-306)

            deleteButton(); //Calls deleteButton function (lines 325-336)

        })

}

$('#omdb-btn').on("click", function (e) {
    e.preventDefault()
    let omdbUserInput = $('#site-search').val()
    //console.log(omdbUserInput)
    movieSearch(omdbUserInput)

    }
});