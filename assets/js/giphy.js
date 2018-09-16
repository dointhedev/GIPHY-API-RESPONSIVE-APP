/*::::::DOM CACHE::::::*/
const clickSound = new Audio("assets/audio/button-click.mp3");
const audio = document.getElementById('bgAudio');
const gameCont = $("#gameCont");

/*::::::DATA::::::*/
const topics = ["dancing", "hugging", "walking", "laughing", "bitching", "caging", "today", "funny", "outdoors"];
const apiKey = "dLKvEKP8ZF6G5KkiIJCHB7vwJOAJbnvr";

/*::::::EVENT LISTENERS::::::*/
// Click sound will execute when elements in the body wih .click are clicked on.
$("body").on("click", ".click", clickSnd);

/*::::::MAIN JS::::::*/
// On page load start the application.
$(document).ready(jsSetup);


// This function is the logic behind the search form.
function prcesfrm(e) {
   // When form is submitted prevent default, prevents the page from reloading. 
   e.preventDefault();
   // Remove results container and get it ready for the next search. 
   const results =  $("#results");
   results.remove();
   // Grab the value of the search input. 
    let giphInput = $("#giphName").val().trim();
    // Case in which nothing was entered into the form. 
    if (giphInput += "") {
        results.html(genElement("<p>", null, "py-1", "Sorry! for some reason that keyword returned no result. Try again."));
    }
    // Update the buttons with the search val. 
    topics.push(giphInput);
    genBtns();
    getGiph(giphInput);
}

// This function is all about gaining access to the API, retrieving the gif's and displaying them in #results.
function getGiph(val) {
   $("#results").remove();
    const giph = $(this).attr("data-giph");
    // Query URL for both cases. 
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${giph || val}&api_key=${apiKey}&limit=10`;
    const gifCont = genElement("<div>", "results", "col-12 blkBrdr my-3 py-3", null);
    gameCont.append(gifCont);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(res => {
        const results = res.data;
        const gifDiv = genElement("<div>", "item", null, null);
        for (let i = 0; i < results.length; i++) {
            const image = genElement("<img>", null, "gif img-fluid", null).click(gifInit);
            const p = genElement("<p>", null, null, `Rating: ${results[i].rating}`);
            image.attr({
                src: results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-state": "still"
            });
            gifDiv.append(image, p);
            $("#results").prepend(gifDiv);
        }
    });
    const small = genElement("<small>", "small", "pt-2 d-block", "Click on the gif to see it animate.");
    $("#small").remove();
    $("#buttons").append(small);
}

// Function to change the attribute to cause gif to animate. 
function gifInit() {
    const state = $(this).attr("data-state");
    // if gif is on the still state execute block of code if not preform the else block of code.
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

// Function to generate the buttons. 
function genBtns() {
    $("#buttons").remove();
    const btnDiv = genElement("<div>", "buttons", null, null);
    for (let btn of topics) {
        btnDiv.append(genElement("<button>", null, "btn click start btn-outline-light mr-2 mb-2", btn).attr("data-giph", btn).click(getGiph));
    }
    gameCont.append(btnDiv);
}

// Generate the Gif search form.
function giphContent() {
    const h1 = genElement("<h1>", null, "text-center text-white", "GET YOUR GIPHY ON!!");
    const p = genElement("<p>", "text-area", "py-1", "Click on any buttons to start Giph'N! If you want to add more buttons use the form below.");
    const sFrom = genElement("<form>", "giph", "form-inline d-flex justify-content-sm-right justify-content-center", null);
    const divIg = genElement("<div>", null, "input-group", null);
    const sInput = genElement("<input>", "giphName", "form-control mr-sm-2", null);
    sInput.attr({
        type: "text",
        placeholder: "Search A Giph...",
        "aria-label": "Create Giph"
    });
    const btnSpan = genElement("<span>", null, "input-group-btn", null);
    const sBtn = genElement("<button>", "getGiph", "click btn btn-outline-light my-2 my-sm-0 ml-1", "Create Giph").attr("type", "submit");
    const hr = "<hr>";
    btnSpan.append(sBtn);
    divIg.append(sInput, btnSpan)
    sFrom.append(divIg)
    gameCont.append(h1, p, sFrom, hr);
    $("form").on("submit", prcesfrm);

}

/*::::::MAIN STARTER FUNCTION::::::*/
function jsSetup() {
    audio.currentTime = 19.4;
    audio.play();
    giphContent();
    genBtns();
}

/*::::::HELPER FUNCTIONS::::::*/
function clickSnd() {
    clickSound.play();
}

// All HTML elements are generated from this function. 
function genElement(type, id, className, text) {
    const newEl = $(type).addClass(className).text(text);
    if (id !== null) {
        newEl.attr("id", id);
    }
    return newEl;
}
