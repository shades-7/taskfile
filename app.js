//Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter')
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');


//load all event listener
loadEventListeners();

//load all event listner
function loadEventListeners(){
//DOM load event (so that whenever page loads tasks stored in ls will display)
document.addEventListener('DOMContentLoaded' , getTask)
 //add task event
 form.addEventListener('submit' , addTask);
 //remove task
 tasklist.addEventListener('click' , removeTask)
 //clear task
 clearBtn.addEventListener('click' , clearTask)
 //filter
 filter.addEventListener('keyup', filterTasks)
}

//GET TASK
function getTask (){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
     
    tasks.forEach(function(task){
        // create lielement
 const li = document.createElement('li')
 //add class
 li.className = 'collection-item';
 //add text Node and append to li 
 li.appendChild(document.createTextNode(task));
 // empty task-list value
 taskInput.value = ''
 //focusing input
 taskInput.focus()
 //create new link
 const link = document.createElement('a')
 // add class to link
 link.className = 'delete-item secondary-content';
 //Add icon html
 link.innerHTML='<i class="fa fa-remove"></i>'
 //appending the linkto li
 li.appendChild(link)
 //appending li to ul
 tasklist.appendChild(li)

    })

}

//Add Task
function addTask (e){
   

if(taskInput.value === ''){
    alert('Add a Task')
}else{
// create lielement
 const li = document.createElement('li')
 //add class
 li.className = 'collection-item';
 //add text Node and append to li 
 li.appendChild(document.createTextNode(taskInput.value));
 
 //focusing input
 taskInput.focus()
 
 //create new link
 const link = document.createElement('a')
 // add class to link
 link.className = 'delete-item secondary-content';
 //Add icon html
 link.innerHTML='<i class="fa fa-remove"></i>'
 //appending the linkto li
 li.appendChild(link)
 //appending li to ul
 tasklist.appendChild(li)
 //store in local storage
 storeTaskInLocalStorage(taskInput.value)

    e.preventDefault();

    // empty task-list value
 taskInput.value = ''
 
}
}

//store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks = []
  }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
     
  }
  tasks.push(task)
  //setting it back to ls
  localStorage.setItem('tasks' , JSON.stringify(tasks))
}

//Remove Task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove()
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
    
}


//Remove Task From LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks = []
  }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
     }

   tasks.forEach(function(task,index){
       if(taskItem.textContent === task){
           tasks.splice(index , 1)
       }
   });
   localStorage.setItem('tasks' , JSON.stringify(tasks))  
    
}



//clear task
function clearTask(){
    // tasklist.innerHTML = ''

    //or
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild)
    }
    filter.value=''

    clearTaskFromLocalStprage();
}

//Clear Task FROM LS
function clearTaskFromLocalStprage(){
    localStorage.clear();
}

//filter task
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
        }
        )
   }

filter.value=''
