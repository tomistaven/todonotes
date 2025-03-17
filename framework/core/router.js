export class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', () => this.loadRoute());
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.loadRoute();
    }

    loadRoute() {
        const path = window.location.pathname;
        const view = this.routes[path] || this.routes['/404'];
        document.getElementById('app').innerHTML = "";
        document.getElementById('app').appendChild(view());
    }
}