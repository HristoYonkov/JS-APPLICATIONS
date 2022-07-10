import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as albumService from '../services/albumService.js';
import { albumTemplate } from "./templates/albumTemplates.js";

const searchTemplate = (searchHandler, albums, isLogged) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${searchHandler} >Search</button>
        </div>
    
        <h2>Results:</h2>
    
        <!--Show after click Search button-->
            ${albums.length > 0
                ?   albums.map(x => albumTemplate(x, isLogged))
                :   html`<p class="no-result">No result.</p>`
            }
            
        </div>
    </section>
`;


export const searchView = (ctx) => {
    let searchHandler = (e) => {
        e.preventDefault();
        let searchElement = document.querySelector('#search-input').value;
        
        albumService.search(searchElement)
            .then((albums) => {
                const isLogged = Boolean(ctx.user)
                ctx.render(searchTemplate(searchHandler, albums, isLogged));
                
            })
    }
    
    ctx.render(searchTemplate(searchHandler, []));
};

