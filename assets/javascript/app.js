var topics = ["Dog", "Cat", "Rabbit", "Hamster", "Goldfish", "Bird", "Turtle", "Pig", "Horse"];


$("#animal-btns").on("click", function() {

  var animal = $(this).attr("data-animal");
  console.log($(this));
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=tCRu63tckjEf9LvbDtzw3mzWDwlDZrp1&limit=10";

  $.ajax({
    url:queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // creates a div to hold the images received
        var newImg = $("<div>");
        
        // gets the rating of the image being received to display
        var rating = results[i].rating;
        var imgRating = $("<p>").text("Rating: " + rating);
        
        // gets the image being received to display, both still and animated version.  Also adds "giphy" class.
        var animalGiphy = $("<img>");
        animalGiphy.attr({"src":results[i].images.original_still.url, "data-still":results[i].images.original_still.url, "data-animate": results[i].images.fixed_height.url, "data-state":"still", "class":"giphy"});
        
        // appends newly created div with the rating and image
        newImg.append(imgRating);
        newImg.append(animalGiphy);
        
        // displayes the rating/image on the DOM
        $("#animal-giphys").prepend(newImg);
      }
    }
  });
});


$(".giphy").on("click", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } 
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
  

function renderButtons() {
  $("#animal-btns").empty();

  for (var j = 0; j < topics.length; j++) {
    var newBtn = $("<button>");
    newBtn.addClass("animal-btn");
    newBtn.attr("data-animal", topics[j]);
    newBtn.text(topics[j]);
    $("#animal-btns").append(newBtn);
  }
};


$("#add-animal").on("click", function(e) {
  e.preventDefault();

  var newAnimal = $("#animal-input").val().trim();
  topics.push(newAnimal);

  renderButtons();
});


renderButtons();