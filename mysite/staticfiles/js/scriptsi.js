function validateForm(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const namePattern = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!namePattern.test(username)) {
        alert("Please enter a valid name");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }

    window.location.href = "/HomePage.html";
    return true;
}

function submitForm(event) {
    event.preventDefault();

    if (!validateForm(event)) {
        return;
    }

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://your-server-endpoint-url", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Signup successful!");
        } else if (xhr.readyState === 4) {
            alert("There was an error during signup. Please try again.");
        }
    };

    const data = `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    xhr.send(data);
}
