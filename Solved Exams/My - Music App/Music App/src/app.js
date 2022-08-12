import page from "../node_modules/page/page.mjs";
import { navView } from "./middlewares/nav.js";


import { clearUser, getToken } from "./services/userService.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

page(navView);

page('/login', loginView)
page('/register', registerView)
page('/logout', onLogout)
page('/edit/:id', editView)
page('/', homeView)
page('/catalog', catalogView)
page('/create', createView)
page('/details/:id', detailsView)


page.start();

async function onLogout() {
    const token = getToken();

    const response = await fetch('http://localhost:3030/users/logout', 
        {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'X-Authorization': token
            }
        })
        
        if (response.ok) {
            clearUser()
            page.redirect('/')
        }
}