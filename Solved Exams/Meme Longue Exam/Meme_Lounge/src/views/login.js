import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const loginTemp = (onSubmit) => html`
    <section id="login">
        <form @submit=${onSubmit} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
`

export async function loginView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (data.email === '' || data.password === '') {
            const box = document.getElementById('errorBox')
            box.style.display = 'inline';
            const span = box.children[0]
            span.textContent = 'All fields are required!'
            
            setTimeout(() => {
                box.style.display = 'none';
            }, 3000)

            return
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

