export function renderProjects(projects, onSelect) {
  const container = document.querySelector("#projects");
  container.textContent = "";

  projects.forEach((project) => {
    const btn = document.createElement("button");
    btn.textContent = project.name;                       // le nom du projet
    btn.addEventListener("click", () => onSelect(project));
    container.appendChild(btn);
  });
}
export function renderTodos(todos, onDelete, onEdit) {
  const container = document.querySelector("#todos");
  container.textContent = "";


  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("todo", `priority-${todo.priority}`);

    const header = document.createElement("div");
    header.classList.add("todo-header");
    header.textContent = `${todo.title} - ${todo.dueDate}`;

    const details = document.createElement("div");
    details.classList.add("todo-details", "hidden");
    details.textContent = `${todo.description} (priorité : ${todo.priority})`;

    header.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    const btn = document.createElement("button");
    btn.textContent = "Supprimer";
    btn.addEventListener("click", () => onDelete(todo));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Modifier";
    editBtn.addEventListener("click", () => {
      const title = prompt("Nouveau titre ?", todo.title);
      if (title) onEdit(todo, { title });
    });

    div.append(header, details, btn,editBtn);
    container.appendChild(div);
  });
}
export function bindTodoForm(onSubmit) {
  const form = document.querySelector("#todo-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();   // empêche le rechargement de la page

    onSubmit({
      title: document.querySelector("#title").value,
      description: document.querySelector("#description").value,
      dueDate: document.querySelector("#dueDate").value,
      priority: document.querySelector("#priority").value,
    });

    form.reset();             // vide les champs
  });
}

export function bindProjectButton(onAdd) {
  document.querySelector("#add-project").addEventListener("click", () => {
    const name = prompt("Nom du projet ?");
    if (name) onAdd(name);
  });
}

