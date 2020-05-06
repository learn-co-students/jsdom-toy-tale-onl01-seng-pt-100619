let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      //my code
      let toyForm = document.querySelector(".add-toy-form");
      toyForm.addEventListener("submit", (event) => {
        event.preventDefault();
        postToys(event.target[0].value, event.target[1].value);
      })
      //end
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //my code
  
  
  //fetch
  function fetchToys() {
    fetch(`http://localhost:3000/toys`)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(toy => renderToy(toy))
    })
  }
  
  //fetch function
  function renderToy(toy) {
    const toyCollection = document.getElementById('toy-collection');
    //div
    const card = document.createElement("div");
    card.classList.add("card");

    //h2
    let h2 = document.createElement("h2");
    h2.innerText = toy.name;

    //img
    let image = document.createElement("img");
    image.src = `${toy.image}`;
    image.classList.add("toy-avatar")

    //p for likes
    let p = document.createElement("p");
    p.innerText = `${toy.likes} Likes`

    //button
    let button = document.createElement("button");
    button.classList.add("like-btn");
    button.innerText = "Like"

    //button functionality
    button.addEventListener("click", () => {
      toy.likes += 1;
      console.log(toy.likes);
    })

    //append
    card.append(h2, image, p, button);
    toyCollection.append(card)
  }
  
  fetchToys()
  
  
  //post toy
  function postToys(name, imgUrl) {
    let configObj = {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({
        "name": name, 
        "image": imgUrl
      })
    }

    fetch("http://localhost:3000/toys", configObj)
      .then(resp => resp.json())
      .then(function(toy) {
        // !!! where does the toy object get it's id?
        toy.likes = 0
        renderToy(toy)
        let nameBox = document.getElementsByName("name")[0];
        let imageBox = document.getElementsByName("image")[0];
        nameBox.value = "";
        imageBox.value = "";
      })
        .catch(function(error) {
          document.body.innerHTML = `${error.message}`;
          console.log("there was an error")
      });

  };


  //like a toy
  function likeToy() {

  }


  
});
