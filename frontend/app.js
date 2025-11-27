const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const addName = document.querySelector('#name');
const addPrice = document.querySelector('#price');
const addDescription = document.querySelector('#description');
const buttonSearch = document.querySelector('#search-button');
//
const updateForm = document.querySelector('#update-product-form');
const updateId = document.querySelector('#update-id');
const updateName = document.querySelector('#update-name');
const updatePrice = document.querySelector('#update-price');
const updateDescription = document.querySelector('#update-description');
const cancelUpdate = document.querySelector('#cancel-update');
//
const idProductsList = document.querySelector('#id-products');
const idProductForm = document.querySelector('#id-product-form');
const idSearch = document.querySelector('#search-button-id');
const idBack = document.querySelector('#back-button-id');
const id = document.querySelector('#ID')

// Fetch Products
async function fetchProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');

        li.innerHTML = "ID:" + product.id + "<br>" + "Name: " + product.name + "<br>" + "Price: R$ " + product.price + "<br>" + "Description: " + product.description;

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.id = 'button-delete';
        deleteBtn.onclick = async () => {
            await deleteProduct(product.id);
            fetchProducts();
        };

        // Update Button
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.id = 'button-update';
        updateBtn.onclick = () => {
            loadProductIntoForm(product);
        };

        li.appendChild(deleteBtn);
        li.appendChild(updateBtn);

        productList.appendChild(li);
    });
}

// Add product
addProductForm.addEventListener('submit', async event => {
    event.preventDefault();

    await addProduct(addName.value, addPrice.value, addDescription.value);

    addProductForm.reset();
    fetchProducts();
});

async function addProduct(name, price, description) {
    return fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description })
    });
}

// Load product
function loadProductIntoForm(product) {
    updateId.value = product.id;
    updateName.value = product.name;
    updatePrice.value = product.price;
    updateDescription.value = product.description;

    updateForm.classList.remove('hidden');
    addProductForm.classList.add('hidden');
}

// Update product
updateForm.addEventListener('submit', async event => {
    event.preventDefault();

    const id = updateId.value;

    await updateProduct(id, updateName.value, updatePrice.value, updateDescription.value);

    updateForm.reset();
    updateForm.classList.add('hidden');
    addProductForm.classList.remove('hidden');

    fetchProducts();
});

async function updateProduct(id, name, price, description) {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description })
    });
}

// Delete product
async function deleteProduct(id) {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
    });
}

// Cancel update
cancelUpdate.onclick = () => {
    updateForm.reset();
    updateForm.classList.add('hidden');
    addProductForm.classList.remove('hidden');
};

// Search button
buttonSearch.onclick = () => {
    updateForm.classList.add('hidden');
    addProductForm.classList.add('hidden');
    idProductForm.classList.remove('hidden')
}

// Back button
idBack.onclick = () => {
    updateForm.classList.add('hidden');
    addProductForm.classList.remove('hidden');
    idProductForm.classList.add('hidden');
}



//
async function fetchProductById(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    if (!response.ok) return null;
    return await response.json();
}

idSearch.onclick = async () => {
    const productId = id.value.trim();

    idProductsList.innerHTML = '';

    if (productId === "") {
        idProductsList.innerHTML = "<li>Enter a valid value</li>";
        return;
    }

    let product = await fetchProductById(productId);

    if (Array.isArray(product)) {
        product = product[0];
    }

    if (!product) {
        idProductsList.innerHTML = "<li>Product not found</li>";
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = "ID:" + product.id + "<br>" + "Name: " + product.name + "<br>" + "Price: R$ " + product.price + "<br>" + "Description: " + product.description;

    idProductsList.appendChild(li);
};

// Load initial list
fetchProducts();
