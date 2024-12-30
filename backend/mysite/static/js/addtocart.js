function price() {
    const rows = document.querySelectorAll('tbody tr');
    let subtotal = 0;

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

    // Update subtotal, tax, and total
    const subtotalElement = document.querySelector('.total-price tr:nth-child(1) td:nth-child(2)');
    const taxElement = document.querySelector('.total-price tr:nth-child(2) td:nth-child(2)');
    const totalElement = document.querySelector('.total-price tr:nth-child(3) td:nth-child(2)');

    if (subtotalElement && taxElement && totalElement) {
        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        const tax = subtotal * 0.15; // Assuming a 15% tax rate
        taxElement.innerText = `$${tax.toFixed(2)}`;
        totalElement.innerText = `$${(subtotal + tax).toFixed(2)}`;
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
            window.location.href = "visa-payment.html";
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
function addRow(imageUrl = 'https://via.placeholder.com/50', productName = 'New Product', price = 0, quantity = 1) {
    const table = document.querySelector('tbody');

    //creates a row and add the elements in their respective cells
    const newRow = document.createElement('tr');

    // Remove button column
    //creates cell for remove button
    const removeCell = document.createElement('td');
    //creates the actual remove button using the class fa fa-trash
    const al = document.createElement('a');
    const ielem = document.createElement('i');
    //style
    ielem.className="fa fa-trash-o";
    ielem.style.fontSize= "24px";
    ielem.style.color = 'blue'
    //append the button in the a element
    al.appendChild(ielem);
    //ensure the functionality of the remove button onclick
    ielem.onclick = function () {
        deleteItem(this);
    };
    //append the a element into the cell and the cell into the row
    removeCell.appendChild(al);
    newRow.appendChild(removeCell);

    //same as last creates a cell for image then starts a pyramid like appending
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
    priceCell.textContent = `$${price.toFixed(2)}`;
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
    // to call the price function inside  oninput function
    function myprice(){
        this.price();
    }
    // Append the new row to the table
    table.appendChild(newRow);
    myprice();

    
    quantityInput.oninput  = function(){
        totalCell.textContent=`$${(price * quantityInput.value).toFixed(2)}`;
        myprice()
    }
    // Update subtotal, tax, and total after adding the row
}
function navigateWithData(image,name,price,quantity) {
    const data = {
        imageUrl: image,
        productName: name,
        price: price,
        quantity: quantity
    };
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `./addtocart.html?${queryString}`;
}
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const imageUrl = params.get('imageUrl');
    const productName = params.get('productName');
    const price = parseFloat(params.get('price'));
    const quantity = parseInt(params.get('quantity'));

    if (imageUrl && productName && price && quantity) {
        addRow(imageUrl, productName, price, quantity);
    }
}


window.onload = getQueryParams;


