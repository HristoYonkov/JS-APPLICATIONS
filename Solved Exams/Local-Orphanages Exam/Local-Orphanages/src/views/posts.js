import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const postTemp = (cards) => html`
    <!-- My Posts -->
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
    
        <!-- Display a div with information about every post (if any)-->
        ${cards.length > 0
            ?   html`
                    <div class="my-posts">
                        ${cards.map(cardTemp)}
                    </div>
                `
            :   html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
        }
            
    </section>
`

const cardTemp = (card) => html`
    <div class="post">
        <h2 class="post-title">${card.title}</h2>
        <img class="post-image" src=${card.imageUrl}>
        <div class="btn-wrapper">
            <a href="/details/${card._id}" class="details-btn btn">Details</a>
        </div>
    </div>
`

export async function postView(ctx) {
    const cards = await request.get(`/data/posts?where=_ownerId%3D%22${ctx.user._id}%22&sortBy=_createdOn%20desc`)

    ctx.render(postTemp(cards))
}