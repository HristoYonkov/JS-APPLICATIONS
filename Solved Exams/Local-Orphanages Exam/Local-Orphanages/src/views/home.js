import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const homeTemp = (cards) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
    
        <!-- Display a div with information about every post (if any)-->
        <div class="all-posts">
            ${ cards.length > 0
                ?   cards.map(cardTemp)
                :   html`<h1 class="title no-posts-title">No posts yet!</h1>`
            }
        </div>
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

export async function homeView(ctx) {
    const cards = await request.get('/data/posts?sortBy=_createdOn%20desc')
    ctx.render(homeTemp(cards))
}