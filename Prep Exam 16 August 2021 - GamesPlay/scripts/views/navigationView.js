import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

    const navContainer = document.getElementById('navigation-header');

    const navigationTemplate = () => html`
    <h1><a class="home" href="/">GamesPlay</a></h1>
    <nav>
        <a href="/all-games">All games</a>
        ${sessionStorage.user 
            ? html`<div id="user">
                    <a href="/create-game">Create Game</a>
                    <a @click=${authService.logout} href="javascript:void(0)">Logout</a>
                </div>`
            : html`<div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>` }
    </nav>`;

export const renderNavigation = (ctx, next) => {

    render(navigationTemplate(), navContainer);
    next();

}