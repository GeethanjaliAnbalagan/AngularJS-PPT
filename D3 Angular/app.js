var app = angular.module('d3Demo', []);

app.directive('viz', function() {
  return {
		restrict: 'E',
		replace: true,
		template: '<svg></svg>',
		link: function(scope, element, attrs) {
			scope.$watch('model', function(newData) {
				updateViz(newData);
			}, true);
		}
	};
});

app.controller('d3Ctrl', function($scope){
	$scope.viewSize = {width: 300, height: 300};
	$scope.model = [];
	$scope.addDot = function() {
		var r = Math.ceil(Math.random() * 60);
		var x = Math.max(r, Math.min($scope.viewSize.width - r, Math.floor(Math.random() * $scope.viewSize.width)));
		var y = Math.max(r, Math.min($scope.viewSize.height - r, Math.floor(Math.random() * $scope.viewSize.height)));
		$scope.model.push({cx: x, cy: y, r: r});
	};
	$scope.removeDot = function() {
		$scope.model.pop();
	};
	$scope.dblclicked = function(index) {
		$scope.$apply(function(){
      $scope.model.splice(index, 1);
    });
	};
	$scope.setPosition = function(index, x, y) {
		$scope.$apply(function(){
			$scope.model[index].cx = x;
			$scope.model[index].cy = y;
		});
	};
});