





// let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const toyCollection = document.getElementById('toy-collection'); 
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      document.querySelector('.submit').addEventListener('click', function(event) {
      let formDataNode = document.querySelectorAll('.input-text');
      let formDataArray = Array.from(formDataNode);
      let name = formDataArray[0].value;
      let image = formDataArray[1].value;
      
      let formObj = {
        name: name,
        image: image,
        likes: 0
      }
      console.log(JSON.stringify(formObj));
        
        event.preventDefault();
        
        let configObj = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formObj)
        }
        fetch('http://localhost:3000/toys', configObj);

      });
    } else {
      toyForm.style.display = "none";
    }


  });

  
  

 
//   let configObj = {
//    method: 'Post',
//    header: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//    },
//    body: Json.stringify()
//  }
//   fetch('http://localhost:3000/toys', )


    
  let toyCard;
  function addToy(element) {
        toyCard = document.createElement('div');
        toyCard.className = 'card';
        toyCollection.appendChild(toyCard);
        createToy(element);
  }

  function createToy(toy) {
    const header = document.createElement('h2');
    const img = document.createElement('img');
    let p = document.createElement('p');
    const btn = document.createElement('button');
    let id = document.createElement('p');
    id.innerText = toy.id;
    id.setAttribute('display', 'none');
    header.innerText = toy.name;
    img.src = toy.image; img.className = "toy-avatar";
    p.innerText = toy.likes;
    btn.innerText = "Like <3"; btn.className = 'like-btn';
    toyCard.appendChild(header);
    toyCard.appendChild(img);
    toyCard.appendChild(p);
    toyCard.appendChild(btn);
    toyCard.appendChild(id);



    
  }
  
  
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then(data => {
    data.forEach(element => {
      addToy(element);
    });
  })

  toyCollection.addEventListener('click', function(event) {
    if (event.target.className === 'like-btn') {
      let more = parseInt(event.target.previousElementSibling.innerText) + 1;
      let id = event.target.nextElementSibling.innerText
      console.log(id);
      console.log(more);
      fetch(`http://localhost:3000/toys/${id}`, {
       method: 'PATCH',
       header: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       body: JSON.stringify({
         'likes': more 
       })

     })
     .then(res => res.json())
     .then((likeObj => {
       event.target.previousElementSibling.innerText = `${more} likes`;
     }))
    }
  
  })
});
