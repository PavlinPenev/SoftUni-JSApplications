import { html, render, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as memeService from "../services/memeService.js";

const renderContainer = document.getElementsByTagName('main')[0];

const memeDetailsPageTemplate = (meme, isCreator) => html`
        <section id="meme-details">
            <h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${meme.description}</p>
                    ${isCreator 
                    ? html`
                        <a class="button warning" href="/edit-meme/${meme._id}">Edit</a>
                        <button id=${meme._id} @click=${memeService.deleteMemeAsync} class="button danger">Delete</button>`
                    : nothing}
                </div>
            </div>
        </section>`;

export const renderMemeDetailsPage = async (ctx) => {

    const memeId = ctx.params.id;

    const meme = await memeService.getMemeDetailsAsync(memeId);

    let isCreator = false;

    if (sessionStorage.user) {
        
        isCreator = meme._ownerId == JSON.parse(sessionStorage.user)._id;

    }

    render(memeDetailsPageTemplate(meme, isCreator), renderContainer);

}