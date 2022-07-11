import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const loginTemp = (onSubmit) => html`
    <section id="login-page" class="auth">
        <form @submit=${onSubmit} id="login">
            <h1 class="title">Login</h1>
    
            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>
`

export async function loginView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (data.email === '' || data.password === '') {
            return alert('All fields must be filled!')
        }

        const user = await request.post('/users/login',
            {
                email: data.email,
                password: data.password
            })


        if (user._id) {
            setUser(user);
            ctx.page.redirect('/')
        }
    }


    ctx.render(loginTemp(onSubmit))
}

