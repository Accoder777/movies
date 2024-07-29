const movieForm = document.getElementById('movie');
const enterName = document.getElementById('enterName');
const imageElements = document.querySelectorAll('.image');
const movieNameElements = document.querySelectorAll('.movieName');
const extraInfoElements = document.querySelectorAll('.extraInfo');
const container = document.getElementsByClassName('container')[0];

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = enterName.value;
    getData(movieName);
});

const getData = async (movieName) => {
    console.log(movieName);
    const url = `https://api.tvmaze.com/search/shows?q=${movieName}`;
    const req = await fetch(url);
    const movies = await req.json();
    makeInfo(movies);
};

const makeInfo = (movies) => {
    console.log(movies)
    let counter = 0;
    if (movies.length > 9) {
        if (container.classList.contains('dn')) {
            container.classList.remove('dn');
        }
        for (let movie of movies) {

            movieNameElements[counter].innerHTML = movie.show.name;

            if (movie.show.image) {
                imageElements[counter].src = movie.show.image.medium;
            } else {
                imageElements[counter].src = 'placeholder-image-url'; // Provide a placeholder image URL
            }

            if (movie.show.genres.length === 0) {
                extraInfoElements[counter].innerHTML = `
                    <b>Genre:</b> Interesting;<br>
                    <b>Language:</b> ${movie.show.language} <br>
                `;
            } else {
                extraInfoElements[counter].innerHTML = `
                    <b>Genre:</b> ${movie.show.genres[0]}<br>
                    <b>Language:</b> ${movie.show.language} <br>
                `;
            }

            counter++;
        }
    }
};
