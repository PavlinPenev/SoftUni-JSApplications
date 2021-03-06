import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const renderContainer = document.getElementById('main-content');

const registerTemplate = () => html`
    <section id="register-page" class="content auth">
        <form id="register" @submit=${authService.register}>
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter Email">
    
                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">
    
                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">
    
                <input class="btn submit" type="submit" value="Register">
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>`;

export const renderRegisterView = () => {

    render(registerTemplate(), renderContainer);

}