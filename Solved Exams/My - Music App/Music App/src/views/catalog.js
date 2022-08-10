import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';

const catalogTemp = (cards) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${cards
            ?   cards.map(card)
            :   html`<p>No Albums in Catalog!</p>`
        }
    
    </section>
`;

const card = (card) => html`
    <div class="card-box">
        <img src=${card.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${card.name}</p>
                <p class="artist">Artist: ${card.artist}</p>
                <p class="genre">Genre: ${card.genere}</p>
                <p class="price">Price: ${card.price}</p>
                <p class="date">Release Date: ${card.releaseDate}</p>
            </div>
            <div class="btn-group">
                <a href="/details/${card._id}" id="details">Details</a>
            </div>
        </div>
    </div>
`

export async function catalogView(ctx) {
    const cards = await request.get(`/data/albums?sortBy=_createdOn%20desc&distinct=name`);
    console.log(cards);

    ctx.render(catalogTemp(cards))
}