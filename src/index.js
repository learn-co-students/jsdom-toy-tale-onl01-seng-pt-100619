let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  addToyForm
  fetchToys()
  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListenter("submit", postToy)
});

function addToyForm(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then((resp) => {
    return resp.json()
  })
  .then((obj) => {
    for(const toy in obj){
      createToyCard(toy)
    }
  })
};

function createToyCard(toy){
  const toyCollection = document.getElementById("toy-collection")
  const card = document.createElement("div")
  card.classList += "card"

  const cardHeader = document.createElement("h2")
  cardHeader.innerText += toy.name
  card.appendChild(cardHeader)
  
  const avatar = document.createElement('img')
  avatar.classList += "toy-avatar"
  avatar.src = toy.image
  card.appendChild(avatar)

  const likes = document.createElement("p")
  likes.innerText += `${toy.likes} Likes`
  card.appendChild(likes)

  const likeButton = document.createElement("button")
  likeButton.classList += "like-btn"
  likeButton.innerText +- "Like <3"
  card.appendChild(likeButton)

  toyCollection.appendChild(card)
};

function postToy(event){
  event.preventDefault
}