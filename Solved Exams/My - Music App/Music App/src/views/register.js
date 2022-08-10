import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const registerTemp = (onSubmit) => html`
    <section id="registerPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Register</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
    
                <button type="submit" class="register">Register</button>
    
                <p class="field">
                    <span>If you already have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;
export function registerView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        
        if(data['conf-pass'] === '' || data.email === '' || data.password === '') {


            return alert('All fields must be filled!')
        }
        if (data.password !== data['conf-pass']) {
            

            return  alert('Passwords must match!')
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