"use strict";
const button = document.getElementById("add_but");
button.addEventListener("click", () => {
    let tasks = [];
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        try {
            tasks = JSON.parse(storedTasks);
        }
        catch (error) {
            console.error("Error parsing tasks from localStorage:", error);
            tasks = [];
        }
    }
    const taskInput = document.getElementById("task");
    const taskContent = taskInput.value.trim();
    if (taskContent) {
        tasks.push({ content: taskContent });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTask();
        taskInput.value = "";
    }
});
function displayTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const listParent = document.getElementById("list_parent");
    listParent.innerHTML = "";
    tasks.forEach((task, index) => {
        const addedTask = document.createElement("div");
        addedTask.classList.add("added_task");
        const theTask = document.createElement("p");
        theTask.classList.add("the_task");
        theTask.textContent = task.content;
        addedTask.appendChild(theTask);
        const controls = document.createElement("div");
        controls.classList.add("controls");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        editButton.classList.add("edit");
        deleteButton.classList.add("delete");
        editButton.addEventListener("click", () => taskEdit(index));
        deleteButton.addEventListener("click", () => taskDelete(index));
        controls.appendChild(editButton);
        controls.appendChild(deleteButton);
        addedTask.appendChild(controls);
        listParent.appendChild(addedTask);
    });
}
function taskEdit(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask = prompt("Input the new note", tasks[index].content);
    if (newTask && newTask.trim()) {
        tasks[index].content = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        alert("Note successfully edited");
        displayTask();
    }
    else {
        alert("You submitted nothing");
    }
}
function taskDelete(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
}
displayTask();
