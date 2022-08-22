import page from "./node_modules/page/page.mjs";
import { navView } from "./src/middlewares/nav.js";


import { clearUser, getToken } from "./src/services/userService.js";
import { catalogView } from "./src/views/catalog.js";
import { createView } from "./src/views/create.js";
import { detailsView } from "./src/views/details.js";
import { editView } from "./src/views/edit.js";
import { homeView } from "./src/views/home.js";
import { loginView } from "./src/views/login.js";
import { registerView } from "./src/views/register.js";
import { searchView } from "./src/views/search.js";

page(navView);

page('/login', loginView)
page('/register', registerView)
page('/logout', onLogout)
page('/edit/:id', editView)
page('/', homeView)
page('/catalog', catalogView)
page('/create', createView)
page('/details/:id', detailsView)
page('/search', searchView)




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