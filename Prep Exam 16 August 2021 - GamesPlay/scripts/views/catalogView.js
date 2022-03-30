import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as gamesService from "../services/gamesService.js";

const renderContainer = document.getElementById('main-content');

const catalogTemplate = (games) => html`
        <section id="catalog-page">
            <h1>All Games</h1>
            ${games.length > 0 
            ? html`${games.map(game => {

                return html`<div class="allGames">
                                <div class="allGames-info">
                                    <img src=${game.imageUrl}>
                                    <h6>${game.category}</h6>
                                    <h2>${game.title}</h2>
                                    <a href="/game/${game._id}" class="details-button">Details</a>
                                </div>
                            </div>`;
            })}`
            : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>`;

export const renderCatalogView = async () => {

    const games = await gamesService.getAllGamesAsync();

    render(catalogTemplate(games), renderContainer);

}