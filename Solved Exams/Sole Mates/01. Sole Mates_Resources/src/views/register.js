import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const registerTemp = (onSubmit) => html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="login-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">login</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>
`;
export function registerView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (data['re-password'] === '' || data.email === '' || data.password === '') {
            return alert('All fields must be filled!')
        }
        if (data.password !== data['re-password']) {
            return alert('Passwords must match!')
        }

        const user = await request.post('/users/register',
            {
                email: data.email,
                password: data.password,
            })

        if (user.accessToken) {
            setUser(user)
            ctx.page.redirect('/catalog')
        }
    }


    ctx.render(registerTemp(onSubmit))
}