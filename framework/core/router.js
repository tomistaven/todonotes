// framework/core/router.js
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
      let path = window.location.pathname;
      // Normalize the path (remove trailing slashes)
      if (path.endsWith("/") && path !== "/") {
        path = path.slice(0, -1);
      }
      const view = this.routes[path] || this.routes['/404']; // Fallback to 404 if route not found
      if (typeof view !== 'function') {
        console.error(`No route found for path: ${path}`);
        return;
      }
      document.getElementById('app').innerHTML = "";
      document.getElementById('app').appendChild(view());
    }
  }