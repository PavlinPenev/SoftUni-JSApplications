import * as httpClient from "../http.js";
import page from "../../node_modules/page/page.mjs";

const baseUrl = `http://localhost:3030`;
const loginEndpoint = `users/login`;
const registerEndpoint = `users/register`;
const logoutEndpoint = `users/logout`;

export const login = async (ev) => {

    ev.preventDefault();

    const form = ev.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {

        const result = await httpClient.post(`${baseUrl}/${loginEndpoint}`, { email, password });
        sessionStorage.setItem('user', JSON.stringify(result));

        page.redirect('/');

    } else {

        alert('All fields required!');
        form.reset();

    }

}

export const register = async (ev) => {

    ev.preventDefault();

    const form = ev.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('confirm-password');

    if (email && password && repass) {

        if (password != repass) {

            alert('Passwords don\'t match!');
            form.reset();
            return;

        }

        const result = httpClient.post(`${baseUrl}/${registerEndpoint}`, { email, password });
        sessionStorage.setItem('user', JSON.stringify(result));

        page.redirect('/');

    } else {

        form.reset();
        alert('All fields required!');

    }

}

export const logout = async () => {

    const result = httpClient.get(`${baseUrl}/${logoutEndpoint}`);

    if (result) {

        sessionStorage.clear();

        page.redirect('/');

    }
}