import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const editTemp = (card, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" value=${card.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" value=${card.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" value=${card.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" value=${card.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" value=${card.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>
`;

export async function editView(ctx) {
    const card = await request.get(`/data/posts/${ctx.params.id}`);

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (Object.values(data).some(v => v == '')) {

            return alert('All fields are required');
        }

        const result = await request.put(`/data/posts/${ctx.params.id}`,
            {
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                address: data.address,
                phone: data.phone
            })


        ctx.page.redirect(`/details/${ctx.params.id}`)
    }


    ctx.render(editTemp(card, onSubmit))
}