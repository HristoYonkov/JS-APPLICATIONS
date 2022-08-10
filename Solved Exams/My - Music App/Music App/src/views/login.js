import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const loginTemp = (onSubmit) => html`
    <section id="loginPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Login</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <button type="submit" class="login">Login</button>
    
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
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
        
        
        if (user.accessToken) {
            setUser(user);
            ctx.page.redirect('/')
        }
    }


    ctx.render(loginTemp(onSubmit))
}

