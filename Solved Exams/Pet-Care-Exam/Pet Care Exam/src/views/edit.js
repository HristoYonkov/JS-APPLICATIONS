import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const editTemp = (card, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="editForm">
        <img src=${card.image}>
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value=${card.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value=${card.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value=${card.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value=${card.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value=${card.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>
`;

export async function editView(ctx) {
    const card = await request.get(`/data/pets/${ctx.params.id}`);

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (Object.values(data).some(v => v == '')) {

            return alert('All fields are required');
        }

        const result = await request.put(`/data/pets/${ctx.params.id}`,
            {
                name: data.name,
                breed: data.breed,
                age: data.age,
                weight: data.weight,
                image: data.image
            })


        ctx.page.redirect(`/details/${ctx.params.id}`)
    }


    ctx.render(editTemp(card, onSubmit))
}