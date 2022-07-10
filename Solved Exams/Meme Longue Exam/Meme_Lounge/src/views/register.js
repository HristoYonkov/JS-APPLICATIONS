import { html } from "../../node_modules/lit-html/lit-html.js";
import * as request from '../services/api.js'
import { setUser } from "../services/userService.js";

const registerTemp = (onSubmit) => html`
    <section id="register">
        <form @submit=${onSubmit} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;
export function registerView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        
        if(data.username === '' || data.email === '' || data.password === '') {

            const box = document.getElementById('errorBox')
            box.style.display = 'inline';
            const span = box.children[0]
            span.textContent = 'All fields are required!'

            setTimeout(() => {
                box.style.display = 'none';
            }, 3000)

            return 
        }
        if (data.password !== data.repeatPass) {
            
            const box = document.getElementById('errorBox')
            box.style.display = 'inline';
            const span = box.children[0]
            span.textContent = 'Password must match!'

            setTimeout(() => {
                box.style.display = 'none';
            }, 3000)

            return
        }

        const user = await request.post('/users/register', 
            {
                username: data.username,
                email: data.email,
                password: data.password,
                gender: data.gender
            })

            if (user) {
                setUser(user)
                ctx.page.redirect('/catalog')
            }
    }

    
    ctx.render(registerTemp(onSubmit))
}