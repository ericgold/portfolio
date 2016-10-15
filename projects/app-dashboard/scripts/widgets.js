// GLOBAL VARIABLES

var primaryColor = '#7379BD';
var secondaryColor = '#83C891';
var tertiaryColor = '#76B1BE';
var primaryColorDark = '#4D4D71';
var primaryColorLight = '#E2E3F5';


// GLOBAL CHART.JS CONFIGURATIONS

Chart.defaults.global.defaultFontColor = 'gray';
Chart.defaults.global.defaultFontFamily = 'HelveticaNeue';
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontStyle = 'normal';
Chart.defaults.global.responsive = true;
Chart.defaults.global.responsiveAnimationDuration = 0;
Chart.defaults.global.maintainAspectRatio = true;
Chart.defaults.global.legend.display = false;


// ***************************
// ***** MAIN NAVIGATION *****
// ***************************

var navButton = document.getElementsByClassName("nav-icon");
var dashboardIcon = document.getElementById("dashboard-icon");
var membersIcon = document.getElementById("members-icon");
var visitsIcon = document.getElementById("visits-icon");
var settingsIcon = document.getElementById("settings-icon");

function toggleNavActive() {
	
	for (var i=0; i<navButton.length; i++){
		if (navButton[i].classList.contains("nav-icon-active")) {
			navButton[i].classList.remove("nav-icon-active");
		}
	}

	for (i=0; i<navButton.length; i++){
		if (navButton[i].parentNode.classList.contains("nav-container-active")) {
			navButton[i].parentNode.classList.remove("nav-container-active");
		}
	}
	this.classList.add("nav-icon-active");
	this.parentNode.classList.add("nav-container-active");
	
	
}

dashboardIcon.addEventListener("click", toggleNavActive);
membersIcon.addEventListener("click", toggleNavActive);
visitsIcon.addEventListener("click", toggleNavActive);
settingsIcon.addEventListener("click", toggleNavActive);

// ******************
// ***** ALERTS *****
// ******************

// Variables for alert display
var mainHeader = document.getElementById("main-header");

//the alert dropdown container
var alertDiv = document.createElement("div");

//individual alerts in the dropdown
var alertBox1 = document.createElement("div");
var alertBox2 = document.createElement("div");

var bellContainer = document.getElementById("bell-container");
var bellIcon = document.getElementById("bell-icon");

//contents for the sample alerts
var alert1 = "Ashley Pike signed up";
var alert2 = "Hart Love commented";

//variables for green dot on bell icon
var newNotification = true;

function showDot() {
	if (newNotification) {
		bellContainer.classList.add("notification");
	} else {
		bellContainer.classList.remove("notification");
	}
}

document.addEventListener("DOMContentLoaded", showDot);

// set up alert div with two alert boxes inside

function setupAlertDiv() {
	alertDiv.setAttribute("id", "alert-div");

	alertBox1.classList.add("alert-box");
	alertBox1.textContent = alert1;
	alertDiv.appendChild(alertBox1);

	alertBox2.classList.add("alert-box");
	alertBox2.textContent = alert2;
	alertDiv.appendChild(alertBox2);
}

// insert alert div into main header before the bell container
function dropAlertDiv() {
	setupAlertDiv();
	mainHeader.insertBefore(alertDiv, bellContainer);
}

// remove alert div from the main header
function hideAlertDiv() {
	mainHeader.removeChild(alertDiv);
	newNotification = false;
	showDot();
}

// event listeners for adding and removing the alert div
bellIcon.addEventListener("click", dropAlertDiv);
alertDiv.addEventListener("click", hideAlertDiv);

//*** Alert Bar Cancel ***

// variables for alert bar cancel
var alertBar = document.getElementById('alert');
var alertText = document.getElementById('alert-text');
var alertX = document.getElementById('alert-x');

// transfer alert from bar to dropdown
function moveAlert() {
	var alertBox3 = document.createElement("div");
	var alert3 = alertText.textContent;
	alertBox3.classList.add("alert-box");
	alertBox3.textContent = alert3;
	alertDiv.appendChild(alertBox3);
}

// remove alert bar
function hideAlert() {
	moveAlert();
	alertBar.style.display = "none";
}

//event listener for alert bar x
alertX.addEventListener("click", hideAlert);

// ***************************
// ***** SETTINGS WIDGET *****
// ***************************

// settings widget variables

var emailSwitch = document.getElementById("email-switch");
var emailSetting = emailSwitch.value;

var publicSwitch = document.getElementById("public-switch");
var publicSetting = publicSwitch.value;

var timeZoneSelect = document.getElementById("timezone");
var timeZoneSetting = timeZoneSelect.options[timeZoneSelect.selectedIndex].getAttribute("data-tzone");

var saveSettingsButton = document.getElementById("save-settings-button");
var cancelSettingsButton = document.getElementById("cancel-settings-button");

//saves current settings to local storage
function saveSettings() {
	localStorage.setItem('email', emailSetting);
	localStorage.setItem('publicpro', publicSetting);
	localStorage.setItem('tzone', timeZoneSetting);
}

//clears local storage and sets controls to defaults
function resetSettings() {
	console.log("reset");
	localStorage.clear();
	setDefaultSettings();
}

//toggle switch value and checked state
function updateSwitch(switchTarget) {
	if (switchTarget.value === "on") {
		switchTarget.value = "off";
		switchTarget.setAttribute("value", "off");
		switchTarget.setAttribute("checked", false);
	} else {
		switchTarget.value = "on";
		switchTarget.setAttribute("value", "on");
		switchTarget.setAttribute("checked", true);
	}
}

//sets setting variable to the value of the switch
function updateEmail() {
	updateSwitch(emailSwitch);
	emailSetting = emailSwitch.value;
}

//sets setting variable to the value of the switch
function updatePublic() {
	updateSwitch(publicSwitch);
	publicSetting = publicSwitch.value;
}

//sets variable to value of the select
function updateTimeZone() {
	timeZoneSetting = timeZoneSelect.options[timeZoneSelect.selectedIndex].getAttribute('data-tzone');	
}

function restoreTimeZone() {
		for (var i=0; i < timeZoneSelect.options.length; i++) {
		if (timeZoneSelect.options[i].hasAttribute("selected")) {
			timeZoneSelect.options[i].removeAttribute("selected");
		} 
	}
	timeZoneSelect.options[timeZoneSetting - 1].setAttribute("selected", "selected");
}

//matches switch "checked" attribute to value state
function matchEmail() {
	if (emailSetting === "on") {
			emailSwitch.setAttribute("checked", true);
		} else if (emailSetting === "off") {
			emailSwitch.removeAttribute("checked");
	}
}

//sets default value of email switch to "on"
function setDefaultEmail() {

	emailSwitch.value = "on";
	emailSetting = emailSwitch.value;
	emailSwitch.setAttribute("value", emailSetting);
	matchEmail();
}

//checks for email switch value in local storage
//if present, sets switch to stored value
//otherwise, sets to default value
function checkForEmail() {
	if (localStorage.email) {
		emailSwitch.value = localStorage.getItem("email");
		emailSetting = emailSwitch.value;
		emailSwitch.setAttribute("value", emailSetting);
		matchEmail();

	} else {
		setDefaultEmail();
	}
}

//matches switch "checked" attribute to value state
function matchPublic() {
	if (publicSetting === "on") {
			publicSwitch.setAttribute("checked", true);
		} else if (publicSetting === "off") {
			publicSwitch.removeAttribute("checked");
		}
}

//sets default value of public profile switch to "on"
function setDefaultPublic() {
	publicSwitch.value = "on";
	publicSetting = publicSwitch.value;
	publicSwitch.setAttribute("value", publicSetting);
	matchPublic();
}

//checks for public profile switch value in local storage
//if present, sets switch to stored value
//otherwise, sets to default value
function checkForPublic() {
	if (localStorage.publicpro) {
		publicSwitch.value = localStorage.getItem("publicpro");
		publicSetting = publicSwitch.value;
		publicSwitch.setAttribute("value", publicSetting);
		matchPublic();
		
	} else {
		setDefaultPublic();
	}
}

//sets default time zone of Pacific
function setDefaultTimeZone() {
	timeZoneSelect.value = "-8";
	updateTimeZone();
}

//checks for time zone in local storage
//if present, sets time zone to stored value
//otherwise, sets default time zone
function checkForTimeZone() {
	if (localStorage.tzone) {
		timeZoneSetting = localStorage.getItem("tzone");
		restoreTimeZone();
	} else {
		setDefaultTimeZone();
	}
}

//checks for values in local storage
function checkForSettings() {
	checkForEmail();
	checkForPublic();
	checkForTimeZone();
}

//sets default values for the 3 controls
function setDefaultSettings() {
	setDefaultEmail();
	setDefaultPublic();
	setDefaultTimeZone();
}

// checks to see if local storage is supported
function checkLocalStorage() {
	//check if local storage is supported
	if (window.localStorage){
		checkForSettings();
	} else {
		setDefaultSettings();
	}
}

// Settings Widget Event Listners

emailSwitch.addEventListener("change", updateEmail);
publicSwitch.addEventListener("change", updatePublic);
timeZoneSelect.addEventListener("change", updateTimeZone);

saveSettingsButton.addEventListener("click", saveSettings);
cancelSettingsButton.addEventListener("click", resetSettings);

window.addEventListener("load", checkLocalStorage);


// *******************************
// ***** MESSAGE USER WIDGET *****
// *******************************

//variables for the message user widget
var messageUserWidget = document.getElementById("message-user");
var userInput = document.getElementById("user-input");
var userMessage = document.getElementById("user-message");
var messageButton = document.getElementById("message-button");

//variables for message user search dropdown 
var userDiv = document.createElement("div");

var userBoxes = document.getElementsByClassName("user-box");

//array to hold users
var users = [];

//array to hold users that match the search
var matchedUsers = [];

//constructor function for users
function User(firstName, lastName, email, joinDate) {
	//constructor function for user objects
	this.firstName = firstName;
	this.lastName = lastName;
	this.joinDate = joinDate;
	this.email = email;
	users.push(this);
}

//variables for users
var user1 = new User('Hart', 'Love', 'hlove@emotion.com', '6/3/16');
var user2 = new User('Ashley', 'Pike', 'ashp@saranrae.com', '7/6/16');
var user3 = new User('Dan', 'Mann', 'd.mann@qmail.com', '7/7/16');
var user4 = new User('Alice', 'Inwonderland', 'alice@rabbithole.com', '7/13/16');

//*alert and confirmation div*

//popup container for message widget errors and confirmations
var messageDiv = document.createElement("div");
//container for an individual error or confirmation message
var messageBox = document.createElement("div");

//error and confirmation messages
var userError = "Please choose a user to message";
var messageError = "Please enter a message";
var sendConfirm = "Message sent";


//* functions for user search and suggestions *

//create a div to hold the list of suggestions
function setupUserDiv() {
	userDiv.setAttribute("id", "user-div");
}

//create divs to hold individual suggestions
function setupUserBox(suggestion) {
	var userBox = document.createElement("div");
	userBox.classList.add("user-box");
	userBox.textContent = suggestion.firstName + " " + suggestion.lastName;
	userDiv.appendChild(userBox);
}

//display the list of suggested users based on search term
function showUserDiv() {
	messageUserWidget.insertBefore(userDiv, userMessage);
}

//remove user suggestions
function removeUserDiv() {
	clearUserDiv();
	//messageUserWidget.removeChild(userDiv);
	userDiv.remove();
	matchedUsers = [];
	matchedUsers.length = 0;
}

function clearUserDiv() {
	while (userDiv.firstChild) {
		userDiv.removeChild(userDiv.firstChild);
	}
	matchedUsers = [];
}

// enter selected suggestion into input field and remove suggestions
function userSelect() {
	userInput.value = this.textContent.toString();
	removeUserDiv();
}

function activateSelect() {
	for (var i = 0; i < userBoxes.length; i++) {
		userBoxes[i].addEventListener('click', userSelect);
	}
}

function matchUsers(arg) {
	//check each user in users
	for (var i = 0; i < users.length; i++) {
			var firstIndex = users[i].firstName.toLowerCase().indexOf(arg);
			var lastIndex = users[i].lastName.toLowerCase().indexOf(arg);
			//if the query is present in first name or last name of that user
			if (firstIndex !== -1 || lastIndex !== -1) {
				//add that user to matchedUsers
				matchedUsers.push(users[i]);
			} 
		}
}

function addMatchedUsers() {
	//for each user in matchedUsers
	for (var i = 0; i < matchedUsers.length; i++) {
			//set up a userBox and add it to the userDiv
			setupUserBox(matchedUsers[i]);
		}
}

function userSearch() {
	var query = userInput.value.toLowerCase();
	//if there is a query
	if(query) {
		//clear any existing match results
		clearUserDiv();
		//check for users matching the query
		matchUsers(query);
		//create container for user suggestions
		setupUserDiv();
		//add each matched users to a userBox
		addMatchedUsers();
		//show the populated userDiv
		showUserDiv();	
	} else {
		//if there is no query, remove the userDiv
		removeUserDiv();
	}
}

//* functions for checking if fields are filled *

//* functions for error and confirmation messages *
// adds id to messageDiv for styling
function setupMessageDiv() {
	messageDiv.setAttribute("id", "message-div");
}
//adds class to messageBox for styling
//adds appropriate text content to the messageBox:
//messageError, userError, or sendConfirm
function setupMessageBox(arg) {
	messageBox.classList.add("message-box");
	messageBox.textContent = arg;
}

function showMesssageDiv() {
	messageDiv.appendChild(messageBox);
	messageUserWidget.insertBefore(messageDiv, userInput);
}

//checks if user has been entered when send button is pressed
// if not, displays error message
// if so, 'sends' message
function userCheck() {
	var query = userInput.value;
	if (query === null || query === "") {
		setupMessageDiv();
		setupMessageBox(userError);
		showMesssageDiv();
	} else {
		messageCheck();
	}
}

//checks if message has been entered when send button is pressed
// if not, displays error message
// if so, 'sends' message
function messageCheck() {
	var message = userMessage.value;
	if (message === null || message === "") {
		setupMessageDiv();
		setupMessageBox(messageError);
		showMesssageDiv();
	} else {
		messageSend();
	}
}

//'sends' message, clearing both form fields
// and displaying send confirmation
function messageSend() {
	userInput.value = "";
	userMessage.value = "";
	
	setupMessageDiv();
	setupMessageBox(sendConfirm);
	showMesssageDiv();
	
}

function hideMessage() {
	messageUserWidget.removeChild(messageDiv);
}

//* event listeners for message user widget *

//checks if a user to message has been chosen on send attempt
messageButton.addEventListener("click", userCheck);
//suggests matching users on input
userInput.addEventListener("keyup", userSearch);
//hides error and confirmation messages on click
messageDiv.addEventListener("click", hideMessage);
//allows click to input a suggested user
userDiv.addEventListener("mouseover", activateSelect);


// ******************************
// ***** MOBILE USER WIDGET *****
// ******************************

var mobileUsers = document.getElementById('mobile-users');

var mobileUsersData = {
	labels: [
		"Desktop",
		"Tablets",
		"Phones",
		"Other"
	],
	datasets: [
		{
			data: [150, 70, 50, 20],
			backgroundColor: [
				primaryColor,
				secondaryColor,
				tertiaryColor,
				primaryColorDark
			]
		}
	]
};

// ********************************
// ***** DAILY TRAFFIC WIDGET *****
// ********************************

var trafficDaily = document.getElementById('traffic-bar');

var trafficDailyData = {
		labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		datasets: [ 
			{
				label: 'Desktop',
				backgroundColor: primaryColor,
				data: [75, 100, 175, 125, 225, 200, 100],
			},

			{
				label: 'Tablets',
				backgroundColor: secondaryColor,
				data: [60, 80, 120, 70, 180, 150, 70],
			},
			
			{
				label: 'Phones',
				backgroundColor: tertiaryColor,
				data: [80, 20, 40, 80, 80, 70, 90],
			}

		]
};

var trafficDailyOptions = {
	legend: {
		display: true,
		position: 'bottom',
	},
		
	
	scales: {
		xAxes: [{
			categoryPercentage: 0.8,
			barPercentage: 0.8,
			gridLines: {
				offsetGridLines: true,
				drawTicks: false
			}
		}],
		yAxes: [{
			type: 'linear',
			gridLines: {
				offsetGridLines: true,
				drawTicks: false
			},
			ticks: {
				beginAtZero: false,
				stepSize: 50,
			}
		}]
	}
};

var trafficDailyChart = new Chart(trafficDaily, {
	type: 'bar',
	data: trafficDailyData,
	options: trafficDailyOptions
});


// ***************************
// ***** TRAFFIC WIDGET *****
// ***************************

// Traffic Variables

var trafficLineButton = document.getElementsByClassName('traffic-line-button');
var hourlyButton = document.getElementById('hourly-button');
var dailyButton = document.getElementById('daily-button');
var weeklyButton = document.getElementById('weekly-button');
var monthlyButton = document.getElementById('monthly-button');

// Traffic Navigation

function toggleTrafficActive(btn) {
	for (var i=0; i<trafficLineButton.length; i++){
		if (trafficLineButton[i].classList.contains("traffic-active")) {
			trafficLineButton[i].classList.remove("traffic-active");
		}
	}
	btn.classList.add("traffic-active");
	
}

// Traffic Line Chart

// Traffic Line Data

var hourlyData = [0, 2, 5, 7, 10, 12, 16, 18, 15, 14, 13, 8, 4];
var dailyData = [110, 120, 325, 410, 80, 70, 130, 196, 120, 278, 400, 110, 143];
var weeklyData = [0, 500, 1000, 750, 1250, 1750, 1250, 1500, 1000, 1500, 2000, 1500, 2000];
var monthlyData = [0, 1900, 3500, 3000, 4500, 4800, 5000, 4700, 3900, 2600, 2050, 2100, 3700];

var hourlyStepSize = 5;
var hourlyMax = 20;

var dailyStepSize = 100;
var dailyMax = 500; 

var weeklyStepSize = 500;
var weeklyMax = 2500;

var monthlyStepSize = 2000;
var monthlyMax = 10000;

var hourlyLabels = ["12am",
					 "2am",
					 "4am", 
					 "6am", 
					 "8am", 
					 "10am", 
					 "12pm", 
					 "2pm", 
					 "4pm", 
					 "6pm",
					 "8pm", 
					 "10pm"
					];
var dailyLabels = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
var weeklyLabels = [ "0",
					 "16-22",
					 "23-29", 
					 "30-5", 
					 "6-12", 
					 "13-19", 
					 "20-26", 
					 "27-3", 
					 "4-10", 
					 "11-17",
					 "19-24", 
					 "25-31"
					];
var monthlyLabels = ["J", "A", "S", "O", "N", "D", "J", "F", "M", "A", "M", "J"];

//default data for the traffic line chart, including weekly defaults
var trafficLineData = {

	labels: weeklyLabels,

	datasets: [
		{
			fill: true,
			lineTension: 0,
			backgroundColor: primaryColorLight,
			pointBackgroundColor: '#FFFFFF',
			borderWidth: 1,
			borderColor: primaryColor,
			pointBorderColor: primaryColor,
			pointBorderWidth: 2,
			pointRadius: 4,
			pointHoverRadius: 10,
			pointHitRadius: 10,
			pointStyle: 'circle',
			showLines: true,	
			data: weeklyData
		}
	]
};

var mobileUsersOptions = {
	legend: {
		display: true,
		position: 'bottom'
	}
};

var mobileUserChart = new Chart(mobileUsers, {
	type: 'doughnut',
	data: mobileUsersData,
	options: mobileUsersOptions
});

//default options for the traffic line chart, including weekly defaults
var trafficLineOptions = {
	scales: {
		
		xAxes: [{
			ticks: {
				display: true			
			},
			gridLines: {
				drawTicks: false
			}	
		}],

		yAxes: [{
			ticks: {
				display: true,
				stepSize: weeklyStepSize,
				max: weeklyMax,		
			},
			gridLines: {
				drawTicks: false,
			}		
		}]
	}	
};

// Create the traffic line chart with weekly data and options
var trafficLineWidget = document.getElementById('traffic-line');

var trafficLine = new Chart(trafficLineWidget, {
	type: 'line',
	data: trafficLineData,
	options: trafficLineOptions
});

// Functions and event listeners for refreshing the chart
function hourlyTraffic() {
	//highlight Hourly button
	toggleTrafficActive(hourlyButton);
	//set data array in trafficLine chart 
	trafficLine.data.datasets[0].data = hourlyData;
	//set labels as hourly labels
	trafficLine.data.labels = hourlyLabels;
	//set y-axis step size and max
	trafficLine.options.scales.yAxes[0].ticks.stepSize = hourlyStepSize;
	trafficLine.options.scales.yAxes[0].ticks.max = hourlyMax;
	//redraw chart with new data
	trafficLine.update();
}

function dailyTraffic() {
	toggleTrafficActive(dailyButton);
	trafficLine.data.datasets[0].data = dailyData;
	trafficLine.data.labels = dailyLabels;
	trafficLine.options.scales.yAxes[0].ticks.stepSize = dailyStepSize;
	trafficLine.options.scales.yAxes[0].ticks.max = dailyMax;
	trafficLine.update();
}

function weeklyTraffic() {
	toggleTrafficActive(weeklyButton);
	trafficLine.data.datasets[0].data = weeklyData;
	trafficLine.data.labels = weeklyLabels;
	trafficLine.options.scales.yAxes[0].ticks.stepSize = weeklyStepSize;
	trafficLine.options.scales.yAxes[0].ticks.max = weeklyMax;
	trafficLine.update();
}

function monthlyTraffic() {
	toggleTrafficActive(monthlyButton);
	trafficLine.data.datasets[0].data = monthlyData;
	trafficLine.data.labels = monthlyLabels;
	trafficLine.options.scales.yAxes[0].ticks.stepSize = monthlyStepSize;
	trafficLine.options.scales.yAxes[0].ticks.max = monthlyMax;
	trafficLine.update();
}

// Traffic Line Chart navigation event listeners

hourlyButton.addEventListener("click", hourlyTraffic);
dailyButton.addEventListener("click", dailyTraffic);
weeklyButton.addEventListener("click", weeklyTraffic);
monthlyButton.addEventListener("click", monthlyTraffic);





