import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as gamesService from "../services/gamesService.js";

const renderContainer = document.getElementById('main-content');

const homeTemplate = (games) => html`
<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">
    <div id="home-page">
        <h1>Latest Games</h1>
        ${games.length > 0 
        ? html`${games.map(game => {

            return html`<div class="game">
            <div class="image-wrap">
                <img src=${game.imageUrl}>
            </div>
            <h3>${game.title}</h3>
            <div class="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div class="data-buttons">
                <a href="/game/${game._id}" class="btn details-btn">Details</a>
            </div>
        </div>`;
        })}`
        : html`<p class="no-articles">No games yet</p>`}
    </div>
</section>`;

export const renderHomeView = async () => {

    const games = await gamesService.getRecentGamesAsync();

    render(homeTemplate(games), renderContainer);

}