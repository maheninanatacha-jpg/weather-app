import { createProject } from './project.js';
import {loadProjects} from './storage.js';

const saved = loadProjects();
const projects = saved && saved.length > 0 ? saved : [createProject("Default")];
let currentProject = projects[0];

export function getCurrentProject() {
  return currentProject;
}

export function setCurrentProject(project) {
  currentProject = project;
}
export function getProjects() {
    return projects;
}

export function addProject(name) {
    const project = createProject(name);
    projects.push(project);
    return project;
}

export function getDefaultProject() {
    return projects[0];
}

