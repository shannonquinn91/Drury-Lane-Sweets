$(document).ready(function() {
    // Menu-page js

    // Adds event listener to Nutrition button on click event 
    $(".NutritionBtn").on("click",function(){
        // gets the dessert category for which the nutrition info is called for
        let foodItem = $(this).attr("data-type")
        // calls the function that will get the nutrition data for that category
        getNutrientInfo(foodItem)
    });

    // This function sends an ajax request to get the nutrition data for the requested dessert category
    function getNutrientInfo(dessertName) {
        const queryURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"
        // query parameters to be sent in the request
        const sendQueryData = {
            "query": dessertName,
            "locale": "en_US"
        }
        // API request
        $.ajax({
            url: queryURL,
            method: "POST",
            headers: {"x-app-id": "c8185330", "x-app-key": "e55f4299165ce2d079e7e2be8672a18a", "x-remote-user-id": "jesal", "Content-Type": "application/json", "accept": "application/json"},
            // handling error scenario when the ajax call request fails to receive a valid response
            error:function(e){
                $('.modal-body').empty();
                $('.modal-body').text("Something went wrong. Please try again!")
                $(".MyModal").modal('show'); 
            },
            data: JSON.stringify(sendQueryData)
        }).then(function(response) {
            const data = response.foods[0];
            const ul= $('<ul>');
            ul.attr("style", "list-style-type: none");
            $('.modal-body').empty();
            // Displays the nutrition info data received in the response as a list within the modal
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
        
    }

    // This function helps in rendering the nutrition info in the specified format on the UI
    function renderNutrientInfo(nutrient, nutrientText, units){
        const nutrientEl = $('<li>').text(nutrientText + nutrient + units);
        return nutrientEl;
    }

    //Online-order page js
    
    reset();

    // This function resets the local storage key which is an array of objects to its original default state 
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
        // setting the 'desserts' array as a key in the client-side local storage
        localStorage.setItem("desserts", JSON.stringify(desserts));
    }

    // This function adds an event listener to the quantity input boxes on focus out event
    $('.userInput').focusout(function(){
        // gets the desserts array from local storage
        const dessertList = JSON.parse(localStorage.getItem("desserts")) || [];
        let quantity = $(this).val();
        quantity = parseInt(quantity);
        const type = $(this).attr("data-type");
        let category = $(this).attr("data-category");
       //loops through the desserts array
        for(let i=0; i<dessertList.length; i++){
            // if the category in the array matches the category of that input box
            if (category===dessertList[i].category){
                // if the type in the array matches the type within that category
                if(type===dessertList[i].type){
                    // sets the user entered quantity to that array index
                    dessertList[i].qty=quantity || 0;
                    // sets the updated desserts array as a key back in the client-side local storage
                    localStorage.setItem("desserts", JSON.stringify(dessertList));
                }  
            }
        }
        // calls this function that will update the totals 
        updateTotals(category);
    });
    
    
    // this function calculates and updates the total for each category as well as the entire order
    function updateTotals(category){
        // gets the updated array from the local storage
        const dessertList = JSON.parse(localStorage.getItem("desserts"));
        let categorySum=0;
        let orderTotal=0;
        let quantityTotal=0;
        // loops through the entire array and calculates the value for each type using the price and qty object keys from within the array
        for(let i=0; i<dessertList.length; i++){
            const typePrice = dessertList[i].price;
            const typeQuantity = dessertList[i].qty;
            typeTotal= parseFloat(typeQuantity*typePrice);
            // adds up the quantity of each type to arrive at total quantity
            quantityTotal += typeQuantity;
            // displays the updated quantity on the UI
            $('#num-items').text(quantityTotal);
            $('#cartQuantity').text(quantityTotal);
            // adds up the total of each type to arrive as order total
            orderTotal += typeTotal;
            // if the input box category matches the value of the category key at that index matches
            if (category===dessertList[i].category){
                // adds the total of that type to its category to arrive at the category total
                categorySum += typeTotal;
            }
        }
        // displays the category total and order total values on the UI
        $("#" + category + "-total").text("$" + categorySum.toFixed(2));
        $("#total-due").text("$" + (orderTotal + 2).toFixed(2));
        $("#num-items").text(quantityTotal);
    }
    
    // adds event listener to the 'Go to Checkout' button on click event
    $('#check-out').click(function(){
       //resets the array in the local storage to its default values
        reset();
        // displays the modal with the order successful message on the UI
        $(".MyModal").modal('show');
    })

    // Contact-Us page js
    
    // API for displaying the map on Contact Us page using the Address co-ordinates
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW15YmV0aHVwdG9uIiwiYSI6ImNrZ3h0b3F2ZDBsZ2syeHM0amU2ajhoZXoifQ.mv73N3OCxLBZ_7g5leHC1g';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71, 43], // starting position [lng, lat]
        zoom: 10, // starting zoom
    });
    // displays the marker on the map
    var marker = new mapboxgl.Marker()
    .setLngLat([-71, 43])
    .addTo(map);

    // Adds event listener to the Submit button on Contact us Page on click event
    $('#contactBtn').on("click", function(event){
        event.preventDefault();
        // displays with modal with message
        $(".MyModal").modal('show');
    })

});
