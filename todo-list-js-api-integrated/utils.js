const TOKEN = 'TOKEN';

/**
 * Checks URL validity.
 * @param {string} url URL.
 * @returns True if URL is valid, else false.
 */
function isValidUrl(url) {
    try {
        new URL(url);
    } catch (error) {
        return false
    }
    return true;
}

const defaultHeader = new Headers({
    'Content-Type': 'application/json'
});

class TokenManager {
    /** @type {string} @private */
    _token;

    get token() {
        if (this._token) {
            return this._token;
        } else {
            const tkn = localStorage.getItem(TOKEN);
            if (tkn) {
                this._token = tkn;
                return tkn;
            };
            throw new Error('Can not get token.');
        }
    }

    set token(token) {
        if (token) {
            localStorage.setItem(TOKEN, token);
            this._token = token;
        } throw new Error('Token is empty, use clearToken method for clear token.');
    }

    clearToken() {
        localStorage.removeItem(TOKEN);
        this._token = undefined;
    }
}

const tokenManagerSingleton = (function () {
    let instance;

    return {
        getInstance() {
            if (!instance) {
                instance = new TokenManager
            }
            return instance;
        }
    }
})();