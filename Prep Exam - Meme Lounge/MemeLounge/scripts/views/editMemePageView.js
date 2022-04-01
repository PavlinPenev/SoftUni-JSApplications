import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as memeService from "../services/memeService.js";

const renderContainer = document.getElementsByTagName('main')[0];

const editMemePageTemplate = (meme) => html`
        <section id="edit-meme">
            <form id="edit-form" data-id=${meme._id} @submit=${memeService.editMemeAsync}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                                                                    </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`;

export const renderEditMemePage = async (ctx) => {

    const memeId = ctx.params.id;

    const meme = await memeService.getMemeDetailsAsync(memeId);

    render(editMemePageTemplate(meme), renderContainer);

}