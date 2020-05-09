let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  addToyForm()
  fetchToys()
  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener('submit', postToy)
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
}

  function fetchToys(){
    //GET request for all toy objects
    fetch("http://localhost:3000/toys")
    .then((resp) => {
      return resp.json()
    })
    .then((obj) => {
      for (const toy of obj) {
        createToyCard(toy)
      }
    })
  }

  function createToyCard(toy){
    const toyCollection = document.getElementById('toy-collection')
    const card = document.createElement('div')
    card.classList.add("card")
    
    //create header
    const cardHeader = document.createElement('h2')
    cardHeader.innerHTML = toy.name
    card.appendChild(cardHeader)
    //create avatar
    const avatar = document.createElement('img')
    avatar.classList = "toy-avatar"
    avatar.src = toy.image
    card.appendChild(avatar)
    // # of Likes
    const numLikes = document.createElement('p')
    numLikes.innerHTML = `${toy.likes} Likes`
    card.appendChild(numLikes)

    //Like Button
    const likeBtn = document.createElement('button')
    likeBtn.classList = "like-btn"
    likeBtn.innerText = "Like <3"
    card.appendChild(likeBtn)
    
    //add card to collection
    toyCollection.appendChild(card)
  }

  function postToy(event){
    event.preventDefault()
    const name = event.target.name.value
    const imgUrl = event.target.image.value
    const formData = {
      name: name,
      image: imgUrl,
      likes: 0
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }


    fetch ('http://localhost:3000/toys', configObj)
      .then((resp) => resp.json())
      .then((obj) => {
        //render to page
        createToyCard(obj)
      })
      .catch((error) => {
        console.log(error.message)
      })
      //TODO: clear form
  }

  //TODO: INCREASE TOYS LIKES..
  