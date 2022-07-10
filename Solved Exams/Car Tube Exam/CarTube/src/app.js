import page from "../node_modules/page/page.mjs";

import { navView } from "./middlewares/navMiddleware.js";
import { getToken } from "./services/userServices.js";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { myCatalogView } from "./views/myCatalog.js";
import { registerView } from "./views/registerView.js";
import { searchView } from "./views/searchView.js";

page(navView);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/myCatalog', myCatalogView);
page('/edit/:id', editView);
page('/search', searchView);


page.start();


async function logout() {
    const host = 'http://localhost:3030';
    const token = getToken();

    const response = await fetch(host + '/users/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    });

    localStorage.removeItem('user');
    page.redirect('/');
}