import { Observable, of } from "rxjs";

export interface Todo {
    id: number;
    title: string;
}

class TodoService {
    private _todos: Todo[] = [];
    public notify?: Function;

    constructor(todos: Todo[] = []) {
        this._todos = todos;
    }

    getTodos(): Todo[] {
        return this._todos;
    }

    addTodo(title: string) {
        this._todos = [...this._todos, { id: this.lastId(), title }];
        if (this.notify) this.notify();
    }

    deleteTodo(id: number) {
        this._todos = [...this._todos].filter(t => t.id !== id);
        if (this.notify) this.notify();
    }

    sort(direction: boolean) {
        this._todos = [...this._todos].sort((t1, t2) => (direction && (t1 > t2)) ? 1 : -1)
        if (this.notify) this.notify();
    }

    private lastId(): number {
        return this._todos.length ? this._todos[this._todos.length - 1].id + 1 : 1;
    }
}

export default TodoService;