import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const editTemp = (card, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value=${card.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value=${card.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value=${card.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value=${card.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${card.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`;

export async function editView(ctx) {
    const card = await request.get(`/data/games/${ctx.params.id}`);

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (Object.values(data).some(v => v == '')) {

            return alert('All fields are required');
        }

        const result = await request.put(`/data/games/${ctx.params.id}`,
            {
                title: data.title,
                category: data.category,
                maxLevel: data.maxLevel,
                imageUrl: data.imageUrl,
                summary: data.summary
            })


        ctx.page.redirect(`/details/${ctx.params.id}`)
    }


    ctx.render(editTemp(card, onSubmit))
}