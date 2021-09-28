//Create a new AngularJS application
var dndApp = angular.module('dndApp', []);

//Draggable attribute: <div draggable></div>
dndApp.directive("draggable", function() {
    return { 
        restrict: "A",
        link: function(scope, element, attrs) {
			element.draggable({ 
				revert: true, //Revert to old position when released
				cursor: "move" //Change the cursor icon
			});			
		}
    }
})

//Droppable attribute: <div droppable></div>
dndApp.directive("droppable", function() {
    return { 
        restrict: "A",
        link: function(scope, element, attrs) {
			element.droppable({
				hoverClass: "drop-hover", //When being hovered over call style: .drop-hover
				drop: function(event, ui) {
				
					// Delegates responsebility to AngularJS's build in JqLite if not available
					// if no other other JQuery library is provided
					var dragIndex = angular.element(ui.draggable).data('index'),
						dragged = angular.element(ui.draggable).parent(),
						dropped = angular.element(this);
					
					//Log to console for debugging purposes
					console.log(dragIndex);
					console.log(dragged);
					console.log(dropped);
				}
			});
		}
    }
})

//Datepicker attribute: <div datepicker></div>
dndApp.directive("datepicker", function() {
    return { 
        restrict: "A",
		require : 'ngModel', // Import ngModel; Allows for manipulation to the model
        link: function(scope, element, attrs, ngModelCtrl) {
			element.datepicker({
				dateFormat: "dd/mm/yy", // Set date format
                onSelect:function (date) {
					// Update the view with the model value and
					// apply changes to the scope
                    ngModelCtrl.$setViewValue(date);
                    scope.$apply();
                }	
			});
		}
    }
})

//Controller for the datepicker
function DateCtrl($scope) {
	//Collect current time (dd/mm/yyyy)
	var currentTime = new Date(),
		month = currentTime.getMonth() + 1,
		day = currentTime.getDate(),
		year = currentTime.getFullYear();
	
	//Update the the date field
    $scope.date = month + "/" + day + "/" + year;
}

//menu attribute: <ul menu></ul>
dndApp.directive("menu", function() {
    return { 
        restrict: "A",
        link: function(scope, element, attrs) { element.menu(); }
    }
})

//Factory used to share data between directives and controllers
//Provide access to the stages array
// *** CURRENTLY NOT USED ***
dndApp.factory('DataService', [function(){
  return { stages: [] };
}]);

//Controller for the progress bar.
function ProgBarCtrl($scope, DataService) {
	//Set increment to increase the bar with and determine the minimum and maximum values
	var increment = 20, min = 0, max = 100;
	//Use JQuery for DOM-manipulation on the progress bar
	var progressbar = $( "#progressbar" ), progressLabel = $( ".progress-label" );

	//Decice what text to display based on the state of the progress bar
	progressbar.progressbar({
		value: false, //Default value
		change: function() { progressLabel.text( progressbar.progressbar( "value" ) + "%" ); }, //On change
		complete: function() { progressLabel.text( "Complete!" ); } //On complete
	});
	
	// *** BUTTONS ***
	//Increase the progress bar by increment
	$scope.more = function() {
		var val = progressbar.progressbar( "value" ) || min;
		
		//Make sure the progress bar doesn't go over, or under the minimum
		//or maximum allowed value
		if( val < max && val >= min )
			progressbar.progressbar( "value", val + increment );
		else if( val == min )
			progressbar.progressbar( "value", false );			
	 }
	 
	 //Decrease the progress bar by increment
	$scope.less = function() {
		var val = progressbar.progressbar( "value" ) || min;

		//Make sure the progress bar doesn't go over, or under the minimum
		//or maximum allowed value
		if( val <= max && val > min)
			progressbar.progressbar( "value", val - increment );
		else if( val == min )
			progressbar.progressbar( "value", false );
	 }
}