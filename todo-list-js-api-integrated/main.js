if (!isValidUrl(config.baseUrl)) throw new Error('Base url is broken or empty.');

/**
 * @param {TaskService} taskService 
 */
const TasksComponent = (taskService) => {
    const form = document.createElement('form');
    const descriptionInput = document.createElement('input');
    descriptionInput.name = 'description'
}


class Application {
    constructor(authService, taskService) {
        /** @type {AuthService} */
        this._authService = authService;
        /** @type {TaskService} */
        this._taskService = taskService;

        this._init();
    }

    /**
     * @private
     */
    _init() {
        this._root = this._getElement('#root');
    }

    _display() {
        if (this._authService.isUserLoggedIn()) this.renderTasks();
        else this.renderAuth();
    }

    renderTasks() {
        const form = document.createElement('form');

    }

    renderAuth() {

    }


    /**
     * Gets element by selector.
     * @param {string} selector Selector.
     * @returns {HTMLElement}
     */
    _getElement(selector) {
        const element = document.querySelector(selector);

        if (!element) throw new Error(`There are no such element with ${selector} selector.`);

        return element
    }
}

const app = new Application(new AuthService(), new TaskService());