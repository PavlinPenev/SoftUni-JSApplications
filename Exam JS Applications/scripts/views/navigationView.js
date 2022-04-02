import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const navContainer = document.getElementById('navigation');

const navigationTemplate = () => html`
        <nav>
            <section class="logo">
                <img src="./images/logo.png" alt="logo">
            </section>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                ${sessionStorage.user 
                ? html`
                    <li><a href="/create-pet">Create Postcard</a></li>
                    <li><a @click=${authService.logout} href="javascript:void(0)">Logout</a></li>`
                : html`
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>`}
            </ul>
        </nav>`;

export const renderNavigation = (ctx, next) => {

    render(navigationTemplate(), navContainer);
    next();

}