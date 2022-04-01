import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as memeService from "../services/memeService.js";

const renderContainer = document.getElementsByTagName('main')[0];

const allMemesPageTemplate = (memes) => html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                ${memes.length > 0 
                ? html`
                ${memes.map(meme => {

                    return html`<div class="meme">
                        <div class="card">
                                <div class="info">
                                    <p class="meme-title">${meme.title}</p>
                                    <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
                                </div>
                                <div id="data-buttons">
                                    <a class="button" href="/meme/${meme._id}">Details</a>
                                </div>
                            </div>
                        </div>`

                })}`
                : html`<p class="no-memes">No memes in database.</p>` }                
            </div>
        </section>`;

export const renderAllMemesPage = async () => {

    const memes = await memeService.getAllMemesAsync();

    render(allMemesPageTemplate(memes), renderContainer);

}