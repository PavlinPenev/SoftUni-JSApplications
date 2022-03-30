import * as httpClient from "../http.js";
import page from "../../node_modules/page/page.mjs";

const baseUrl = `http://localhost:3030`;
const gamesEndpoint = `data/games`;
const getGamesEndpoint = `${gamesEndpoint}?sortBy=_createdOn%20desc`;
const getRecentGamesEndpoint = `${gamesEndpoint}?sortBy=_createdOn%20desc&distinct=category`;
const commentsEndpoing = `data/comments`;

export const getAllGamesAsync = async () => {

    const result = await httpClient.get(`${baseUrl}/${getGamesEndpoint}`);

    return result;

}

export const getRecentGamesAsync = async () => {

    const result = await httpClient.get(`${baseUrl}/${getRecentGamesEndpoint}`);

    return result;

}

export const createGameAsync = async (ev) => {

    ev.preventDefault();

    const form = ev.target;
    const formData = new FormData(form);

    const title = formData.get('title');
    const category = formData.get('category');
    const maxLevel = formData.get('maxLevel');
    const imageUrl = formData.get('imageUrl');
    const summary = formData.get('summary');

    const fieldsPopulated = title && category && maxLevel && imageUrl && summary;

    const requestBody = {

        title,
        category,
        maxLevel,
        imageUrl,
        summary

    }

    if (fieldsPopulated) {

        const response = await httpClient.post(`${baseUrl}/${gamesEndpoint}`, requestBody);

        page.redirect('/');

    } else {

        alert('All fields are required!');
        form.reset();

    }

}

export const getGameDetailsAsync = async (gameId) => {

    const result = await httpClient.get(`${baseUrl}/${gamesEndpoint}/${gameId}`);

    return result;

}

export const editGameAsync = async (ev) => {

    ev.preventDefault();

    const gameId = ev.target.dataset.id;

    const form = ev.target;
    const formData = new FormData(form);

    const title = formData.get('title');
    const category = formData.get('category');
    const maxLevel = formData.get('maxLevel');
    const imageUrl = formData.get('imageUrl');
    const summary = formData.get('summary');

    const fieldsPopulated = title && category && maxLevel && imageUrl && summary;

    const requestBody = {

        title,
        category,
        maxLevel,
        imageUrl,
        summary

    }

    if (fieldsPopulated) {

        const response = await httpClient.put(`${baseUrl}/${gamesEndpoint}/${gameId}`, requestBody);

        page.redirect(`/game/${gameId}`);

    } else {

        alert('All fields are required!');

    }

}

export const deleteGameAsync = async (ev) => {

    const gameId = ev.target.id;

    if (confirm('Are you sure you want to delete this game?!')) {

        await httpClient.delete(`${baseUrl}/${gamesEndpoint}/${gameId}`);

        page.redirect('/');
    }

}

export const getCommentsAsync = async (gameId) => {

    const commentsEndpoint = `${baseUrl}/data/comments?where=gameId%3D%22${gameId}%22`;

    const result = await httpClient.get(commentsEndpoint);

    return result;

}

export const addCommentAsync = async (ev) => {

    ev.preventDefault();

    const gameId = ev.target.id;

    const form = ev.target;
    const formData = new FormData(form);

    const comment = formData.get('comment');

    const requestBody = {

        gameId,
        comment

    }

    const result = await httpClient.post(`${baseUrl}/${commentsEndpoing}`, requestBody);

    page.redirect(`/game/${gameId}`);

}