import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/userService.js";


const navTemp = (user) => html`
    <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
    /></a>

    <nav>
        <div>
            <a href="/catalog">Dashboard</a>
            <a href="/search">Search</a>
        </div>
    
        <!-- Logged-in users -->
        ${user
            ?   html`
                <div class="user">
                <a href="/create">Add Pair</a>
                <a href="/logout">Logout</a>
                </div>
            `
            :   html`
                <!-- Guest users -->
                <div class="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            `
        }
    
    </nav>
`
const header = document.getElementById('navigator');
const main = document.getElementById('main');

function addRender(template) {
    render(template, main);
}

export function navView(ctx, next) {
    ctx.user = getUser();
    render(navTemp(ctx.user), header);
    ctx.render = addRender;
    next();
}