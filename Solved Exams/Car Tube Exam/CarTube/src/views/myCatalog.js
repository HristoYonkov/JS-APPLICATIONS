import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/userServices.js";


const myCatalogTemplate = (cars) => html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
            <!-- Display all records -->
            ${cars.length > 0
                ?   cars.map(cardTemplate)
                :   html`<p class="no-cars"> You haven't listed any cars yet.</p>`
            }
        </div>
    </section>
`;

const cardTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`;


export async function myCatalogView(ctx) {
    async function getAll() {
        const host = 'http://localhost:3030';
        const userId = getUser()
        const response = await fetch(host + `/data/cars?where=_ownerId%3D%22${userId._id}%22&sortBy=_createdOn%20desc`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        const cars = response.json();
        return cars;
    }
    const cars = await getAll();

    ctx.render(myCatalogTemplate(cars))
}