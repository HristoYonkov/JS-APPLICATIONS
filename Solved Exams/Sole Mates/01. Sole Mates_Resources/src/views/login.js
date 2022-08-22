import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const loginTemp = (onSubmit) => html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                </p>
            </form>
        </div>
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

        if (user.accessToken) {
            setUser(user);
            ctx.page.redirect('/catalog')
        }
    }


    ctx.render(loginTemp(onSubmit))
}

