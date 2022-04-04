import './style.scss';
import UserService from './UserService';

class App {
    private form?: HTMLFormElement;
    private userList?: HTMLElement;

    constructor(private userService: UserService) {
        this.init();
    }

    init() {
        this.form = this.getElement('#command-form') as HTMLFormElement;
        this.userList = this.getElement('#user-list') as HTMLElement;

        this.form.addEventListener('submit', e => this.handleSubmit(e));
    }

    private handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);
        const command = formData.get('command');

        form.reset();

        this.executeCommand(command as string);

        this.showUsers();
    }

    private executeCommand(command: string) {
        const commandSplitted = command.split(' ');

        switch (commandSplitted[0]) {
            case 'create':
                this.userService.addUser(commandSplitted[1]);
                break;
            case 'remove':
                this.userService.removeUser(+commandSplitted[1]);
                break;
            case 'rename':
                this.userService.editUser(+commandSplitted[1], commandSplitted[2]);
                break;
        }
    }

    private showUsers() {
        if (this.userList) {
            this.userList.innerHTML = this.userService.getAllUsers().map(u => `<tr><td>${u.id}</td>\n<td>${u.name}</td></tr>`).join('\n');
        }
    }

    private getElement(query: string) {
        return document.querySelector(query);
    }
}

const app = new App(new UserService());