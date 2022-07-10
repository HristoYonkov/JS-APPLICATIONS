import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const createTemp = (onSubmit) => html`
    <section id="createPage">
            <form @submit=${onSubmit} class="create-form">
                <h1>Create Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value="">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author">
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description"></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value="">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

export async function createView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target))

        if (data.author == '' || data.date == ''|| data.title == '' || data.description == '' || data.imageUrl == '') {
            

            return alert('All fields must be filled!');
        }

        const result = await request.post('/data/theaters', 
        {
            title: data.title,
            date: data.date,
            author: data.author,
            imageUrl: data.imageUrl,
            description: data.description
        })
        
        ctx.page.redirect('/');
    }

    ctx.render(createTemp(onSubmit));
}