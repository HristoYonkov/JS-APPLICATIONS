import { html } from "../../node_modules/lit-html/lit-html.js";
import { setUser } from "../services/userServices.js";


const loginTemplate = (onSubmit) => html`
    <section id="login">
        <div class="container">
            <form @submit=${onSubmit} id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>
                
                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">
                
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>
    `;


export function loginView(ctx) {
    
    async function onSubmit(event) {
        event.preventDefault();
        const host = 'http://localhost:3030';

        const formData = Object.fromEntries(new FormData(event.target));
        
        const response = await fetch(host + '/users/login', {
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
    
    ctx.render(loginTemplate(onSubmit));
}