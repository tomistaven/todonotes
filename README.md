# TO-DO and Notes App

## Overview

This is a lightweight and minimalistic app for managing to-do lists and notes. It uses a custom frontend framework designed to simplify the process of building dynamic user interfaces. With a focus on efficiency and ease of use, this lightweight framework provides essential tools for managing state, handling events, and manipulating the DOM, making it an excellent choice for small to medium-sized web applications.

The app includes:
- A **To-Do List** for managing tasks with persistent storage.
- A **Notes App** with a drawing canvas, featuring tools like pen and eraser, along with undo/redo functionality.

The app can be run as a **web app** or packaged as a **standalone desktop app** using Electron.

---

## Table of Contents

- [TO-DO and Notes App](#to-do-and-notes-app)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
    - [As a Web App](#as-a-web-app)
    - [As a Standalone Desktop App (Electron)](#as-a-standalone-desktop-app-electron)
  - [Packaging the App](#packaging-the-app)
    - [For Linux](#for-linux)
    - [For Windows](#for-windows)
    - [For macOS](#for-macos)
  - [Testing the App](#testing-the-app)
    - [Running the Packaged App](#running-the-packaged-app)
  - [Features](#features)
  - [Architecture and Design Principles](#architecture-and-design-principles)
    - [State Management](#state-management)
    - [Routing](#routing)
    - [DOM Manipulation](#dom-manipulation)
  - [Best Practices](#best-practices)
  - [Contributing](#contributing)
  - [Future Improvements](#future-improvements)
  - [Notes for Developers](#notes-for-developers)
  - [License](#license)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tomistaven/todonotes.git
   ```

2. Navigate to the project folder:
   ```bash
   cd todonotes
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

### As a Web App

1. Navigate to the root directory `/todonotes` and run the Go server:
   ```bash
   go run mytodonotes/server.go
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8080/mytodonotes/
   ```

3. Use the **To-Do List** to manage tasks or the **Notes** section to create notes and draw on the canvas.

### As a Standalone Desktop App (Electron)

1. Install Node.js if you haven't already.
2. Install Electron:
   ```bash
   npm install electron --save-dev
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. The app will launch in a new window.

## Packaging the App

To package the app for distribution, use Electron Packager or Electron Builder.

### For Linux

Package the app:
```bash
npx electron-packager . --platform=linux --arch=x64 --out=dist
```
The packaged app will be in the `dist/` folder. Share the `.AppImage`, `.deb`, or `.tar.gz` file with users.

### For Windows

Package the app:
```bash
npx electron-packager . --platform=win32 --arch=x64 --out=dist
```
The packaged app will be in the `dist/` folder. Share the `.exe` file with users.

### For macOS

Package the app:
```bash
npx electron-packager . --platform=darwin --arch=x64 --out=dist
```
The packaged app will be in the `dist/` folder. Share the `.app` file with users.

## Testing the App

### Running the Packaged App

1. **Download the App**:
   * Download the packaged app (e.g., `.AppImage`, `.tar.gz`, or `.exe`).

2. **Extract the Files (if necessary)**:
   * If the app is shared as a `.tar.gz` or `.zip` file, extract it:
     ```bash
     tar -xzvf my-todo-notes-app-linux-x64.tar.gz
     ```

3. **Run the App**:
   * Navigate to the extracted folder and run the executable:
     ```bash
     ./my-todo-notes-app
     ```

## Features

The app comes packed with features to streamline your workflow:

- **State Management:** Easily manage application state with a built-in state management system that persists data across sessions.
- **Routing System:** A simple yet powerful routing system allows for seamless navigation between different views.
- **Custom DOM API:** A lightweight DOM manipulation API simplifies the creation and management of UI components.
- **To-Do App:** A fully functional to-do list with persistent storage, allowing users to add, complete, and delete tasks.
- **Notes App:** A versatile notes app with a drawing canvas, featuring tools like pen and eraser, along with undo/redo functionality.

## Architecture and Design Principles

The lightweight framework is built around three core principles:

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
  "/": renderTodos,
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

## Contributing

1. Fork the repository.

2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```

4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

## Future Improvements

I'm constantly working to improve this framework. Here are some planned features for future releases:

- **Home Page:** Add a home page to the app.
- **Export as PDF:** Add the ability to export notes and drawings as PDF files for easy sharing and printing.
- **Updating the App:**
  - Manual Updates: Instructions for manually updating the app.
  - Automatic Updates: Implementing automatic update functionality.

## Notes for Developers

* The `dist/` and `node_modules/` folders are excluded from version control to keep the repository size small.
* To generate the `dist/` folder, run:
  ```bash
  npx electron-packager . --platform=linux --arch=x64 --out=dist
  ```

* To install dependencies, run:
  ```bash
  npm install
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.