import * as httpClient from "../http.js";
import page from "../../node_modules/page/page.mjs";
import { renderSnackbarNotification } from "../views/viewsModule.js";

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

    if (email == '' || password == '') {

        renderSnackbarNotification('All fields required!');
        form.reset();
        return;

    }

    const result = await httpClient.post(`${baseUrl}/${loginEndpoint}`, { email, password });
    sessionStorage.setItem('user', JSON.stringify(result));

    page.redirect('/');

}

export const register = async (ev) => {

    ev.preventDefault();

    const form = ev.target;
    const formData = new FormData(form);
    const username = formData.get('username')
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repeatPass');
    const gender = formData.get('gender');

    if (email == '' || password == '' || repass == '' || gender == '' || username == '') {

        renderSnackbarNotification('All fields required!');
        form.reset();
        return;

    }

    if (password != repass) {

        renderSnackbarNotification('Passwords don\'t match!');
        form.reset();
        return;

    }

    const result = httpClient.post(`${baseUrl}/${registerEndpoint}`, { username, email, password, gender });
    sessionStorage.setItem('user', JSON.stringify(result));

    page.redirect('/');
}

export const logout = async () => {

    const result = httpClient.get(`${baseUrl}/${logoutEndpoint}`);

    if (result) {

        sessionStorage.clear();

        page.redirect('/');

    }
}