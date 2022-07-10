import { html, render } from "../../node_modules/lit-html/lit-html.js";
import * as userService from '../services/userService.js';


const navTemplate = (user) => html`
    <nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
            ${!user
                ?   html`
                    <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>`
                :   html`
                    <div id="user">
                        <span>Welcome, ${user.email}</span>
                        <a class="button" href="/catalog">My Books</a>
                        <a class="button" href="/create">Add Book</a>
                        <a id="logout" class="button" href="/logout">Logout</a>
                    </div>`
            }
        </section>
    </nav>
`;

const header = document.getElementById('site-header');
const main = document.getElementById('site-content');

function addRender(content) {
    render(content, main);
}

export function navView(ctx, next) {
    ctx.user = userService.getUser();
    ctx.render = addRender;
    render(navTemplate(ctx.user), header);
    next();
}