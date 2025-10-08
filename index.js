
let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos= document.querySelector(".todos-container")
let todo;

let localData=JSON.parse(localStorage.getItem("todo"))
let todoList=localData || [];

// creating function to get unique id

function uuid(){
    return 'xxxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function (param) {
        let number = Math.random() * 16 | 0;
       let randomNumber = param=='x'? number: (number & 0x3 | 0x8);
     return randomNumber.toString(16);
    });
}

addTodoButton.addEventListener("click",(e)=>{
 e.preventDefault(); //do not do the reloading phase 
 todo= todoInput.value;
    if(todo.length>0){
       todoList.push({id:uuid(), todo , isCompleted: false })
    }
    renderTodosList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList))  // to save the previous information 
    todoInput.value=""; // removes the already written input from the placeholder
 })

 showTodos.addEventListener("click", (e)=>{
    let key= e.target.dataset.key;
    let delTodokey = e.target.dataset.todokey
   todoList=todoList.map(todo => todo.id ===key? {...todo, isCompleted: !todo.isCompleted}: todo)
   todoList=todoList.filter(todo => todo.id !== delTodokey)
  localStorage.setItem("todo",JSON.stringify(todoList));
   renderTodosList(todoList);
   console.log(todoList); 
})

function renderTodosList(todoList){
    // showTodos.innerHTML=`<input type="checkbox"> <label class="todo">sky diving </label><button>delete</button><"br">
    // <input type="checkbox"> <label class="todo">River rafting </label><button>delete</button>`

  showTodos.innerHTML=todoList.map(({id,todo, isCompleted}) =>`
  <div class="todo relative">
  <input class="t-checkbox t-pointer" id="item-${id}" 
  type="checkbox" data-key=${id} ${isCompleted ? "checked":""} >
    <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo" :""}" data-key=${id}> ${todo}</label>
    <button class="absolute right-0 button cursor"> 
    <span  data-todokey=${id} class="del-btn material-icons-outlined">delete
</span></button></div>`)
}
 renderTodosList(todoList);
