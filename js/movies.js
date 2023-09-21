alert("movies baby")

function movieSearch(movieName) {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=5a824055&t=${movieName}&plot=full`;
    console.log(url);
    const options = {
        method: 'GET',
    };
}
    fetch(url, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        })