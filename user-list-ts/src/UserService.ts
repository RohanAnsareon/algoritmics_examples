import User from "./User";

export default class UserService {
    constructor(private users: User[] = []) { }

    addUser(name: string) {
        this.users.push(new User(this.lastIndex(), name));
    }

    removeUser(id: number) {
        const userIndex = this.getUserIndex(id);

        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }

    editUser(id: number, name: string) {
        const userIndex = this.getUserIndex(id);

        if (userIndex !== -1) {
            this.users[userIndex].rename(name);
        }
    }

    getAllUsers(): User[] {
        return this.users;
    }

    private getUserIndex(id: number) {
        if (this.users) {
            return this.users.findIndex(u => u.id === id);
        } else return -1;
    }

    private lastIndex(): number {
        return this.users?.length ? this.users[this.users.length - 1].id + 1 : 1;
    }
}
