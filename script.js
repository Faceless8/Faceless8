// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the cart icon and its link
    const cartIcon = document.querySelector('.cart');
    const cartLink = document.getElementById('cart-link');

    // Function to update cart icon size based on window width
    function updateCartIconSize() {
        const windowWidth = window.innerWidth;

        // Adjust the font size of the cart icon for smaller screens
        if (windowWidth <= 768) {
            cartIcon.style.fontSize = '1.5em';
        } else {
            // Set a default font size for larger screens
            cartIcon.style.fontSize = '2em';
        }
    }

    // Initial call to set the cart icon size on page load
    updateCartIconSize();

    // Update cart icon size when the window is resized
    window.addEventListener('resize', updateCartIconSize);
});
document.addEventListener("DOMContentLoaded", function () {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const sizeSelect = document.querySelector('#prodetails select');
    const quantityInput = document.querySelector('#prodetails input[type="number"]');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountSpan = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cart = [];  // Array to store cart items locally on the client side

    addToCartBtn.addEventListener('click', function () {
        const selectedSize = sizeSelect.value;
        const quantity = parseInt(quantityInput.value);

        if (selectedSize === 'Select Size' || isNaN(quantity) || quantity <= 0) {
            alert('Please select a size and enter a valid quantity.');
            return;
        }

        const cartItem = {
            name: "Men's Fashion T Shirt",
            price: 78,
            size: selectedSize,
            quantity: quantity,
        };

        // Add the item to the local cart array
        cart.push(cartItem);

        // Update the cart page
        updateCartPage();

        // Optionally, you can update the UI or perform other actions
    });

    // Function to update the cart page
    function updateCartPage() {
        // Clear the existing cart items
        cartItemsContainer.innerHTML = '';

        // Update the cart items on the page
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>${item.name} - Size: ${item.size} - Quantity: ${item.quantity} - Price: $${item.price * item.quantity}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Calculate and update the total amount
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalAmountSpan.textContent = `$${totalAmount}`;

        // Enable or disable the checkout button based on the cart content
        checkoutBtn.disabled = cart.length === 0;
    }

    // Add an event listener for the checkout button
    checkoutBtn.addEventListener('click', function () {
        alert('Implement your checkout logic here.');
        // You can redirect to a checkout page or handle payment processing.
    });

    // Call updateCartPage on page load to set the initial cart state
    updateCartPage();
});


