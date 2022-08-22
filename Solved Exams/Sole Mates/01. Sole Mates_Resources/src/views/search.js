import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';


const searchTemp = (onSubmit, result) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${onSubmit} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>
            ${result}
          
        </section>
`;

const searchFn = (cards, user) => html`
    <div id="search-container">
          ${cards.length > 0
            ?   html`
                <ul class="card-wrapper">
                    <!-- Display a li with information about every post (if any)-->
                    ${cards.map(c => cardTemp(c, user))}
                </ul>
                `
            :   html`<h2>There are no results found.</h2>`
        }
</div>
`

const cardTemp = (card, user) => html`
    <li class="card">
        <img src=${card.imageUrl} alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${card.brand}</span>
        </p>
        <p>
            <strong>Model: </strong><span class="model">${card.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
        ${user
            ?   html`<a class="details-btn" href="/details/${card._id}">Details</a>`
            :   nothing
        }
    </li>
`;

export async function searchView(ctx) {

    async function onSubmit(e) {
        e.preventDefault();

        let query = document.getElementById('#search-input');
        const result = await request.get(`/data/shoes?where=brand%20LIKE%20%22${query.value}%22`);
        query.value = '';

        ctx.render(searchTemp(onSubmit, searchFn(result, ctx.user)));
    }

    ctx.render(searchTemp(onSubmit));
}