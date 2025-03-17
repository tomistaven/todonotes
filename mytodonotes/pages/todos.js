import { State } from "../../framework/core/state.js";
import { createElement } from "../../framework/core/dom.js";

// Initialize state for to-do items
const todoState = new State("todos", []);

// Add a new to-do item
function addTodo(text) {
    const newTodos = [...todoState.getState(), { text, completed: false }];
    todoState.setState(newTodos);
}

// Toggle the completion status of a to-do item
function toggleTodo(index) {
    const newTodos = todoState.getState().map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
    );
    todoState.setState(newTodos);
}

// Todo item component
function TodoItem({ text, completed, onToggle }) {
    const li = createElement("li", {}, [
        createElement("span", { 
            style: completed ? "text-decoration: line-through;" : "" 
        }, [text]),
        createElement("button", { onClick: onToggle }, [completed ? "Unmark" : "Complete"]),
        createElement("button", { onClick: () => {
            const todos = todoState.getState();
            const newTodos = todos.filter((todo, i) => {
                const isMatchingTodo = todo.text === text;
                return !isMatchingTodo;
            });
            todoState.setState(newTodos);
        }}, ["Delete"])
    ]);
    return li;
}

// Render the to-do list UI
export function renderTodos() {
    const container = createElement("div", {}, []);

    const input = createElement("input", { id: "todo-input", placeholder: "Enter a task" });
    const addButton = createElement("button", { onClick: () => {
        if (input.value) {
            addTodo(input.value);
            input.value = "";
        }
    }}, ["Add"]);

    const list = createElement("ul", { id: "todo-list" });

    let startIndex = 0;
    const itemsPerPage = 10;

    // Function to render the to-do list
    const renderList = () => {
        list.innerHTML = "";
        const todos = todoState.getState();
        const visibleItems = todos.slice(startIndex, startIndex + itemsPerPage).map((todo, index) => 
            TodoItem({
                text: todo.text,
                completed: todo.completed,
                onToggle: () => toggleTodo(startIndex + index)
            })
        );
        visibleItems.forEach(li => list.appendChild(li));
    };

    // Initial render
    renderList();

    // Subscribe to state changes
    todoState.subscribe(renderList);

    const loadMoreButton = createElement("button", { onClick: () => {
        startIndex += itemsPerPage;
        const todos = todoState.getState();
        if (startIndex >= todos.length) {
            startIndex = 0; // Reset to the beginning if we've reached the end
        }
        renderList();
    }}, ["Load More"]);

    container.appendChild(input);
    container.appendChild(addButton);
    container.appendChild(list);
    container.appendChild(loadMoreButton);
    return container;
}