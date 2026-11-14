import "./style.css";
import { createTodo } from "./todo.js";
import { addTodo, removeTodo, updateTodo } from "./project.js";
import { saveProjects } from "./storage.js";
import {
  getProjects,
  addProject,
  getCurrentProject,
  setCurrentProject,
} from "./app.js";
import {
  renderProjects,
  renderTodos,
  bindTodoForm,
  bindProjectButton,
} from "./dom.js";

// Redessine tout l'écran à partir des données actuelles
function refresh() {
  saveProjects(getProjects());

  renderProjects(getProjects(), (project) => {
    setCurrentProject(project);
    refresh();
  });

  renderTodos(
    getCurrentProject().todos,
    (todo) => {                       // onDelete
      removeTodo(getCurrentProject(), todo);
      refresh();
    },
    (todo, change) => {               // onEdit
      updateTodo(todo, change);
      refresh();
    }
  );
}

// Formulaire des todos : branché UNE SEULE fois
bindTodoForm((todoData) => {
  const newTodo = createTodo(
    todoData.title,
    todoData.description,
    todoData.dueDate,
    todoData.priority
  );
  addTodo(getCurrentProject(), newTodo);
  refresh();
});

// Bouton « Ajouter un projet » : branché UNE SEULE fois
bindProjectButton((name) => {
  setCurrentProject(addProject(name)); // crée le projet et le sélectionne
  refresh();
});

// Premier affichage au chargement de la page
refresh();