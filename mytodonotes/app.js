// app.js
import { Router } from "../framework/core/router.js";
import { renderTodos } from "./pages/todos.js";
import { renderNotes } from "./pages/notes.js";

const routes = {
    "/": renderTodos,  // Default
    "/todos": renderTodos,
    "/notes": renderNotes,
};

const router = new Router(routes);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nav-todos").addEventListener("click", () => router.navigate("/todos"));
    document.getElementById("nav-notes").addEventListener("click", () => router.navigate("/notes"));
    
    // Load the initial route
    router.loadRoute();
});