/*::::::DOM CACHE::::::*/
var clickSound = new Audio("assets/audio/button-click.mp3");
var audio = document.getElementById('bgAudio');
var gameCont = $("#gameCont");

// ::::::::::: GLOBAL VARIABLES :::::::::
var topics = ["dancing", "hugging", "walking", "laughing", "bitching", "caging", "today", "funny", "outdoors"];
var apiKey = "dLKvEKP8ZF6G5KkiIJCHB7vwJOAJbnvr"

// on page load start the application 
$(document).ready(function () {
    jsSetup();
    audio.currentTime = 19.4;
    audio.play();
});

// click sound will execute when elements in the body are click on
$("body").on("click", function (event) {
    clickSound.play();
});

// this is the form logic
function prcesfrm() {
    // var for the input field 
    var giphInput = $("#giphName");
    // when add gif button is pressed
    $('#giph').submit(function (e) {
        // prevents the page from reloading
        e.preventDefault();
        // resets results 
        $("#results").remove();
        // only execute the add gif if form is empty
        if (giphInput.val().trim() !== "") {
            // reset buttons
            $("#buttons").remove();
            // input value 
            var newGiph = giphInput.val().trim();
            // add input value to array
            topics.push(newGiph);
            // reset input area 
            $('#giph').trigger("reset");
            // call  generate buttons function 
            genBtns();
            // call getGiph function
            getGiph();
        } else {
            alert('silly rabbit! you need info in your form to create a button ');

        }
    });

}

function getGiph() {
// this function is all about gaining access to the API, retrieving the gifs and displaying them in #results
    $(".start").on("click", function () {
        $("#results").remove();
        var rsltCont = $(" <div id='results'>");
        rsltCont.addClass("col-12 blkBrdr my-3 py-3");
        $("#gameCont").append(rsltCont);
        var giph = $(this).attr("data-giph");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            giph + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                image.addClass("gif img-fluid");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-state", "still");
                gifDiv.append(p);
                gifDiv.prepend(image);
                $("#results").prepend(gifDiv);
            }
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                // if gif is on the still state execute block of code if not preform the else block of code
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    });
}

function genBtns() {
    $("#buttons").empty();
    var btnDiv = $("<div id='buttons'>");
    for (var i = 0; i < topics.length; i++) {
        var element = topics[i];
        var btnG = $("<button>");
        btnG.addClass("btn start btn-outline-light mr-2 mb-2");
        btnG.attr("data-giph", element);
        btnG.text(element);
        $(btnDiv).append(btnG);
    }
    $(gameCont).append(btnDiv);
}

function giphContent() {
    var gameHTML = "<h1 class='text-center text-white'>GET YOUR GIPHY ON!! </h1>" +
        "<p id='text-area' class='py-1'>Click on any buttons to start Giph'N! If you want to add more buttons use the form below. </p>" +
        "<nav class='navbar navbar-light d-flex justify-content-center mb-2'>" +
        "<form id='giph' class='form-inline d-flex justify-content-sm-right justify-content-center'>" +
        "<input id='giphName' class='form-control mr-sm-2' type='text' placeholder='Create Giph' aria-label='Create Giph'>" +
        "<button id='getGiph' class='btn btn-outline-light my-2 my-sm-0' type='submit'>Create Giphy</button>" +
        "</form>" +
        "</nav><hr>";
    $(gameCont).html(gameHTML);
}

function jsSetup() {
    giphContent();
    genBtns();
    getGiph();
    prcesfrm();
}