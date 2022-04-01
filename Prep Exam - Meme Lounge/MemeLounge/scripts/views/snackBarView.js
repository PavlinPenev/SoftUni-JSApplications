import { html, render } from "../../node_modules/lit-html/lit-html.js";

const renderContainer = document.getElementById('notifications');

const snackbarTemplate = (message) => html`
            <div id="errorBox" class="notification">
                <span>${message}</span>
            </div>`;

export const renderSnackbarNotification = (message) => {

    render(snackbarTemplate(message), renderContainer);
    setTimeout(() => renderContainer.innerHTML = '', 3000);

}