import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const catalogTemplate = (cards) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        ${cards.length > 0
            ?   cards.map(cardTemplate)
            :   html`<h3 class="no-articles">No articles yet</h3>`
        }
    </section>
`

const cardTemplate = (card) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${card.imageUrl}">
            <h6>${card.category}</h6>
            <h2>${card.title}</h2>
            <a href="/details/${card._id}" class="details-button">Details</a>
        </div>
    </div>
`

export async function catalogView(ctx) {
    const cards = await request.get(`/data/games?sortBy=_createdOn%20desc`);
    ctx.render(catalogTemplate(cards))
}