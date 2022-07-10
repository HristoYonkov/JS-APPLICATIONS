import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getToken } from "../services/userServices.js";


const detailsTemplate = (user, car, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>
    
            <p class="description-para">${car.description}</p>
            ${user && user._id === car._ownerId
                ?   html`<div class="listings-buttons">
                    <a href="/edit/${car._id}" class="button-list">Edit</a>
                    <a @click=${onDelete} href="/delete/${car._id}" class="button-list">Delete</a>
                    </div>`

                : nothing
            }
        </div>
    </section>
`;


export async function detailsView(ctx) {

    async function getOne() {
        const host = 'http://localhost:3030';
        const carId = ctx.params.id;

        const response = await fetch(host + '/data/cars/' + carId, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        const car = await response.json();

        if(response.ok) {
            return car;
        }
    }
        
    const car = await getOne();
    
    
    ctx.render(detailsTemplate(ctx.user, car, onDelete));

    async function onDelete(event) {
        event.preventDefault();
        const host = 'http://localhost:3030';
        const carId = ctx.params.id;

        const response = await fetch(host + '/data/cars/'+ carId, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': getToken()
            },
        });

        const result = response.json();

        if (response.ok) {
            ctx.page.redirect('/catalog')
        }
    }
}