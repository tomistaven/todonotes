import { createElement } from "../../framework/core/dom.js";

export function render404() {
  return createElement("div", { className: "page-404" }, [
    createElement("h1", {}, ["404 - Page Not Found"]),
    createElement("p", {}, ["The page you are looking for does not exist."]),
    createElement("button", { onClick: () => router.navigate("/") }, ["Go Home"]),
  ]);
}