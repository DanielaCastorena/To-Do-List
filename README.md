# Todo List App

This is a Todo List App built using React. It allows users to create, manage, and track their tasks efficiently, providing a user-friendly interface to keep everything organized.

### Features
• **Add Tasks**: Users can add new tasks with a description and optional due date.  
• **Edit Tasks**: Ability to edit existing tasks to update their details.  
• **Delete Tasks**: Users can remove tasks from their list when they're no longer needed.  
• **Task Completion**: Mark tasks as complete, allowing users to keep track of what has been accomplished.  
• **Filter Tasks**: Filter tasks to view all, completed, not completed, today and scheduled tasks easily.  
• **Responsive Design**: Adjusts layout and styling for various screen sizes, making the app mobile-friendly.  
• **Dark/Light Mode Toggle**: Button to toggle between whether the user would like to view the app in light or dark mode.

### How it Works

1. **Add Task**
   - Users can input a task description and optional due date in the input fields, then click the "Add Task" button to add it to their list.

2. **Task List**
   - The app displays a list of tasks with their descriptions and due dates, if provided.
   - Each task includes options to edit or delete it.

3. **Edit Task**
   - Users can click on an "Edit" button next to a task to modify its description or due date.

4. **Delete Task**
   - Tasks can be removed by clicking the "Delete" button next to the task. A confirmation prompt may be displayed to prevent accidental deletions.

5. **Task Completion**
   - Users can mark tasks as complete, which visually distinguishes completed tasks from pending ones.

6. **Filter Tasks**
   - Users can filter the task list to view all tasks, only completed tasks, or only pending tasks.

### State Management
- `tasks`: An array of task objects, each containing a description, due date, and completion status.  
- `error`: Manages error messages when there’s an issue with task addition, editing, or deletion.  

## How to Run the App

### Prerequisites
Ensure that you have Node.js and npm installed on your machine.

### Installation
Clone the repository:
git clone https://github.com/DanielaCastorena/To-Do-List
cd todo-list

Install the dependencies:
npm install

Start the application:
npm start

The app will now be running locally on [http://localhost:3000](http://localhost:3000).

## Future Enhancements
• Option to categorize tasks by priority (e.g., high, medium, low).  
• Ability to set reminders or notifications for due tasks.  

## Link to Project
[todolist-dc.netlify.app](https://todolist-dc.netlify.app)