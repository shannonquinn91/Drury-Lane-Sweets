function getNutrientInfo(dessertName) {
    const queryURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    const sendQueryData = {
          "query": dessertName,
          "locale": "en_US"
    }
        $.ajax({
          url: queryURL,
          method: "POST",
          headers: {"x-app-id": "c8185330", "x-app-key": "e55f4299165ce2d079e7e2be8672a18a", "x-remote-user-id": "jesal", "Content-Type": "application/json", "accept": "application/json"},
          data: JSON.stringify(sendQueryData)
        }).then(function(response) {
          console.log(response);
        });
    }
    $("#cakes").on("click",function(){
        //console.log("test")
getNutrientInfo("cakes")
    });

//for menu page

$("#add-to-cart").on("click", function(){
  console.log("buttons work")
})

//Copied from MDBootsrap eCommerce
// $('#add-to-cart').on('click', (e) => {
//   //addToCart(e.currentTarget)
//   console.log("buttons work");
// })

// const addToCart = (product) => {
//   const productId = $(product).attr('productId');
//   const isAlreadyInCart = $.grep(productsInCart, el => {return el.id == productId}).length;

//   if (isAlreadyInCart) {
//     $.each(storageData, (i, el) => {
//       if (productId == el.id) {
//         el.itemsNumber += 1;
//       }
//     })
//   } else {
//     const newProduct = {
//       id: Number(productId),
//       itemsNumber: 1
//     }

//     storageData.push(newProduct);
//   }

//   updateCart();
//   updateProductList();
// }
