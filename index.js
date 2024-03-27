const state = {
    tasklist: [],
};
   

   
// dom operations 
const taskmodal = document.querySelector(".task_modal_body");
const taskContents = document.querySelector(".task__contents");


// template for the card on screen
const htmlTaskContent = ({ id, tittle, type, description, url }) =>`
<div class ='col-md-6 col-lg-4 mt-3 id=${id}  key=${id}'>
    <div class= 'card shadow-sm task_card'>
        <div class='card-header d-flex justify-content-end task_card_header' >

            <button type='button' class='btn btn-outline-primary ' name= ${id} >
                <i class='fa-solid fa-pencil' name = ${id} ></i>
            </button>
            <button type='button' class='btn btn-outline-danger ' name= ${id}  onclick = "deleteTask.apply(this,arguments)" >
                <i class='fa-solid fa-trash' name = ${id} ></i>
            </button>
        
        </div>
        <div class='card-body'>
            ${
                url 
                ? `<img width='100' src=${url} alt='card-image' class='card-img-top md-3 rounded-lg' >  </img>`
                : `<img width='100' src='./images/1.jpg' alt='card-image' class='card-img-top md-3 rounded-lg' >  </img>`
            }  
            <h4 class='card-title'> ${tittle}</h4>
            <p class='card-text trim-3-lines text-muted'> ${description}</p>
            <div class='tags text-white d-flex flex-wrap'>
                <span class='badge text-bg-primary'>${type}</span>
            </div>  
        </div>
        <div class='card-footer' >
            <button type = button class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#opentask' onclick = 'openTask.apply(this,arguments)' id=${id} >openTask </button>
        </div>
    </div>

</div>
`;

// modal body for click on open task 
const htmlModalContent = ({ id, tittle , description, url }) =>{
    const date = new Date(parseInt(id));
    return`
    <div id= ${id}>
        ${
            url
             ? `<img width='100%' src=${url} alt='card-image' class='img-fluid image_modal mb-3' >  </img>`
             : `<img width='100' src='./images/1.jpg' alt='card-image' class='card-img-top md-3 rounded-lg' >  </img>`
          
        }  
    
        <strong class='text-muted text-sm '>created on : ${date.toDateString()}</strong>
        <h2 class= 'my-3'>${tittle} </h2>
        <p class='text-muted' > ${description}</p>
        </div>
        `;
};

const updateLocalStorage= ()=>{
    localStorage.setItem(
        'task',
        JSON.stringify({
            tasks : state.tasklist,
        })
    );

};
// where we convert str to json (for rendering cards on the screen)
const loadInitialData =() =>{
    const localStorageCopy = JSON.parse(localStorage.task);

    if (localStorageCopy) state.tasklist= localStorageCopy.tasks;

    state.tasklist.map((cardDate)=>{
        taskContents.insertAdjacentHTML('beforeend',htmlTaskContent(cardDate));
    });
};

// when we upadate or when we edit we need to save 
const handleSubmit= (event)=>{
const id = `${Date.now()}`;
const input= {
    url: document.getElementById("imageurl").value,
    tittle: document.getElementById("tittle").value,
    type: document.getElementById("type").value,
    description: document.getElementById("description").value,

};

 if(input.tittle===""|| input.type==="" ||input.description===""){
   return alert("please fill the necessary fields :)->")
 }
taskContents.insertAdjacentHTML(
    "beforeend" ,
    htmlTaskContent({...input,id})
);
state.tasklist.push({...input,id});

updateLocalStorage();
};

//open task
const openTask =(e) =>{
     if(!e) e =window.Event;
     
    const getTask= state.tasklist.find(({id}) => id === e.target.id);
    taskmodal.innerHTML= htmlModalContent(getTask);
};

//delete the task
const deleteTask = (e) => {
    if(!e) e =window.Event;
    
   const  targetId= e.target.getAttribute("name");
   const  type= e.target.tagName;
   const removeTask= state.taskList.filter(({id}) => id ! == targetId);
   updateLocalStorage();

   if(type === "BUTTON"){
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
    );
   }
   else if(type=== "I")
   {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
    );
   }

};


// const deleteTask = (e) => {
//     if (!e) e = window.Event;
  
//     const targetId = e.target.getAttribute("name");
//     // console.log(targetId);
//     const type = e.target.tagName;
//     // console.log(type);
//     const removeTask = state.taskList.filter(({ id }) => id !== targetId);
//     // console.log(removeTask);
//     updateLocalStorage();
  
//     if (type === "BUTTON") {
//       // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
//       return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
//         e.target.parentNode.parentNode.parentNode
//       );
//     } else if (type === "I") {
//       return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
//         e.target.parentNode.parentNode.parentNode.parentNode
//       );
//     }
//   };
