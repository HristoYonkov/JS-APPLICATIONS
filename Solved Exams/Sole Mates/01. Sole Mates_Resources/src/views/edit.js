import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const editTemp = (card, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" value=${card.brand} />
            <input type="text" name="model" id="shoe-model" placeholder="Model" value=${card.model} />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" value=${card.imageUrl} />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" value=${card.release} />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" value=${card.designer} />
            <input type="text" name="value" id="shoe-value" placeholder="Value" value=${card.value} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function editView(ctx) {
    const card = await request.get(`/data/shoes/${ctx.params.id}`);

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (Object.values(data).some(v => v == '')) {

            return alert('All fields are required');
        }

        const result = await request.put(`/data/shoes/${ctx.params.id}`,
            {
                brand: data.brand,
                model: data.model, 
                imageUrl: data.imageUrl, 
                release: data.release, 
                designer: data.designer, 
                value: data.value
            })

        ctx.page.redirect(`/details/${ctx.params.id}`)
    }


    ctx.render(editTemp(card, onSubmit))
}