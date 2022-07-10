import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getToken } from "../services/userService.js";


const detailsTemplate = (book, user, onDelete, likes, addLike, liked) => html`
    <!-- Details Page ( for Guests and Users ) -->
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                ${user && user._id === book._ownerId
                    ?   html`
                        <a class="button" href="/edit/${book._id}">Edit</a>
                        <a @click=${onDelete} class="button" href="">Delete</a>
                    `
                    : nothing
                }
    
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${user && user._id !== book._ownerId && liked < 1
                    ?   html`<a @click=${addLike} class="button" href="/like">Like</a>`
                    :   nothing
                }
    
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

export async function detailsView(ctx) {

    async function getBook() {
        const host = 'http://localhost:3030';
        const book = ctx.params.id;

        const response = await fetch(host+`/data/books/${book}`, {
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

    const book = await getBook();
    const likes = await getLikes(book);

    if (ctx.user) {
        const liked = await isLiked(book, ctx.user);
        ctx.render(detailsTemplate(book, ctx.user, onDelete, likes, addLikes, liked));

    } else {
        const liked = 1
        ctx.render(detailsTemplate(book, ctx.user, onDelete, likes, addLikes, liked));
    }


    async function onDelete(event) {
        event.preventDefault();
        const host = 'http://localhost:3030';

        const choise = confirm(`Are you sure to delete the ${book.title}?`);

        if (choise) {
            const response = await fetch(host + `/data/books/${book._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': getToken()
                },
            });
            ctx.page.redirect('/');
        }
    }

    async function addLikes(event) {
        event.preventDefault();
        const host = 'http://localhost:3030';
        const bookId = book._id;
        
        const response = await fetch(host +`/data/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify({
                bookId
            })
        });
        const result = await response.json();
        
        if (response.ok) {
            
            ctx.page.redirect(`/details/${bookId}`);
        }
    }
}


async function getLikes(book) {
    const host = 'http://localhost:3030';
    const bookId = book._id;

    const response = await fetch(host +`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    
    if (response.ok) {
        return result
    }
}

async function isLiked(book, user) {
    const host = 'http://localhost:3030';
    const bookId = book._id;
    const userId = user._id;

    const response = await fetch(host + `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    
    if (response.ok) {
        return result
    }
}