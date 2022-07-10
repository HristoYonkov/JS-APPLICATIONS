import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'

const profiletemp = (user, cards) => html`
<section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${user.email}</h2>
            </div>
            <div class="board">

            ${cards.length > 0
                ?   cards.map(cardTemp)
                :   html`<div class="no-events">
                    <p>This user has no events yet!</p>
                    </div>
                `
            }
                

            </div>
        </section>
`;

const cardTemp = (card) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src=${card.imageUrl}>
            <h2>${card.title}</h2>
            <h6>${card.date}</h6>
            <a href="/details/${card._id}" class="details-button">Details</a>
        </div>
    </div>
`;

export async function profileView(ctx) {
    console.log(ctx.user);
    const cards = await request.get(`/data/theaters?where=_ownerId%3D%22${ctx.user._id}%22&sortBy=_createdOn%20desc`)
    
    ctx.render(profiletemp(ctx.user, cards))
}