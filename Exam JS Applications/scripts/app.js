import * as Render from "../scripts/views/viewsModule.js";
import page from "../node_modules/page/page.mjs";

page(Render.renderNavigation);
page('/login', Render.renderLoginPage);
page('/register', Render.renderRegisterPage);
page('/', Render.renderHomePage);
page('/dashboard', Render.renderDashboardPage);
page('/create-pet', Render.renderCreatePetPage);
page('/pet/:id', Render.renderPetDetailsPage);
page('/edit-pet/:id', Render.renderEditPetPage);


page.start();