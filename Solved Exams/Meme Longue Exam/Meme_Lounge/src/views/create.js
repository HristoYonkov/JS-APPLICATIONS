import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const createTemp = (onSubmit) => html`
    <section id="create-meme">
        <form @submit=${onSubmit} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;

export async function createView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target))

        if (data.title == '' || data.description == '' || data.imageUrl == '') {
            
            const box = document.getElementById('errorBox')
            box.style.display = 'inline';
            const span = box.children[0]
            span.textContent = 'All fields are required!'
            setTimeout(() => {
                box.style.display = 'none';
            }, 3000)

            return;
        }

        const result = await request.post('/data/memes', 
        {
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl
        })
        
        ctx.page.redirect('/catalog');
    }

    ctx.render(createTemp(onSubmit));
}