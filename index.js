const addBtn = document.querySelector(".add-btn");
const searchBtn = document.querySelector(".search-btn");
const filterBtn = document.querySelector(".filter-btn");
const allBtn = document.querySelector(".all-task-btn");
const activeBtn = document.querySelector(".active-task-btn");
const completedBtn = document.querySelector(".completed-task-btn");
const inputBar = document.querySelector(".input-field");
const taskAll = document.querySelector(".all-task");
const taskActive = document.querySelector(".active-task");
const taskCompleted = document.querySelector(".completed-task");
const noTaskAll = document.querySelector(".no-task-all");
const noTaskActive = document.querySelector(".no-task-active");
const noTaskCompleted = document.querySelector(".no-task-completed");
const mainActive = document.querySelector(".main-active");
const mainCompleted = document.querySelector(".main-completed");
const mainAll = document.querySelector(".main-all");


const todoItems = [];
let activeTask = [];
let completedTask = [];

function addTodo(text) {
  const todo = {
    text: text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
}

function toggle(id, flag) {
  if (flag === "all") {
    var checkbox = document.getElementById(id);
  } else if (flag === "active") {
    var checkbox = document.getElementById(id + "-active");
  } else if (flag === "completed") {
    var checkbox = document.getElementById(id + "-completed");
  }

  if (checkbox.checked === true) {
    const completedArr = todoItems.filter((elem) => id === elem.id);
    completedArr.map((elem) => (elem.checked = true));
    displayTaskCompleted(completedArr);
    mainActive.innerHTML = "";
    const activeArr = todoItems.filter((elem) => {
      return elem.checked === false;
    });
    displayTaskActive(activeArr);


  } else if (checkbox.checked === false) {
    const activeArr1 = todoItems.filter((elem) => id === elem.id);
    activeArr1.map((elem) => (elem.checked = false));
    displayTaskActive(activeArr1);
    mainCompleted.innerHTML = "";
    const completedArr1 = todoItems.filter((elem) => {
      return elem.checked === true;
    });
    displayTaskCompleted(completedArr1);

  }


}



function editTask(id, flag) {
  const index = todoItems.findIndex(elem => elem.id === id);
  const inputActive = document.getElementById(id + "-input-active")
  const inputAll = document.getElementById(id + "-input-all");
  const inputCompleted = document.getElementById(id + "-input-completed");

  function updateList() {
    mainAll.innerHTML = "";
    displayTaskAll(todoItems);
    activeTask = todoItems.filter((elem) => elem.checked === false);
    completedTask = todoItems.filter((elem) => elem.checked === true);
    mainActive.innerHTML = "";
    displayTaskActive(activeTask);
    mainCompleted.innerHTML = "";
    displayTaskCompleted(completedTask);
  }


  if (flag === "all") {
    inputAll.disabled = false;
    inputAll.focus();
    inputAll.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        const newName = inputAll.value;
        todoItems[index].text = newName;
        inputAll.disabled = true;
        updateList();
      }
    })

    addBtn.addEventListener('click', function (e) {
      const newName = inputAll.value;
      todoItems[index].text = newName;
      inputAll.disabled = true;
      updateList();
    })

  } else if (flag === "active") {
    inputActive.disabled = false;
    inputActive.focus();
    inputActive.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        const newName = inputActive.value;
        todoItems[index].text = newName;
        inputActive.disabled = true;
        updateList();
      }
    })

    addBtn.addEventListener('click', function () {
      const newName = inputActive.value;
      todoItems[index].text = newName;
      inputActive.disabled = true;
      updateList();
    })

  } else if (flag === "completed") {
    inputCompleted.disabled = false;
    inputCompleted.focus();
    inputCompleted.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        const newName = inputCompleted.value;
        todoItems[index].text = newName;
        inputCompleted.disabled = true;
        updateList();
      }
    })

    addBtn.addEventListener('click', function () {
      const newName = inputCompleted.value;
      todoItems[index].text = newName;
      inputCompleted.disabled = true;
      updateList();
    })
  }
}

function deleteTask(id) {


  const index = todoItems.findIndex((elem) => elem.id === id);
  todoItems.splice(index, 1);

  mainAll.innerHTML = "";
  displayTaskAll(todoItems);

  activeTask = todoItems.filter((elem) => elem.checked === false);
  completedTask = todoItems.filter((elem) => elem.checked === true);

  mainActive.innerHTML = "";
  displayTaskActive(activeTask);
  mainCompleted.innerHTML = "";
  displayTaskCompleted(completedTask);
}

let displayTaskAll = function (array) {
  array.forEach((element) => {



    const html = `  <div class="task-list" >
        <div class="task-details"> <input type="text"  class="task-name" id="${element.id}-input-all" value="${element.text}" disabled> 
        </div>
        <div class="list-bottom">
            <div class="task-activation">
                <label class="switch">
                    <input type="checkbox" onclick="toggle(${element.id}, 'all')" id="${element.id}"> 
                    <span class="slider round"  ></span>
                </label>
            </div>
            <div class="item-controls">
                <button class="edit-btn" onclick ="editTask(${element.id
      },'all')" > <i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick ="deleteTask(${element.id
      })" > <i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    </div>`;

    noTaskAll.remove();
    mainAll.insertAdjacentHTML("beforeend", html);

    inputBar.value = "";
  });
};

let displayTaskActive = function (array) {
  array.forEach((element) => {
    const html = `  <div class="task-list" >
        <div class="task-details"><input type="text" class="task-name" id="${element.id}-input-active" value="${element.text}" disabled> 
        </div>
        <div class="list-bottom">
            <div class="task-activation">
                <label class="switch">
                    <input type="checkbox" onclick="toggle(${element.id}, 'active')" id="${element.id}-active" >
                    <span class="slider round"  ></span>
                </label>
            </div>
            <div class="item-controls">
                <button class="edit-btn" onclick ="editTask(${element.id},'active')" ><i class="fas fa-edit"></i></button> 
                <button class="delete-btn" onclick ="deleteTask(${element.id})" ><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    </div>`;

    noTaskActive.remove();
    mainActive.insertAdjacentHTML("beforeend", html);

    inputBar.value = "";
  });
};

let displayTaskCompleted = function (array) {
  array.forEach((element) => {
    const html = `  <div class="task-list" >
        <div class="task-details"><input type="text" class="task-name" id="${element.id
      }-input-completed" value="${element.text}" disabled> 
        </div>
        <div class="list-bottom">
            <div class="task-activation">
                <label class="switch">
                    <input type="checkbox" id="${element.id}-completed" ${element.checked == true ? "checked" : ""} onclick='toggle(${element.id}, "completed")' >
                    <span class="slider round"  ></span>
                </label>
            </div>
            <div class="item-controls">
                <button class="edit-btn" onclick ="editTask(${element.id},'completed')" ><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick ="deleteTask(${element.id})" ><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    </div>`;

    noTaskCompleted.remove();
    mainCompleted.insertAdjacentHTML("beforeend", html);

    inputBar.value = "";
  });
};

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  inputBar.disabled = false;
  inputBar.placeholder = "Add new task";

  if (!addBtn.classList.contains("active")) addBtn.classList.add("active");
  if (searchBtn.classList.contains("active"))
    searchBtn.classList.remove("active");
  if (filterBtn.classList.contains("active"))
    filterBtn.classList.remove("active");

  addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (inputBar.value !== "") {
      addTodo(inputBar.value);

      displayTaskAll(todoItems.slice(-1));
      displayTaskActive(todoItems.slice(-1));
    }
  });
});

inputBar.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (addBtn.classList.contains("active") && e.key === "Enter") {
    if (inputBar.value !== "") {
      addTodo(inputBar.value);

      displayTaskAll(todoItems.slice(-1));
      displayTaskActive(todoItems.slice(-1));
    }
  } else if (searchBtn.classList.contains("active")) {

    const searchText = inputBar.value;
    const filteredValue = todoItems.filter((task) =>
      task.text.toLowerCase().includes(inputBar.value.toLowerCase())
    );

    console.log(filteredValue);

    mainAll.innerHTML = "";
    displayTaskAll(filteredValue);
    inputBar.value = searchText;

    mainActive.innerHTML = "";
    displayTaskActive(filteredValue.filter(elem => elem.checked === false));
    inputBar.value = searchText;

    mainCompleted.innerHTML = "";
    displayTaskCompleted(filteredValue.filter(elem => elem.checked === true));
    inputBar.value = searchText;
  }
});

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!searchBtn.classList.contains("active"))
    searchBtn.classList.add("active");
  if (addBtn.classList.contains("active")) addBtn.classList.remove("active");
  if (filterBtn.classList.contains("active"))
    filterBtn.classList.remove("active");
  // const filteredValue = todoItems.filter((task) =>
  //   task.text.toLowerCase().includes(inputBar.value.toLowerCase())
  // );

  // console.log(filteredValue);

  // mainAll.innerHTML="";
  // displayTaskAll(filteredValue);
  // mainActive.innerHTML="";
  // displayTaskActive(filteredValue.filter(elem => elem.checked === false));
  // mainCompleted.innerHTML="";
  // displayTaskCompleted(filteredValue.filter(elem => elem.checked === true));

});
