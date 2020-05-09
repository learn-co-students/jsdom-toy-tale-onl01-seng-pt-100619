let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");  
  const toyFormContainer = document.querySelector(".container");
  const URL = 'http://localhost:3000/toys'

  fetch(URL)
    .then((resp) => resp.json())
    .then((toys) => render(toys))

  function render(toys) {
    let toyCollection = document.getElementById('toy-collection')
    toyCollection.innerHTML = ""

    toys.forEach((toy) => {
      let card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class = 'toy-avatar'></img>
      <p>Likes: ${toy.likes || 0}</p>
      <button class='like-btn'>Like <3</button>
      `
      toyCollection.append(card)

      let likeButton = card.querySelector(".like-btn")
      likeButton.addEventListener("click", (e) => {
  
        e.preventDefault()
        toy.likes = parseInt(toy.likes) + 1
        fetch(`${URL}/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
          },
          body: JSON.stringify(toy)
        })
        render(toys)
      })
    })
  }

  const addToyForm = document.querySelector(".submit")
  addToyForm.addEventListener("click", (e) => {
    
    // debugger
    let name = document.getElementsByClassName('input-text')[0].value
    let image = document.getElementsByClassName('input-text')[1].value

    fetch(URL, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        name: name, 
        image: image, 
        likes: 0
      })
    })
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  });

});
