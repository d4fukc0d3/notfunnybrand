document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");

    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Function to display items in the cart
    function displayCart() {
        cartItemsContainer.innerHTML = ""; // Clear previous items
        let totalPrice = 0; // Initialize total price

        cart.forEach((item, index) => {
            // Create list item container
            const itemDiv = document.createElement("li");
            itemDiv.classList.add("cart");

            // Product images
            const imgFront = document.createElement("img");
            imgFront.src = item.frontImg;
            imgFront.alt = item.name;
            imgFront.classList.add("cart-img");

            const imgBack = document.createElement("img");
            imgBack.src = item.backImg;
            imgBack.alt = item.name;
            imgBack.classList.add("cart-img");

            // Product details
            const productInfo = document.createElement("div");
            productInfo.classList.add("product-info");

            const name = document.createElement("p");
            name.textContent = item.name;

            // Price
            const priceContainer = document.createElement("p");
            priceContainer.textContent = `Price: ${item.price}`;

            const size = document.createElement("p");
            size.textContent = `Size: ${item.size}`;

            productInfo.appendChild(name);
            productInfo.appendChild(priceContainer);
            productInfo.appendChild(size);

            // Convert price: Remove "$" and parse to float
            const numericPrice = parseFloat(item.price.replace("$", "")) || 0;
            totalPrice += numericPrice;

            // Remove button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");
            removeBtn.addEventListener("click", function () {
                removeFromCart(index);
            });

            // Append elements to itemDiv
            itemDiv.appendChild(imgFront);
            itemDiv.appendChild(imgBack);
            itemDiv.appendChild(productInfo);
            itemDiv.appendChild(removeBtn);

            cartItemsContainer.appendChild(itemDiv);
        });

        // Calculate shipping
        const shippingCost = totalPrice >= 1200 ? 0 : 120; // Free shipping for orders > 1200 pesos
        const finalTotal = totalPrice + shippingCost;

        // Display total price and shipping
        const totalDiv = document.createElement("div");
        totalDiv.classList.add("total-price");

        const totalText = document.createElement("p");
        totalText.textContent = `Total (Productos): $${totalPrice.toFixed(2)}`;

        const shippingText = document.createElement("p");
        const remainingForFreeShipping = 1200 - totalPrice;
        
        // Add hover effect to show the amount needed for free shipping
        if (shippingCost === 0) {
            shippingText.textContent = "Envío : Gratis!";
            shippingText.classList.add("free-shipping");
        } else {
            shippingText.textContent = `Envío: $${shippingCost.toFixed(2)}`;
            shippingText.classList.add("shipping-cost");
            // Tooltip message when hovering over the shipping cost
            shippingText.setAttribute("title", `¡Añade $${remainingForFreeShipping.toFixed(2)} en productos para tener envío gratis!`);
        }

        const finalCostText = document.createElement("p");
        finalCostText.textContent = `Total Final: $${finalTotal.toFixed(2)}`;

        // Create "Buy Now" button
        const buyNowButton = document.createElement("a");
        buyNowButton.href = "https://link.mercadopago.com.mx/notfunnybrand";
        buyNowButton.textContent = "Comprar Ahora";
        buyNowButton.target = "_blank"; // Open in new tab
        buyNowButton.classList.add("buy-now-btn"); // Add class for styling

        // Append total price, shipping, final cost, and button
        totalDiv.appendChild(totalText);
        totalDiv.appendChild(shippingText);
        totalDiv.appendChild(finalCostText);
        totalDiv.appendChild(buyNowButton);

        cartItemsContainer.appendChild(totalDiv);
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove item
        localStorage.setItem("cart", JSON.stringify(cart)); // Update storage
        displayCart(); // Refresh cart UI
    }

    // Initial display
    displayCart();
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const localStorageInput = document.getElementById("localStorageData");

    form.addEventListener("submit", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorageInput.value = JSON.stringify(cart); // Store cart data as JSON in the hidden input
    });
});
