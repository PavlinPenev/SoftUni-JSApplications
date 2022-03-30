import * as Render from "./views/viewsModule.js";
import page from "../node_modules/page/page.mjs";

page(Render.renderNavigation);
page('/', Render.renderHomeView);
page('/login', Render.renderLoginView);
page('/register', Render.renderRegisterView);
page('/all-games', Render.renderCatalogView);
page('/create-game', Render.renderCreateGameView);
page('/game/:id', Render.renderGameDetailsView);
page('/edit-game/:id', Render.renderEditGameView);

page.start();