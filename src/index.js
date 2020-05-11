let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  getToys();
 
  const toyForm = document.querySelector(".add-toy-form");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
 

  toyForm.addEventListener('submit', (event) => {
      // preventDefault has to run in order for an asynchronous operation to proceed
      
        event.preventDefault();
        let formData = {
          name: event.target[0].value,
          image: event.target[1].value,
          like: 0
        }

        

        let configObj = {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body: JSON.stringify(formData)
        };
        

        fetch('http://localhost:3000/toys', configObj)
        .then(function(response){
          return response.json();
        })
        .then(function(object){
          
          let toyCollection = document.getElementById('toy-collection')
          let divCard = document.createElement('div')
          divCard.setAttribute('class','card');
          
          let name = object.name
          let image = object.image
          let numLikes = object.like
        
          let toyName = document.createElement('h2')
          toyName.innerText = name;
          let toyImage = document.createElement('img')
          toyImage.setAttribute('src',image);
          let toyLikes = document.createElement('p');
          toyLikes.innerText = `${numLikes} likes`;
          
          divCard.appendChild(toyName);
          divCard.appendChild(toyImage);
          divCard.appendChild(toyLikes);

          toyCollection.appendChild(divCard);
          
        })
       
        .catch(function(error){
          alert("image link not found. Try again!");
          console.log(error.message);
          
        })   
         
  }) 


  addBtn.addEventListener("click", (event) => {
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
            for(i=0; i < data.length; i++){
              let toyCollection = document.getElementById('toy-collection')
              let divCard = document.createElement('div')
              divCard.setAttribute('class','card');
              toyCollection.appendChild(divCard);
              let name = data[i].name; 
              let image = data[i].image;
              let likes = data[i].like;
              
              let toyName = document.createElement('h2');
              toyName.innerText = name;
              let toyImage = document.createElement('img');
              toyImage.setAttribute('src',image);
              toyImage.setAttribute('class','toy-avatar')
              let toyLikes = document.createElement('p');
              toyLikes.innerText = `${likes} likes`
              divCard.appendChild(toyName);
              divCard.appendChild(toyImage);
              divCard.appendChild(toyLikes);

              let likeButton = document.createElement('button');
              likeButton.setAttribute('value','like');
              likeButton.innerText = "like me"
              divCard.appendChild(likeButton);

              likeButton.addEventListener('click', increaseLikes)
              
              function increaseLikes(event){
                event.preventDefault(); 

                fetch("http://localhost:3000/toys/:id", {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                  }
                }).then(response => {
                  return response.json();
                }).then(data => {
                  
                })
                
            }
        })

}
