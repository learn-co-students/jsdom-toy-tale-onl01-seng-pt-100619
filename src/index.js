let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  eventLoad();
  fetchToys();
});


function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => {
    return resp.json()
  })
  .then((object) => {
    iterator(object);
  })
  .catch(error => console.log(error.message))
};

function iterator(object) {
  let toyCollection = document.getElementById('toy-collection');
  for (let i = 0; i < object.length; i++) {
    let divCard = document.createElement('div');
    divCard.className = "card"

    let hTwo = document.createElement('h2');
    hTwo.innerText = object[i].name;

    let imgSrc = document.createElement('img');
    imgSrc.src = object[i].image
    imgSrc.className = "toy-avatar";
    let pTag = document.createElement('p');
    pTag.innerText = `${object[i].likes} likes `

    let heart = document.createElement('button');
    heart.innerText = "Like <3";
    heart.className = "like-btn";
    
    heart.addEventListener('click', function(e) {
      debugger
      fetch('http://localhost:3000/toys/'), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }}
    })
    divCard.append(hTwo);
    divCard.append(imgSrc);
    divCard.append(pTag);
    divCard.append(heart);

    toyCollection.appendChild(divCard);
  }
}
function eventLoad() {
  let div = document.createElement('div');
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const myForm = document.querySelector('form');
      myForm.addEventListener('submit', function(e) {
        
        e.preventDefault();
        const formData = new FormData(myForm);
        fetch('http://localhost:3000/toys', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(function(resp) {
          return resp.json()
        .then(function(object) {
          object.likes = 0;
          iterator(object)
        })
        })
      });
    } 
    else {
      toyFormContainer.style.display = "none";
    }
  });
}