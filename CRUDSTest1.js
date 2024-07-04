let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let createButton = document.getElementById('create');


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
    if (newProduct.count > 0) {
        for (let i = 0; i < newProduct.count; i++) {
            productsData.push(newProduct);
        }
    }
    else {
        alert("Count must be more than 0");
    }

    localStorage.setItem('productData', JSON.stringify(productsData));

    clearInputData();
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
                        <td><button id="update">Update</button></td>
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