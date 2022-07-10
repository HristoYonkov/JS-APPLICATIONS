import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/userService.js";


const navTemp = (user) => html`
    <nav>
        <a href="/catalog">All Memes</a>
        ${user 
            ?   html`<div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
                <span>Welcome, ${user.email}</span>
                <a href="/profile">My Profile</a>
                <a href="/logout">Logout</a>
                </div>
                </div>`

            :   html`<div class="guest">
                <div class="profile">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
                </div>
                <a class="active" href="/">Home Page</a>
                </div>`
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