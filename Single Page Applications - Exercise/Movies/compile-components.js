import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as HttpClient from "./http-client.js";
import * as Routes from "./router.js";

export const compileNavigation = () => {

    return html`
        <a class="navbar-brand text-light" @click=${Routes.navigateToHome}>Movies</a>
        <ul class="navbar-nav ml-auto ">
            ${sessionStorage.user
            ? html`<li class="nav-item">
                <a class="nav-link">Welcome, ${JSON.parse(sessionStorage.user).email}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click=${HttpClient.logout}>Logout</a>
            </li>`
            : nothing}
            ${!sessionStorage.user
            ? html`<li class="nav-item">
                <a class="nav-link" @click=${Routes.navigateToLoginPage}>Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click=${Routes.navigateToRegisterPage}>Register</a>
            </li>`
            : nothing}
        </ul>
            `;

}

export const compileHomePage = async () => {

    const movies = await HttpClient.getMoviesAsync();

    return html`
            <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
                <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                    class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
                <h1 class="display-4">Movies</h1>
                <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
            </div>
            <h1 class="text-center">Movies</h1>
            ${sessionStorage.user 
            ? html`<a @click=${Routes.navigateToAddMoviePage} class="btn btn-warning"> Add Movie</a>` 
            : nothing}
            <div class="mt-3">
                <div class="row d-flex d-wrap">
                    <div class="card-deck d-flex justify-content-center">
                        ${movies.map(movie =>
            html`<div class="card mb-4">
                            <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
                            <div class="card-body">
                                <h4 class="card-title">${movie.title}</h4>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-info" id=${movie._id} @click=${
                    Routes.navigateToMovieDetailsPage}>
                                    Details
                                </button>
                            </div>
                        </div>`
        )}
                    </div>
                </div>
            </div>
        `;
}

export const compileRegisterForm = () => {

    return html`
                <h1 class="text-center">Register</h1>
                <form class="text-center border border-light p-5" @submit=${HttpClient.register}>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" required minlength="6">
                    </div>

                    <div class="form-group">
                        <label for="repeatPassword">Repeat Password</label>
                        <input id="repeatPassword" type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="" required minlength="6">
                    </div>

                    <button type="submit" class="btn btn-primary">Register</button>
                </form>`;

}

export const compileLoginForm = () => {

    return html`
                <h1 class="text-center">Login</h1>
                <form class="text-center border border-light p-5" @submit=${HttpClient.login}>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" required minlength="6">
                    </div>

                    <button type="submit" class="btn btn-primary">Login</button>
                </form>`;

}


export const compileEditMovie = async (ev) => {

    const movie = await HttpClient.getMovieAsync(ev.target.id);

    return html`
                <form id=${movie._id} class="text-center border border-light p-5" @submit=${HttpClient.editMovieAsync}>
                    <h1>Edit Movie</h1>
                    <div class="form-group">
                        <label for="title">Movie Title</label>
                        <input id="title" type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
                    </div>
                    <div class="form-group">
                        <label for="description">Movie Description</label>
                        <textarea class="form-control" placeholder="Movie Description..." name="description" .value=${movie.description}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="imageUrl">Image url</label>
                        <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>`

};

export const compileAddMovieForm = () => {

    return html`${sessionStorage.user 
        ?   html`<form class="text-center border border-light p-5" @submit=${HttpClient.addMovieAsync}>
                <h1>Add Movie</h1>
                <div class="form-group">
                    <label for="title">Movie Title</label>
                    <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" required/>
                </div>
                <div class="form-group">
                    <label for="description">Movie Description</label>
                    <textarea class="form-control" placeholder="Description" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image url</label>
                    <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="" required/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>`
        : nothing}`

}


export const compileMovieDetails = async (ev) => {

    const movie = await HttpClient.getMovieAsync(ev.target.id);

    const likesArray = await HttpClient.getMovieLikesAsync();
    const likesCountArray = likesArray.filter(m => m.movieId === ev.target.id);

    const likeObject = likesCountArray.find(like => like._ownerId === JSON.parse(sessionStorage.user)._id
    && like.movieId === ev.target.id);

    return html`<div class="container" id=${movie._id}>
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src=${movie.img}
                 alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${sessionStorage.user && JSON.parse(sessionStorage.user)._id === movie._ownerId 
            ? html`
            <a id=${movie._id} class="btn btn-danger" @click=${HttpClient.deleteMovieAsync}>Delete</a>
            <a id=${movie._id} class="btn btn-warning" @click=${Routes.navigateToEditMoviePage}>Edit</a>`
            : nothing}
            ${sessionStorage.user 
            && JSON.parse(sessionStorage.user)._id !== movie._ownerId 
            && !likeObject
            ? html`<a id=${movie._id} class="btn btn-primary" @click=${HttpClient.likeMovieAsync}>Like</a>`
             : nothing }
            <span class="enrolled-span">Liked ${likesCountArray.length}</span>
        </div>
    </div>
</div>`

}
