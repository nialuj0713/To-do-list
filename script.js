const operationColors = ["darkblue", "darkred", "darkgreen"]
let operationsContainer = document.getElementById("operations-container")
let operationButtons = operationsContainer.children
let pendingTaskBarContainer = document.getElementById("pending-task-bar-container")

for (let i=0; i<operationButtons.length; i++){
    operationButtons[i].style.backgroundColor = operationColors[i]
}

let fillUpForm = document.getElementById("fill-up-form")
let mainContainer = document.getElementById("main-container")

function showForm() {
    fillUpForm.style.display = "flex"
    mainContainer.style.opacity = "0.2"
}

function closeForm() {
    fillUpForm.style.display = "none"
    mainContainer.style.opacity = "1"
}

let titleInputBar = document.getElementById("title-input-bar")
let descriptionInputBar = document.getElementById("description-input-bar")
let dateInputBar = document.getElementById("date-input-bar")
let timeInputBar = document.getElementById("time-input-bar")

function createTask() {
    let titleInput = titleInputBar.value
    let descriptionInput = descriptionInputBar.value
    let dateInput = dateInputBar.value
    let timeInput = timeInputBar.value
    let dateVersion = new Date(dateInput)
    let milliseconds = dateVersion.getTime()

    let taskBarValues =  {
            "title": titleInput.trim(),
            "description": descriptionInput.trim(),
            "date": dateInput,
            "time": timeInput,
            "milliseconds": milliseconds
        }
    
    let pendingArray = JSON.parse(localStorage.getItem("pendingTasksInToDoList"))

    if (pendingArray === null){
        pendingArray = []   
    }
 
    pendingArray.push(taskBarValues)
    
    localStorage.removeItem("pendingTasksInToDoList")

    localStorage.setItem("pendingTasksInToDoList", JSON.stringify(pendingArray))

    titleInput = titleInputBar.value = ""
    descriptionInput = descriptionInputBar.value = ""
    dateInput = dateInputBar.value = ""
    timeInput = timeInputBar.value = ""

    displayInPendingTasks()

}



function sortDateOfPendingTasks(array) {
   return array.sort((a, b) => a.milliseconds - b.milliseconds)  
}



let pendingContainer = document.getElementById("pending-container")

let parsedPendingTasksFromLocalStorage = JSON.parse(localStorage.getItem("pendingTasksInToDoList"))

console.log("Pending Tasks are", localStorage.getItem("pendingTasksInToDoList"))

let sortedPendingTasks = []

if (parsedPendingTasksFromLocalStorage != null && parsedPendingTasksFromLocalStorage.length > 0){
    sortedPendingTasks = sortDateOfPendingTasks(parsedPendingTasksFromLocalStorage)
}
/*
function displayInPendingTasks() {
    let parsedPendingTasksFromLocalStorage = JSON.parse(localStorage.getItem("pendingTasksInToDoList"))

    if (parsedPendingTasksFromLocalStorage === null){
        parsedPendingTasksFromLocalStorage = []
        
    }

    let sortedPendingTasks = []

    if (parsedPendingTasksFromLocalStorage != null && parsedPendingTasksFromLocalStorage.length > 0){
        sortedPendingTasks = sortDateOfPendingTasks(parsedPendingTasksFromLocalStorage)
    }

    let tasksArray = sortedPendingTasks
    console.log("Tasks Array is", tasksArray)
    console.log("SortedPendingTasks is", sortedPendingTasks)
    console.log("ParsedPendingTasksFromLocalStorage is", parsedPendingTasksFromLocalStorage)
    if (tasksArray.length == 0){
        while (pendingTaskBarContainer.firstChild){
            pendingTaskBarContainer.removeChild(pendingTaskBarContainer.firstChild)
        }
        return
    }
    
    while (pendingTaskBarContainer.firstChild){
        pendingTaskBarContainer.removeChild(pendingTaskBarContainer.firstChild)
    }
    
    for (let i = 0; i < tasksArray.length; i++){
        let currentTask = tasksArray[i]
        let newPendingTask = document.createElement("div")
        newPendingTask.setAttribute("class", "pending-tasks")
        let dateContainer = document.createElement("p") 
        dateContainer.setAttribute("class", "date-or-time-containers")
        dateContainer.textContent = currentTask.date
        let titleAndDescriptionContainer = document.createElement("div")
        titleAndDescriptionContainer.setAttribute("class", "title-and-description-containers")
        let timeContainer = document.createElement("p")
        timeContainer.setAttribute("class", "date-or-time-containers")
        timeContainer.textContent = currentTask.time
        let titleContainer = document.createElement("p")
        titleContainer.setAttribute("class", "task-bar-titles")
        titleContainer.textContent = currentTask.title
        let descriptionContainer = document.createElement("p")
        descriptionContainer.setAttribute("class", "task-bar-descriptions")
        descriptionContainer.textContent = currentTask.description

        pendingTaskBarContainer.appendChild(newPendingTask)
        newPendingTask.appendChild(dateContainer)
        newPendingTask.appendChild(titleAndDescriptionContainer)
        newPendingTask.appendChild(timeContainer)
        titleAndDescriptionContainer.appendChild(titleContainer)
        titleAndDescriptionContainer.appendChild(descriptionContainer)

    }
}
    */

let deleteCheckboxes = document.querySelector("delete-checkboxes")

//put in the for loop those deleteCheckboxes


displayInPendingTasks()





