import { html } from "../../node_modules/lit-html/lit-html.js";
import { getToken } from "../services/userService.js";


const createTemplate = (onSubmit) => html`
    <!-- Create Page ( Only for logged-in users ) -->
    <section id="create-page" class="create">
        <form @submit=${onSubmit} id="create-form" action="" method="">
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>
`;


export function createView(ctx) {
    const host = 'http://localhost:3030';

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        if(Object.values(data).some(v => v == '')) {
            return alert('Fill all fields!')
        }

        const response = await fetch(host+'/data/books', {
            method: 'POST',
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
        
        if (result.title) {
            ctx.page.redirect('/');
        } else {
            alert(result.message)
        }

    }


    ctx.render(createTemplate(onSubmit));
}