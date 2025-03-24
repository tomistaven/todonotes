import { createElement } from "../../framework/core/dom.js";

export function renderHome() {
    return createElement("div", { className: "home" }, [
        createElement("h1", { className: "home-title" }, ["Productivity Dashboard"]),
        createElement("p", { className: "home-subtitle" }, [
            "Select an option from the sidebar to begin"
        ])
    ]);
}