const addMovieButton = document.getElementById("add-movie-btn");
const searchMovieButton = document.getElementById("search-btn");
const movies = [];

function searchMovieHandler() {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
}

function renderMovies(filter = "") {
  const movieList = document.getElementById("movie-list");

  movieList.innerHTML = "";

  let filteredMovies = movies;
  if (filter !== "") {
    filteredMovies = movies.filter((movie) => {
      return movie.info.title.includes(filter);
    });
  }

  for (const movie of filteredMovies) {
    const movieEl = document.createElement("li");

    if (!("info" in movie)) {
      return;
    }

    const { info } = movie;
    let text = movie.displayName();
    for (const key in info) {
      if (key !== "title") {
        text = text + " - " + info[key];
      }
    }
    movieEl.textContent = text;

    movieList.appendChild(movieEl);
  }

  if (movies.length > 0) {
    movieList.classList.add("visible");
  } else {
    movieList.classList.remove("visible");
  }
}

function addMovieHandler() {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() == "" ||
    extraName.trim() == "" ||
    extraValue.trim() === ""
  ) {
    alert("Please enter valid data");
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    displayName() {
      return this.info.title.toUpperCase();
    },
  };
  movies.push(newMovie);
  renderMovies();
}

addMovieButton.addEventListener("click", addMovieHandler);
searchMovieButton.addEventListener("click", searchMovieHandler);
