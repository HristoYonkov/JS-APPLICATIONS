import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';


const detailsTemp = (card, user, onDelete, comments, onSubmit) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${card.imageUrl} />
                <h1>${card.title}</h1>
                <span class="levels">MaxLevel: ${card.maxLevel}</span>
                <p class="type">${card.category}</p>
            </div>
    
            <p class="text">${card.summary}</p>
    
            
            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            ${user && user._id === card._ownerId
                ?   html`
                    <div class="buttons">
                        <a href="/edit/${card._id}" class="button">Edit</a>
                        <a href="#" @click=${onDelete} class="button">Delete</a>
                    </div>
                    `
                :   nothing
            }
        </div>
        
        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length > 0
                ?   html`
                    <ul>
                        ${comments.map(commentTemp)}
                    </ul>
                `
                :   html`
                    <!-- Display paragraph: If there are no games in the database -->
                    <p class="no-comment">No comments.</p>
                `
            }
        
        </div>
        <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
        ${user && user._id !== card._ownerId
            ?   html`
                <article class="create-comment">
                    <label>Add new comment:</label>
                    <form @submit=${onSubmit}class="form">
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input class="btn submit" type="submit" value="Add Comment">
                    </form>
                </article>
            `
            :   nothing
        }
    
    </section>
`;

const commentTemp = (comment) => html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>
`


export async function detailsView(ctx) {
    const card = await request.get(`/data/games/${ctx.params.id}`);
    const comments = await request.get(`/data/comments?where=gameId%3D%22${ctx.params.id}%22`);

    async function onDelete(e) {
        e.preventDefault();

        const response = await request.del(`/data/games/${ctx.params.id}`);
        ctx.page.redirect('/');
    }

    async function onSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        if (data.comment === '') {
            return alert('Comment field is empty!');
        }

        const post = await request.post(`/data/comments`,
            {
                gameId: ctx.params.id,
                comment: data.comment
            })
            
            if (post.comment) {
                e.target.reset()
                ctx.page.redirect(`/details/${ctx.params.id}`)
            }
    }

    ctx.render(detailsTemp(card, ctx.user, onDelete, comments, onSubmit))
}