import AppComponent from "./components/app-component";
import { getElement, insertElementInto } from "./utils";
import './style.scss';

const root = getElement('#root');

if (root) {
    insertElementInto(root, AppComponent());
} else {
    console.error('There is not root element, check index.html file.');
}
