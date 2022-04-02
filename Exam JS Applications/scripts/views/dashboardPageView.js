import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as petService from "../services/petService.js";

const renderContainer = document.getElementById('content');

const dashboardPageTemplate = (pets) => html`
        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
                ${pets.length > 0 
                    ? html`${pets.map(pet => {

                        return html`
                        <div class="animals-board">
                            <article class="service-img">
                                <img class="animal-image-cover" src=${pet.imageUrl}>
                            </article>
                            <h2 class="name">${pet.name}</h2>
                            <h3 class="breed">${pet.breed}</h3>
                            <div class="action">
                                <a class="btn" href="/pet/${pet._id}">Details</a>
                            </div>
                        </div>`

                    })}` 
                    : html`
                    <div>
                        <p class="no-pets">No pets in dashboard</p>
                    </div>`}
            </div>
        </section>`;

export const renderDashboardPage = async () => {

    const pets = await petService.getAllPetsAsync();

    render(dashboardPageTemplate(pets), renderContainer);

}