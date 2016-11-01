var $search = $("#search");

var $overlay = $("<div id='overlay'></div>");
var $innerOverlay = $("<div id='inner-overlay'></div>");

var $projectInfo = $("<a href='' id='project-info' target='_blank'></a>");
var $image = $("<img>");
var $projectText = $("<div id='project-text'></div>");
var $title = $("<p id='title'></p>");
var $description = $("<p id='description'></p>");

var $leftArrow = $("<button class='arrow'><svg id='left-arrow' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 16'><path id='left-path' d='M6 2L0 8l6 6z'/></svg></button>");
var $rightArrow = $("<button class='arrow'><svg id='right-arrow' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 16'><path id='right-path' d='M0 14l6-6-6-6z'/></svg></button>");

var $thumbnail = $(".thumbnail");
var $thumbnails = $(".thumbnail img");
var $index = 0;

var $galleryLength = $thumbnails.length;

var $sideB = $(".side-b");
var $projectTitle = $(".project-title");

var content = [
	{
		desc: "A responsive form with CSS transitions and Flexbox layout.",
		url: "projects/form/form.html"
	},
	{
		desc: "A Flexbox photo gallery with jQuery lightbox and search filter.",
		url: "projects/photo-gallery/photo-gallery.html"
	},
	{
		desc: "Custom video player controls with vanilla JavaScript.",
		url: "projects/video-player/video-player.html"
	},
	{
		desc: "Dashboard with chart.js, vanilla JavaScript, SVG icons, and Sass.",
		url: "projects/app-dashboard/app-dashboard.html"
	},
	{
		desc: "Gallery drawing on SWAPI, the Star Wars API, and OMBb, the Open Movie Database API, with jQuery and Sass.",
		url: "projects/star-wars/star-wars.html"
	},
	{
		desc: "My porfolio of freelance writing for print and web.",
		url: "http://www.goldcopywriting.com"
	},

];

// OVERLAY ASSEMBLY
$projectText.append($title);
$projectText.append($description);
$overlay.append($innerOverlay);
$("body").append($overlay);

function prepOverlay(image, title, description) {
	// Add left arrow to inner overlay div
	$innerOverlay.append($leftArrow);
	// Add div to hold project image and text to overlay
	$innerOverlay.append($projectInfo);
	// Add image to the overlay
	$projectInfo.append(image);
	// Add project title and description to the overlay
	$projectInfo.append($projectText);
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

	updateImage(imageLocation, imageTitle, imageDescription);

}

$thumbnail.click(function(event) {
	event.preventDefault();
	var imageLocation = $(this).children("img").attr("src");
	var imageCaption = $(this).children("img").attr("alt");
	$index = $(this).index();
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

function setLink() {
	$(this).attr("href", content[$index].url);
}

$projectInfo.hover(setLink);


// filter function for search field
function filter() {
	//sets searchText as whatever is entered in search field
	var query = $search.val();
	//for each thumbnail div
	$(".gallery .thumbnail").each(function(){
		
		//gets project description from content array
		var currentIndex = $(this).attr("data-index");
		var projInfo = content[currentIndex].desc;
		//if the search term is 'not not present' in the alt text
		if (projInfo.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
			//show the thumbnail (including its child a and a's child img)
			$(this).fadeIn();
		//if the search term is 'not present' in the alt text
		} else {
			//hide the thumbnail and its contents
			$(this).fadeOut("fast");
		}
	});
};

// Triggers filter function on keyup in search field
$search.keyup(filter);

// Show project title on thumbnail side-b
function showTitle() {
	var $flipTitle = $(this).children("img").attr("alt");
	$(this).children().children("p").text($flipTitle);
}

$thumbnail.mouseenter(showTitle);
$thumbnail.mouseenter(changeColor);


// Random color generator for thumbnail side-b
function getRandom(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeColor() {
	var r = getRandom(0,255);
	var g = getRandom(0,255);
	var b = getRandom(0,255);
	var x = "radial-gradient(circle, rgb(0,0,0)," + "rgb("+r + "," + g + "," + b + "))";
	return x;
}

function changeColor() {
	var newColor = makeColor();
	$(this).children(".side-b").css("background-image", newColor);
}













