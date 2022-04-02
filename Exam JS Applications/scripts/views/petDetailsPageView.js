import { html, render, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as petService from "../services/petService.js";

const renderContainer = document.getElementById('content');

const petDetailsPageTemplate = (pet, isCreator, petDonation, petUserDonation) => html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="./images/Shiba-Inu.png">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${petDonation * 100}$</h4>
                    </div>
                    ${sessionStorage.user 
                    ? html`
                        <div class="actionBtn">
                            ${isCreator 
                                ? html`
                                    <a href="/edit-pet/${pet._id}" class="edit">Edit</a>
                                    <a id=${pet._id} @click=${petService.deletePetAsync} href="javascript:void(0)" class="remove">Delete</a>`
                                : html`
                                    ${!petUserDonation 
                                        ? html`<a id=${pet._id} href="" @click=${petService.donatePetAsync} class="donate">Donate</a>`
                                        : nothing}`}
                        </div>`
                    : nothing}
                </div>
            </div>
        </section>`;

export const renderPetDetailsPage = async (ctx) => {

    const petId = ctx.params.id;
    const pet = await petService.getPetAsync(petId);

    let isCreator = false;
    let userId;

    if (sessionStorage.user) {
        
        isCreator = pet._ownerId == JSON.parse(sessionStorage.user)._id;
        userId = JSON.parse(sessionStorage.user)._id;

    }

    const petDonation = await petService.getPetDonationAsync(petId);

    const petUserDonation = await petService.getPetUserDonationAsync(petId, userId);


    render(petDetailsPageTemplate(pet, isCreator, petDonation, petUserDonation), renderContainer);

}