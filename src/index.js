let addToy = false;

let newName = "Jessie"; //= document.getElementById("newName").value;
let newImage= "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist"; //= document.getElementById("newImage").value;
let newLikes = 0;

let formData = {
        name: newName,
        image: newImage,
        likes: newLikes
    };

let configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(formData)  
    };

function addNewToy () {
  return fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(json => {
      newName = document.getElementById("newName").value
      newImage = document.getElementById("newImage").value
      makeCards(json)
    })

}

function fetchToys(){
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => makeCards(json))
    .then(addlikes => { 
      const likesBtns = document.getElementsByClassName("like-btn")
      //likesBtns.forEach(button => {
      Array.prototype.map.call(likesBtns, button => {
        button.addEventListener("click", e => {
          e.target.parentNode.children[2].innerText++
        });
      });
    });
}
function makeCards(json){
  let cardContainer = document.getElementById("toy-collection")
  
  json.forEach(toy => { 
    const card = document.createElement("div")
    card.className= "card"
    const toyName = document.createElement("h2")
    toyName.innerText = toy.name
    const image = document.createElement("img")
    image.width = '200'
    image.src = toy.image
    const likes = document.createElement("p")
    likes.innerText = toy.likes
    const likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    card.appendChild(toyName)
    card.appendChild(image)
    card.appendChild(likes)
    card.appendChild(likeButton)
    cardContainer.appendChild(card)

  })

}


document.addEventListener("DOMContentLoaded", () => {
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
  
  fetchToys();
  
  
  const toyForm = document.getElementsByClassName("add-toy-form") // returns an HTML collection
  toyForm[0].addEventListener("submit", function(e){
    addNewToy()
    // add submit logic
  });

});

// add configuration object values to make send data through a json file
// add headers required by servers so the requests are not rejected
// function submitData(name, email){

//   let formData = {
//       name: name,
//       email: email
//   };
  
//   let configObj = {
//       method: "POST",
//       headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//       },
//       // add content-type and accept headers set to json and make the json a string to make the request
//       body: JSON.stringify(formData)
//   };
  
//       return fetch("http://localhost:3000/users", configObj)
//           .then(response => response.json())
//           .then(function(object) {
//               let objectId = document.createTextNode(`${object.id}`)
//               let body = document.querySelector("body");
//               body.appendChild(objectId) // append text node from object to the body element 
//           })
//           .catch( function(error) {
//               let errorMessage = document.createTextNode(`${error.message}`)
//               let body = document.querySelector("body"); 
//               body.appendChild(errorMessage); // append error to the body element from catch as its callback function 
//           });
// };
     




// let formData = {
//     dogName: "Byron",
//     dogBreed: "Poodle"
//   };
 
//   let configObj = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     // add content-type and accept headers set to json and make the json a string to make the request
//     body: JSON.stringify(formData)
//   };
 
//   fetch("http://localhost:3000/dogs", configObj)  // add fetch set to post to send the data to our server of choosing and it behaves like a form posting to the database
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(object) {
//         console.log(object);
//     })
//     .catch(function(error) {
//         alert("Bad things! Ragnarők!");
//         console.log(error.message);
//     });
// add .catch to return errors. for example if the post method is not included in the configuration object then it cant have a body or data to send, only to recieve