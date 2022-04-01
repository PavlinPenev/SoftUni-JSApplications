import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as memeService from "../services/memeService.js";

const renderContainer = document.getElementsByTagName('main')[0];

const userProfilePageTemplate = (user, memes) => html`
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender == 'male' ? 'male' : 'female'}.png">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${memes.length > 0
                ? html`
                ${memes.map(meme => {

                        return html`
                <div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
                    <a class="button" href="/meme/${meme._id}">Details</a>
                </div>`
                
                })}`
                : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>`;

export const renderUserProfilePage = async () => {

    const user = JSON.parse(sessionStorage.user);

    const userMemes = await memeService.getUserMemesAsync(user._id);

    render(userProfilePageTemplate(user, userMemes), renderContainer);

}