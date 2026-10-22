const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const quantity = document.querySelector(".quantity");

// Let's get the buttons respond to click
addToCartBtns.forEach(button => {

    button.addEventListener("click", (e) => {
      
      let product = e.currentTarget.closest(".product");
      let increament = product.querySelector(".increase-icon");
      let decreament = product.querySelector(".decrease-icon");
      let addToCartWrapper = product.querySelector(".add-to-cart");
      let quantityWrapper = product.querySelector(".quantity");
      let qtn = product.querySelector(".qtn");
      qtn.textContent = "1";

      
      addToCartWrapper.style.display = "none";
      quantityWrapper.classList.add("show");


      //Lets get the increament and decreament count
      increament.addEventListener("click", () => {

         qtn.textContent = Number(qtn.textContent) + 1;

      })

      decreament.addEventListener("click", () => {

         if(Number(qtn.textContent) !== 1) {

            qtn.textContent = Number(qtn.textContent) - 1;
         } else {
            
            qtn.textContent = "1";
            quantityWrapper.classList.remove("show");
            addToCartWrapper.style.display = "flex";
         }

      })


    })
})