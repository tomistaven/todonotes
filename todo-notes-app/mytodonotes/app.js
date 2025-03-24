import { Router } from "../framework/core/router.js";
import { renderTodos } from "./pages/todos.js";
import { renderNotes } from "./pages/notes.js";
import { renderHome } from "./pages/home.js";

const routes = {
    "/home": renderHome,  // Add root path
    "/todos": renderTodos,
    "/notes": renderNotes,
    "/404": () => "<div>Page not found</div>" // Add 404 handler
};

const router = new Router(routes);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nav-todos").addEventListener("click", () => router.navigate("/todos"));
    document.getElementById("nav-notes").addEventListener("click", () => router.navigate("/notes"));
    
    // Load initial route
    if (!routes[window.location.pathname]) {
        router.navigate("/home");
    } else {
        router.loadRoute();
    }
});