import TodoService, { Todo } from "./todo-service";
import { getElement } from "./utils";


class Application {
    private _todos: Todo[] = []

    private todoForm: HTMLFormElement;
    private todoList: HTMLElement;
    private sortBtn: HTMLButtonElement;
    private sortDirection: boolean = false;

    constructor(private todoService: TodoService) {
        this.todoForm = getElement('#todo-form') as HTMLFormElement;
        this.todoList = getElement('#todo-list');
        this.sortBtn = getElement('#sort-btn') as HTMLButtonElement;

        this.todoForm.addEventListener('submit', (e: SubmitEvent) => this.handleSubmit(e));
        this.sortBtn.addEventListener('click', _ => this.handleSort())

        this.init();
    }

    init() {
        this.todoService.notify = () => {
            this._todos = this.todoService.getTodos();
            this.displayTodos();
        };
    }

    private displayTodos() {
        this.todoList.innerHTML = '';

        const items = this._todos.forEach(t => {
            const listItem = document.createElement('li');
            listItem.innerHTML = t.title;

            const deleteBtn = document.createElement('button');
            deleteBtn.addEventListener('click', e => this.handleDelete(t.id));
            deleteBtn.innerHTML = 'X';

            listItem.append(deleteBtn);

            this.todoList.append(listItem);
        });

    }

    handleDelete(id: number) {
        this.todoService.deleteTodo(id);
    }

    handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(this.todoForm);
        const title = formData.get('title');

        if (title) {
            this.todoService.addTodo(title as string);
        }

        this.todoForm.reset();
    }

    handleSort() {
        this.sortBtn.disabled = true;
        this.todoService.sort(this.sortDirection);
        this.sortDirection = !this.sortDirection;
        this.sortBtn.disabled = false;
        this.sortBtn.innerHTML = (`Sort ${this.sortDirection ? '^' : '∨'}`);
    }
}

const app = new Application(new TodoService());