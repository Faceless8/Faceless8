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
document.addEventListener('DOMContentLoaded', function () {
    var cartLink = document.getElementById('cart-link');
    var cartItemsContainer = document.getElementById('cart-items');
    var totalAmountElement = document.getElementById('total-amount');
    var checkoutBtn = document.getElementById('checkout-btn');

    // Initialize cart
    var cart = [];

    // Add item to cart
    function addToCart(item) {
        cart.push(item);
        updateCart();
    }

    // Update cart UI
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        var totalAmount = 0;

        cart.forEach(function (item) {
            var cartItem = document.createElement('div');
            cartItem.innerHTML = item.name + ' - $' + item.price;
            cartItemsContainer.appendChild(cartItem);

            totalAmount += item.price;
        });

        totalAmountElement.textContent = '$' + totalAmount;
    }

    // Handle "Add to Cart" click
    cartLink.addEventListener('click', function () {
        var itemName = 'Product'; // Replace with actual item name
        var itemPrice = 49; // Replace with actual item price
        addToCart({ name: itemName, price: itemPrice });
    });

    // Handle checkout button click
    checkoutBtn.addEventListener('click', function () {
        // Implement your checkout logic here
        alert('Checkout clicked!');
    });
});
$(document).ready(function() {
	var productItem = [{
			productName: "FinePix Pro2 3D Camera",
			price: "1800.00",
			photo: "camera.jpg"
		},
		{
			productName: "EXP Portable Hard Drive",
			price: "800.00",
			photo: "external-hard-drive.jpg"
		},
		{
			productName: "Luxury Ultra thin Wrist Watch",
			price: "500.00",
			photo: "laptop.jpg"
		},
		{
			productName: "XP 1155 Intel Core Laptop",
			price: "1000.00",
			photo: "watch.jpg"
		}];
	showProductGallery(productItem);
});

function showProductGallery(product) {
	//Iterate javascript shopping cart array
	var productHTML = "";
	product.forEach(function(item) {
		productHTML += '<div class="product-item">'+
					'<img src="product-images/' + item.photo + '">'+
					'<div class="productname">' + item.productName + '</div>'+
					'<div class="price">$<span>' + item.price + '</span></div>'+
					'<div class="cart-action">'+
						'<input type="text" class="product-quantity" name="quantity" value="1" size="2" />'+
						'<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />'+
					'</div>'+
				'</div>';
				"<tr>";
		
	});
	$('#product-item-container').html(productHTML);
}
function addToCart(element) {
	var productParent = $(element).closest('div.product-item');

	var price = $(productParent).find('.price span').text();
	var productName = $(productParent).find('.productname').text();
	var quantity = $(productParent).find('.product-quantity').val();

	var cartItem = {
		productName: productName,
		price: price,
		quantity: quantity
	};
	var cartItemJSON = JSON.stringify(cartItem);

	var cartArray = new Array();
	// If javascript shopping cart session is not empty
	if (sessionStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
	}
	cartArray.push(cartItemJSON);

	var cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem('shopping-cart', cartJSON);
	showCartTable();
}
function emptyCart() {
	if (sessionStorage.getItem('shopping-cart')) {
		// Clear JavaScript sessionStorage by index
		sessionStorage.removeItem('shopping-cart');
		showCartTable();
	}
}
function showCartTable() {
	var cartRowHTML = "";
	var itemCount = 0;
	var grandTotal = 0;

	var price = 0;
	var quantity = 0;
	var subTotal = 0;

	if (sessionStorage.getItem('shopping-cart')) {
		var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		itemCount = shoppingCart.length;

		//Iterate javascript shopping cart array
		shoppingCart.forEach(function(item) {
			var cartItem = JSON.parse(item);
			price = parseFloat(cartItem.price);
			quantity = parseInt(cartItem.quantity);
			subTotal = price * quantity

			cartRowHTML += "<tr>" +
				"<td>" + cartItem.productName + "</td>" +
				"<td class='text-right'>$" + price.toFixed(2) + "</td>" +
				"<td class='text-right'>" + quantity + "</td>" +
				"<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
				"</tr>";

			grandTotal += subTotal;
		});
	}

	$('#cartTableBody').html(cartRowHTML);
	$('#itemCount').text(itemCount);
	$('#totalAmount').text("$" + grandTotal.toFixed(2));
}