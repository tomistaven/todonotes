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
function saveNote(title, content) {
  if (!title && !content && !currentPath.length) return;
  
  const drawingData = currentPath.length ? canvas.toDataURL() : null;
  const state = notesState.getState();
  const newNote = {
    title,
    content,
    drawing: drawingData,
    date: new Date().toLocaleString()
  };
  
  notesState.setState({ 
    ...state, 
    notes: [newNote, ...state.notes],
    currentPaths: [],
    redoStack: [] 
  });
  
  // Clear inputs
  document.getElementById('note-title').value = '';
  document.getElementById('note-content').value = '';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Delete a note
function deleteNote(index) {
  const state = notesState.getState();
  const newNotes = state.notes.filter((_, i) => i !== index);
  notesState.setState({ ...state, notes: newNotes });
}

// Note Card Component
// Note Card Component
function NoteCard(note, index) {
  const actionsContainer = createElement("div", { className: "note-actions" }, [
    createElement("button", {
      className: "icon-btn",
      onClick: () => editNote(index)
    }, ["✏️ Edit"]),
    createElement("button", {
      className: "icon-btn delete-btn",
      onClick: () => deleteNote(index)
    }, ["🗑️ Delete"])
  ]);

  // Ensure flex styles are applied
  actionsContainer.style.display = "flex";
  actionsContainer.style.gap = "var(--space-sm)";

  return createElement("div", { className: "note-card" }, [
    createElement("div", { className: "note-header" }, [
      createElement("h3", {}, [note.title || "Untitled Note"]),
      createElement("small", { className: "note-date" }, [note.date])
    ]),
    note.content && createElement("p", { className: "note-content" }, [note.content]),
    note.drawing && createElement("img", {
      className: "note-drawing",
      src: note.drawing,
      alt: "Note drawing",
      onClick: () => openFullscreenDrawing(note.drawing)
    }),
    actionsContainer
  ]);
}


// Function to edit a note
function editNote(index) {
  const state = notesState.getState();
  const noteToEdit = state.notes[index];

  if (noteToEdit) {
    // Load the note data into the editor
    document.getElementById('note-title').value = noteToEdit.title;
    document.getElementById('note-content').value = noteToEdit.content;

    // If there's a drawing, load it into the canvas (optional, depending on your requirements)
    if (noteToEdit.drawing) {
      const img = new Image();
      img.src = noteToEdit.drawing;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }

    // Remove the note from the list and update the state
    const newNotes = state.notes.filter((_, i) => i !== index);
    notesState.setState({ ...state, notes: newNotes });
  }
}


// Fullscreen Drawing View
function openFullscreenDrawing(src) {
  const overlay = createElement("div", { className: "drawing-overlay" }, [
    createElement("img", { src, className: "fullscreen-drawing" }),
    createElement("button", { 
      className: "close-btn",
      onClick: () => document.body.removeChild(overlay)
    }, ["×"])
  ]);
  document.body.appendChild(overlay);
}

// Render Notes UI
export function renderNotes() {
  // Create the main container
  const container = createElement("div", { className: "notes-container" }, []);

  // Create the editor section
  const editorSection = createElement("div", { className: "notes-editor" }, []);
  
  // Create the title and content inputs
  const titleInput = createElement("input", { 
    id: "note-title",
    placeholder: "Note title",
    className: "note-title-input"
  });
  
  const contentInput = createElement("textarea", {
    id: "note-content",
    placeholder: "Write your note here...",
    className: "note-content-input",
    rows: 4
  });
  
  editorSection.appendChild(titleInput);
  editorSection.appendChild(contentInput);
  
  // Create the toolbar with explicit inline styles to ensure horizontal layout
  const toolContainer = createElement("div", { 
    className: "toolbar" 
  }, []);
  
  // Apply explicit styles to ensure horizontal layout
  toolContainer.style.display = "flex";
  toolContainer.style.flexDirection = "row";
  toolContainer.style.width = "100%";
  toolContainer.style.alignItems = "center"; // Align items vertically in the center
  
  // Create and append toolbar buttons
  const penButton = createElement("button", { 
    className: `tool-btn ${currentTool === 'pen' ? 'active' : ''}`,
    onClick: () => { 
      currentTool = "pen";
      currentColor = "#000000";
      currentLineWidth = 2;
    }
  }, ["🖊️ Pen"]);
  
  const eraserButton = createElement("button", { 
    className: `tool-btn ${currentTool === 'eraser' ? 'active' : ''}`,
    onClick: () => { 
      currentTool = "eraser";
      currentColor = "#ffffff";
      currentLineWidth = 10;
    }
  }, ["🧽 Eraser"]);
  
  // Create a wrapper for the color picker to style it like a button
  const colorPickerWrapper = createElement("div", {
    className: "tool-btn"
  }, ["🎨 Color: "]);
  
  // Set the wrapper to be styled like a button
  colorPickerWrapper.style.display = "flex";
  colorPickerWrapper.style.alignItems = "center";
  colorPickerWrapper.style.cursor = "pointer";
  
  // Create the color picker
  const colorPicker = createElement("input", { 
    type: "color",
    value: currentColor,
    onChange: (e) => { currentColor = e.target.value; }
  });
  
  // Style the color picker
  colorPicker.style.marginLeft = "8px";
  colorPicker.style.border = "none";
  colorPicker.style.padding = "0";
  colorPicker.style.background = "transparent";
  colorPicker.style.width = "24px";
  colorPicker.style.height = "24px";
  colorPicker.style.cursor = "pointer";
  
  // Add the color picker to its wrapper
  colorPickerWrapper.appendChild(colorPicker);
  
  // Append the buttons to toolbar
  toolContainer.appendChild(penButton);
  toolContainer.appendChild(eraserButton);
  toolContainer.appendChild(colorPickerWrapper);
  
  editorSection.appendChild(toolContainer);
  
  // Initialize canvas
  canvas = initCanvas();
  editorSection.appendChild(canvas);
  
  // Action buttons
  const buttonContainer = createElement("div", { className: "action-buttons" }, [
    createElement("button", { 
      className: "save-btn",
      onClick: () => {
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        saveNote(title, content);
      }
    }, ["💾 Save Note"]),
    
    createElement("button", { 
      className: "clear-btn",
      onClick: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        notesState.setState({ 
          ...notesState.getState(), 
          currentPaths: [], 
          redoStack: [] 
        });
      }
    }, ["🗑️ Clear"]),
    
    createElement("button", { onClick: undoLastStroke }, ["⏪ Undo"]),
    createElement("button", { onClick: redoLastStroke }, ["⏩ Redo"])
  ]);

  // Ensure flex styles are applied
buttonContainer.style.display = "flex";
buttonContainer.style.gap = "var(--space-sm)";

  
  editorSection.appendChild(buttonContainer);
  container.appendChild(editorSection);
  
  // Create notes list section
  const notesListSection = createElement("div", { className: "notes-list-container" }, [
    createElement("h2", {}, ["Your Notes"])
  ]);
  
  const notesGrid = createElement("div", { className: "notes-grid" }, []);
  notesListSection.appendChild(notesGrid);
  container.appendChild(notesListSection);
  
  // Function to render the notes list
  const renderNotesList = () => {
    notesGrid.innerHTML = "";
    const state = notesState.getState();
    
    if (!state.notes || state.notes.length === 0) {
      notesGrid.appendChild(
        createElement("div", { className: "empty-state" }, [
          createElement("p", {}, ["No notes yet"]),
          createElement("p", {}, ["Create your first note above!"])
        ])
      );
      return;
    }

    state.notes.forEach((note, index) => {
      notesGrid.appendChild(NoteCard(note, index));
    });
  };

  // Initial render
  renderNotesList();

  // Subscribe to state changes
  notesState.subscribe(renderNotesList);
  
  return container;
}