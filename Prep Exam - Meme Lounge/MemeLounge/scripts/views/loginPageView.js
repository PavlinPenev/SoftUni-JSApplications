import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const renderContainer = document.getElementsByTagName('main')[0];

const loginPageTemplate = () => html`
        <section id="login">
            <form id="login-form" @submit=${authService.login}>
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>`;

export const renderLoginPage = () => {

    render(loginPageTemplate(), renderContainer);

}