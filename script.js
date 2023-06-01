document.addEventListener('DOMContentLoaded', function() {
    // Get the task input field, add task button, and task list
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
  
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to render the tasks
    function renderTasks() {
      // Clear the task list
      taskList.innerHTML = '';
  
      // Loop through the tasks and create list items
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
  
        // Create list item
        const li = document.createElement('li');
        li.innerText = task.text;
  
        // Add completed class if task is completed
        if (task.completed) {
          li.classList.add('completed');
        }
  
        // Add click event listener to mark task as completed
        li.addEventListener('click', function() {
          task.completed = !task.completed;
          renderTasks();
        });
  
        // Append the list item to the task list
        taskList.appendChild(li);
      }
  
      // Update the task count
      const remainingTasks = tasks.filter(task => !task.completed).length;
      taskCount.innerText = `Tasks remaining: ${remainingTasks}`;
  
      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Function to add a new task
    function addTask() {
      const taskText = taskInput.value.trim();
  
      if (taskText !== '') {
        const newTask = {
          text: taskText,
          completed: false
        };
  
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
      }
    }
  
    // Add click event listener to add task button
    addTaskBtn.addEventListener('click', addTask);
  
    // Render the tasks initially
    renderTasks();
  });