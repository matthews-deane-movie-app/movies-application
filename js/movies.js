
'use strict';

// Code executed after HTML is full loaded.
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

            data.forEach(function (element) {
                const movieCard = `
                <div id="${element.id}" class="movieCard">
                <h2 class="movieTitle">${element.title}</h2>
                <p class="movieGenre">${element.genre}</p>
                <p class="movieRating">${element.rating} <i class="fa-solid fa-star fa-2xl" style="color: #004C5B;"></i></p>
                <button class="editButton">Edit</button>
                <button class="deleteButton">Delete</button>
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

    // Function retrieves movie data from form inputs and return as an object
    function addMovie() {
        const title = document.getElementById('movieTitle').value;
        const rating = document.getElementById('movieRating').value;
        const genre = document.getElementById('movieGenre').value;
        return { title, rating, genre };
    }


    // Function clears the input fields in the "Add Movie" form.
    function resetAddMovieForm() {
        document.getElementById('movieTitle').value = '';
        document.getElementById('movieRating').value = '';
        document.getElementById('movieGenre').value = '';
    }

    // Function to display modal for editing movie details when the "Edit" button is clicked and updates the modal with existing movie data
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

        document.getElementById('cancelEdit').addEventListener('click', function () {
            editModal.style.display = 'none';
            document.getElementById('addMovieContainer').style.display = 'block';
        });
    }

    // Function used to delete a movie from the server and remove it from the DOM.
    // Function deletes a movie when the "Delete" function is clicked and confirms the delete with a prompt that also updates the movie count.
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

    // Initial fetch and setup to load and display exisating movies.
    fetchMovies();

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
            displayEditModal(target.closest('.movieCard'));
        } else if (target.classList.contains('deleteButton')) {
            e.preventDefault();
            deleteMovie(target.closest('.movieCard'));
        }
    });
});
