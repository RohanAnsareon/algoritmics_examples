export const getElement = (selector: string): HTMLElement => {
    let element = document.querySelector(selector);

    if (element) {
        return element as HTMLElement;
    } else {
        throw new Error(`There are no such element: ${selector}`);
    }
}

export const insertElementInto = (parent: HTMLElement, element: string) => {
    parent.innerHTML = element;
}