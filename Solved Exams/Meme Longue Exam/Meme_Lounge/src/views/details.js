import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const detailsTemp = (card, user, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${card.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${card.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
            ${card.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${user && user._id === card._ownerId
                ?html`
                    <a class="button warning" href="/edit/${card._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>
                `
                : nothing
            }

        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const card = await request.get(`/data/memes/${id}`);
    
    ctx.render(detailsTemp(card, ctx.user, onDelete))

    async function onDelete(event) {
        event.preventDefault();
    
        const result = await request.del(`/data/memes/${ctx.params.id}`)
        ctx.page.redirect('/catalog')
    
    }
}
