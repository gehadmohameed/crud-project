var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productdescription');
var addButton = document.getElementById('addButton');
var inputs = document.getElementsByClassName('form-control');
var currentIndex=0;
var products = [];
if (JSON.parse(localStorage.getItem('productmenue')) != null) {
    products = JSON.parse(localStorage.getItem('productmenue'));
    displayData()
}

addButton.onclick = function () {
    if(addButton.innerHTML=="Add product")
    {
        addProduct();
    }
    else {
        updateProduct()
    }
    displayData();
    clearForm();
}
function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    }
    products.push(product);
    localStorage.setItem('productmenue', JSON.stringify(products))

}
function displayData() {
    var productBox = '';
    for (var i = 0; i < products.length; i++)
        productBox +=
            `
 <tr>
    <td>${products[i].name}</td>
     <td>${products[i].price}</td>
     <td>${products[i].category}</td>
     <td>${products[i].description}</td>
     <td><button onclick='getProductValue(${i})' class='btn btn-outline-warning'>update</button></td>
     <td><button onclick="deleteProduct(${i})" class='btn btn-outline-danger'>delete</button></td>
     </tr>
     `;
    document.getElementById('tablebody').innerHTML = productBox;
}
function deleteProduct(index) {
    products.splice(index, 1);
    displayData();
    localStorage.setItem('productmenue', JSON.stringify(products));

}
function getProductValue (index){
    //console.log(index)
    currentIndex=index;
    var currentProduct=products[index];
    productNameInput.value=currentProduct.name;
    productPriceInput.value=currentProduct.price;
    productCategoryInput.value=currentProduct.category;
    productDescriptionInput.value=currentProduct.description;
    addButton.innerHTML="update product";


}
function updateProduct()
{
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    }
products [currentIndex]=product;
localStorage.setItem('productmenue', JSON.stringify(products));

}
function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

}
function search(text){
 //   console.log(text)
    var productBox = '';
    for (var i = 0; i < products.length; i++)
    if(products[i].name.toLowerCase().includes(text.toLowerCase())) 
    {
        productBox +=
        `<tr>
<td>${products[i].name}</td>
 <td>${products[i].price}</td>
 <td>${products[i].category}</td>
 <td>${products[i].description}</td>
 <td><button class='btn btn-outline-warning'>update</button></td>
 <td><button onclick="deleteProduct(${i})" class='btn btn-outline-danger'>delete</button></td>
 </tr> `;
document.getElementById('tablebody').innerHTML = productBox;
    }
       
}