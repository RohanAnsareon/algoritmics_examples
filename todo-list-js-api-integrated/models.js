class RegisterRequest {
    /** @type {string} */
    name;
    /** @type {string} */
    email;
    /** @type {string} */
    password;
    /** @type {number} */
    age;
}

class AuthReponse {
    /** @type {User} */
    user;
    /** @type {string} */
    token;
}

class User {
    /** @type {number} */
    age;
    /** @type {string} */
    _id;
    /** @type {string} */
    name;
    /** @type {string} */
    email;
    /** @type {string} */
    createdAt;
    /** @type {string} */
    updatedAt;
}

class Task {
    /** @type {boolean} */
    completed;
    /** @type {string} */
    _id;
    /** @type {string} */
    description;
    /** @type {string} */
    owner;
    /** @type {string} */
    createdAt;
    /** @type {string} */
    updatedAt;
}