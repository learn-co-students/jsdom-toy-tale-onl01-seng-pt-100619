let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  

  fetchToys();
  addNewToy();

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

function addNewToy() {
  const form = document.querySelector('form')
  form.addEventListener('submit', function(event){
    event.preventDefault();
    let inputs = document.getElementsByClassName('input-text');
    let toyName = inputs[0].value;
    let toyImage = inputs[1].value;
   
    let formData = {
      name: toyName,
      image: toyImage,
      likes: 0
    };

    let configObj = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj);
    fetchToys()
  })
  

}


function fetchToys() {
  const toyContainer = document.getElementById('toy-collection');

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then( json => {
    json.forEach(element => {
      const newCard = document.createElement('div');
      newCard.className = "card";

      const toyTag = document.createElement('h2');
      toyTag.innerText = element.name;

      const toyImage = document.createElement('img');
      toyImage.className = "toy-avatar";
      toyImage.src = element.image;

      const toyLikes = document.createElement('p');
      toyLikes.innerText = `${element.likes} likes`;

      const likeBtn = document.createElement('button')
      likeBtn.className = "like-btn";
      likeBtn.addEventListener('click', updateLikes);

      function updateLikes() {
        let formData = {
          likes: element.likes + 1
        }
        
        let configObj = {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        };
        
        fetch(`http://localhost:3000/toys/${element.id}`, configObj);
        toyLikes.innerText = `${element.likes + 1} likes`;
      };  

      newCard.appendChild(toyTag);
      newCard.appendChild(toyImage);
      newCard.appendChild(toyLikes);
      newCard.appendChild(likeBtn);
      toyContainer.appendChild(newCard);
      
    });

  })
};



