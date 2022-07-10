import { html, render } from "../../node_modules/lit-html/lit-html.js";


const catalogTemplate = (books) => html`
    <!-- My Books Page ( Only for logged-in users ) -->
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <!-- Display ul: with list-items for every user's books (if any) -->
        ${books.length > 0
            ?   html`<ul class="my-books-list">
                        ${books.map(bookTemplate)}
                    </ul>`
            :   html`<p class="no-books">No books in database!</p>`
        }
        <!-- Display paragraph: If the user doesn't have his own books  -->
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

export async function catalogView(ctx) {

    async function getBooks(event) {
        const host = 'http://localhost:3030';
        const user = ctx.user;
        const response = await fetch(host+`/data/books?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        
        if (response.ok) {
            return result;
        } else {
            alert(result.message)
        }

    }

    const books = await getBooks();
    ctx.render(catalogTemplate(books))
}