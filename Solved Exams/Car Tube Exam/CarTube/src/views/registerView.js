import { html } from "../../node_modules/lit-html/lit-html.js";
import { setUser } from "../services/userServices.js";

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <div class="container">
            <form @submit=${onSubmit} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
                
                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>
                
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>
                
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>
                
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
    `;


export function registerView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const host = 'http://localhost:3030';

        const formData = Object.fromEntries(new FormData(event.target));
        
        if (formData.username === '' || formData.password === '' || formData.repeatPass === '') {
            return alert('All fields must be filled');
        }
        if (formData.password !== formData.repeatPass) {
            return alert('Passwords must be equal');
        }
        
        const response = await fetch(host + '/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        });
        const result = await response.json();

        if (!result.accessToken) {
            event.target.reset();
            return alert(result.message)
        }
        
        event.target.reset();
        setUser(result);
        ctx.page.redirect('/');
    }

    ctx.render(registerTemplate(onSubmit))
} 
