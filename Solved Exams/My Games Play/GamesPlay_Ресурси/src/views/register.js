import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const registerTemp = (onSubmit) => html`
    <section id="register-page" class="content auth">
        <form @submit=${onSubmit} id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">
    
                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">
    
                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">
    
                <input class="btn submit" type="submit" value="Register">
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;
export function registerView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (data['confirm-password'] === '' || data.email === '' || data.password === '') {
            return alert('All fields must be filled!')
        }
        if (data.password !== data['confirm-password']) {
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