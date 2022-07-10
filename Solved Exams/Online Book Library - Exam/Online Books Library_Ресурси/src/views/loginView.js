import { html } from "../../node_modules/lit-html/lit-html.js";
import { setUser } from "../services/userService.js";

const loginTemplate = (onSubmit) => html`
    <!-- Login Page ( Only for Guest users ) -->
    <section id="login-page" class="login">
        <form @submit=${onSubmit} id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>
`;

export function loginView(ctx) {
    const host = 'http://localhost:3030';

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        const response = await fetch(host+'/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        });
        const user = await response.json();

        if (user.accessToken) {
            setUser(user);
            ctx.page.redirect('/');
        } else {
            alert(user.message)
        }
    }

    ctx.render(loginTemplate(onSubmit));
}