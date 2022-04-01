import * as httpClient from "../http.js";
import page from "../../node_modules/page/page.mjs";
import { renderSnackbarNotification } from "../views/viewsModule.js";

const baseUrl = `http://localhost:3030`;
const memeEndpoint = `data/memes`;

const snackbarContainer = document.getElementById('snackbar');

export const createMemeAsync = async (ev) => {

    ev.preventDefault();

    const form = ev.target;
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');

    const requestBody = {

        title,
        description,
        imageUrl

    }

    if (title == '' || description == '' || imageUrl == '') {

        renderSnackbarNotification('All fields are required!');
        form.reset();
        return;

    }

    const result = await httpClient.post(`${baseUrl}/${memeEndpoint}`, requestBody);

    if (result) {

        page.redirect('/all-memes');

    }

}

export const getAllMemesAsync = async () => {

    const result = await httpClient.get(`${baseUrl}/${memeEndpoint}?sortBy=_createdOn%20desc`);

    return result;

}

export const getUserMemesAsync = async (userId) => {

    const result = await httpClient.get(`${baseUrl}/${memeEndpoint}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)

    return result;

}

export const getMemeDetailsAsync = async (memeId) => {

    const result = await httpClient.get(`${baseUrl}/${memeEndpoint}/${memeId}`);

    return result;

}

export const editMemeAsync = async (ev) => {

    ev.preventDefault();

    const memeId = ev.target.dataset.id;

    const form = ev.target;
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');

    const requestBody = {

        title,
        description,
        imageUrl

    }

    if (title == '' || description == '' || imageUrl == '') {

        renderSnackbarNotification('All fields are required!');
        form.reset();
        return;

    }

    const result = await httpClient.put(`${baseUrl}/${memeEndpoint}/${memeId}`, requestBody);

    if (result) {

        page.redirect(`/meme/${memeId}`);

    }

}

export const deleteMemeAsync = async (ev) => {

    const memeId = ev.target.id;

    if (confirm('Are you sure you want to delete this meme!?!? :O')) {

        await httpClient.delete(`${baseUrl}/${memeEndpoint}/${memeId}`);

        page.redirect('/all-memes');

    }

}