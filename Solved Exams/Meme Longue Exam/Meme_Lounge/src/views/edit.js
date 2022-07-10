import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const editTemp = (card, onSubmit) => html`
    <section id="edit-meme">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" .value=${card.title} name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                    ${card.description}
                </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" .value=${card.imageUrl} name="imageUrl">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;

export async function editView(ctx) {
    const card = await request.get(`/data/memes/${ctx.params.id}`);

    
    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        
        if (Object.values(data).some(v => v == '')) {
            
            const box = document.getElementById('errorBox')
            box.style.display = 'inline';
            const span = box.children[0]
            span.textContent = 'All fields are required!'
            
            setTimeout(() => {
                box.style.display = 'none';
            }, 3000)
            
            return alert('All fields are required');
        }
        
        const result = await request.put(`/data/memes/${ctx.params.id}`,
        {
            title: data.title,
            description: data.description,
            imageUrl:data.imageUrl
        })
        
        
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
    
    
    ctx.render(editTemp(card, onSubmit))
}