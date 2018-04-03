$(document).ready(function () {
    // Create a function that creates the start button and initial screen
    jsSetup();
});
// ::::::::::: GLOBAL VARIABLES :::::::::
var buttons = ["dancing", "hugging", "walking", "laughing", "bitching", "caging", "today", "funny", "outdoors"];
var gameCont = $("#gameCont");
console.log(gameCont);

function prcesfrm() {


}
function getGiph() {
    $("button").on("click", function () {
        $("#results").remove();
        var rsltCont = $(" <div id='results'>");
        rsltCont.addClass("col-12 blkBrdr my-3 py-3");
        console.log(rsltCont);
        $("#gameCont").append(rsltCont);
        var giph = $(this).attr("data-giph");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            giph + "&api_key=dc6zaTOxFJmzC&limit=10";
console.log(queryURL);
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                console.log(gifDiv);
                var p = $("<p>").text("Rating: " + rating);
                console.log(gifDiv);
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(image);
                $("#results").prepend(gifDiv);

            }

        });
    });
}


function genBtns() {
    for (var i = 0; i < buttons.length; i++) {
        var element = buttons[i];
        var btnG = $("<button>");
        btnG.addClass("btn start btn-outline-light mr-2 mb-2");
        btnG.attr("data-giph", element);
        btnG.text(element);
        $(gameCont).append(btnG);
    }


}

function giphContent() {
    console.log("In giphContent");
    var gameHTML = "<h1 class='text-center text-white'>GET YOUR GIPHY ON!! </h1>" +
        "<p id='text-area' class='py-1'>Click on any buttons to start Giph'N! If you want to add more buttons use form below. </p>" +
        "<nav class='navbar navbar-light d-flex justify-content-center mb-2'>" +
        "<form id='giph' class='form-inline'>" +
        "<input id='giphName' class='form-control mr-sm-2' type='search' placeholder='Create Giph' aria-label='Create Giph'>" +
        "<button id='getGiph' class='btn start btn-outline-light my-2 my-sm-0' type='submit'>Create Giphy</button>" +
        "</form>" +
        "</nav>";
    $(gameCont).html(gameHTML);
    genBtns()
    getGiph();
}



function jsSetup() {
    giphContent();
}