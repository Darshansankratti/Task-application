var state{
    tasklist: [],

}
// dom operations 
const taskContents = document.querySelector(.task_contents);
const taskmodel = document.querySelector(.task_modal_body);

// template for the card on screen
const htmlTaskContent = ({ id, tittle, type, description, url }) =>`
<div class ="col-md-6 col-lg-4 mt-3 id=${id}">
    <div class= ""card shadow-sm task_card >
        <div class="card-header d-flex justify-content-end task_card_header" >

            <button type="button" class="btn btn-primary mr-3" name= ${id} >
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button type="button" class="btn btn-primary mr-3" name= ${id} >
                <i class="fa-solid fa-trash"></i>
            </button>
        
        </div>
        <div class="card-body">
            ${
                url&&
                `<img width="100" src=${url} alt="card-image" class="card-img-top md-3 rounded-lg" >  </img>`
            }  
            <h4 class="card-title"> ${tittle}</h4>
            <p class="card-text trim-3-lines text-muted">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
                <span class="badge text-bg-primary">${type}</span>
            </div>  
        </div>
        <div class="card-footer" >
            <button type = button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#opentask"></button>
        </div>
    </div>

</div>
`;

// modal body for click on open task 
const htmlModalContent = ({ id, tittle , description, url }) =>{
    const data = new Date(parseInt(id));
    return`
    <div id= ${id}>
        ${
            url&&
            `<img width="100" src=${url} alt="card-image" class="img-fluid image_modal mb-3" >  </img>`
        }  
    
        <strong class="text-muted text-sm ">created on : ${Date.toDateString()}</strong>
        <h2 class= "my-3">${tittle} </h2>
        <p class="text-muted" > ${description}</p>
        </div>
        `;
};

const updateLocalstorage= ()=>{
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks:state.tasklist,
        })
    );

};

