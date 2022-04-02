import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const renderContainer = document.getElementById('content');

const registerPageTemplate = () => html`
        <section id="registerPage">
            <form class="registerForm" @submit=${authService.register}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>
        
                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>
        
                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>
        
                <button class="btn" type="submit">Register</button>
        
                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>`;

export const renderRegisterPage = () => {

    render(registerPageTemplate(), renderContainer);

}