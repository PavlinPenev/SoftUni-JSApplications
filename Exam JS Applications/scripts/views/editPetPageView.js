import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as petService from "../services/petService.js";

const renderContainer = document.getElementById('content');

const editPetPageTemplate = (pet) => html`
        <section id="editPage">
            <form id=${pet._id} class="editForm" @submit=${petService.editPetAsync}>
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value=${pet.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value=${pet.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value=${pet.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value=${pet.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value=${pet.image}>
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>`;

export const renderEditPetPage = async (ctx) => {

    const petId = ctx.params.id;
    const pet = await petService.getPetAsync(petId);

    render(editPetPageTemplate(pet), renderContainer);

}