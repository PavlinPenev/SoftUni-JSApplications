import { render } from "../../node_modules/lit-html/lit-html.js";
import * as Components from "./compile-components.js";
import * as Routes from "./router.js";

const baseUrl = `http://localhost:3030`;

//Auth
const registerUrl = `${baseUrl}/users/register`;
const loginUrl = `${baseUrl}/users/login`;
const logoutUrl = `${baseUrl}/users/logout`;

export const logout = async (ev) => {

    ev.preventDefault();

    const response = await fetch(logoutUrl, {

        headers: {

            "X-Authorization": JSON.parse(sessionStorage.user).accessToken

        }

    })

    if (response.ok) {

        sessionStorage.clear();

    }

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    Routes.navigateToLoginPage();

}

export const login = async (ev) => {

    ev.preventDefault();

    const form = document.getElementsByTagName('form')[0];

    const formData = new FormData(form);

    const requestBody = {

        email: formData.get('email'),
        password: formData.get('password')

    }

    const loginResponse = await fetch(loginUrl, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json"

        },
        body: JSON.stringify(requestBody)

    })

    if (!loginResponse.ok) {

        alert('Invalid credentials!');

        form.reset();

        return;

    }

    const loginResult = await loginResponse.json();

    sessionStorage.setItem('user', JSON.stringify(loginResult));

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    Routes.navigateToHome();

}

export const register = async (ev) => {

    ev.preventDefault();

    const form = document.getElementsByTagName('form')[0];

    const formData = new FormData(form);

    if (formData.get('password') !== formData.get('repeatPassword')) {

        alert('Passwords don\'t match!');
        form.reset();
        return;

    }

    const requestBody = {

        email: formData.get('email'),
        password: formData.get('password')

    }

    const registerResponse = await fetch(registerUrl, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json"

        },
        body: JSON.stringify(requestBody)

    });

    const registerResult = await registerResponse.json();

    sessionStorage.setItem('user', JSON.stringify(registerResult));

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    Routes.navigateToHome();

}

//Data
const moviesEndpoint = `${baseUrl}/data/movies`;
const likeEndpoint = `${baseUrl}/data/likes`;

export const getMoviesAsync = async () => {

    const moviesResponse = await fetch(moviesEndpoint);

    return moviesResponse.json();

}

export const getMovieAsync = async (id) => {

    const movieResponse = await fetch(`${moviesEndpoint}/${id}`);

    return movieResponse.json();

}

export const addMovieAsync = async (ev) => {

    ev.preventDefault();

    const form = document.getElementsByTagName('form')[0];

    const formData = new FormData(form);

    const requestBody = {

        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')

    }

    await fetch(moviesEndpoint, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json",
            "X-Authorization": JSON.parse(sessionStorage.user).accessToken

        },
        body: JSON.stringify(requestBody)

    })

    form.reset();

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    Routes.navigateToHome();

}

export const editMovieAsync = async (ev) => {

    ev.preventDefault();

    const movieId = ev.target.id;

    const formData = new FormData(ev.target);

    const requestBody = {

        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')

    }

    await fetch(`${moviesEndpoint}/${movieId}`, {

        method: 'PUT',
        headers: {

            "Content-Type": "application/json",
            "X-Authorization": JSON.parse(sessionStorage.user).accessToken

        },
        body: JSON.stringify(requestBody)

    })

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    Routes.navigateToMovieDetailsPage(ev);

}

export const deleteMovieAsync = async (ev) => {

    await fetch(`${moviesEndpoint}/${ev.target.id}`, {

        method: 'DELETE',
        headers: {

            "Content-Type": "application/json",
            "X-Authorization": JSON.parse(sessionStorage.user).accessToken

        }

    })

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    Routes.navigateToHome();

}

export const getMovieLikesAsync = async () => {

    const likesResponse = await fetch(likeEndpoint)

    return likesResponse.json();

}

export const likeMovieAsync = async (ev) => {

    const movieId = ev.target.id;
    console.log(movieId);

    await fetch(likeEndpoint, {

        method: 'POST',
        headers: {

            "Content-Type": "application/json",
            "X-Authorization": JSON.parse(sessionStorage.user).accessToken

        },
        body: JSON.stringify({ movieId })

    })

    render(Components.compileNavigation(), document.querySelector('#navigation'));
    Routes.navigateToMovieDetailsPage(ev);

}