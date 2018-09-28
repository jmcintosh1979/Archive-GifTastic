// $(document).ready(function() {

var topics = ["Dog", "Cat", "Rabbit", "Hamster", "Goldfish", "Bird", "Turtle", "Pig", "Horse"];


//Action item for which "animal button" is being selected.
  $("#animal-btns").on("click", ".animal-btn", function() {

    var animal = $(this).attr("data-animal");
    console.log(animal);
      
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=tCRu63tckjEf9LvbDtzw3mzWDwlDZrp1&limit=500";

    $.ajax({
      url:queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(queryURL);

      var results = response.data;
      // console.log(results);

      // remove previously selected Giphys
      $("#animal-giphys").empty();

      for (var i = 0; i <= 10; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // creates a div to hold the images received
          var newImg = $("<div>").addClass("giphyimage")
          
          // gets the rating of the image being received to display
          var rating = results[i].rating;
          var imgRating = $("<p>").text("Rating: " + rating.toUpperCase()).addClass("img-rating");
          
          // gets the image being received to display, both still and animated version.  Also adds "giphy" class.
          var animalGiphy = $("<img>");
          animalGiphy.addClass("giphy")
          animalGiphy.attr({
            "src":results[i].images.fixed_height_still.url, 
            "data-still":results[i].images.fixed_height_still.url, 
            "data-animate": results[i].images.fixed_height.url, 
            "data-state":"still"});
          
          // appends newly created div with the rating and image
          newImg.append(imgRating);
          newImg.append(animalGiphy);
          
          // displayes the rating/image on the DOM
          $("#animal-giphys").prepend(newImg);
        }
      }
    });
  });

  // Change image status to/from "Still" & "Animate"
  $("#animal-giphys").on("click", ".giphy", function() {
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
    
  // Function to create the buttons from Array
  function renderButtons() {
    $("#animal-btns").empty();
        
    // Goes through Array to create each individual button
    for (var j = 0; j < topics.length; j++) {
      var newBtn = $("<button>");
      newBtn.addClass("animal-btn");
      newBtn.attr("data-animal", topics[j]);
      newBtn.text(topics[j]);

      // addes button to the DOM to be displayed
      $("#animal-btns").append(newBtn);
    }
  };

  //Create new button with Users Input
  $("#add-animal").on("click", function(e) {
    e.preventDefault();

    if ($("#animal-input").val().length === 0) {
      alert("Oops...looks like you didn't add an Animal");
      // return

    } else{
    // takes user input and pushes to Array of values
    var newAnimal = $("#animal-input").val().trim();
    topics.push(newAnimal);

    // Resets the text value to 'empty"
    $("#animal-input").val("");

    renderButtons();}
  });


  renderButtons();
// })