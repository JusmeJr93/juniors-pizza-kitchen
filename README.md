# Junior's Pizza Kitchen

This is a pizza ordering, responsive web application built using modern web technologies. The project showcases a clean UI, smooth animations, and robust state management, making the ordering experience delightful.

## 🛠 Technologies Used

- **Vite**: For fast development and build setup.
- **React**: JavaScript library for building user interfaces.
- **React Router**: To handle in-app navigation.
- **Redux Toolkit**: For state management, helping in maintaining a predictable state container.
- **Thunk**: Redux middleware, used to manage asynchronous functions.
- **REST API:** To fetch and manage data with GET, POST and PATCH requests.
- **Framer Motion**: To add smooth animations for enhanced user interaction.
- **Tailwind CSS**: For styling and responsive design.

## 🛠 Usage

1. **User Greeting:**

   - Upon opening the app, the user is asked to fill out a form with just their name. This name will appear in the header to greet the user. On returning to the homepage, the name is remembered, so the user won’t need to re-enter it.

2. **Navigating the Menu:**

   - After providing their name, the user navigates to the menu (loaded from API) to place an order. Each pizza is detailed with a name, ingredients, price, and image, along with an "Add to Cart" button. Once clicked, this button changes to a "Delete" button, and an interactive combo of "minus" and "plus" buttons allows the user to adjust the quantity of the selected pizza. A footer also appears at the bottom of the page, showing the number of pizzas selected, the subtotal, and a button to open the cart and proceed to order.

3. **Managing the Cart:**

   - The cart displays the selected pizzas along with their prices. Users can adjust the quantity using the same "minus" and "plus" buttons or remove items with the "Delete" button. Additional buttons include one to return to the menu, another to clear the cart, and one to place the order.

4. **Placing an Order:**

   - When ready to order, the user is presented with a form that includes their name (pre-filled with the name provided at the start but editable), phone number (validated with regex), and an address field. The address can be manually entered or automatically filled using the "Get Position" button, which utilizes GPS. The user can edit the GPS-filled address as needed. A checkbox allows the user to select a "Priority" status, which adds 20% to the total price. The final step is clicking the "Order Now!" button, which shows the total price.

5. **Tracking the Order:**

   - After placing the order, the app redirects to an order page displaying the order number, status, time left for delivery, and an option to upgrade to priority if it wasn’t selected earlier.

6. **Order Search:**
   - The header includes a search field where the user can enter an order number to quickly navigate back to the order page and check the status.

## Deployment

The app is deployed using Vercel for easy access. You can visit the live version [here]().
