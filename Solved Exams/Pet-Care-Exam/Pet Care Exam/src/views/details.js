import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';


const detailsTemp = (card, user, onDelete, onDonate, donations, ifDonate) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${card.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${card.name}</h1>
                    <h3>Breed: ${card.breed}</h3>
                    <h4>Age: ${card.age}</h4>
                    <h4>Weight: ${card.weight}</h4>
                    <h4 class="donation">Donation: ${donations * 100}$</h4>
                </div>
                <!-- if there is no registered user, do not display div-->
                ${user && user._id === card._ownerId
                    ?   html`
                            <div class="actionBtn">
                                <!-- Only for registered user and creator of the pets-->
                                <a href="/edit/${card._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="#" class="remove">Delete</a>
                            </div>
                    `
                    :   nothing
                }
                ${user && user._id !== card._ownerId && ifDonate < 1
                    ?   html`
                        <div class="actionBtn">
                            <!--(Bonus Part) Only for no creator and user-->
                            <a @click=${onDonate} href="#" class="donate">Donate</a>
                        </div>
                    `
                    :   nothing
                }
            </div>
        </div>
    </section>
`;


export async function detailsView(ctx) {
    const card = await request.get(`/data/pets/${ctx.params.id}`)
    const donations = await request.get(`/data/donation?where=petId%3D%22${ctx.params.id}%22&distinct=_ownerId&count`);
    let ifDonate = 1;

    if (ctx.user) {
        ifDonate = await request.get(`/data/donation?where=petId%3D%22${ctx.params.id}%22%20and%20_ownerId%3D%22${ctx.user._id}%22&count`)
    }

    async function onDelete(e) {
        e.preventDefault();

        const response = await request.del(`/data/pets/${ctx.params.id}`);
        ctx.page.redirect('/');
    }

    async function onDonate(e) {
        e.preventDefault();
        const donation = await request.post(`/data/donation`,
        {
            petId: ctx.params.id
        })
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
    
    ctx.render(detailsTemp(card, ctx.user, onDelete, onDonate, donations, ifDonate))
}