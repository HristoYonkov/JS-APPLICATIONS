import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const registerTemp = (onSubmit) => html`
    <section id="register-page" class="auth">
        <form @submit=${onSubmit} id="register">
            <h1 class="title">Register</h1>
    
            <article class="input-group">
                <label for="register-email">Email: </label>
                <input type="email" id="register-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="register-password">Password: </label>
                <input type="password" id="register-password" name="password">
            </article>
    
            <article class="input-group">
                <label for="repeat-password">Repeat Password: </label>
                <input type="password" id="repeat-password" name="repeatPassword">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Register">
        </form>
    </section>
`;
export function registerView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (data.repeatPassword === '' || data.email === '' || data.password === '') {


            return alert('All fields must be filled!')
        }
        if (data.password !== data.repeatPassword) {


            return alert('Passwords must match!')
        }

        const user = await request.post('/users/register',
            {
                email: data.email,
                password: data.password,
            })

        if (user) {
            setUser(user)
            ctx.page.redirect('/')
        }
    }


    ctx.render(registerTemp(onSubmit))
}