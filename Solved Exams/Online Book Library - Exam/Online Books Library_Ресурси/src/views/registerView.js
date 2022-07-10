import { html } from "../../node_modules/lit-html/lit-html.js";
import { setUser } from "../services/userService.js";


const registerTemplate = (onSubmit) => html`
    <!-- Register Page ( Only for Guest users ) -->
    <section id="register-page" class="register">
        <form @submit=${onSubmit} id="register-form" action="" method="">
            <fieldset>
                <legend>Register Form</legend>
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
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                        <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>
`;


export function registerView(ctx, next) {
    const host = 'http://localhost:3030';

    async function onSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));

        if (data.password == '' || data['confirm-pass'] == '' || data.email == '') {
            alert('All fields must be filled');
            return;
        }
        if (data.password != data['confirm-pass']) {
            alert('Passwords should be equal');
            return;
        }

        const response = await fetch(host+'/users/register', {
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

    ctx.render(registerTemplate(onSubmit));
}