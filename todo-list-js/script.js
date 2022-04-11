/**
 * Todos keyword for manipulating with storage.
 * @constant
 * @readonly
 */
const TODOS = 'TODOS';

/**
 * Application class that controlls application workflow.
 */
class Application {
    /** 
     * @private
     * @readonly
     * @type {HTMLLIElement}
     */
    _todoList;

    /**
     * @private
     * @readonly
     * @type {HTMLDivElement}
     */
    _alertBlock;

    /**
     * @private
     * @readonly
     * @type {HTMLButtonElement}
     */
    _addBtn;

    /**
     * @private
     * @readonly
     * @type {HTMLButtonElement}
     */
    _sortBtn;

    /**
     * Sort direction.
     * @private
     * @type {boolean}
     */
    _sortDirection = false;

    /**
     * @private
     * @readonly
     * @type {TodoService} Todo service.
     */
    _todoService;

    constructor(todoService) {
        this._todoService = todoService;
        this._todoList = this._getElement('#todo-list');
        this._alertBlock = this._getElement('#alert-block');
        this._addBtn = this._getElement('#add-btn');
        this._sortBtn = this._getElement('#sort-btn');

        this._addBtn.addEventListener('click', e => this._handleAdd());
        this._sortBtn.addEventListener('click', e => this._handleSort());
        this._displayTodos();
    }

    /**
     * Todos.
     * @private
     */
    get todos() { return this._todoService.getTodos(); }

    /**
     * Displays todos.
     * @private
     */
    _displayTodos() {
        const todos = this.todos;

        this._todoList.innerHTML = todos?.length ? '' : '<div class="fs-1 text-center text-muted text-nowrap bd-highlight">There are no elements yet...</div>';

        todos.forEach(t => {
            const listItem = document.createElement('li');

            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'input-group');

            //#region Creating todo input.
            const input = document.createElement('input');
            input.placeholder = 'Enter todo title.';
            input.value = t.title;
            input.classList.add('form-control');
            input.addEventListener('change', e => this._handleEdit(t.id, e.target.value));

            listItem.append(input);
            //#endregion

            //#region Creating delete button.
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-outline-danger');
            deleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            `;
            deleteBtn.addEventListener('click', e => this._handleDelete(t.id));

            listItem.append(deleteBtn);
            //#endregion

            this._todoList.append(listItem);
        });
    }

    /**
     * Todo add handler.
     * @private
     */
    _handleAdd() {
        try {
            this._todoService.addTodo();
            this._displayTodos();
        } catch (error) {
            this._showError(error.message);
        }
    }

    /**
     * Todo edit handler.
     * @param {number} id Todo identifier.
     * @param {string} title Title.
     * @private
     */
    _handleEdit(id, title) {
        try {
            this._todoService.editTodo(id, title);
            this._displayTodos();
        } catch (error) {
            this._showError(error.message);
        }
    }

    /**
     * Todo delete handler.
     * @param {number} id Todo identifier.
     * @private
     */
    _handleDelete(id) {
        this._todoService.deleteTodo(id);
        this._displayTodos();
    }

    /**
     * Todo sort handler.
     * @private
     */
    _handleSort() {
        this._todoService.sortTodos(this._sortDirection);
        this._sortDirection = !this._sortDirection;
        this._sortBtn.innerHTML = (!this._sortDirection ?
            `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
                <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
        `: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
        `) + 'Sort';
        this._displayTodos();
    }

    /**
     * Shows error message.
     * @param {string} message Error message.
     * @private
     */
    _showError(message) {
        // console.log(message);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

        this._alertBlock.append(wrapper);

        if (this._alertBlock.childElementCount > 3) {
            this._alertBlock.firstChild.remove();
        }

        setTimeout(() => {
            wrapper.remove();
        }, 5000, this);

        this._displayTodos();
    }

    /**
     * Gets element by selector.
     * @param {string} selector Element selector for getting element from document.
     * @private
     * @throws Throws error if there are no element with given selector.
     * @returns {HTMLElement} HTML element.
     */
    _getElement(selector) {
        const element = document.querySelector(selector);

        if (element) return element;
        throw new Error(`There are no such element for ${selector} selector.`);
    }
}

/**
 * Service for manage Todos.
 */
class TodoService {
    /**
     * Todo's collection
     * @private
     * @type {{id: number, title: string}[]}
     */
    _todos;

    /**
     * Creates todo service.
     * @param {{id: number, title: string}[]} todos If passed, todos from storage will be combined with passed todos.
     */
    constructor(todos = []) {
        this._todos = todos;
        this._init();
    }

    /**
     * Initializes todos.
     * @private
     */
    _init() {
        /**
         * @type {{id: number, title: string}[]}
         */
        const todos = JSON.parse(localStorage.getItem(TODOS) || '[]');

        this._todos = [...this._todos, ...todos];
    }

    /**
     * Commits todos into storage.
     * @private
     */
    _commit() {
        localStorage.setItem(TODOS, JSON.stringify(this._todos));
    }

    /**
     * Gets all todos.
     * @returns {{id: number, title: string}[]} Todo list.
     */
    getTodos() {
        return [...this._todos];
    }

    /**
     * Adds new todo by title.
     * @param {string?} title Todo's title.
     * @returns {{id: number, title: string}} Added todo.
     * @throws Throws error if there is empty todo in list.
     */
    addTodo(title = '') {
        if (!this._todos.some(t => !t.title)) {
            const todo = { id: this._generateId(), title };
            this._todos = [todo, ...this._todos];
            this._commit();
            return todo;
        }
        throw new Error('There is empty element in todo list');
    }

    /**
     * Deletes todo by id.
     * @param {number} id Todo's id for delete.
     * @returns {number} Todo's array length.
     */
    deleteTodo(id) {
        this._todos = this._todos.filter(t => t.id !== id);
        this._commit();
        return this._todos.length;
    }


    /**
     * Edits todo by id.
     * @param {number} id Todo's id.
     * @param {string} title Title.
     * @throws Throws error when title argument is empty.
     */
    editTodo(id, title) {
        if (title) {
            const todos = [...this._todos];
            todos[this._getIndex(id)].title = title;
            this._todos = todos;
            this._commit();
        } else {
            throw new Error('You can not change title to empty, for delete element, click delete button.');
        }
    }

    /**
     * Sorts array depends on direction parameter.
     * @param {boolean} direction If true array will be sorted in ascending order, otherwise in descending.
     */
    sortTodos(direction) {
        let todos = [...this._todos].filter(t => t.title).sort((t1, t2) => t1.title.toUpperCase() > t2.title.toUpperCase() ? 1 : -1);

        if (!direction) {
            // Sort then reverse method of sorting is preferable method of sorting with higher performance. 
            // I just googled it now))
            // So it is okay, use it.
            todos.reverse();
        }

        this._todos = todos;

        this._commit();
    }

    /**
     * Generates next available id or 1 if todo array is empty.
     * @private
     * @returns {number} Id.
     */
    _generateId() {
        return this._todos?.length ? (this._todos[0].id + 1) : 1;
    }

    /**
     * Gets index of todo in "todo" array.
     * @private
     * @param {number} id Todo id.
     * @throws Throws error when there are no todo with given id.
     * @returns Index of todo in "todos" array.
     */
    _getIndex(id) {
        const index = this._todos.findIndex(t => t.id === id);

        if (index !== -1) {
            return index;
        }

        throw new Error(`There are no such todo with ${id} id.`)
    }
}

const app = new Application(new TodoService());