import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const catalogTemp = (data) => html`
<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${data.length > 0
            ? data.map(cardTemp)
            :   html`<p class="no-memes">No memes in database.</p>`
        }
    </div>
</section>
`;

const cardTemp = (card) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${card.title}</p>
                <img class="meme-image" alt="meme-img" src=${card.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${card._id}">Details</a>
            </div>
        </div>
    </div>
`


export async function catalogView(ctx) {
    const data = await request.get('/data/memes?sortBy=_createdOn%20desc');
    
    ctx.render(catalogTemp(data))
}