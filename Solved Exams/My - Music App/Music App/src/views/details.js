import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';


const detailsTemp = (user, card, onDelete) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${card.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">
    
                    <h1>Name: ${card.name}</h1>
                    <h3>Artist: ${card.artist}</h3>
                    <h4>Genre: ${card.genre}</h4>
                    <h4>Price: $${card.price}</h4>
                    <h4>Date: ${card.releaseDate}</h4>
                    <p>Description: ${card.description}</p>
                </div>
    
                <!-- Only for registered user and creator of the album-->
                ${user && user._id === card._ownerId
                    ?   html`
                        <div class="actionBtn">
                            <a href="/edit" class="edit">Edit</a>
                            <a @click=${onDelete} href="#" class="remove">Delete</a>
                        </div>
                    `
                    :   nothing
                }

            </div>
        </div>
    </section>
`


export async function detailsView(ctx) {
    const card = await request.get(`/data/albums/${ctx.params.id}`);

    async function onDelete(e) {
        e.preventDefault();
        
        if (confirm('Are you sure you want to delete the album?') == true) {
            await request.del(`/data/albums/${ctx.params.id}`)

            ctx.page.redirect('/catalog')
        }
    }

    ctx.render(detailsTemp(ctx.user, card, onDelete))
}