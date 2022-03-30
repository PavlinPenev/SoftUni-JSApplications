import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const renderContainer = document.getElementById('main-content');

const loginTemplate = () => html`
    <section id="login-page" class="auth">
        <form id="login" @submit=${authService.login}>
    
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter Email">
    
                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>`;

export const renderLoginView = () => {

    render(loginTemplate(), renderContainer);

}