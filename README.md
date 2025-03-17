# TO-DO and Notes App

## Overview
This is a lightweight and minimalistic frontend framework designed to simplify the process of building dynamic user interfaces. With a focus on efficiency and ease of use, this framework provides essential tools for managing state, handling events, and manipulating the DOM, making it an excellent choice for small to medium-sized web applications.

The app includes:
- A **To-Do List** for managing tasks with persistent storage.
- A **Notes App** with a drawing canvas, featuring tools like pen and eraser, along with undo/redo functionality.

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

---

## Installation
To get started, clone the repository:
```bash
git clone https://github.com/tomistaven/todonotes.git
```

## Running the App

### As a Web App
Navigate to the root directory `/todonotes` and run the Go server:
```bash
go run mytodonotes/server.go
```

Open your browser and navigate to:
```
http://localhost:8080/mytodonotes/
```

Use the To-Do List to manage tasks or the Notes section to create notes and draw on the canvas.

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
1. Download the App:
   Download the packaged app (e.g., `.AppImage`, `.tar.gz`, or `.exe`).
2. Extract the Files (if necessary):
   If the app is shared as a `.tar.gz` or `.zip` file, extract it:
   ```bash
   tar -xzvf my-todo-notes-app-linux-x64.tar.gz
   ```
3. Run the App:
   Navigate to the extracted folder and run the executable:
   ```bash
   ./my-todo-notes-app
   ```

## Features
- **State Management**: Easily manage application state with a built-in state management system that persists data across sessions.
- **Routing System**: A simple yet powerful routing system allows for seamless navigation between different views.
- **Custom DOM API**: A lightweight DOM manipulation API simplifies the creation and management of UI components.
- **To-Do App**: A fully functional to-do list with persistent storage, allowing users to add, complete, and delete tasks.
- **Notes App**: A versatile notes app with a drawing canvas, featuring tools like pen and eraser, along with undo/redo functionality.