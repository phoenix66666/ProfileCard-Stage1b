
const timeRemainingElement = document.getElementById("time-remaining");
const statusIndicator = document.getElementById("status");
const checkboxComplete = document.getElementById("checkbox-complete");
const title = document.getElementById("todo-title");
const editButton = document.getElementById("edit-button");
const deleteButton = document.getElementById("delete-button");
const editForm = document.getElementById("edit-form");
const statusControl = document.getElementById("todo-status-control");
const priorityIndicator = document.getElementById("priority-indicator");
const priorityElement = document.querySelector('[data-testid="test-todo-priority"]');
const descriptionElement = document.querySelector('[data-testid="test-todo-description"]');
const collapsibleSection = document.getElementById("collapsible-section");
const expandToggle = document.getElementById("todo-expand-toggle");
const descriptionThreshold = 50;
const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
const editTitleInput = document.getElementById("edit-title");
const editDescriptionInput = document.getElementById("edit-description");
const editPrioritySelect = document.getElementById("edit-priority");
const editDueDateInput = document.getElementById("edit-due-date");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const dueDateElement = document.getElementById("todo-due-date");
const todoCard = document.getElementById("todo-card");

let isExpanded = false;
let initialTitle = "Meeting";
let initialDescription = descriptionElement.textContent;
let initialPriority = "high";
let initialDueDate = new Date("2026-04-13T23:59:00");
let initialStatus = "Pending";
let isEditing = false;
statusControl.value = initialStatus;


function updateRemainingTime() {
    const now = new Date();
    const difference = initialDueDate.getTime() - now.getTime();

    if (statusIndicator.textContent === "Done") {
        timeRemainingElement.textContent = "Completed";
        title.style.textDecoration = "line-through";
        title.style.backgroundColor = "#5FA052";
        title.style.color = "#555";
        statusIndicator.classList.remove('pending', 'in-progress');
        statusIndicator.classList.add('done');
        return;
    }

    let message = "";
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 3600 * 24));
        if (days === 0) {
            const hours = Math.floor(difference / (1000 * 3600));
            if (hours === 0) {
                const minutes = Math.floor(difference / (1000 * 60));
                message = `${minutes} minutes left`;
            } else {
                message = `${hours} hours left`;
            }
        }
        else if (days === 1) {
            message = `${days} day left`;
        }
        else {
            message = `${days} days left`;
        }
    }
    else {
        const overdueHours = Math.abs(Math.floor(difference / (1000 * 3600)));
        message = `Overdue by ${overdueHours} hours`;
        if(!checkboxComplete.checked){
        overdueIndicator.style.display = 'block';
       }
       
}

    timeRemainingElement.textContent = message;
}



function updatePriority(priority) {
    priorityIndicator.className = `priority-indicator ${priority.toLowerCase()}`;
    priorityIndicator.setAttribute('aria-label', `Priority: ${priority}`);
    priorityElement.className = `priority-badge ${priority.toLowerCase()}`;
    priorityElement.setAttribute('aria-label', `Priority: ${priority}`);
    priorityElement.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
}

function checkOverdue() {
    if (initialStatus === "Done") {
        overdueIndicator.style.display = 'none';
        return;
    }
    const now = new Date();
    if (initialDueDate < now) {
        overdueIndicator.style.display = 'block';
    } else {
        overdueIndicator.style.display = 'none';
    }
}

function updateCheckbox() {
    if (checkboxComplete.checked) {
        statusIndicator.classList.remove('pending', 'in-progress');
        statusIndicator.classList.add('done');
        statusIndicator.textContent = "Done";
        title.style.textDecoration = "line-through";
        title.style.backgroundColor = "#5FA052";
        title.style.color = "#555";
        checkboxComplete.setAttribute('aria-checked', 'true');
        timeRemainingElement.textContent = "Completed";
        statusControl.value = "Done";
        overdueIndicator.style.display = 'none';
        
    } else {
        statusIndicator.classList.remove('done', 'in-progress');
        statusIndicator.classList.add('pending');
        statusIndicator.textContent = "Pending";
        checkboxComplete.setAttribute('aria-checked', 'false');
        title.style.textDecoration = "none";
        title.style.backgroundColor = "#fadc81";
        title.style.color = "#000";
        updateRemainingTime();
        statusControl.value = "Pending";
        

    }
}


function updateStatus() {

    if (statusControl.value === "Done") {
        statusIndicator.classList.remove('pending', 'in-progress');
        statusIndicator.classList.add('done');
        statusIndicator.textContent = "Done";
        title.style.textDecoration = "line-through";
        title.style.backgroundColor = "#5FA052";
        title.style.color = "#555";
        checkboxComplete.setAttribute('aria-checked', 'true');
        timeRemainingElement.textContent = "Completed";
        overdueIndicator.style.display = 'none';
              

    }
    else if (statusControl.value === "In Progress") {
        statusIndicator.classList.remove('done', 'pending');
        statusIndicator.classList.add('in-progress');
        statusIndicator.textContent = "In Progress";
        checkboxComplete.setAttribute('aria-checked', 'false');
        title.style.textDecoration = "none";
        title.style.backgroundColor = "rgb(190, 245, 26)";
        title.style.color = "#000";
        updateRemainingTime();
       
    }
    else {
        statusIndicator.classList.remove('done', 'in-progress');
        statusIndicator.classList.add('pending');
        statusIndicator.textContent = "Pending";
        checkboxComplete.setAttribute('aria-checked', 'false');
        title.style.textDecoration = "none";
        title.style.backgroundColor = "#fadc81";
        title.style.color = "#000";
        updateRemainingTime();
       
    }
  
}



function updateDueDateDisplay(){
        dueDateElement.textContent = initialDueDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
       dueDateElement.setAttribute("datetime", initialDueDate.toISOString());
}

function updateDueDate() {
    initialStatus = statusControl.value;
    statusIndicator.textContent = initialStatus;

    if (initialStatus === "Done") {
        checkboxComplete.checked = true;
        timeRemainingElement.textContent = "Completed";
  
    } else {
        checkboxComplete.checked = false;
        updateRemainingTime();

    }
}



function collapseCheck() {
    if (descriptionElement.textContent.length > descriptionThreshold) {
        collapsibleSection.classList.remove('expanded');
        expandToggle.textContent = "Expand";
        expandToggle.setAttribute('aria-expanded', 'false');
        isExpanded = false;
    } else {
        collapsibleSection.classList.add('expanded');
        collapsibleSection.style.maxHeight = 'auto';
        expandToggle.textContent = "Collapse";
        expandToggle.setAttribute('aria-expanded', 'true');
        isExpanded = true;
    }
}

function collapseUpdate() {
    
    if (descriptionElement.textContent.length > descriptionThreshold && !isExpanded)
    { 
    collapsibleSection.classList.add('expanded');
    expandToggle.textContent = "Collapse";
    expandToggle.setAttribute('aria-expanded', 'true');
    isExpanded = !isExpanded;
    } else if (descriptionElement.textContent.length > descriptionThreshold && isExpanded){
    collapsibleSection.classList.remove('expanded');    
    expandToggle.textContent = "Expand";
    expandToggle.setAttribute('aria-expanded', 'false');
    isExpanded = !isExpanded;
       }
}


function updateDisplay() {
    title.textContent = editTitleInput.value || initialTitle;
    descriptionElement.textContent = editDescriptionInput.value || initialDescription;
    //priorityElement.textContent = editPrioritySelect.value.charAt(0).toUpperCase() + editPrioritySelect.value.slice(1);
    updatePriority(editPrioritySelect.value || initialPriority);
    dueDateElement.textContent = new Date(editDueDateInput.value).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });


    initialTitle = title.textContent;
    initialDescription = descriptionElement.textContent;
    initialPriority = editPrioritySelect.value || initialPriority;
    const newDueDate = new Date(editDueDateInput.value);
    if (!isNaN(newDueDate)) {
        initialDueDate = newDueDate;
    }

    updateDueDate();
    updateStatus();
    checkOverdue();
}

updateRemainingTime();
updateDueDateDisplay();
updateDueDate();
updateStatus();
collapseCheck();
updatePriority(initialPriority);
checkOverdue();

let intervalId;
intervalId = setInterval(updateRemainingTime, 60000);
if (statusIndicator.textContent === "Done") {
    clearInterval(intervalId);
}

statusControl.addEventListener('change', updateStatus);
checkboxComplete.addEventListener('change', updateCheckbox);
checkboxComplete.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        checkboxComplete.click();
    }
});

editButton.addEventListener('click', () => {
    todoCard.style.display = 'none';
    isEditing = true;
    editForm.classList.add('active');
    editTitleInput.value = initialTitle;
    editDescriptionInput.value = initialDescription;
    editPrioritySelect.value = initialPriority;
    editDueDateInput.value = initialDueDate.toISOString().slice(0, 16);
});

saveButton.addEventListener('click', () => {
    updateDisplay();
    isEditing = false;
    editForm.classList.remove('active');
    todoCard.style.display = 'flex';
    editButton.focus();

});

cancelButton.addEventListener('click', () => {
    isEditing = false;
    editForm.classList.remove('active');

    editTitleInput.value = initialTitle;
    editDescriptionInput.value = initialDescription;
    editPrioritySelect.value = initialPriority;
    editDueDateInput.value = initialDueDate.toISOString().slice(0, 16);
    todoCard.style.display = 'flex';
    editButton.focus();

});

deleteButton.addEventListener('click', () => {
    console.log("Delete clicked");
    alert("Delete clicked");
});

expandToggle.addEventListener('click', () => {
   
    collapseUpdate();
});

expandToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent scrolling       
         collapseUpdate();
    }
});

statusControl.addEventListener('change', () => {
    initialStatus = statusControl.value;
    checkboxComplete.checked = (initialStatus === "Done");
    updateStatus();
    updateDueDate();
});