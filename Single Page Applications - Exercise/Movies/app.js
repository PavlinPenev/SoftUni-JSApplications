import * as Components from "./compile-components.js";
import { render } from "../../node_modules/lit-html/lit-html.js";

window.onload = async () => {

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    render(await Components.compileHomePage(), document.querySelector('#container'));

}