import * as Render from "./views/viewsModule.js";
import page from "../node_modules/page/page.mjs";

page(Render.renderNavigation);
page('/', Render.renderHomePage);
page('/login', Render.renderLoginPage);
page('/register', Render.renderRegisterPage);
page('/create-meme', Render.renderCreateMemePage);
page('/all-memes', Render.renderAllMemesPage);
page('/meme/:id', Render.renderMemeDetailsPage);
page('/edit-meme/:id', Render.renderEditMemePage);
page('/my-profile', Render.renderUserProfilePage);

page.start();