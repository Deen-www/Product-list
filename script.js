// Let's select our elements
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartCount = document.querySelector(".count");
const orderTotal = document.querySelector(".order-total");
const carbonNeutral = document.querySelector(".carbon-neutral");
let confirmOrderBtn = document.querySelector(".confirm-order-btn");
let cartIllustrationIcon = document.querySelector(".cart-illustration-icon");
let cartMessage = document.querySelector(".cart-message");


// Let's get the buttons respond to click and make cart to count
let totalCount = 0;
let cart = [];

addToCartBtns.forEach(button => {

    button.addEventListener("click", (e) => {
      
      let product = e.currentTarget.closest(".product");
      let addToCartWrapper = product.querySelector(".add-to-cart");
      let quantityWrapper = product.querySelector(".quantity");
      let qtn = product.querySelector(".qtn");
      let productName = product.dataset.name;
      let productPrice = Number(product.dataset.price);
      
      
      qtn.textContent = 1;
      addToCartWrapper.style.display = "none";
      quantityWrapper.classList.add("show");
      cartIllustrationIcon.style.display = "none";
      cartMessage.style.display = "none";

      totalCount++;
      cartCount.textContent = totalCount;

      let data = {

         name: productName,
         price: productPrice,
         quantity: qtn.textContent,
         removeIcon: "assets/icons/icon-remove-item.svg"
      }

      cart.push(data);
      let total = data.price * data.quantity;
      
      // This is a cart empty container in our HTML
      const productContainer = document.querySelector(".display");

      // Let's create its children
      let displayProduct = document.createElement("div");
      displayProduct.className = "display-product";


      //let's create its grandchildrens

      //displayProduct
      let productInfo = document.createElement("div");
      productInfo.id = "product-details";

        //These will be children to productInfo
        let heading = document.createElement("h3");
        let div = document.createElement("div");
          // these will be inside the div
          let quantity = document.createElement("strong");
          quantity.id = "qtn";
          let price = document.createElement("p");
          let totalQuantity = document.createElement("strong");
          totalQuantity.id = "total-qtn";

      let deleteIcon = document.createElement("img");

      heading.textContent = data.name;
      quantity.textContent = data.quantity + "x";
      price.textContent = "@" + data.price;
      totalQuantity.textContent = "$" + total;
      deleteIcon.src = data.removeIcon;
      
      div.appendChild(quantity);
      div.appendChild(price);
      div.appendChild(totalQuantity);
      productInfo.appendChild(heading);
      productInfo.appendChild(div);
      displayProduct.appendChild(productInfo);
      displayProduct.appendChild(deleteIcon);

      productContainer.appendChild(displayProduct);

      orderTotal.classList.add("show");
      carbonNeutral.classList.add("show");
      confirmOrderBtn.classList.add("show");

      //Let's get the total of all products
      const productsTotal = document.getElementById("products-total");

      const totals = cart.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity);
      }, 0)

      productsTotal.textContent = totals;


    })
})



//Let's get the increament and decreament count
const increament = document.querySelectorAll(".increase-icon");
const decreament = document.querySelectorAll(".decrease-icon");

increament.forEach(increament => {

   increament.addEventListener("click", (e) => {

      let product = e.currentTarget.closest(".product");
      let qtn = product.querySelector(".qtn");

      qtn.textContent = Number(qtn.textContent) + 1;
      totalCount++;
      cartCount.textContent = totalCount;
   })
})

decreament.forEach(decreament => {

   decreament.addEventListener("click", (e) => {

      let product = e.currentTarget.closest(".product");
      let addToCartWrapper = product.querySelector(".add-to-cart");
      let quantityWrapper = product.querySelector(".quantity");
      let qtn = product.querySelector(".qtn");

      if(Number(qtn.textContent) !== 1) {

            qtn.textContent = Number(qtn.textContent) - 1;
            totalCount--;
            cartCount.textContent = totalCount;
            
      } else {
            
            qtn.textContent = "1";
            totalCount--;
            cartCount.textContent = totalCount;
            quantityWrapper.classList.remove("show");
            addToCartWrapper.style.display = "flex";
      }

   })
})