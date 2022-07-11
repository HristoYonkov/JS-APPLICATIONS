import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'


const detailsTemp = (card, user, onDelete, onClick, donates, ifDonate) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${card.imageUrl} alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${card.title}</h2>
                    <p class="post-description">Description: ${card.description}</p>
                    <p class="post-address">Address: ${card.address}</p>
                    <p class="post-number">Phone number: ${card.phone}</p>
                    <p class="donate-Item">Donate Materials: ${donates}</p>
    
                    <!--Edit and Delete are only for creator-->
                    ${user && user._id == card._ownerId
                        ?   html`
                            <div class="btns">
                            <a href="/edit/${card._id}" class="edit-btn btn">Edit</a>
                            <a href="" @click=${onDelete} class="delete-btn btn">Delete</a>
                            </div>
                        `
                        :   nothing
                    }

                    ${user && user._id !== card._ownerId && ifDonate < 1
                        ?   html`<div class="btns">
                                <a href="#" @click=${onClick} class="donate-btn btn">Donate</a>
                            </div>`
                        : nothing
                    }
                </div>
            </div>
        </div>
    </section>
`

export async function detailsView(ctx) {
    const card = await request.get(`/data/posts/${ctx.params.id}`)
    const donates = await request.get(`/data/donations?where=postId%3D%22${ctx.params.id}%22&distinct=_ownerId&count`)
    const ifDonate = await request.get(`/data/donations?where=postId%3D%22${ctx.params.id}%22%20and%20_ownerId%3D%22${ctx.user._id}%22&count`)
    
    ctx.render(detailsTemp(card, ctx.user, onDelete, onClick, donates, ifDonate))

    async function onClick(event) {
        event.preventDefault();
        console.log('clicked');
        await request.post(`/data/donations`, {
            postId: card._id
        })
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }

    async function onDelete(event) {
        event.preventDefault()
        const ifConfirm = confirm(`Are you sure you want to delete the post`)
        if(!ifConfirm) {
            return
        }
        await request.del(`/data/posts/${ctx.params.id}`)
        ctx.page.redirect('/')
    }
}