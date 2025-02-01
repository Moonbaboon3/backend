function price() {
    const rows = document.querySelectorAll('tbody tr');
    let subtotal = 0;

    // Calculate subtotal
    rows.forEach(row => {
        const priceElement = row.querySelector('#price');
        const quantityElement = row.querySelector('.quantity');
        const totalElement = row.querySelector('.total');

        if (priceElement && quantityElement && totalElement) {
            const price = parseFloat(priceElement.innerText.replace('$', ''));
            const quantity = parseInt(quantityElement.value);
            const total = price * quantity;

            // Update the total column
            totalElement.innerText = `$${total.toFixed(2)}`;

            // Accumulate the subtotal
            subtotal += total;
        } else {
            console.error('Missing element in row:', row);
        }
    });

    // Calculate tax and total
    const taxRate = 0.15; // 15% tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Update the DOM nodes
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    if (subtotalElement && taxElement && totalElement) {
        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        taxElement.innerText = `$${tax.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;
    } else {
        console.error('Error');
    }
}

function deleteItem(element) {
    const row = element.closest('tr');
    if (row) {
        row.remove();
        price();
    }
}

function checkout() {
    // Get the selected payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    
    if (paymentMethod) {
        const selectedMethod = paymentMethod.value;
        alert(`You selected ${selectedMethod} as your payment method.`);
        
        // Perform further actions like redirecting to a payment gateway or finalizing the order
        if (selectedMethod === "Visa") {
            // Redirect to a Visa payment page (example action)
            window.location.href = "checkout.html";
        } else if (selectedMethod === "Cash") {
            // Show confirmation for cash payment
            alert("Please prepare the cash amount for delivery.");
        }
    } else {
        alert("Please select a payment method before proceeding.");
    }
}

function payWithVisa() {
    
// Validation for Visa Payment Form
document.querySelector('.btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardHolder = document.getElementById('card-holder').value.trim();
    const expirationDate = document.getElementById('expiration-date').value;
    const cvv = document.getElementById('cvv').value.trim();

    const cvvPattern = /^\d{3}$/; 
    const cardNumberPattern = /^\d{16}$/;
    if (!cardNumberPattern.test(cardNumber)) {
        alert('Please enter a valid card number should be 16 digits.');
        return;
    }

    if (cardHolder.length === 0) {
        alert('Card holder name cannot be empty.');
        return;
    }

    if (new Date(expirationDate) < new Date()) {
        alert('The expiration date must be in the future.');
        return;
    }

    if (!cvvPattern.test(cvv)) {
        alert('Please enter a valid 3-digit CVV.');
        return;
    }
    alert('Payment successful! Thank you for your purchase.');
});


}
//////////////////////////////
function addRow(imageUrl = 'https://via.placeholder.com/50', productName = 'New Product', _price = 0, quantity = 1) {
    const table = document.querySelector('tbody');

    // Create a new row and add the elements
    const newRow = document.createElement('tr');

    // Remove button column
    const removeCell = document.createElement('td');
    const al = document.createElement('a');
    const ielem = document.createElement('i');
    ielem.className = "fa fa-trash-o";
    ielem.style.fontSize = "24px";
    ielem.style.color = 'blue';
    al.appendChild(ielem);
    ielem.onclick = function () {
        deleteItem(this);
    };
    removeCell.appendChild(al);
    newRow.appendChild(removeCell);

    // Image column
    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = 'Product Image';
    image.style.width = '50px';
    imageCell.appendChild(image);
    newRow.appendChild(imageCell);

    // Product column
    const productCell = document.createElement('td');
    productCell.textContent = productName;
    newRow.appendChild(productCell);

    // Price column
    const priceCell = document.createElement('td');
    priceCell.id = 'price';
    priceCell.textContent = `$${_price.toFixed(2)}`;
    newRow.appendChild(priceCell);

    // Quantity column
    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = quantity;
    quantityInput.min = 1;
    quantityInput.classList.add('quantity');
    quantityCell.appendChild(quantityInput);
    newRow.appendChild(quantityCell);

    // Total column
    const totalCell = document.createElement('td');
    totalCell.classList.add('total');
    totalCell.textContent = `$${(price * quantity).toFixed(2)}`;
    newRow.appendChild(totalCell);

    // Append the new row to the table
    table.appendChild(newRow);

    // Call the price function to update totals
    price();

    // Send the product data to the Django backend
    fetch('/add-to-cart/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': '{{ csrf_token }}', // Include CSRF token for security
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageUrl: imageUrl,
            productName: productName,
            price: _price,
            quantity: quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Product added to cart on the server.');
        } else {
            console.error('Failed to add product to cart on the server.');
        }
    });


    // Update total when quantity changes
    quantityInput.oninput = function () {
        totalCell.textContent = `$${(price * quantityInput.value).toFixed(2)}`;
        price();
    };
}


function navigateWithData(image, name, _price, quantity) {
    
    const data = {
        imageUrl: image,
        productName: name,
        price: _price,
        quantity: quantity
    }
    
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/cart/?${queryString}`;
}


function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const imageUrl = params.get('imageUrl');
    const productName = params.get('productName');
    const _price = parseFloat(params.get('price'));
    const quantity = parseInt(params.get('quantity'));

    if (imageUrl && productName && _price && quantity) {
        addRow(imageUrl, productName, _price, quantity);
    }
}

function loadCart() {
    fetch('/get-cart/')  
        .then(response => response.json())
        .then(cart => {
            const table = document.querySelector('tbody');
            for (const [productName, item] of Object.entries(cart)) {
                const existingRow = Array.from(table.rows).find(row => 
                    row.querySelector('td:nth-child(3)').textContent === productName
                );
                if (!existingRow) {
                    addRow(item.imageUrl, productName, item.price, item.quantity);
                }
            }
        });
}

window.onload = loadCart;

window.onload = getQueryParams;


