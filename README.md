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
    - [Manual Testing](#manual-testing)
    - [Automated Testing](#automated-testing)
    - [Running the Packaged App](#running-the-packaged-app)
    - [Troubleshooting Common Issues](#troubleshooting-common-issues)
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

1. Navigate to the app folder.
    ```bash
   cd todo-notes-app
   ```
2. Install Node.js if you haven't already.
3. Install Electron:
   ```bash
   npm install electron --save-dev
   ```
4. Start the app:
   ```bash
   npm start
   ```
5. The app will launch in a new window.

## Packaging the App

To package the app for distribution and run through an executable, use Electron Packager or Electron Builder.

Navigate to the app folder.
    
```bash
cd todo-notes-app
``` 


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

This section covers different approaches to testing the TO-DO and Notes App, including manual testing of features, automated testing with provided test scripts, and testing the packaged application.

### Manual Testing

To ensure all features work correctly, follow these test procedures:

1. **To-Do List Testing:**
   * **Adding Tasks:** Add several tasks to verify creation functionality.
   * **Completing Tasks:** Mark tasks as complete to test state changes.
   * **Deleting Tasks:** Remove tasks to test deletion logic.
   * **Persistence:** Refresh the page to verify tasks are saved in local storage.

2. **Notes App Testing:**
   * **Text Notes:** Create and edit text notes.
   * **Drawing Canvas:** Test the drawing tools:
     * Pen tool with different colors
     * Eraser tool
     * Undo/redo functionality
   * **Persistence:** Verify notes are saved after page refresh.

3. **Navigation Testing:**
   * Test navigation between To-Do List and Notes sections.
   * Verify correct state preservation when switching between sections.

### Automated Testing

The app includes a test suite to verify core functionality:

1. Install testing dependencies:
   ```bash
   npm install --save-dev jest
   ```

2. Run the test suite:
   ```bash
   npm test
   ```

3. Key tests include:
   * State management functionality
   * Router navigation
   * DOM element creation and manipulation
   * To-Do list operations (add, complete, delete)
   * Notes app functionality

### Running the Packaged App

To test the packaged application:

1. **Download or Build the App**:
   * Use the packaged app from the `dist/` folder (see [Packaging the App](#packaging-the-app)).
   * Or download the pre-built app for your platform from the releases page.

2. **Installation Testing**:
   * For Windows: Run the `.exe` installer and follow the prompts.
   * For macOS: Mount the `.dmg` file and drag the app to Applications.
   * For Linux: Use the appropriate method for your distribution:
     ```bash
     # For .AppImage files
     chmod +x Todo-Notes-App.AppImage
     ./Todo-Notes-App.AppImage
     
     # For .deb packages on Debian/Ubuntu
     sudo dpkg -i todo-notes-app.deb
     
     # For .tar.gz archives
     tar -xzvf todo-notes-app-linux-x64.tar.gz
     cd todo-notes-app-linux-x64
     ./todo-notes-app
     ```

3. **Startup Testing**:
   * Verify the app launches correctly.
   * Check that all UI elements render properly.
   * Confirm no error messages appear in the console (press F12 in desktop app).

4. **Cross-Platform Testing**:
   * If possible, test on multiple operating systems to ensure consistent behavior.

### Troubleshooting Common Issues

* **App Won't Launch**:
  * Verify all dependencies are installed.
  * Check the console for error messages.
  * Ensure your operating system meets the minimum requirements.

* **Tasks or Notes Not Saving**:
  * Clear browser cache if using web app.
  * Check localStorage permissions.
  * Verify no other instances of the app are running.

* **Electron Packaging Issues**:
  * Make sure you have the correct version of Node.js installed.
  * Run `npm install` before packaging.
  * Check for any error messages during the packaging process.

* **Drawing Canvas Problems**:
  * Ensure your browser/environment supports HTML5 Canvas.
  * Try clearing the canvas and starting again.
  * Restart the app if undo/redo functionality stops working.

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