import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const catalogTemplate = (cards) => html`
    <section id="dashboard">
        <h2>Collectibles</h2>
        
        <!-- Display a li with information about every post (if any)-->
        ${cards.length > 0
            ?   html`
                <ul class="card-wrapper"> ${cards.map(cardTemplate)}</ul>
            `
            :   html`<h2>There are no items added yet.</h2>`
        }

    </section>
`

const cardTemplate = (card) => html`
    <li class="card">
        <img src=${card.imageUrl} alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${card.brand}</span>
        </p>
        <p>
            <strong>Model: </strong><span class="model">${card.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
        <a class="details-btn" href="/details/${card._id}">Details</a>
    </li>
`

export async function catalogView(ctx) {
    const cards = await request.get(`/data/shoes?sortBy=_createdOn%20desc`)
    
    ctx.render(catalogTemplate(cards))
}