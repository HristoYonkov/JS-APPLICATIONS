import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/userServices.js";


const navigationTemplate = (user) => html`
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/catalog">All Listings</a>
        <a href="/search">By Year</a>
        ${!user
            ?   html`
                    <div id="guest">
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </div>`
            :   html`
                    <div id="profile">
                        <a>Welcome ${user.username}</a>
                        <a href="/myCatalog">My Listings</a>
                        <a href="/create">Create Listing</a>
                        <a href="/logout">Logout</a>
                    </div>`
        }
    </nav>
`;

const header = document.getElementById('navigation-header');
const root = document.getElementById('site-content');

function addRender (content) {
    render(content, root)
}

export function navView(ctx, next) {
    ctx.user = getUser();
    ctx.render = addRender;
    render(navigationTemplate(ctx.user), header);
    next();
}