const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const addName = document.querySelector('#name');
const addPrice = document.querySelector('#price');
const addDescription = document.querySelector('#description');
const updateForm = document.querySelector('#update-product-form');
const updateId = document.querySelector('#update-id');
const updateName = document.querySelector('#update-name');
const updatePrice = document.querySelector('#update-price');
const updateDescription = document.querySelector('#update-description');
const cancelUpdate = document.querySelector('#cancel-update');


// Fetch Products
async function fetchProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');

        li.innerHTML = `
      ${product.name} - $${product.price} - ${product.description}
    `;

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async () => {
            await deleteProduct(product.id);
            fetchProducts();
        };

        // Update Button
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
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


// Load initial list
fetchProducts();
