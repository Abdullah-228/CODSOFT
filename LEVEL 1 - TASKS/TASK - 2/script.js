document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");
    const taskTime = document.getElementById("task-time");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const saveToLocalStorageButton = document.getElementById("save-to-localstorage");
    

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function (task, index) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task.date} ${task.time}: ${task.task}</span>
                <button class="delete-task" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    renderTasks();

    addTaskButton.addEventListener("click", function () {
        const newTask = taskInput.value.trim();
        const newDate = taskDate.value;
        const newTime = taskTime.value;

        if (newTask !== "" && newDate !== "" && newTime !== "") {
            const task = {
                date: newDate,
                time: newTime,
                task: newTask,
            };
            tasks.push(task);
            taskInput.value = "";
            taskDate.value = "";
            taskTime.value = "";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        } else {
            alert("Please fill in all fields (task, date, and time) before adding a task.");
        }
    });

    saveToLocalStorageButton.addEventListener("click", function () {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        alert("Tasks have been saved to local storage.");
    });

    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-task")) {
            const index = event.target.getAttribute("data-index");
            const listItem = taskList.children[index];
            listItem.classList.add("animate-out");
            setTimeout(() => {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }, 500);
        }
    });
});
