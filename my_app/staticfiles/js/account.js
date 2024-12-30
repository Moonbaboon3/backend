// Function to load profile data from the selected txt file
function loadProfileData(fileContent) {
    try {
        const profileData = JSON.parse(fileContent);
        document.getElementById("nameDisplay").innerText = profileData.name || "N/A";
        document.getElementById("emailDisplay").innerText = profileData.email || "N/A";
        document.getElementById("birthdayDisplay").innerText = profileData.birthday || "N/A";
        document.getElementById("addressDisplay").innerText = profileData.address || "N/A";
        document.getElementById("phoneDisplay").innerText = profileData.phone || "N/A";
        alert("Profile loaded successfully!");
        document.getElementById("editProfileBtn").style.display = "inline-block"; // Show edit button
    } catch (e) {
        console.error("Error parsing profile data:", e);
        alert("Failed to load profile data. Ensure the file is in the correct format.");
    }
}

// Function to handle file input and load profile data
document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            loadProfileData(e.target.result);
        };
        reader.readAsText(file);
    }
});

// Function to enable editing
function enableEditing() {
    // Show input fields for editing
    document.getElementById("nameDisplay").innerHTML = `<input type="text" id="nameInput" value="${document.getElementById("nameDisplay").innerText}">`;
    document.getElementById("emailDisplay").innerHTML = `<input type="email" id="emailInput" value="${document.getElementById("emailDisplay").innerText}">`;
    document.getElementById("birthdayDisplay").innerHTML = `<input type="date" id="birthdayInput" value="${document.getElementById("birthdayDisplay").innerText}">`;
    document.getElementById("addressDisplay").innerHTML = `<input type="text" id="addressInput" value="${document.getElementById("addressDisplay").innerText}">`;
    document.getElementById("phoneDisplay").innerHTML = `<input type="text" id="phoneInput" value="${document.getElementById("phoneDisplay").innerText}">`;

    // Hide the edit button and show the save button
    document.getElementById("editProfileBtn").style.display = "none";
    document.getElementById("saveProfileBtn").style.display = "inline-block";
}

// Function to save profile data
function saveProfileData() {
    const profileData = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        birthday: document.getElementById("birthdayInput").value,
        address: document.getElementById("addressInput").value,
        phone: document.getElementById("phoneInput").value
    };

    // Create a blob with the updated profile data
    const blob = new Blob([JSON.stringify(profileData)], { type: "application/json" });

    // Create a download link to trigger the "download" of the updated profile data
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "profileData.txt";  // Save it as profileData.txt file
    link.click();

    alert("Profile saved. Please update the profileData.txt file on your system.");
}

// Attach event listeners
document.getElementById("loadProfileBtn").addEventListener("click", function () {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            loadProfileData(e.target.result);
        };
        reader.readAsText(file);
    } else {
        alert("Please upload a profile data file.");
    }
});

document.getElementById("editProfileBtn").addEventListener("click", enableEditing);
document.getElementById("saveProfileBtn").addEventListener("click", saveProfileData);
