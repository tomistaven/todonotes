// example/app.js
import { Router } from "../framework/core/router.js";
import { renderHome } from "./pages/home.js";
import { renderTodos } from "./pages/todos.js";
import { renderNotes } from "./pages/notes.js";
import { render404 } from "./pages/404.js"; // Add a 404 page

const routes = {
  "/": renderHome,  // Homepage as the default route
  "/todos": renderTodos,
  "/notes": renderNotes,
  "/404": render404, // 404 route
};

const router = new Router(routes);

document.addEventListener("DOMContentLoaded", () => {
  // Load the initial route
  router.loadRoute();
});