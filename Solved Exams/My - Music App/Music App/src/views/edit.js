import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const editTemp = (card, onSubmit) => html`
<section class="editPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value=${card.name}>

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${card.imgUrl}>

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value=${card.price}>

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${card.releaseDate}>

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value=${card.artist}>

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value=${card.genre}>

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${card.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`;

export async function editView(ctx) {
    const card = await request.get(`/data/albums/${ctx.params.id}`);
    
    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        
        if (Object.values(data).some(v => v == '')) {
            
            return alert('All fields are required');
        }
        
        const result = await request.put(`/data/albums/${ctx.params.id}`,
        {
            name: data.name,
            imgUrl: data.imgUrl,
            price: data.price,
            releaseDate: data.releaseDate,
            artist: data.artist,
            genre: data.genre,
            description: data.description 
        })
        
        
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
    
    
    ctx.render(editTemp(card, onSubmit))
}