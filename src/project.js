export function createProject(name){
    return {name, todos:[]};
}

export function addTodo(project, todo){
    project.todos.push(todo);
}

export function removeTodo(project, todo){
    const index = project.todos.indexOf(todo);  
    if (index !== -1) {
        project.todos.splice(index, 1);
    }
}

export function updateTodo(todo, changes){
    Object.assign(todo, changes);
}