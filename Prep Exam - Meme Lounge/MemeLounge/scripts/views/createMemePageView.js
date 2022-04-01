import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as memeService from "../services/memeService.js";

const renderContainer = document.getElementsByTagName('main')[0];

const createMemePageTemplate = () => html`
        <section id="create-meme">
            <form id="create-form" @submit=${memeService.createMemeAsync}>
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`;

export const renderCreateMemePage = () => {

    render(createMemePageTemplate(), renderContainer);

}