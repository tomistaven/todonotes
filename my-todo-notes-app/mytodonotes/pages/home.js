import { createElement } from "../../framework/core/dom.js";

export function renderHome() {
  const container = createElement("div", { className: "home" }, [
    createElement("h1", {}, ["Welcome to dot-js!"]),
    createElement("p", {}, ["A minimalistic frontend framework for building dynamic web apps."]),
    createElement("nav", {}, [
      createElement("button", { 
        onClick: () => router.navigate("/todos"),
        className: "nav-button"
      }, ["To-Do List"]),
      createElement("button", { 
        onClick: () => router.navigate("/notes"),
        className: "nav-button"
      }, ["Notes"]),
    ]),
  ]);

  return container;
}