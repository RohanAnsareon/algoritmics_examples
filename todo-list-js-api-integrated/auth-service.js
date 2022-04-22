class AuthService {
    constructor() {
        /** @type {string}  @private */
        this._token = '';
        /** @type {TokenManager} @private */
        this._tokenManager = tokenManagerSingleton.getInstance();
    }

    isUserLoggedIn() {
        return Boolean(this._tokenManager.token);
    }

    /**
     * Registers new User.
     * @param {RegisterRequest} user 
     * @returns {Promise<User>} User info and token.
     */
    async registerUser(user) {
        const url = new URL('/user/register', config.baseUrl);

        /** @type {AuthReponse} */
        const response = await fetch(url, {
            method: 'POST',
            headers: defaultHeader,
            body: JSON.stringify(user)
        }).then(r => r.json());

        this._tokenManager.token = response.token;

        return response.user;
    }

    async loginUser(email, password) {
        const url = new URL('/user/login', config.baseUrl);

        /** @type {AuthReponse} */
        const response = await fetch(url, {
            method: 'POST',
            headers: defaultHeader,
            body: JSON.stringify({ email, password })
        }).then(r => r.json());

        this._tokenManager.token = response.token;
        return response.user;
    }

    /**
     * Logs out.
     */
    async logOut() {
        const url = new URL('/user/logout', config.baseUrl);

        //#region AuthHeader
        const headers = { ...defaultHeader };
        headers.set('Authorization', `Bearer ${this._tokenManager.token}`);
        //#endregion

        await fetch(url, { headers: headers });

        this._tokenManager.clearToken();
    }
}

