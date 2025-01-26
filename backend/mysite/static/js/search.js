search_box.addEventListener("input", async function () {
    const query = search_box.value.trim();

    if (query) {
        try {
            const response = await fetch(`/ajax-search/?q=${query}`);
            const data = await response.json();

            dropdown.innerHTML = "";

            if (data.products.length > 0) {
                data.products.forEach(product => {
                    const item = document.createElement("a");
                    item.textContent = product.name;
                    item.href = product.url; 
                    item.className = "dropdown-item";
                    dropdown.appendChild(item);
                });

                dropdown.style.display = "block";
            } else {
                dropdown.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    } else {
        dropdown.style.display = "none";
    }
});
