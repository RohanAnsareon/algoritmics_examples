export default class User {
    constructor(public id: number, public name: string) { }

    rename(name: string) {
        this.name = name;
    }
}