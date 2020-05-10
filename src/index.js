let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const toyContainer = document.getElementById('toy-collection')
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  function getAllToys(){
    return fetch('http://localhost:3000/toys').then(resp => resp.json())
    .then(function(toyArray) { 
      for(toy of toyArray){
        createToy(toy)
      }
      
    })
  }
  function createToy(toy){
    const toyCard = document.createElement("div")
    toyCard.classList.add("card")

    const toyName = document.createElement("h2")
    toyName.innerText = toy.name
    toyCard.appendChild(toyName)

    const toyImg = document.createElement("img")
    toyImg.src = toy.image
    toyImg.classList.add("toy-avatar")
    toyCard.appendChild(toyImg)

    const toyLikes = document.createElement("p")
    toyLikes.innerText = `${toy.likes} Likes`
    toyLikes.setAttribute("data-id", `${toy.id}`)
    
    toyCard.appendChild(toyLikes)

    const likeBtn = document.createElement("button")
    likeBtn.classList.add("like-btn")
    likeBtn.innerText = "Like <3"
    likeBtn.setAttribute("data-value", `${toy.likes}`)
    likeBtn.setAttribute("data-id", `${toy.id}`)
    toyCard.appendChild(likeBtn)

    toyContainer.appendChild(toyCard)

  }
  function likeClicks(){
    const likeBtns = document.querySelectorAll("button.like-btn")
    likeBtns.forEach(btn => {
      btn.addEventListener("click", (event) => {
        const toyID = event.target.dataset.id
        const toyCard = event.target.parentNode
        const toyLikeElement = toyCard.querySelector('p')
        let toyLikes = parseInt(toyLikeElement.innerText)
        toyLikeElement.innerText = `${toyLikes += 1} Likes`
        
        const formData = {
          likes: toyLikes += 1
          
        }
        const toyConfigObj = {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'},
          body: JSON.stringify(formData)
        }
        fetch(`http://localhost:3000/toys/${toyID}`, toyConfigObj)
          .then(resp => resp.json())
          .then(object => {
           console.log(object)
          })
      })
    })
   
  }

  newToyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const formData = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }
    const toyConfigObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify(formData)
    }
    
    fetch('http://localhost:3000/toys', toyConfigObj)
      .then(resp => resp.json())
      .then(function(object){
        for(toy in object){
          debugger 
          createToy(toy)}
      })
  })

  

  getAllToys().then(resp => likeClicks())
  

});


