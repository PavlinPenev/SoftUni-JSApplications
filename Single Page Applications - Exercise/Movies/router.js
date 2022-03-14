import { render } from "../../node_modules/lit-html/lit-html.js";
import * as Components from "./compile-components.js";

const container = document.getElementById('container');

export const navigateToHome = async () => {

    render(await Components.compileHomePage(), container);

}

export const navigateToMovieDetailsPage = async (ev) => {

    render(await Components.compileMovieDetails(ev), container);

}

export const navigateToRegisterPage = () => {

    render(Components.compileRegisterForm(), container);

}

export const navigateToLoginPage = () => {

    render(Components.compileLoginForm(), container);

}

export const navigateToAddMoviePage = () => {

    render(Components.compileAddMovieForm(), container);

}

export const navigateToEditMoviePage = async (ev) => {

    render(await Components.compileEditMovie(ev), container);

}