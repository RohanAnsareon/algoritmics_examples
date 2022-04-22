class TaskService {
    constructor() {
        /** @type {TokenManager} */
        this._tokenManager = tokenManagerSingleton.getInstance();
    }

    /**
     * Gets all tasks.
     * @returns {Promise<Task[]>}
     */
    async getAll() {
        const url = new URL('/task', config.baseUrl);

        const headers = { ...defaultHeader };
        headers.set('Authorization', `Bearer ${this._tokenManager.token}`);

        /** @type {{count: number, data: Task[]}} */
        const response = await fetch(url, { headers }).then(r => r.json());
        return response.data;
    }

    /**
     * Adds new task.
     * @param {string} description 
     */
    async addTask(description) {
        const url = new URL('/task', config.baseUrl);

        const headers = { ...defaultHeader };
        headers.set('Authorization', `Bearer ${this._tokenManager.token}`);

        await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({ description })
        });
    }

    /**
     * Deletes task by identifier.
     * @param {string} id 
     */
    async deleteTask(id) {
        const url = new URL(`/task${id}`, config.baseUrl);

        const headers = { ...defaultHeader };
        headers.set('Authorization', `Bearer ${this._tokenManager.token}`);

        await fetch(url, { method: 'DELETE', headers });
    }
}