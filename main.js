/*
Zachery Hernandez
VFW 1203
Project 4
4/26/2012
Body Health & Fitness
https://github.com/AlucardFair/VFW-Project-4
*/
// Wait until DOM is ready //
window.addEventListener("DOMContentLoaded", function() {

	// getElementById function //
	function $(x) {
		var elementID = document.getElementById(x);
		return elementID;
	};
	
	// Create Select Element with Options//
	function makeWorkoutStyle() {
		var formTag = document.getElementsByTagName('form'),
			selectList = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "styles");
		for(var i=0, j=workoutTypes.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optTxt = workoutTypes[i];
			makeOption.setAttribute("value", optTxt);
			makeOption.innerHTML = optTxt;
			makeSelect.appendChild(makeOption);
		}
		selectList.appendChild(makeSelect);
	};
	
	// //
	function getCheckboxValue() {
		if ($('favorite').checked) {
			favoriteValue = "Yes";
		}else{
			favoriteValue = "No";
		}
	};
	
	// Find Value of selected radio button //
	function getSelectedRadio() {
		var radios = document.forms[0].timeofday;
		for (var i=0, j=radios.length; i<j; i++) {
			if (radios[i].checked) {
				timeValue = radios[i].value;
			}
		}
	};
	
	// Turn on and off form by use of case during getData() //
	function toggle(x) {
		switch(x) {
			case "on":
				$('workoutForm').style.display = "none";
				$('showData').style.display = "none";
				$('clearData').style.display = "inline";
				$('startNew').style.display = "inline";
				$('saveData').style.display = "none";
				break;
			case "off":
				$('workoutForm').style.display = "block";
				$('showData').style.display = "inline";
				$('clearData').style.display = "inline";
				$('startNew').style.display = "none";
				$('saveData').style.display = "inline";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	};
	
	// Gather Form Data & Place it in an Object & Object is an Array for Form Label and Value //
	function saveData(key) {
		// Set Random Key for Stored Data //
		if(!key) {
			var id = Math.floor(Math.random()*10001);
		}else{
			id = key;
		}
		// Call Functions //
		getCheckboxValue();
		getSelectedRadio();
		var item 				= {};
			item.training 		= ["Training Style: ", $('styles').value];
			item.wname			= ["Workout Name: ", $('wname').value];
			item.favorite		= ["Favorite: ", favoriteValue];
			item.howlong		= ["How Long: ", $('howlong').value + " minutes"];
			item.timeofday		= ["Preferred Time: ", timeValue];
			item.completiondate	= ["Completion Date: ", $('completiondate').value];
			item.comments		= ["Self-Motivation: ", $('comments').value];
			
		// Save Data into Local Storage with JSON.stringify //
		localStorage.setItem(id, JSON.stringify(item));
		alert("Workout Saved!");
	};
	
	// Write Data from Local Storage to Browser //
	function getData() {
		// Call Function //
		toggle("on");
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		// Set 'items' display //
		$('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++) {
			var makeLi = document.createElement('li');
			var buttonsLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Convert string from local storage into value by JSON.parse //
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var x in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubTxt = obj[x][0]+" "+obj[x][1];
				makeSubLi.innerHTML = optSubTxt;
				makeSubList.appendChild(buttonsLi);
			}
			makeButtonsLi(localStorage.key(i), buttonsLi);
		}
	};
	
	// Make Buttons //
	// Create edit and delete buttons for each stored item when displayed //
	function makeButtonsLi(key, buttonsLi) {
		// Add edit single item button //
		var editButton = document.createElement('a');
		editButton.href = "#";
		// Added Style to Anchor //
		editButton.style.fontSize = "10px";
		editButton.style.textDecoration = "none";
		editButton.style.color = "white";
		editButton.style.backgroundColor = "black";
		editButton.style.paddingLeft = "7px";
		editButton.style.paddingRight = "7px";
		editButton.style.marginRight = "10px";
		editButton.style.borderStyle = "solid";
		editButton.style.borderWidth = "1px";
		editButton.style.borderRadius = "10px";
		editButton.style.borderColor = "black";
		editButton.style.webkitBoxShadow = "inset 0px 6px 1px rgba(220,220,220,.3)";		
		editButton.key = key;
		var editTxt = "Edit Workout";
		editButton.addEventListener("click", editItem);
		editButton.innerHTML = editTxt;
		buttonsLi.appendChild(editButton);
		// Add line break, kept hidden as I prefer them side by side //
/*		var breakTag = document.createElement('br');
		buttonsLi.appendChild(breakTag);*/
		// Add single delete item button //
		var deleteButton = document.createElement('a');
		deleteButton.href = "#";
		// Added Style to Anchor //
		deleteButton.style.fontSize = "10px";
		deleteButton.style.textDecoration = "none";
		deleteButton.style.color = "white";
		deleteButton.style.backgroundColor = "black";
		deleteButton.style.paddingLeft = "7px";
		deleteButton.style.paddingRight = "7px";
		deleteButton.style.borderStyle = "solid";
		deleteButton.style.borderWidth = "1px";
		deleteButton.style.borderRadius = "10px";
		deleteButton.style.borderColor = "black";
		deleteButton.style.webkitBoxShadow = "inset 0px 6px 1px rgba(220,220,220,.3)";
		deleteButton.key = key;
		var deleteTxt = "Delete Workout";
		deleteButton.addEventListener("click", deleteItem);
		deleteButton.innerHTML = deleteTxt;
		buttonsLi.appendChild(deleteButton);
	};
	
	function editItem(key) {
		// Grab data from local storage for item edit //
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		// Turn form back on //
		toggle("off");
		// Populate form fields //
		$('styles').value = item.training[1];
		$('wname').value = item.wname[1];
		if(item.favorite[1] == "Yes") {
			$('favorite').setAttribute("checked", "checked");
		}
		$('howlong').value = item.howlong[1];
		var radios = document.forms[0].timeofday;
		for (var i=0, j=radios.length; i<j; i++) {
			if(radios[i].value == "Morning" && item.timeofday[1] == "Morning") {
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "Afternoon" && item.timeofday[1] == "Afternoon") {
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "Evening" && item.timeofday[1] == "Evening") {
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('completiondate').value = item.completiondate[1];
		$('comments').value = item.comments[1];
		// Remove event listener for 'save' button //
		submitData.removeEventListener("click", saveData);
		// Change submit button value from Save Workout to Save Changes //
		$('saveData').value = "Save Changes";
		var editSubmit = $('saveData');
		// Save to original key value established for particular values //
		editSubmit.addEventListener("click", validate);
		editSubmit.key = key;
	};
	
	// Delete individual key storage from localStorage //
	function deleteItem() {
		var ask = confirm("Delete this workout?");
		// Confirm with the user to delete individual item //
		if(ask) {
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Workout has been deleted.");
			return false;
		// If declined, do not delete and alert the user //
		}else{
			alert("Workout was not deleted.");
		}
	};
	
	function clearData() {
		if (localStorage.length === 0) {
			alert("There is nothing to delete.");
		}else{
			var clear = confirm("Are you sure you want to delete your workouts?");
			if (clear) {
				localStorage.clear();
				alert("All workouts have been deleted.");
				window.location.reload();
				return false;
			}else{
				alert("Your workouts have not been deleted.");
			}
		}
	};
	
	function validate(e) {
		// Define elements we want to check //
		var getStyle = $('styles');
		var getWname = $('wname');
		var getCompletionDate = $('completiondate');
		var getComments = $('comments');
		// Reset error messages //
		errMsg.innerHTML = "";
		getStyle.style.border = "1px solid black";
		getWname.style.border = "1px solid black";
		getComments.style.border = "1px solid black";
		getCompletionDate.style.border = "1px solid black";
		// Get error messages //
		var messageAry = [];
		// Style validation //
		if(getStyle.value === "*Choose A Style*") {
			var styleError = "Please choose a style.";
			getStyle.style.border = "1px solid red";
			messageAry.push(styleError);
		}
		// Workout name validation //
		if(getWname.value === "") {
			var wNameError = "Please enter a workout name.";
			getWname.style.border = "1px solid red";
			messageAry.push(wNameError);
		}

		// Date completion validation //
		if(getCompletionDate.value === "") {
			var completionDateError = "Please enter a completion date.";
			getCompletionDate.style.border = "1px solid red";
			messageAry.push(completionDateError);
		}
		
		//Self-Motivation validation //
		if(getComments.value === "") {
			var commentsError = "Please motivate yourself.";
			getComments.style.border = "1px solid red";
			messageAry.push(commentsError);
		}
		// Display error messages //
		if(messageAry.length >= 1) {
			for (var i=0, j=messageAry.length; i<j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			// If errors found, stop the form from submitting and alert the user //
			alert("There are required fields left empty.");
			e.preventDefault();
			return false;
		}else{
			// If there are no errors, save the data //
			saveData(this.key);
		}
	};
	
	// Variable defaults //
	var workoutTypes = ["*Choose A Style*", "Cardio", "Strength", "Tone "],
		favoriteValue = "No",
		timeValue,
		confirmClear,
		errMsg = $('errors')
	;
	
	// Set Link & Submit Click Events //
	var displayLink = $('showData');
	displayLink.addEventListener("click", getData);
	var clearButton = $('clearData');
	clearButton.addEventListener("click", clearData);
	var submitData = $('saveData');
	submitData.addEventListener("click", validate);
	
	// Call Functions //
	makeWorkoutStyle();

});