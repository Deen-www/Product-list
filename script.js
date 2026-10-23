// Let's get the buttons respond to click and make cart to count
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartCount = document.querySelector(".count");
let totalCount = 0;

addToCartBtns.forEach(button => {

    button.addEventListener("click", (e) => {
      
      let product = e.currentTarget.closest(".product");
      let addToCartWrapper = product.querySelector(".add-to-cart");
      let quantityWrapper = product.querySelector(".quantity");
      let qtn = product.querySelector(".qtn");
      qtn.textContent = 1;

      
      addToCartWrapper.style.display = "none";
      quantityWrapper.classList.add("show");

      totalCount++;
      cartCount.textContent = totalCount;

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