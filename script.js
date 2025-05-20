const operationColors = ["darkblue", "darkred", "darkgreen", "darkorange"]
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

function sortDateOfDoneTasks(array) {
    return array.sort((a, b) => b.timeFinished - a.timeFinished)  
 }



let pendingContainer = document.getElementById("pending-container")

//let parsedPendingTasksFromLocalStorage = JSON.parse(localStorage.getItem("pendingTasksInToDoList"))

console.log("Pending Tasks are", localStorage.getItem("pendingTasksInToDoList"))

let sortedPendingTasks = []
/*
if (parsedPendingTasksFromLocalStorage != null && parsedPendingTasksFromLocalStorage.length > 0){
    sortedPendingTasks = sortDateOfPendingTasks(parsedPendingTasksFromLocalStorage)
}
    */

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
        dateContainer.setAttribute("class", "date-containers")
        dateContainer.textContent = currentTask.date
        let titleAndDescriptionContainer = document.createElement("div")
        titleAndDescriptionContainer.setAttribute("class", "title-and-description-containers")
        let checkBoxContainer = document.createElement("p")
        checkBoxContainer.setAttribute("class", "checkbox-containers")
        let titleContainer = document.createElement("p")
        titleContainer.setAttribute("class", "task-bar-titles")
        titleContainer.textContent = currentTask.title
        let descriptionContainer = document.createElement("p")
        descriptionContainer.setAttribute("class", "task-bar-descriptions")
        descriptionContainer.textContent = currentTask.description
        let deleteCheckbox = document.createElement("div")
        deleteCheckbox.setAttribute("class", "delete-checkboxes hidden")
        let doneCheckbox = document.createElement("div")
        doneCheckbox.setAttribute("class", "done-checkboxes hidden")
        let timeContainer = document.createElement("div")
        timeContainer.setAttribute("class", "time-containers")
        timeContainer.textContent = currentTask.time

        pendingTaskBarContainer.appendChild(newPendingTask)
        newPendingTask.appendChild(dateContainer)
        newPendingTask.appendChild(titleAndDescriptionContainer)
        newPendingTask.appendChild(checkBoxContainer)
        checkBoxContainer.appendChild(deleteCheckbox)
        dateContainer.appendChild(timeContainer)
        titleAndDescriptionContainer.appendChild(titleContainer)
        titleAndDescriptionContainer.appendChild(descriptionContainer)
        checkBoxContainer.appendChild(deleteCheckbox)
        checkBoxContainer.appendChild(doneCheckbox)

        deleteCheckbox.addEventListener("click", () => {
            deleteCheckbox.classList.toggle("red-background")
        })

        doneCheckbox.addEventListener("click", () => {
            doneCheckbox.classList.toggle("green-background")
        })
    }

    

    
}

let doneTaskBarContainer = document.getElementById("done-task-bar-container")

function displayInDoneTasks() {
    let parsedDoneTasksFromLocalStorage = JSON.parse(localStorage.getItem("doneTasks"))

    console.log("parsedIndonetassk is: ", parsedDoneTasksFromLocalStorage)

    if (parsedDoneTasksFromLocalStorage === null){
        parsedDoneTasksFromLocalStorage = []
        
    }

    let sortedDoneTasks = []

    if (parsedDoneTasksFromLocalStorage != null && parsedDoneTasksFromLocalStorage.length > 0){
        sortedDoneTasks = sortDateOfDoneTasks(parsedDoneTasksFromLocalStorage)
    }

    let tasksArray = sortedDoneTasks
    console.log("Tasks Array is", tasksArray)
    console.log("SortedPendingTasks is", sortedPendingTasks)
    console.log("ParsedPendingTasksFromLocalStorage is", parsedDoneTasksFromLocalStorage)
    if (tasksArray.length == 0){
        while (doneTaskBarContainer.firstChild){
            doneTaskBarContainer.removeChild(doneTaskBarContainer.firstChild)
        }
        return
    }
    
    while (doneTaskBarContainer.firstChild){
        doneTaskBarContainer.removeChild(doneTaskBarContainer.firstChild)
    }

    console.log("Tasks Array of Done Tasks length: ", tasksArray.length)

    for (let i = 0; i < tasksArray.length; i++){
        let currentTask = tasksArray[i]
        let newDoneTask = document.createElement("div")
        newDoneTask.setAttribute("class", "done-tasks")
        let dateContainer = document.createElement("p") 
        dateContainer.setAttribute("class", "date-containers")
        dateContainer.textContent = currentTask.date
        let titleAndDescriptionContainer = document.createElement("div")
        titleAndDescriptionContainer.setAttribute("class", "title-and-description-containers")
        let checkBoxContainer = document.createElement("p")
        checkBoxContainer.setAttribute("class", "checkbox-containers")
        let titleContainer = document.createElement("p")
        titleContainer.setAttribute("class", "task-bar-titles")
        titleContainer.textContent = currentTask.title
        let descriptionContainer = document.createElement("p")
        descriptionContainer.setAttribute("class", "task-bar-descriptions")
        descriptionContainer.textContent = currentTask.description
        let timeContainer = document.createElement("div")
        timeContainer.setAttribute("class", "time-containers")
        timeContainer.textContent = currentTask.time

        doneTaskBarContainer.appendChild(newDoneTask)
        newDoneTask.appendChild(dateContainer)
        newDoneTask.appendChild(titleAndDescriptionContainer)
        dateContainer.appendChild(timeContainer)
        titleAndDescriptionContainer.appendChild(titleContainer)
        titleAndDescriptionContainer.appendChild(descriptionContainer)
    }

    

    
}


function deleteTask(){
    let allRedCheckboxes = document.getElementsByClassName("red-background")
    let deleteCheckboxCounter = 0
    let allDeleteCheckboxes = document.getElementsByClassName("delete-checkboxes")
    let tasksFromLocalStorage = JSON.parse(localStorage.getItem("pendingTasksInToDoList"))
    let tasksFromLocalStorage2 = JSON.parse(localStorage.getItem("overdueTasks"))

    if (tasksFromLocalStorage == null || tasksFromLocalStorage.length == 0){
        tasksFromLocalStorage = []
    }
    if (tasksFromLocalStorage2 == null || tasksFromLocalStorage2.length == 0){
        tasksFromLocalStorage2 = []
    }

    for (let i = 0; i < allRedCheckboxes.length; i++){
        let taskBarToBeDeleted = allRedCheckboxes[i].parentElement.parentElement
        let titleToBeDeleted = taskBarToBeDeleted.children[1].children[0].textContent
        for (let j = 0; j < tasksFromLocalStorage.length; j++){
            if (tasksFromLocalStorage[j].title == titleToBeDeleted){
                tasksFromLocalStorage.splice(j, 1)
                localStorage.removeItem("pendingTasksInToDoList")
                localStorage.setItem("pendingTasksInToDoList", JSON.stringify(tasksFromLocalStorage))
            }
        }
        for (let j = 0; j < tasksFromLocalStorage2.length; j++){
            if (tasksFromLocalStorage2[j].title == titleToBeDeleted){
                tasksFromLocalStorage2.splice(j, 1)
                localStorage.removeItem("overdueTasks")
                localStorage.setItem("overdueTasks", JSON.stringify(tasksFromLocalStorage2))
            }
        }

          
    }
    let allRemainingRedCheckboxes = document.querySelectorAll(".red-background")

    allRemainingRedCheckboxes.forEach(e => e.remove())

    for (let i = 0; i < allDeleteCheckboxes.length; i++){
        deleteCheckboxCounter = deleteCheckboxCounter + 1
    }

    console.log(deleteCheckboxCounter)
    console.log(allDeleteCheckboxes.length)

    if (deleteCheckboxCounter == 0){
        let deleteConfirmationForm = document.getElementById("delete-confirmation")
        deleteConfirmationForm.classList.add("hidden")
    }

    displayInPendingTasks()
    displayInOverdueTasks()

}

let isOnDeleteTaskMode = false
let isOnDoneTaskMode = false


function showDeleteCheckboxes(){
    if (isOnDoneTaskMode){
        hideDoneCheckboxes()
    }

    isOnDeleteTaskMode = true
    let deleteCheckboxes = document.getElementsByClassName("delete-checkboxes")

    if (deleteCheckboxes.length == 0){
        return
    }

    for (let i = 0; i < deleteCheckboxes.length; i++){
        deleteCheckboxes[i].classList.remove("hidden")
    }

    let deleteConfirmationForm = document.getElementById("delete-confirmation")
    console.log("pending Tasks in to do list: ", JSON.parse(localStorage.getItem("pendingTasksInToDoList")))
    if (JSON.parse(localStorage.getItem("pendingTasksInToDoList")) == null || JSON.parse(localStorage.getItem("pendingTasksInToDoList")).length == 0){
        deleteConfirmationForm.classList.add("hidden")
        return
    }
    deleteConfirmationForm.classList.remove("hidden")

   
}

let overdueTaskBarContainer = document.getElementById("overdue-task-bar-container")

function displayInOverdueTasks(){
    let pendingTasks = JSON.parse(localStorage.getItem("pendingTasksInToDoList"))
    if (pendingTasks == null || pendingTasks.length == 0){
        pendingTasks = []
    }
    let overdueTasks = JSON.parse(localStorage.getItem("overdueTasks"))
    if (overdueTasks == null || overdueTasks.length == 0){
        overdueTasks = []
    }
    let now = new Date()

    console.log(pendingTasks.length)

    for (let i = 0; i < pendingTasks.length; i++){
        if (pendingTasks[i].milliseconds < now.getTime()){
            overdueTasks.push(pendingTasks[i])
            pendingTasks.splice(i, 1)
        }
    }
    console.log(pendingTasks.length)

    localStorage.removeItem("overdueTasks")
    localStorage.removeItem("pendingTasksInToDoList")
    localStorage.setItem("overdueTasks", JSON.stringify(overdueTasks))
    localStorage.setItem("pendingTasksInToDoList", JSON.stringify(pendingTasks))

    console.log("Number of items in pending tasks: ", localStorage.getItem("pendingTasksInToDoList").length)
    console.log("Number of items in overdue tasks", localStorage.getItem("overdueTasks").length)

    let parsedPendingTasksFromLocalStorage = JSON.parse(localStorage.getItem("overdueTasks"))

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
        while (overdueTaskBarContainer.firstChild){
            overdueTaskBarContainer.removeChild(overdueTaskBarContainer.firstChild)
        }
        return
    }
    
    while (overdueTaskBarContainer.firstChild){
        overdueTaskBarContainer.removeChild(overdueTaskBarContainer.firstChild)
    }

    for (let i = 0; i < tasksArray.length; i++){
        let currentTask = tasksArray[i]
        let newPendingTask = document.createElement("div")
        newPendingTask.setAttribute("class", "overdue-tasks")
        let dateContainer = document.createElement("p") 
        dateContainer.setAttribute("class", "date-containers")
        dateContainer.textContent = currentTask.date
        let titleAndDescriptionContainer = document.createElement("div")
        titleAndDescriptionContainer.setAttribute("class", "title-and-description-containers")
        let checkBoxContainer = document.createElement("p")
        checkBoxContainer.setAttribute("class", "checkbox-containers")
        let titleContainer = document.createElement("p")
        titleContainer.setAttribute("class", "task-bar-titles")
        titleContainer.textContent = currentTask.title
        let descriptionContainer = document.createElement("p")
        descriptionContainer.setAttribute("class", "task-bar-descriptions")
        descriptionContainer.textContent = currentTask.description
        let deleteCheckbox = document.createElement("div")
        deleteCheckbox.setAttribute("class", "delete-checkboxes hidden")
        let doneCheckbox = document.createElement("div")
        doneCheckbox.setAttribute("class", "done-checkboxes hidden")
        let timeContainer = document.createElement("div")
        timeContainer.setAttribute("class", "time-containers")
        timeContainer.textContent = currentTask.time

        overdueTaskBarContainer.appendChild(newPendingTask)
        newPendingTask.appendChild(dateContainer)
        newPendingTask.appendChild(titleAndDescriptionContainer)
        newPendingTask.appendChild(checkBoxContainer)
        checkBoxContainer.appendChild(deleteCheckbox)
        dateContainer.appendChild(timeContainer)
        titleAndDescriptionContainer.appendChild(titleContainer)
        titleAndDescriptionContainer.appendChild(descriptionContainer)
        checkBoxContainer.appendChild(deleteCheckbox)
        checkBoxContainer.appendChild(doneCheckbox)

        deleteCheckbox.addEventListener("click", () => {
            deleteCheckbox.classList.toggle("red-background")
        })

        doneCheckbox.addEventListener("click", () => {
            doneCheckbox.classList.toggle("green-background")
        })
    }

    displayInPendingTasks()
}

function hideDeleteCheckboxes() {
    let deleteCheckboxes = document.getElementsByClassName("delete-checkboxes")
    let redCheckboxes = document.getElementsByClassName("red-background")

    if (deleteCheckboxes.length == 0){
        return
    }

    for (let i = 0; i < redCheckboxes.length; i++){
        redCheckboxes[i].setAttribute("class", "delete-checkboxes")
    }

    for (let i = 0; i < deleteCheckboxes.length; i++){
        deleteCheckboxes[i].classList.add("hidden")
    }

   

    let deleteConfirmationForm = document.getElementById("delete-confirmation")
    deleteConfirmationForm.classList.add("hidden")

    isOnDeleteTaskMode = false
}

function showMarkAsDoneCheckboxes(){
    if (isOnDeleteTaskMode){
        hideDeleteCheckboxes()
    } 

    isOnDoneTaskMode = true
    let doneCheckboxes = document.getElementsByClassName("done-checkboxes")

    if (doneCheckboxes.length == 0){
        return
    }

    for (let i = 0; i < doneCheckboxes.length; i++){
        doneCheckboxes[i].classList.remove("hidden")
    }

    let doneConfirmationForm = document.getElementById("done-confirmation")
    /*
    if ((JSON.parse(localStorage.getItem("pendingTasksInToDoList")) == null || JSON.parse(localStorage.getItem("pendingTasksInToDoList")).length == 0) && JSON.parse(localStorage.getItem("overdueTasks")).length == 0){
        doneConfirmationForm.classList.add("hidden")
        return
    }
        */
    doneConfirmationForm.classList.remove("hidden")
}

function clearAll(){
    localStorage.clear()
    let taskBarContainers = document.getElementsByClassName("task-bar-containers")

    for (let i = 0; i < taskBarContainers.length; i++){
        while (taskBarContainers[i].firstChild){
            taskBarContainers[i].removeChild(taskBarContainers[i].firstChild)
        }
    }
}



function markAsDoneTask(){
    let allGreenCheckboxes = document.getElementsByClassName("green-background")
    let doneCheckboxCounter = 0
    let allDoneCheckboxes = document.getElementsByClassName("done-checkboxes")
    let tasksFromLocalStorage = JSON.parse(localStorage.getItem("pendingTasksInToDoList"))
    let tasksFromLocalStorageOverdue = JSON.parse(localStorage.getItem("overdueTasks"))
    let tasksToBeMarkedAsDone = JSON.parse(localStorage.getItem("doneTasks"))
    if (tasksToBeMarkedAsDone == null){
        tasksToBeMarkedAsDone = []
    }

    console.log("Number of green boxes: ", allGreenCheckboxes.length)

    for (let i = 0; i < allGreenCheckboxes.length; i++){
        let taskBarToBeDeleted = allGreenCheckboxes[i].parentElement.parentElement
        let titleToBeDeleted = taskBarToBeDeleted.children[1].children[0].textContent
        for (let j = 0; j < tasksFromLocalStorage.length; j++){
            if (tasksFromLocalStorage[j].title == titleToBeDeleted){
                let now = new Date()
                tasksFromLocalStorage[j].timeFinished = Number(now.getTime())
                tasksToBeMarkedAsDone.push(tasksFromLocalStorage[j])
                tasksFromLocalStorage.splice(j, 1)
                localStorage.removeItem("pendingTasksInToDoList")
                localStorage.setItem("pendingTasksInToDoList", JSON.stringify(tasksFromLocalStorage))
                
            }
        }
        for (let j = 0; j < tasksFromLocalStorageOverdue.length; j++){
            if (tasksFromLocalStorageOverdue[j].title == titleToBeDeleted){
                let now = new Date()
                tasksFromLocalStorageOverdue[j].timeFinished = Number(now.getTime())
                tasksToBeMarkedAsDone.push(tasksFromLocalStorageOverdue[j])
                tasksFromLocalStorageOverdue.splice(j, 1)
                localStorage.removeItem("overdueTasks")
                localStorage.setItem("overdueTasks", JSON.stringify(tasksFromLocalStorageOverdue))
                
            }
        }
          
    }

    let allRemainingGreenCheckboxes = document.querySelectorAll(".green-background")

    console.log("Number of all remaining checkboxes", allRemainingGreenCheckboxes)
    
    allRemainingGreenCheckboxes.forEach(e => e.remove())

    localStorage.removeItem("doneTasks")
    localStorage.setItem("doneTasks", JSON.stringify(tasksToBeMarkedAsDone))
    
    for (let i = 0; i < allDoneCheckboxes.length; i++){
        doneCheckboxCounter = doneCheckboxCounter + 1
    }

    if (doneCheckboxCounter == 0){
        let doneConfirmationForm = document.getElementById("done-confirmation")
        doneConfirmationForm.classList.add("hidden")
    }
    
    displayInDoneTasks()
    displayInPendingTasks()
    displayInOverdueTasks()

}

let isMarkingDoneOverdue = false

function hideDoneCheckboxes() {
    let doneCheckboxes = document.getElementsByClassName("done-checkboxes")
    let greenCheckboxes = document.getElementsByClassName("green-background")
    if (doneCheckboxes.length == 0){
        return
    }

    for (let i = 0; i<greenCheckboxes.length; i++){
        greenCheckboxes[i].setAttribute("class", "done-checkboxes")
    }

    for (let i = 0; i < doneCheckboxes.length; i++){
        doneCheckboxes[i].classList.add("hidden")
    }

    

    let doneConfirmationForm = document.getElementById("done-confirmation")
    doneConfirmationForm.classList.add("hidden")

    isOnDoneTaskMode = false
}

displayInOverdueTasks()
displayInPendingTasks()
hideDeleteCheckboxes()
hideDoneCheckboxes()
displayInDoneTasks()





