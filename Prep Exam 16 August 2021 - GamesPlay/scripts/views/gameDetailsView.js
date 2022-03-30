import { html, render, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as gamesService from "../services/gamesService.js";

const renderContainer = document.getElementById('main-content');

const gameDetailsTemplate = (game, comments, isOwner) => html`
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">
        
                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>
        
                <p class="text">
                    ${game.summary}
                </p>

                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                    ${comments.length > 0 
                    ?   html`${comments.map(comment => {

                            return html`
                            <li class="comment">
                                <p>Content: ${comment.comment}</p>
                            </li>`

                    })}`
                    : html`<p class="no-comment">No comments.</p>`}
                </div>

                ${isOwner 
                    ? html`<div class="buttons">
                        <a href="/edit-game/${game._id}" class="button">Edit</a>
                        <a id=${game._id} @click=${gamesService.deleteGameAsync} href="javascript:void(0)" class="button">Delete</a>
                    </div>` 
                    : nothing}
                </div>
                
                ${sessionStorage.user && !isOwner 
                ? html`
                    <article class="create-comment">
                        <label>Add new comment:</label>
                        <form id=${game._id} class="form" @submit=${gamesService.addCommentAsync}>
                            <textarea name="comment" placeholder="Comment......"></textarea>
                            <input class="btn submit" type="submit" value="Add Comment">
                        </form>
                    </article>`
                : nothing }
        </section>`;

export const renderGameDetailsView = async (ctx) => {

    const gameId = ctx.params.id;
    let isOwner = false;

    const [game, comments] = await Promise.all([

        gamesService.getGameDetailsAsync(gameId), 
        gamesService.getCommentsAsync(gameId)
        
    ]);

    if (sessionStorage.user) {
        
        isOwner = JSON.parse(sessionStorage.user)._id == game._ownerId;

    }

    render(gameDetailsTemplate(game, comments, isOwner), renderContainer);

}