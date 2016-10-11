var $overlay = $("<div id='overlay'></div>");
var $innerOverlay = $("<div id='inner-overlay'></div>");
var $image = $("<img>");

var $projectText = $("<div id='project-text'></div>");

var $title = $("<p id='title'></p>");
var $description = $("<p id='description'></p>");

var $leftArrow = $("<button class='arrow'>&#10094</button>");
var $rightArrow = $("<button class='arrow'>&#10095</button>");

var $thumbnails = $(".thumbnail img");
var $index = 0;

var $galleryLength = $thumbnails.length;

//replace with an array of project descriptions
//var imageDescription = "This is a temporary project description. More to come.";

var content = [
	{
		desc: "This is the form project",
		url: "projects/form/index.html"
	},
	{
		desc: "This is the photo gallery project",
		url: "projects/gallery/index.html"
	},
	{
		desc: "This is the video player project",
		url: "projects/video/index.html"
	},
	{
		desc: "This is the web app dashboard project",
		url: "projects/dashboard/index.html"
	},
	{
		desc: "This is the API project",
		url: "projects/api/index.html"
	},
	{
		desc: "This is my porfolio of freelance writing",
		url: "http://www.goldcopywriting.com"
	},

];

$projectText.append($title);
$projectText.append($description);
$overlay.append($innerOverlay);
$overlay.append($projectText);
$("body").append($overlay);

function prepOverlay(image, title, description) {
	// Add left arrow to inner overlay div
	$innerOverlay.append($leftArrow);
	// Add media to the overlay
	$innerOverlay.append(image);
	// Add project title and description to the overlay
	$innerOverlay.append($projectText);

	// Add right arrow to overlay
	$innerOverlay.append($rightArrow);
}

function updateImage(imageLocation, imageTitle, imageDescription) {
	$image.attr("src", imageLocation);
	
	$title.text(imageTitle);
	$description.text(imageDescription);

	

	prepOverlay($image, $title, $description);
}

function prevNext(prev) {
	//when prev is false, increase index
	//when prev is true, decrease index
	if (!prev) {
		$index++;
	} else {
		$index--;
	}

	// enables overlay navigation wraparound
	if ($index < 0) {
		$index = $galleryLength-1;
	} else if ($index > $galleryLength-1) {
		$index = 0;
	}
}

function postImage() {
	var newImgSelected = $(".thumbnail").get($index).getElementsByTagName("img");

	var imageLocation = $(newImgSelected).attr("src");
	var imageTitle = $(newImgSelected).attr("alt");
	var imageDescription = content[$index].desc;

	//NEED AN ARRAY OF DESCRIPTIONS, ONE FOR EACH PROJECT
	//var imageDescription;

	updateImage(imageLocation, imageTitle, imageDescription);

}

$(".thumbnail img").click(function(event) {
	event.preventDefault();
	var imageLocation = $(this).attr("src");
	var imageCaption = $(this).attr("alt");
	$index = $(this).parent().index();
	console.log($(this).index());
	
	var imageDescription = content[$index].desc;

	updateImage(imageLocation, imageCaption, imageDescription);
	$overlay.slideDown(imageLocation);
});


//Cycles through images in overlay on arrow clicks
$leftArrow.click(function(event){
	prevNext(true);
	postImage();
});

$rightArrow.click(function(event){
	prevNext();
	postImage();
});

//Cycles through images in overlay on keyboard arrow press
$(document).bind('keydown', function(event) {
	if(event.keyCode == 37) {
		prevNext(true);
		postImage();
	} else if(event.keyCode == 39) {
		prevNext();
		postImage();
	}
});

// On overlay click
$overlay.click(function(event){
	// Hide overlay
	if(event.target.id == "overlay")
	$(this).slideUp("fast");
});