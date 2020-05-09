let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      
    } else {
      toyFormContainer.style.display = "none";
    }
  })
});



// this function loads all toyes in the database when DOM loaded:
function getToys(){
      fetch('http://localhost:3000/toys', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json"
          }
        }).then(response => {
            return response.json()
        }).then(data => {
            let toyCollection = document.getElementById('toy-collection')
            let divCard = document.createElement('div')
            divCard.setAttribute('class','card');
            toyCollection.appendChild(divCard);

            for(i=0; i < data.length; i++){
              let name = data[i].name; 
              let image = data[i].image;
              let likes = data[i].likes;
              let toyName = document.createElement('h2');
              toyName.innerText = name;
              let toyImage = document.createElement('img');
              toyImage.setAttribute('src',image);
              let toyLikes = document.createElement('p');
              toyLikes.innerText = `${likes} likes`
              divCard.appendChild(toyName);
              divCard.appendChild(toyImage);
              divCard.appendChild(toyLikes);
            } 
        })
}
