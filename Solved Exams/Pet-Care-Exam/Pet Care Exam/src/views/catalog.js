import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const catalogTemplate = (cards) => html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        
            ${cards.length > 0
                ?   html`
                    <div class="animals-dashboard">
                        ${cards.map(cardTemplate)}
                    </div>
                `
                : html`
                    <div>
                        <p class="no-pets">No pets in dashboard</p>
                    </div>
                `
            }
        
    </section>
`

const cardTemplate = (card) => html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src=${card.image}>
        </article>
        <h2 class="name">${card.name}</h2>
        <h3 class="breed">${card.breed}</h3>
        <div class="action">
            <a class="btn" href="/details/${card._id}">Details</a>
        </div>
    </div>
`

export async function catalogView(ctx) {
    const cards = await request.get(`/data/pets?sortBy=_createdOn%20desc&distinct=name`)
    ctx.render(catalogTemplate(cards))
}