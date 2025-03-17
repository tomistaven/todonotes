import { State } from "../../framework/core/state.js";
import { createElement } from "../../framework/core/dom.js";

// Initialize state for notes
const notesState = new State("notes", { notes: [], currentPaths: [], redoStack: [] });

// Drawing functionality
let canvas, ctx;
let isDrawing = false;
let currentPath = [];
let currentTool = "pen"; // Default tool
let currentColor = "#000000"; // Default color (black)
let currentLineWidth = 2; // Default line width

function initCanvas() {
  canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 300;
  ctx = canvas.getContext('2d');
  
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  
  // Touch events
  canvas.addEventListener('touchstart', handleTouch);
  canvas.addEventListener('touchmove', handleTouch);
  canvas.addEventListener('touchend', stopDrawing);
  
  return canvas;
}

function startDrawing(e) {
  isDrawing = true;
  currentPath = [];
  const point = getPoint(e);
  currentPath.push({ ...point, color: currentColor, lineWidth: currentLineWidth, tool: currentTool });
  
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x, point.y);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentLineWidth;
  ctx.stroke();
}

function draw(e) {
  if (!isDrawing) return;
  
  const point = getPoint(e);
  currentPath.push({ ...point, color: currentColor, lineWidth: currentLineWidth, tool: currentTool });
  
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentLineWidth;
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
}

function stopDrawing() {
  if (isDrawing) {
    const state = notesState.getState();
    const currentPaths = state.currentPaths || [];
    currentPaths.push([...currentPath]);
    notesState.setState({ ...state, currentPaths });
    isDrawing = false;
  }
}

function getPoint(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function handleTouch(e) {
  e.preventDefault();
  if (e.type === 'touchstart') {
    startDrawing({
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    });
  } else if (e.type === 'touchmove') {
    draw({
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    });
  }
}

function undoLastStroke() {
  const state = notesState.getState();
  const currentPaths = state.currentPaths || [];
  if (currentPaths.length > 0) {
    const redoStack = state.redoStack || [];
    redoStack.push(currentPaths.pop());
    notesState.setState({ ...state, currentPaths, redoStack });
    redrawCanvas();
  }
}

function redoLastStroke() {
  const state = notesState.getState();
  const redoStack = state.redoStack || [];
  if (redoStack.length > 0) {
    const currentPaths = state.currentPaths || [];
    currentPaths.push(redoStack.pop());
    notesState.setState({ ...state, currentPaths, redoStack });
    redrawCanvas();
  }
}

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const state = notesState.getState();
  const currentPaths = state.currentPaths || [];
  currentPaths.forEach(path => {
    if (path.length > 0) {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach(point => {
        ctx.strokeStyle = point.color;
        ctx.lineWidth = point.lineWidth;
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }
  });
}

// Save a new note
function saveNote(title, content, drawing) {
  if (!title && !content && !drawing) return;
  
  const state = notesState.getState();
  const newNotes = [...state.notes || [], { title, content, drawing, date: new Date().toLocaleString() }];
  notesState.setState({ ...state, notes: newNotes, currentPaths: [], redoStack: [] });
}

// Delete a note
function deleteNote(index) {
  const state = notesState.getState();
  const newNotes = (state.notes || []).filter((_, i) => i !== index);
  notesState.setState({ ...state, notes: newNotes });
}

// Render the notes UI
export function renderNotes() {
  const container = createElement("div", {}, []);

  const titleInput = createElement("input", { id: "note-title", placeholder: "Title" });
  const contentInput = createElement("textarea", { id: "note-content", placeholder: "Write your note..." });
  
  // Initialize canvas
  canvas = initCanvas();
  
  // Tool selection buttons
  const toolContainer = createElement("div", { style: "display: flex; gap: 10px; margin: 10px 0;" });
  
  const penButton = createElement("button", { 
    onClick: () => { 
      currentTool = "pen"; 
      currentColor = "#000000"; // Black for pen
      currentLineWidth = 2; 
    },
    style: "background-color: #000000; color: white;"
  }, ["Pen"]);
  
  const eraserButton = createElement("button", { 
    onClick: () => { 
      currentTool = "eraser"; 
      currentColor = "#ffffff"; // White for eraser
      currentLineWidth = 10; // Thicker line for eraser
    },
    style: "background-color: #ffffff; color: black; border: 1px solid black;"
  }, ["Eraser"]);
  
  
  // Color picker
  const colorPicker = createElement("input", { 
    type: "color", 
    value: currentColor,
    onChange: (e) => { currentColor = e.target.value; }
  });

  toolContainer.appendChild(penButton);
  toolContainer.appendChild(eraserButton);
  toolContainer.appendChild(colorPicker);

  const saveButton = createElement("button", { onClick: () => {
    const drawingData = canvas.toDataURL();
    saveNote(titleInput.value, contentInput.value, drawingData);
    titleInput.value = "";
    contentInput.value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }}, ["Save Note"]);

  const buttonContainer = createElement("div", { style: "display: flex; gap: 10px; margin: 10px 0;" });
  
  const clearButton = createElement("button", { onClick: () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    notesState.setState({ ...notesState.getState(), currentPaths: [], redoStack: [] });
  }}, ["Clear Drawing"]);
  
  const undoButton = createElement("button", { onClick: undoLastStroke }, ["Undo"]);
  const redoButton = createElement("button", { onClick: redoLastStroke }, ["Redo"]);

  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(clearButton);
  buttonContainer.appendChild(undoButton);
  buttonContainer.appendChild(redoButton);

  const list = createElement("ul", { id: "notes-list" });

  // Function to render the notes list
  const renderNotesList = () => {
    list.innerHTML = "";
    const state = notesState.getState();
    (state.notes || []).forEach((note, index) => {
      const li = createElement("li", {}, [
        createElement("h3", {}, [note.title]),
        createElement("p", {}, [note.content]),
        createElement("small", {}, [`Saved: ${note.date}`]),
        note.drawing ? createElement("img", { src: note.drawing, width: 200 }) : null,
        createElement("button", { onClick: () => deleteNote(index) }, ["Delete"]),
      ]);
      list.appendChild(li);
    });
  };

  // Initial render
  renderNotesList();

  // Subscribe to state changes
  notesState.subscribe(renderNotesList);

  container.appendChild(titleInput);
  container.appendChild(contentInput);
  container.appendChild(toolContainer);
  container.appendChild(buttonContainer);
  container.appendChild(canvas);
  container.appendChild(list);
  
  return container;
}