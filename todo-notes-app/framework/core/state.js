export class State {
    constructor(key, initialState) {
        this.key = key;
        this.state = JSON.parse(localStorage.getItem(key)) || initialState;
        this.listeners = new Set();
    }

    subscribe(listener) {
        this.listeners.add(listener);
    }

    setState(newState) {
        this.state = newState;
        localStorage.setItem(this.key, JSON.stringify(newState));
        this.listeners.forEach(listener => listener(this.state));
    }

    getState() {
        return this.state;
    }
}