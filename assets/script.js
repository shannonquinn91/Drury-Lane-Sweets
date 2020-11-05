// Menu Api JS
    $(document).ready(function() {
        
      
    $(".NutritionBtn").on("click",function(){
        let foodItem = $(this).attr("data-type")
        getNutrientInfo(foodItem)
    });

    function getNutrientInfo(dessertName) {
        const queryURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"
        const sendQueryData = {
            "query": dessertName,
            "locale": "en_US"
        }
        try {
            $.ajax({
            url: queryURL,
            method: "POST",
            headers: {"x-app-id": "c8185330", "x-app-key": "e55f4299165ce2d079e7e2be8672a18a", "x-remote-user-id": "jesal", "Content-Type": "application/json", "accept": "application/json"},
            data: JSON.stringify(sendQueryData)
            }).then(function(response) {
            console.log(response);
            const data = response.foods[0];
            const ul= $('<ul>');
            ul.attr("style", "list-style-type: none");
            $('.modal-body').empty();
            ul.append(renderNutrientInfo(data.nf_calories, "Calories: ", "cal"));
            ul.append(renderNutrientInfo(data.nf_cholesterol, "Cholesterol: ", "mg"));
            ul.append(renderNutrientInfo(data.nf_dietary_fiber, "Dietary fiber: ", "g"));
            ul.append(renderNutrientInfo(data.nf_p, "Phosphorus: ", "mg"));
            ul.append(renderNutrientInfo(data.nf_potassium, "Potassium: ", "mg"));
            ul.append(renderNutrientInfo(data.nf_protein, "Protein: ", "g"));
            ul.append(renderNutrientInfo(data.nf_saturated_fat, "Saturated fat: ", "g"));
            ul.append(renderNutrientInfo(data.nf_sodium, "Sodium: ", "mg"));
            ul.append(renderNutrientInfo(data.nf_sugars, "Sugars: ", "g"));
            ul.append(renderNutrientInfo(data.nf_total_carbohydrate, "Total carbohydrate: ", "g"));
            ul.append(renderNutrientInfo(data.nf_total_fat, "Total fat: ", "g"));
            $('.modal-body').append(ul);
            $(".MyModal").modal('show');
          });
        } catch (error) {
            console.log("Error Occured!!")
            $('.modal-body').empty();
            $('.modal-body').text("Something went wrong. Please try again!")
            $(".MyModal").modal('show');
        }
      }
      function renderNutrientInfo(nutrient, nutrientText, units){
        const nutrientEl = $('<li>').text(nutrientText + nutrient + units);
        return nutrientEl;
      }
    

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

    
    //cart-page js
    reset();



    function reset(){
        const desserts = [
            {category: "cakes", type: "chocolate", price: "25.00", qty: 0},
            {category: "cakes", type: "vanilla", price: "25.00", qty: 0},
            {category: "cakes", type: "coffee", price: "25.00", qty: 0},
            {category: "cakes", type: "carrot", price: "25.00", qty: 0},
            {category: "cupcakes", type: "chocolate", price: "5.00", qty: 0},
            {category: "cupcakes", type: "vanilla", price: "5.00", qty: 0},
            {category: "cupcakes", type: "confetti", price: "5.00", qty: 0},
            {category: "cupcakes", type: "red-velvet", price: "5.00", qty: 0},
            {category: "donuts", type: "glazed", price: "2.50", qty: 0},
            {category: "donuts", type: "chocolate-sprinkles", price: "2.50", qty: 0},
            {category: "donuts", type: "seasonal", price: "2.50", qty: 0},
            {category: "donuts", type: "jelly", price: "2.50", qty: 0},
            {category: "cookies", type: "chocolate-chip", price: "1.50", qty: 0},
            {category: "cookies", type: "sugar", price: "1.50", qty: 0},
            {category: "cookies", type: "peanut-butter", price: "1.50", qty: 0},
            {category: "cookies", type: "snickerdoodle", price: "1.50", qty: 0},
            {category: "pies", type: "apple", price: "20.00", qty: 0},
            {category: "pies", type: "cherry", price: "20.00", qty: 0},
            {category: "pies", type: "pecan", price: "20.00", qty: 0},
            {category: "pies", type: "lemon", price: "20.00", qty: 0}
        ]
    localStorage.setItem("desserts", JSON.stringify(desserts));
    }


    $('.userInput').focusout(function(){
        const dessertList = JSON.parse(localStorage.getItem("desserts")) || [];
        let quantity = $(this).val();
        quantity = parseInt(quantity);
        const type = $(this).attr("data-type");
        let category = $(this).attr("data-category");
        for(let i=0; i<dessertList.length; i++){
            if (category===dessertList[i].category){
                if(type===dessertList[i].type){
                    dessertList[i].qty=quantity || 0;
                    localStorage.setItem("desserts", JSON.stringify(dessertList));
                    }  
            }
        }
        updateTotals(category);
    });
    
    function updateTotals(category){
        const dessertList = JSON.parse(localStorage.getItem("desserts"));
        let categorySum=0;
        let orderTotal=0;
        let quantityTotal=0;
        for(let i=0; i<dessertList.length; i++){
            const typePrice = dessertList[i].price;
            const typeQuantity = dessertList[i].qty;
            typeTotal= parseFloat(typeQuantity*typePrice);
            quantityTotal += typeQuantity;
            $('#cartQuantity').text(quantityTotal);
            orderTotal += typeTotal;
            if (category===dessertList[i].category){
                categorySum += typeTotal;
            }
        }
        $("#" + category + "-total").text(categorySum);
        $("#total-due").text(orderTotal + 2);
    }
    
    $('#check-out').click(function(){
        reset();
        $(".MyModal").modal('show');
    })


});



