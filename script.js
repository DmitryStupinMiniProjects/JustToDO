const taskInputElement = document.querySelector("[data-js-task-input]")
const taskAddButtonElement = document.querySelector("[data-js-task-add-button]")
const taskListElement = document.querySelector("[data-js-task-list]")
const taskClearButtonElement = document.querySelector("[data-js-task-clear-button]")

const addTask = (text = taskInputElement.value, completed = false) => {
  if (text === "") {
    alert("Напишите название задачи!")
  } else {
    const newTaskElement = `
      <li class="${completed ? "completed" : ''}" data-js-task>
      <span>${text}</span>
      <button class="delete-btn" type="button" data-js-task-delete>
        Удалить
      </button>
    </li>
    `
    taskListElement.insertAdjacentHTML("beforeend", newTaskElement)

    if (taskInputElement.value) {
      taskInputElement.value = "";
    }
  }
}

const saveTasks = () => {
  const tasks = []

  document.querySelectorAll("[data-js-task]").forEach((task) => {
    tasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed")
    })
  })

  localStorage.setItem("tasks", JSON.stringify(tasks))
}

const loadTasks = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []

  savedTasks.forEach((task) => {
    addTask(task.text, task.completed)
  })
}

loadTasks()

taskAddButtonElement.addEventListener("click", () => {
  addTask()
  saveTasks()
})

taskListElement.addEventListener("click", (event) => {
  const taskElement = event.target.closest("[data-js-task]")
  const taskDeleteButtonElement = event.target.closest("[data-js-task-delete]")
  
  if (taskElement && !taskDeleteButtonElement) {
    taskElement.classList.toggle("completed")
    saveTasks()
  }
  
  if (taskDeleteButtonElement) {
    taskElement.remove()
    saveTasks()
  }
})

taskClearButtonElement.addEventListener("click", () => {
  if (taskListElement.children.length === 0) {
    alert("В списке нет задач")
  }
  taskListElement.innerHTML = ""
  saveTasks()
})