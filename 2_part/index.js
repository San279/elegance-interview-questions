
var product_container = document.getElementById("product_container")
var chosen_product = document.getElementById("chosen_product")
const product_db = [
    { "id": 1, "name": "Laptop", 
        "url" : "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "price": 50000 },
    { "id": 2, "name": "Smartphone", 
        "url" : "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "price": 20000 },
    { "id": 3, "name": "Tablet", 
        "url" : "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "price": 15000 }
  ]

function selectProduct(){
    //console.log(this.id)
    let chosenProduct
    for(let i = 0; i < product_db.length; i++){
        let product = product_db[i]
        console.log(product.id)
        if (product.id == this.id){
            chosenProduct = product
        }
    }

    console.log(chosenProduct)
    chosen_product.innerHTML = "You have selected " + chosenProduct.name + 
    " with price tag of " + chosenProduct.price + "฿"
}
function createProductCard(obj){
    const product = document.createElement('div')
    const productImage = document.createElement("img")
    const productInfo = document.createElement('div')
    const productName = document.createElement('h3')
    const productPrice = document.createElement('h3')
    product.id = obj.id

    product.addEventListener("click", selectProduct);
    product.classList.add("product-card")
    productImage.classList.add("product-img")
    productInfo.classList.add("product-info")
    productName.classList.add("product-name")
    productPrice.classList.add('product-price')

    productName.innerHTML = obj.name
    productImage.src = obj.url
    productPrice.innerHTML = obj.price + " ฿"
    product_container.appendChild(product)
    product.appendChild(productImage)
    product.appendChild(productInfo)
    productInfo.appendChild(productName)
    productInfo.appendChild(productPrice)
}

function showProduct(){
    for(let i = 0; i < product_db.length; i++){
        let product = product_db[i]
        createProductCard(product)
    }
} 

showProduct()