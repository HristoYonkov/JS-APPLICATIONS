import { html } from "../../node_modules/lit-html/lit-html.js";


const searchTemplate = (cars, getCars) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>
    
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button @click=${getCars} class="button-list">Search</button>
        </div>
    
            ${cars.length > 0 
                ?   html`<h2>Results:</h2>
                    <div class="listings">
                        ${cars.map(cardTemplate)}
                    </div>`

                :   html`<p class="no-cars"> No results.</p>`
            }
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
                <h3>Price:${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`;



export function searchView(ctx) {

    async function getCars(event) {
        event.preventDefault();
        const host = 'http://localhost:3030';
        const query = document.getElementById('search-input');
        
        const response = await fetch(host + `/data/cars?where=year%3D${query.value}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        const cars = await response.json();

        if (response.ok) {
            ctx.render(searchTemplate(cars, getCars));
        } else {
            return alert('Problem');
        }
    }

    ctx.render(searchTemplate([], getCars));
}