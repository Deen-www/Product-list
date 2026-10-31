// Let's select our elements
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartCount = document.querySelector(".count");
const orderTotal = document.querySelector(".order-total");
const carbonNeutral = document.querySelector(".carbon-neutral");
let confirmOrderBtn = document.querySelector(".confirm-order-btn");
let cartIllustrationIcon = document.querySelector(".cart-illustration-icon");
let cartMessage = document.querySelector(".cart-message");

//Update the entire cart total function
function updateCartTotal() {
   const productsTotal = document.getElementById("products-total");

      let totals = cart.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
      }, 0)

      productsTotal.textContent = totals;
}


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
          quantity.className = "qtn";
          let price = document.createElement("p");
          let subTotal = document.createElement("strong");
          subTotal.className = "total";

      let deleteIcon = document.createElement("img");
      heading.textContent = data.name;
      quantity.textContent = data.quantity + "x";
      price.textContent = "@" + data.price;
      subTotal.textContent = "$" + total;
      deleteIcon.src = data.removeIcon;
      
      div.appendChild(quantity);
      div.appendChild(price);
      div.appendChild(subTotal);
      productInfo.appendChild(heading);
      productInfo.appendChild(div);
      displayProduct.appendChild(productInfo);
      displayProduct.appendChild(deleteIcon);

      productContainer.appendChild(displayProduct);

      orderTotal.classList.add("show");
      carbonNeutral.classList.add("show");
      confirmOrderBtn.classList.add("show");

      //Update the total
      updateCartTotal();


      //Let's get the delete product icon
      deleteIcon.addEventListener("click", (e) => {

      let product = e.currentTarget.closest(".display-product");

      //Remove product from cart array
      let index = cart.indexOf(data);
      cart.splice(index, 1);

      //Update cart count
      totalCount -= Number(data.quantity);
      cartCount.textContent = totalCount;

      //Reset product quantity
      qtn.textContent = 1;

      //products total, price and quantity
      let productsTotal = document.getElementById("products-total");
      let priceQtn = data.price * data.quantity;
      
      //Subtract product subtotal from products total
      productsTotal.textContent = Number(productsTotal.textContent) - Number(priceQtn);

      //Remove product from HTML
      product.remove();

      //Update cart total
      updateCartTotal();

      //Handle empty cart
      let remainingProduct = document.querySelector(".display");
      if(remainingProduct.children.length === 0) {

         confirmOrderBtn.classList.remove("show");
         orderTotal.classList.remove("show");
         carbonNeutral.classList.remove("show");

         cartIllustrationIcon.style.display = "flex";
         cartMessage.style.display = "block";
      }

      //Restore product card
      quantityWrapper.classList.remove("show");
      addToCartWrapper.style.display = "flex";
      
     })

    })
})




//Let's get the increament and decreament count
const increament = document.querySelectorAll(".increase-icon");
const decreament = document.querySelectorAll(".decrease-icon");

increament.forEach(increament => {

   increament.addEventListener("click", (e) => {

      let product = e.currentTarget.closest(".product");
      let qtn = product.querySelector(".qtn");
      let productName = product.dataset.name;

      qtn.textContent = Number(qtn.textContent) + 1;
      totalCount++;
      cartCount.textContent = totalCount;
      
      //Find product in the cart
      let found = cart.find(item => item.name === productName);
      
      //Selecting element of a className display-product
      let cartProducts = document.querySelectorAll(".display-product");
      cartProducts.forEach(cartProduct => {

         let heading = cartProduct.querySelector("h3");
         let subTotal = cartProduct.querySelector(".total");
         let quantity = cartProduct.querySelector(".qtn");

         if(heading.textContent === productName) {
            found.quantity++;
            quantity.textContent = found.quantity + "x";

            let total = found.price * found.quantity;
            subTotal.textContent = "$" + total;
            
            //Update cart total
            updateCartTotal();

         }
      })

   })
})

decreament.forEach(decreament => {

   decreament.addEventListener("click", (e) => {

      let product = e.currentTarget.closest(".product");
      let addToCartWrapper = product.querySelector(".add-to-cart");
      let quantityWrapper = product.querySelector(".quantity");
      let qtn = product.querySelector(".qtn");
      let productName = product.dataset.name;

      //Find the product in the cart
      let found = cart.find(item => item.name === productName);

      if(Number(qtn.textContent) !== 1) {

            qtn.textContent = Number(qtn.textContent) - 1;

            totalCount--;
            cartCount.textContent = totalCount;

            found.quantity--;
            
      } else {

            //Remove product from cart array
            let index = cart.findIndex(item => item.name === productName);

            if(index !== -1) {
               cart.splice(index, 1);
            }

            //Remove product from the cart HTML
            let cartProducts = document.querySelectorAll(".display-product");

            cartProducts.forEach(cartProduct => {

               let heading = cartProduct.querySelector("h3");

               if(heading.textContent === productName) {

                  cartProduct.remove();
               }
            })
            
            //Update cart count
            totalCount--;
            cartCount.textContent = totalCount;

            //Restore the product card
            qtn.textContent = "1";
            quantityWrapper.classList.remove("show");
            addToCartWrapper.style.display = "flex";
        }

        //Update cart quantity and subtotal
      
        let cartProducts = document.querySelectorAll(".display-product");
        cartProducts.forEach(cartProduct => {

         let heading = cartProduct.querySelector("h3");
         let subTotal = cartProduct.querySelector(".total");
         let quantity = cartProduct.querySelector(".qtn");

         if(heading.textContent === productName) {
            
            let found = cart.find(item => item.name === productName);

            if(found) {
              quantity.textContent = found.quantity + "x";
            
              let total = found.price * found.quantity;
              subTotal.textContent = "$" + total;
            }

         }
         
      })

      //Recalculate cart total
      updateCartTotal();

      //Handle an empty cart
      if(cart.length === 0) {
         cartIllustrationIcon.style.display = "flex";
         cartMessage.style.display = "block";

         confirmOrderBtn.classList.remove("show");
         orderTotal.classList.remove("show");
         carbonNeutral.classList.remove("show");
      }

   })
})


//Comfirmation order modal
const overlay = document.querySelector(".overlay");
const confirmationModal = document.querySelector(".order-confirmation-modal");

//Let's get confirm order to respond to click
confirmOrderBtn.addEventListener("click", () => {

   overlay.classList.add("show");
   confirmationModal.classList.add("show");
})