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
        const app = document.getElementById('app');
        
        // Clear existing content
        app.innerHTML = '';
        
        // Handle both string and DOM element returns
        const content = view();
        if (typeof content === 'string') {
            app.innerHTML = content;
        } else {
            app.appendChild(content);
        }
    }
}