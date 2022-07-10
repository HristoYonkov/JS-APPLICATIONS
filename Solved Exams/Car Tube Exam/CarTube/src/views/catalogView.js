import { html } from "../../node_modules/lit-html/lit-html.js";


const catalogTemplate = (cars) => html`
    <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                <!-- Display all records -->
            ${cars.length > 0
                ?   cars.map(cardTemplate)
                :   html`<p class="no-cars">No cars in database.</p>`
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


export async function catalogView(ctx) {
    async function getAll() {
        const host = 'http://localhost:3030';
        const response = await fetch(host + '/data/cars?sortBy=_createdOn%20desc', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        const cars = response.json();
        return cars;
    }
    const cars = await getAll();
    
    ctx.render(catalogTemplate(cars))
}