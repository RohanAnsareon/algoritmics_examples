export const getElement = (selector: string): HTMLElement | null => {
    return document.querySelector(selector);
}

export const insertElementInto = (parent: HTMLElement, element: string) => {
    parent.innerHTML = element;
}