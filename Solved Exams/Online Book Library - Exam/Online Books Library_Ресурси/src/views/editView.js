import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getToken } from "../services/userService.js";


const editTemplate = (book, onSubmit) => html`
    <!-- Edit Page ( Only for the creator )-->
    <section id="edit-page" class="edit">
        <form @submit=${onSubmit} id="edit-form" action="" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" .value=${book.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description">${book.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" .value=${book.type}>
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`;


export async function editView(ctx) {
    const host = 'http://localhost:3030';
    const bookId = ctx.params.id;

    async function onEdit() {
        const response = await fetch(host + `/data/books/${bookId}`, {
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

    const book = await onEdit()

    ctx.render(editTemplate(book, onSubmit));
    

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        if(Object.values(data).some(v => v == '')) {
            return alert('Fill all fields!');
        }

        const response = await fetch(host + `/data/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                type: data.type
            })
        });
        const result = await response.json();
        
        if (response.ok) {
            ctx.page.redirect(`/details/${bookId}`);
        } else {
            alert(result.message)
            return;
        }
    
    }

}