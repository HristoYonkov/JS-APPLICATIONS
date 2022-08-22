import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';


const detailsTemp = (card, user, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src=${card.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${card.brand}</span></p>
                <p>
                    Model: <span id="details-model">${card.model}</span>
                </p>
                <p>Release date: <span id="details-release">${card.release}</span></p>
                <p>Designer: <span id="details-designer">${card.designer}</span></p>
                <p>Value: <span id="details-value">${card.value}</span></p>
            </div>
    
            <!--Edit and Delete are only for creator-->
            ${user && user._id === card._ownerId
                ?   html`<div id="action-buttons">
                            <a href="/edit/${card._id}" id="edit-btn">Edit</a>
                            <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
                        </div>
                    `

                :   nothing
            }
        </div>
    </section>
`;


export async function detailsView(ctx) {
    const card = await request.get(`/data/shoes/${ctx.params.id}`)

    async function onDelete(e) {
        e.preventDefault();

        const response = await request.del(`/data/shoes/${ctx.params.id}`);
        ctx.page.redirect('/catalog');
    }

    ctx.render(detailsTemp(card, ctx.user, onDelete))
}