TO-DO and notes app 

## Overview

im using  a lightweight and minimalistic frontend framework designed to simplify the process of building dynamic user interfaces. With a focus on efficiency and ease of use, dot-js provides essential tools for managing state, handling events, and manipulating the DOM, making it an excellent choice for small to medium-sized web applications.

## Installation

To get started with dot-js, clone the repository and include the framework files in your project:

```bash
git clone https://github.com/tomistaven/todonotes.git
```

## Running the to-do and notes App

The framework includes an example application to help you get up and running quickly. Here's how to use it:

1. Navigate to the root directory **/todonotes** and in the CLI input the following command ```bash go run mytodonotes/server.go```
2. Navigate to **http://localhost:8080/mytodonotes/**
3. Navigate to the **To-Do List** section to manage tasks with persistent storage.
4. Navigate to the **Notes** section to create text notes and draw on a canvas with support for pen (various colors) or  eraser.

## Features

the framework comes packed with features to streamline your development workflow:

- **State Management:** Easily manage application state with a built-in state management system that persists data across sessions.
- **Routing System:** A simple yet powerful routing system allows for seamless navigation between different views.
- **Custom DOM API:** A lightweight DOM manipulation API simplifies the creation and management of UI components.
- **To-Do App:** A fully functional to-do list with persistent storage, allowing users to add, complete, and delete tasks.
- **Notes App:** A versatile notes app with a drawing canvas, featuring tools like pen and eraser, along with undo/redo functionality.

## Architecture and Design Principles

The dot-js framework is built around three core principles:

### State Management

The `State` class provides a simple way to manage application state. It uses `localStorage` to persist state between sessions, ensuring that data is not lost when the page is refreshed.

**Example:**

```javascript
const todoState = new State("todos", []);
todoState.setState([{ text: "New Task", completed: false }]);
```

### Routing

The `Router` class handles client-side routing, allowing you to navigate between different views without reloading the page. It uses the `pushState` and `popstate` APIs to control the URL.

**Example:**

```javascript
const router = new Router({
  "/": renderHome,
  "/todos": renderTodos,
  "/notes": renderNotes,
});
router.navigate("/todos");
```

### DOM Manipulation

The `createElement` function provides a declarative way to create and manipulate DOM elements. It supports event listeners, attributes, and nested elements.

**Example:**

```javascript
const button = createElement("button", { onClick: () => alert("Clicked!") }, ["Click Me"]);
document.body.appendChild(button);
```

## Best Practices

- **Organize Components:** Break your application into reusable components (e.g., `TodoItem`, `Note`). This makes your code more modular and easier to maintain.
- **Manage State Effectively:** Use the `State` class to manage application state. Avoid directly manipulating the DOM; instead, update the state and let the framework handle the rendering.
- **Use Event Delegation:** Attach event listeners to parent elements whenever possible. This improves performance and simplifies event handling.

  **Example:**

  ```javascript
  const list = createElement("ul", { onClick: (e) => {
    if (e.target.tagName === "LI") {
      console.log("List item clicked:", e.target.textContent);
    }
  }}, [
    createElement("li", {}, ["Item 1"]),
    createElement("li", {}, ["Item 2"]),
  ]);
  ```

- **Keep Routes Simple:** Define routes in a single location and use the `Router` class to handle navigation. This makes it easier to manage and debug your application.
- **Leverage Local Storage:** Use the `State` class to persist data between sessions. This ensures that your application state is preserved even if the user refreshes the page.

## Future Improvements

I'm constantly working to improve this frame. Here are some planned features for future releases:

- **Export as PDF:** Add the ability to export notes and drawings as PDF files for easy sharing and printing.

---

