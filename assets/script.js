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




