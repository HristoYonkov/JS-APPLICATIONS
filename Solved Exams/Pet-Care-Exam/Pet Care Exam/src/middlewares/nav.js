import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/userService.js";


const navTemp = (user) => html`
    <nav>
        <section class="logo">
            <img src="./images/logo.png" alt="logo">
        </section>
        <ul>
            <!--Users and Guest-->
            <li><a href="/">Home</a></li>
            <li><a href="/catalog">Dashboard</a></li>
            ${user 
                ?   html`
                    <li><a href="/create">Create Postcard</a></li>
                    <li><a href="/logout">Logout</a></li>
                `
                :   html`
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                `
            }
        </ul>
    </nav>
`
const header = document.getElementById('navigator');
const main = document.getElementById('content');

function addRender(template) {
    render(template, main);
}

export function navView(ctx, next) {
    ctx.user = getUser();
    render(navTemp(ctx.user), header);
    ctx.render = addRender;
    next();
}