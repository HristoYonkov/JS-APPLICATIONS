import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js';


const searchTemp = (onSubmit, result) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onSubmit} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
        ${result}

    </section>
`;

const searchFn = (cards, user) => html`
    <div class="search-result">
            <!--If have matches-->
        ${cards.length > 0
            ?   cards.map(c => cardTemp(c, user))
            :   html`<p class="no-result">No result.</p>`
        }
    </div>
`

const cardTemp = (card, user) => html`
    <div class="card-box">
        <img src=${card.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${card.name}</p>
                <p class="artist">Artist: ${card.artist}</p>
                <p class="genre">Genre: ${card.genre}</p>
                <p class="price">Price: $${card.price}</p>
                <p class="date">Release Date: ${card.date}</p>
            </div>
            ${user
                ?   html`
                    <div class="btn-group">
                        <a href="/details/${card._id}" id="details">Details</a>
                    </div>
                `
                :   nothing
            }
        </div>
    </div>
`;

export async function searchView(ctx) {

    async function onSubmit(e) {
        e.preventDefault();

        let query = document.getElementById('search-input');
        const result = await request.get(`/data/albums?where=name%20LIKE%20%22${query.value}%22`);
        query.value = '';

        ctx.render(searchTemp(onSubmit, searchFn(result, ctx.user)));
    }

    ctx.render(searchTemp(onSubmit));
}