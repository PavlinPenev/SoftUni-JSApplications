import * as httpClient from "../http.js";
import page from "../../node_modules/page/page.mjs";

const baseUrl = `http://localhost:3030`;
const petsEndpoint = `data/pets`;
const donationEndpoint = `data/donation`;

export const getAllPetsAsync = async () => {

    const result = await httpClient.get(`${baseUrl}/${petsEndpoint}?sortBy=_createdOn%20desc&distinct=name`);

    return result;

}

export const createPetAsync = async (ev) => {

    ev.preventDefault();

    const form = ev.target;
    const formData = new FormData(form);

    const name = formData.get('name');
    const breed = formData.get('breed');
    const age = formData.get('age');
    const weight = formData.get('weight');
    const image = formData.get('image');

    if (name == ''
        || breed == ''
        || age == ''
        || weight == ''
        || image == '') {

        alert('All fields are required!');
        form.reset();
        return;

    }

    const requestBody = {

        name,
        breed,
        age,
        weight,
        image

    }

    const request = await httpClient.post(`${baseUrl}/${petsEndpoint}`, requestBody);

    page.redirect('/');

}

export const getPetAsync = async (petId) => {

    const result = await httpClient.get(`${baseUrl}/${petsEndpoint}/${petId}`);

    return result;

}

export const editPetAsync = async (ev) => {

    ev.preventDefault();

    const petId = ev.target.id;

    const form = ev.target;
    const formData = new FormData(form);

    const name = formData.get('name');
    const breed = formData.get('breed');
    const age = formData.get('age');
    const weight = formData.get('weight');
    const image = formData.get('image');

    if (name == ''
        || breed == ''
        || age == ''
        || weight == ''
        || image == '') {

        alert('All fields are required!');
        form.reset();
        return;

    }

    const requestBody = {

        name,
        breed,
        age,
        weight,
        image

    }

    const request = await httpClient.put(`${baseUrl}/${petsEndpoint}/${petId}`, requestBody);

    page.redirect(`/pet/${petId}`);

}

export const deletePetAsync = async (ev) => {

    const petId = ev.target.id;

    if (confirm('Are you sure you want to delete this pet!?')) {

        await httpClient.delete(`${baseUrl}/${petsEndpoint}/${petId}`);

        page.redirect('/');

    }

}

export const donatePetAsync = async (ev) => {

    const petId = ev.target.id;

    const requestBody = {

        petId

    }

    await httpClient.post(`${baseUrl}/${donationEndpoint}`, requestBody);

    page.redirect(`/pet/${petId}`);

}

export const getPetDonationAsync = async (petId) => {

    const result = await httpClient.get(`${baseUrl}/${donationEndpoint}?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);

    return result;

}

export const getPetUserDonationAsync = async (petId, userId) => {

    const result = await httpClient.get(`${baseUrl}/${donationEndpoint}?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

    return result;

}