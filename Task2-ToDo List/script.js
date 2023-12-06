document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('tasks');
    const filterStatus = document.getElementById('filter-status');
  
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
          <span>${task.title}</span>
          <button onclick="toggleTaskStatus(${index})">Mark ${task.completed ? 'Pending' : 'Complete'}</button>
          <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
      });
    }
  
    // Add new task
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = taskInput.value.trim();
      if (title !== '') {
        tasks.push({ title, completed: false });
        taskInput.value = '';
        renderTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
  
    // Toggle task status (completed/pending)
    window.toggleTaskStatus = (index) => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Delete task
    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      renderTasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Filter tasks
    filterStatus.addEventListener('change', () => {
      const status = filterStatus.value;
      let filteredTasks = tasks;
      if (status !== 'all') {
        filteredTasks = tasks.filter(task => {
          if (status === 'completed') {
            return task.completed;
          } else {
            return !task.completed;
          }
        });
      }
      renderTasks(filteredTasks);
    });
  
    // Initial render
    renderTasks();
  });
  