import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';

const catalogTemp = (cards, user) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${cards.length > 0
            ?   cards.map(c => card(c, user))
            :   html`<p>No Albums in Catalog!</p>`
        }
    
    </section>
`;

const card = (card, user) => html`
    <div class="card-box">
        <img src=${card.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${card.name}</p>
                <p class="artist">Artist: ${card.artist}</p>
                <p class="genre">Genre: ${card.genre}</p>
                <p class="price">Price: ${card.price}</p>
                <p class="date">Release Date: ${card.releaseDate}</p>
            </div>
            ${user
                ? html`
                    <div class="btn-group">
                        <a href="/details/${card._id}" id="details">Details</a>
                    </div>
                `
                : nothing
            }
        </div>
    </div>
`

export async function catalogView(ctx) {
    const cards = await request.get(`/data/albums?sortBy=_createdOn%20desc&distinct=name`);

    ctx.render(catalogTemp(cards, ctx.user))
}