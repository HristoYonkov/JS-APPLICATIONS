import { html } from "../../node_modules/lit-html/lit-html.js";


const homeTemplate = (books) => html`
    <!-- Dashboard Page ( for Guests and Users ) -->
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        <!-- Display ul: with list-items for All books (If any) -->

        ${books.length > 0 
            ?   html`<ul class="other-books-list">
                    ${books.map(b => bookTemplate(b))}
                </ul>`
            :   html`<!-- Display paragraph: If there are no books in the database -->
                <p class="no-books">No books in database!</p>`
        }
        </ul>
    </section>
`;

const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`;

const host = 'http://localhost:3030';
    
export async function homeView(ctx) {
    async function getBooks() {
        const response = await fetch(host+'/data/books?sortBy=_createdOn%20desc', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const books = await response.json();

        if (books.message) {
            return alert(books.message)
        }
        return books;
    }
    const books = await getBooks();
    ctx.render(homeTemplate(books));
}