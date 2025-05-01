const operationColors = ["darkblue", "darkred", "darkgreen"]
let operationsContainer = document.getElementById("operations-container")
let operationButtons = operationsContainer.children

for (let i=0; i<operationButtons.length; i++){
    operationButtons[i].style.backgroundColor = operationColors[i]
}
