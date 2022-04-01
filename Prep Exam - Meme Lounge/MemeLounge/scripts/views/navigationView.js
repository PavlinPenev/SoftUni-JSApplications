import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const navContainer = document.getElementsByTagName('nav')[0];

const navigationTemplate = () => html`
            <a href="/all-memes">All Memes</a>
            ${sessionStorage.user 
            ? html`<div class="user">
                        <a href="/create-meme">Create Meme</a>
                        <div class="profile">
                            <span>Welcome, ${JSON.parse(sessionStorage.user).email}</span>
                            <a href="/my-profile">My Profile</a>
                            <a @click=${authService.logout} href="javascript:void(0)">Logout</a>
                        </div>
                    </div>`
            : html`<div class="guest">
                        <div class="profile">
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                        </div>
                        <a href="/">Home Page</a>
                    </div>`}
            `;
export const renderNavigation = (ctx, next) => {

    render(navigationTemplate(), navContainer);
    next();

}