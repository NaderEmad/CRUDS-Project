let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let createButton = document.getElementById('create');
let buttonMood = 'create';
let searchMood = 'searchByTitle';
let tempIndex;

// Get Total Price
function getTotalPrice() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}


// Create Product
let productsData;
if (localStorage.productData != null) {
    productsData = JSON.parse(localStorage.productData);
    showData();
}
else {
    productsData = [];
}

createButton.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        newProduct.count <= 100) {
        if (buttonMood === 'create') {
            if (newProduct.count > 0) {
                for (let i = 0; i < newProduct.count; i++) {
                    productsData.push(newProduct);
                }
            }
            else {
                alert("Count must be more than 0");
            }
        }
        else {
            productsData[tempIndex] = newProduct;
            buttonMood = 'create';
            createButton.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearInputData();
    }

    localStorage.setItem('productData', JSON.stringify(productsData));

    showData();
}


// Clear Inputs
function clearInputData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = 'red';
}


// Read (Show Data)
function showData() {
    let table = '';
    for (let i = 0; i < productsData.length; i++) {
        table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                `;
    }
    document.getElementById('tableBody').innerHTML = table;

    // Delete All Button
    if (productsData.length > 0) {
        document.getElementById('deleteAll').innerHTML =
            `<button onclick="deleteAllData()">Delete All (${productsData.length})</button>`;
    }
    else {
        document.getElementById('deleteAll').innerHTML = '';
    }
}


// Delete Data
function deleteData(i) {
    productsData.splice(i, 1);
    localStorage.productData = JSON.stringify(productsData);
    showData();
}

function deleteAllData() {
    productsData.splice(0);
    localStorage.clear();
    showData();
}


// Update Data
function updateData(i) {
    title.value = productsData[i].title;
    price.value = productsData[i].price;
    taxes.value = productsData[i].taxes;
    ads.value = productsData[i].ads;
    discount.value = productsData[i].discount;
    category.value = productsData[i].category;
    getTotalPrice();
    count.style.display = 'none';
    createButton.innerHTML = 'Update';
    buttonMood = 'update';
    tempIndex = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


// Searching
function changeSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchByTitle') {
        searchMood = 'searchByTitle';
        search.placeholder = "Search By Title";
    }
    else {
        searchMood = 'searchByCategory';
        search.placeholder = "Search By Category";
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < productsData.length; i++) {
        if (searchMood === 'searchByTitle' &&
            productsData[i].title.toLowerCase().includes(value.toLowerCase())
        ) {
            table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                `;
        }
        else if (searchMood === 'searchByCategory' &&
            productsData[i].category.toLowerCase().includes(value.toLowerCase())
        ) {
            table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                `;
        }

    }
    document.getElementById('tableBody').innerHTML = table;
}