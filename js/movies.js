'use strict';

    // Ensures code is executed after HTML is full loaded.
    document.addEventListener('DOMContentLoaded', function () {
    let titleArr = [];
    let ratingArr = [];
    let genreArr = [];
    let movieCount = 0;


    // Function updates the total movie count displayed in the HTML.
    function updateMovieCount() {
        document.getElementById('movieCount').innerHTML = `Total Movies: ${movieCount}`;
    }

    // Function used to update the total movie count displayed.
    // Async function fetches movie data from server and generates HTML element for each movie and updates the empty arrays and movieCount.
    async function fetchMovies() {
        try {
            const response = await fetch('http://localhost:3000/movies');
            const data = await response.json();
    // ForEach loop constructs an html card and provides buttons for edit and delete.
    // Appends the generated HTML card, adding the movies to the DOM and creating a list of movies.
            data.forEach(function (element) {
                const movieCard = `
                <div id="${element.id}" class="movieCard"><img src="../img/pic-collage.jpeg" class="default-back" alt="default-background">
                <h2 class="movieTitle">${element.title}</h2>
                <p class="movieGenre">${element.genre}</p>
                <p class="movieRating">${element.rating} <i class="fa-solid fa-star fa-2xl" style="color: #004C5B;"></i></p>
                <button id="" class="editButton btn-refresh">Edit</button>
                <button id="" class="deleteButton btn-refresh">Delete</button>
                </div>`;
                document.getElementById('movies').insertAdjacentHTML('beforeend', movieCard);

                titleArr.push(element.title);
                ratingArr.push(element.rating);
                genreArr.push(element.genre);
            });

            movieCount = data.length;
            updateMovieCount();
            document.getElementById('loading').style.display = 'none';
            document.getElementById('addMovieContainer').style.display = 'block';
        } catch (error) {
            console.error(error);
        }

    }


    // Function retrieves movie data from form inputs and return as an object with properties title, rating and genre.
    function addMovie() {
        const title = document.getElementById('movieTitle').value;
        const rating = document.getElementById('movieRating').value;
        const genre = document.getElementById('movieGenre').value;
        return { title, rating, genre };
    }


    // Function clears the input fields in the "Add Movie" form by setting their values to empty strings making them ready for new user input.
    function resetAddMovieForm() {
        document.getElementById('movieTitle').value = '';
        document.getElementById('movieRating').value = '';
        document.getElementById('movieGenre').value = '';
    }

    // Function to display modal for editing movie details when the "Edit" button is clicked and updates the modal with existing movie data and attaches event listeners to edit and cancel the edit.
    function displayEditModal(movieCard) {
        const movieId = parseInt(movieCard.id);
        const title = movieCard.querySelector('.movieTitle').textContent;
        const rating = movieCard.querySelector('.movieRating').textContent;
        const genre = movieCard.querySelector('.movieGenre').textContent;

        const editModal = document.getElementById('editModal');
        editModal.querySelector('#newTitle').value = title;
        editModal.querySelector('#newGenre').value = genre;
        editModal.querySelector('#newRating').value = rating;
        document.getElementById('addMovieContainer').style.display = 'none';
        editModal.style.display = 'block';

        document.getElementById('submitEdit').addEventListener('click', async function () {
            const newTitle = editModal.querySelector('#newTitle').value;
            const newGenre = editModal.querySelector('#newGenre').value;
            const newRating = editModal.querySelector('#newRating').value;

            if (newTitle || newRating || newGenre) {
                try {
                    await fetch(`http://localhost:3000/movies/${movieId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ title: newTitle, rating: newRating, genre: newGenre }),
                    });

                    movieCard.querySelector('.movieTitle').textContent = newTitle;
                    movieCard.querySelector('.movieRating').innerHTML = `${newRating}  <i class="fa-solid fa-star fa-2xl" style="color: #004C5B;"></i>`;
                    movieCard.querySelector('.movieGenre').textContent = newGenre;
                } catch (error) {
                    console.error(error);
                }
            }

            editModal.style.display = 'none';
            document.getElementById('addMovieContainer').style.display = 'block';
        });
    //Event listeners for edit checks for at least one edit.
    //Event listeners for delete hides the modal and restores the display of the 'addMovieContainer', allowing the user to cancel the editing process.

        document.getElementById('cancelEdit').addEventListener('click', function () {
            editModal.style.display = 'none';
            document.getElementById('addMovieContainer').style.display = 'block';
        });
    }

    // Async Function used to delete a movie from the server and remove it from the DOM.
    // Function deletes a movie when the "Delete" function is clicked and confirms the delete with a prompt and updates the movie count when successful.
    async function deleteMovie(movieCard) {
        const movieId = parseInt(movieCard.id);
        const shouldDelete = confirm('Are you sure you want to delete this movie?');

        if (shouldDelete) {
            try {
                await fetch(`http://localhost:3000/movies/${movieId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                });

                movieCard.remove();
                movieCount -= 1;
                updateMovieCount();
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Initial fetch and setup to load and display existing movies.
    fetchMovies();

    // Sends a asynchronous POST request to add a new movie to the server's database.
    // Inserts the newly created movie card at the end of the container
    // Updates local arrays, movie count and clears input fields using the resetAddForm function.

    // These event listeners handle the addition of new movies and user interactions with existing movie cards (editing and deleting) in the web application and they make asynchronous requests to the server, and update the DOM.

    document.getElementById('addMovieButton').addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addMovie()),
            });
            const data = await response.json();
            const movieCard = `
                    <div id="${data.id}" class="movieCard">
                    <img src="../img/pic-collage.jpeg" class="default-back" alt="default-background">
                        <h2 class="movieTitle">${data.title}</h2>
                        <p class="movieGenre">${data.genre}</p>
                        <p class="movieRating">${data.rating} <i class="fa-solid fa-star fa-2xl" style="color: #004C5B;"></i></p>
                        <button class="editButton">Edit</button>
                        <button class="deleteButton">Delete</button>
                    </div>`;
            document.getElementById('movies').insertAdjacentHTML('beforeend', movieCard);

            titleArr.push(data.title);
            ratingArr.push(data.rating);
            movieCount += 1;
            updateMovieCount();
            resetAddMovieForm();
        } catch (error) {
            console.error(error);
        }
    });

    document.getElementById('movies').addEventListener('click', function (e) {
        const target = e.target;
        if (target.classList.contains('editButton')) {
            e.preventDefault();
            // Closest method returns itself or matching ancestor. if no element exist return null
            displayEditModal(target.closest('.movieCard'));
        } else if (target.classList.contains('deleteButton')) {
            e.preventDefault();
            deleteMovie(target.closest('.movieCard'));
            }
        });
    });

    document.getElementById("btn-refresh").addEventListener("click", function () {
        location.reload();
    });
