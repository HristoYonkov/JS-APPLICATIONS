import { html } from "../../node_modules/lit-html/lit-html.js";
import { getToken } from "../services/userServices.js";


const createTemplate = (onSubmit) => html`
    <section id="create-listing">
        <div class="container">
            <form @submit=${onSubmit} id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">
    
                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
`;

export function createView(ctx) {

    async function onSubmit(event) {
        event.preventDefault();
        const host = 'http://localhost:3030';
        const formData = Object.fromEntries(new FormData(event.target));
        const token = getToken();
        
        if (Object.values(formData).some(v => v == '')) {
            return alert('All fields are required');
        }
        if (formData.price < 0 || formData.year < 0) {
            return alert('Values must be positive numbers');
        }

        const response = await fetch(host + '/data/cars', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                brand:formData.brand,
                model:formData.model,
                description:formData.description,
                year:Number(formData.year),
                imageUrl:formData.imageUrl,
                price:Number(formData.price)
            })
        });
        const cars = await response.json();

        if (response.ok) {
            ctx.page.redirect('/catalog');
        }
    }

    ctx.render(createTemplate(onSubmit));
}