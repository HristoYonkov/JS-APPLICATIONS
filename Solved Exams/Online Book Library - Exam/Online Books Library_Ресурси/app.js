import page from "./node_modules/page/page.mjs";

import { navView } from "./src/middlewares/renderNav.js";
import { getToken } from "./src/services/userService.js";
import { catalogView } from "./src/views/catalogView.js";
import { createView } from "./src/views/createView.js";
import { detailsView } from "./src/views/detailsView.js";
import { editView } from "./src/views/editView.js";
import { homeView } from "./src/views/homeView.js";
import { loginView } from "./src/views/loginView.js";
import { registerView } from "./src/views/registerView.js";


page(navView);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);
page('/create', createView);
page('/catalog',catalogView);
page('/edit/:id', editView);
page('/details/:id', detailsView)


page.start();

async function onLogout() {
    const host = 'http://localhost:3030'
    const token = getToken()
    const response = await fetch(host + '/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        
    });
    localStorage.removeItem('user')
    page.redirect('/');
}