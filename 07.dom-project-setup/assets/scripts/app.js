const addMovieModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const startAddMovieButton = document.getElementById("add-movie");
const cancelAddMovie = document.getElementById("cancel-add-movie");
const confirmAddMovie = document.getElementById("confirm-add-movie");
const userInputs = addMovieModal.querySelectorAll("input");
const initialMessageElement = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteModal = document.getElementById("delete-modal");
const confirmDeleteFlag = false;
const deleteMovieConfirmButton = document.getElementById(
  "delete-movie-confirm"
);
const deleteMovieCancelButton = document.getElementById("delete-movie-cancel");

let movies = [];

function confirmDeleteModal(id) {
  deleteModal.classList.add("visible");
  backDrop.classList.add("visible");
  deleteMovieConfirmButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, id)
  );
  deleteMovieCancelButton.addEventListener("click", () => {
    deleteModal.classList.remove("visible");
    backDrop.classList.remove("visible");
  });
}

function deleteMovieHandler(id) {
  movies = movies.filter((m) => {
    return m.id !== id;
  });

  updateMessageSection();

  listRoot.innerHTML = "";
  if (movies.length > 0) {
    movies.forEach((m) => {
      renderMovies(m.id, m.title, m.image, m.rating);
    });
  }
  deleteModal.classList.remove("visible");
  backDrop.classList.remove("visible");
}

function updateMessageSection() {
  initialMessageElement.style.display = movies.length <= 0 ? "block" : "none";
}

function closeModalHandler() {
  backDrop.classList.remove("visible");
  addMovieModal.classList.remove("visible");
  for (const inputEl of userInputs) {
    inputEl.value = "";
  }
}

function openMovieModal() {
  backDrop.classList.add("visible");
  addMovieModal.classList.add("visible");
  for (const inputEl of userInputs) {
    inputEl.value = "";
  }
}

function addMovieHandler() {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = +userInputs[2].value;

  if (
    title.trim() === "" ||
    imageUrl.trim() === "" ||
    rating < 1 ||
    rating > 5
  ) {
    alert("Please enter a valid values. (Rating between 1 to 5)");
    return;
  }

  const movieId = Math.random().toString();

  const newMovie = {
    id: movieId,
    title: title,
    image: imageUrl,
    rating: rating,
  };

  movies.push(newMovie);
  renderMovies(movieId, title, imageUrl, rating);
  closeModalHandler();
  updateMessageSection();
}

function renderMovies(id, title, imageUrl, rating) {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}" />
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;

  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", confirmDeleteModal.bind(null, id));
  deleteButton.innerHTML = "Delete";
  newMovieElement.appendChild(deleteButton);

  listRoot.append(newMovieElement);
}

startAddMovieButton.addEventListener("click", openMovieModal);
backDrop.addEventListener("click", closeModalHandler);
cancelAddMovie.addEventListener("click", closeModalHandler);
confirmAddMovie.addEventListener("click", addMovieHandler);
