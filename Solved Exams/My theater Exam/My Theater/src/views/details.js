import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const detailsTemp = (card, user, onDelete, likes, ifLiked, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${card.title}</h1>
            <div>
                <img src=${card.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${card.description}</p>
            <h4>Date: ${card.date}</h4>
            <h4>Author: ${card.author}</h4>

            ${user && user._id === card._ownerId
                ?   html`<div class="buttons">
                    <a class="btn-delete" @click=${onDelete}>Delete</a>
                    <a class="btn-edit" href="/edit/${card._id}">Edit</a>
                    </div>`
                :   nothing
            }

            ${user && user._id !== card._ownerId && ifLiked < 1
                ?   html`
                        <a class="btn-like" @click=${onLike} href="#">Like</a>
                    `
                :   nothing
            }

            <p class="likes">Likes: ${likes}</p>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const card = await request.get(`/data/theaters/${id}`);
    const likes = await getLikes(card._id);
        
    if (ctx.user) {
        const ifLiked = await getUserLike(ctx.user._id, card._id)
        ctx.render(detailsTemp(card, ctx.user, onDelete, likes, ifLiked, onLike))

    } else {
        const ifLiked = 1;
        ctx.render(detailsTemp(card, ctx.user, onDelete, likes, ifLiked, onLike))
    }

    async function onLike(event) {
        event.preventDefault()
        const ifLiked = 1;
        const like = await request.post('/data/likes',
        {
            theaterId: id
        })
        
        ctx.page.redirect(`/details/${card._id}`)
    }
        
    async function getLikes(id) {
        const getLikes = await request.get(`/data/likes?where=theaterId%3D%22${id}%22&distinct=_ownerId&count`)
        return getLikes;
    }
    
    async function getUserLike(userId, cardId) {
        const like = await request.get(`/data/likes?where=theaterId%3D%22${cardId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
        return like;   
    }
    
    async function onDelete(event) {
        event.preventDefault();
        
        const result = await request.del(`/data/theaters/${id}`)
        ctx.page.redirect('/profile')
    }
    
}

