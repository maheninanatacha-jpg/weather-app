const KEY = "todo-app-projects";

export function saveProjects(projects) {
    localStorage.setItem(KEY, JSON.stringify(projects));
}

export function loadProjects() {
    try {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data) : null;
    }

    catch (error) {
       return null;
    }

}