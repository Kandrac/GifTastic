
var movies = [
    "Gone in Sixty Seconds", "The Wicker Man ", "Face/off", "Birdy", "Valley Girl", "The Cotton Club",
    "Time to Kill", "Vampire's Kiss", "Drive Angry","8MM", "Leaving Las Vegas"
  ];



function makeButtons(){ 
	
	$('#buttonsClear').empty();
	
	for (var i = 0; i < movies.length; i++){

		var a = $('<button>') 
		a.addClass('movie'); 
		a.attr('data-topic', movies[i]); 
		a.text(movies[i]); 
		$('#buttonsClear').append(a); 
	}
}


$("#addMovie").on("click", function(){

	
	var movie = $("#movie-input").val().trim();
	movies.push(movie);
	makeButtons();
	
	return false; 
})

function displayGifs(){
	var topics = $(this).attr("data-topic");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +topics + "&rating=PG-13&lang=en&limit=10&api_key=bS2NtRaTWlKIaHYb0VN04AcMLWJWUd62";

		$.ajax({url: queryURL, method: "GET"}).done(function (response) {

			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				
				var gifDiv = $('<div class=gifs>');
				var showGif = $('<img>');
					showGif.attr('src', results[i].images.fixed_height_still.url);
	
					showGif.attr('title', "Rating: " + results[i].rating);
					showGif.attr('data-still', results[i].images.fixed_height_still.url);
					showGif.attr('data-state', 'still');
					showGif.addClass('gif');
					showGif.attr('data-animate', results[i].images.fixed_height.url);
			
				gifDiv.append(showGif)

				$("#gifViewer").prepend(gifDiv);
			}
			
		});
}

$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



$(document).on("click", ".movie", displayGifs);

makeButtons();