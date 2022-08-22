import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const createTemp = (onSubmit) => html`
    <section id="create">
        <div class="form">
            <h2>Add item</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
                <input type="text" name="model" id="shoe-model" placeholder="Model" />
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
                <input type="text" name="release" id="shoe-release" placeholder="Release date" />
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
                <input type="text" name="value" id="shoe-value" placeholder="Value" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
`


export function createView(ctx) {
    async function onSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))

        if (data.brand === '' || data.model === '' || data.imageUrl === '' || data.release === '' || data.designer === ''|| data.value === '') {
            return alert('All fields required!')
        }

        const response = await request.post('/data/shoes',
            {
                brand: data.brand,
                model: data.model, 
                imageUrl: data.imageUrl, 
                release: data.release, 
                designer: data.designer, 
                value: data.value
            })

        const card = await response;
        if (card._id) {
            ctx.page.redirect('/catalog')
        }
    }


    ctx.render(createTemp(onSubmit))
}

