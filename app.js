var taskInput = document.getElementById("newTask"),
    addButton = document.getElementsByTagName("button")[0],
    incompleteTaskHolder = document.getElementById("incompleteTasks"),
    completedTasksHolder = document.getElementById("completedTasks");

//New task list item
var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li"),
        checkBox = document.createElement("input"),
        label = document.createElement("label"),
        editInput = document.createElement("input"),
        editButton = document.createElement("button"),
        deleteButton = document.createElement("button"),
        deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = 'task';

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";

    editButton.innerText = "Edit";
    editButton.className = "edit btn";  

    deleteButton.className = "delete btn";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function() {
    //Create a new list item with the text from the #newTask:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.
var editTask = function() {
    var listItem = this.parentNode,
        editInput = listItem.querySelector('input[type=text]'),
        label = listItem.querySelector("label"),
        editBtn = listItem.querySelector(".edit"),
        containsClass = listItem.classList.contains("editMode");
    if(containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

//Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    var checkBox = taskListItem.querySelector("input[type=checkbox]"),
        editButton = taskListItem.querySelector("button.edit"),
        deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for(var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
