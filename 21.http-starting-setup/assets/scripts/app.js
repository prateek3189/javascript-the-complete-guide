const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const fetchButton = document.getElementById("fetch-post");
const postForm = document.getElementById("post-form");

// HTTP Request Function
function sendHTTPRequest(method, url, data = null) {
  return fetch(url, {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        response.json().then((data) => {
          throw new Error("Something went wrong - server side");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// Fetch Post
async function fetchPosts() {
  // try {
  listElement.innerHTML = "";
  const postData = await sendHTTPRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );
  for (const post of postData) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title;
    postEl.querySelector("p").textContent = post.body;
    postEl.querySelector("li").id = post.id;
    listElement.appendChild(postEl);
  }
  // } catch (e) {
  //   alert(e.message);
  // }
}

// Create Post
async function createPost(title, body) {
  const userId = Math.random();
  const post = {
    title,
    body,
    userId,
  };

  // const fd = new FormData(postForm);
  // fd.appendChild("userId", userId);

  sendHTTPRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

// All Operation
fetchPosts();
// createPost("DUMMY", "DUMMY POST DATA");

fetchButton.addEventListener("click", fetchPosts);

podtFormsaddEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  createPost(title, content);
});

listElement.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    sendHTTPRequest(
      "DELETE",
      "https://jsonplaceholder.typicode.com/posts/" + postId
    );
  }
});
