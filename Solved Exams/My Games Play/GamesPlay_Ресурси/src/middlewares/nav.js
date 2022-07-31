import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/userService.js";


const navTemp = (user) => html`
    <!-- Navigation -->
    <h1><a class="home" href="/">GamesPlay</a></h1>
    <nav>
        <a href="/catalog">All games</a>
        <!-- Logged-in users -->
        ${user 
            ?   html`
            <div id="user">
                <a href="/create">Create Game</a>
                <a href="/logout">Logout</a>
            </div>
            `
            : html`
            <!-- Guest users -->
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            `
        }
    </nav>
`
const header = document.getElementById('navigator');
const main = document.getElementById('main-content');

function addRender(template) {
    render(template, main);
}

export function navView(ctx, next) {
    ctx.user = getUser();
    render(navTemp(ctx.user), header);
    ctx.render = addRender;
    next();
}